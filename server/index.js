require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Final Multer Configuration for Direct Public Folder Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pointing to the root public/images/projects folder
    const dir = path.resolve(__dirname, '..', 'public', 'images', 'projects');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Timestamp + sanitised name
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
// Log all incoming requests
app.use((req, res, next) => {
  console.log('Kërkesë e re:', req.method, req.url);
  next();
});

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- Initialize Settings & Admin Tables (HARD RESET) ---
const initializeSettings = async () => {
  try {
    console.log('=== HARD RESET: Dropping old tables ===');
    await pool.query('DROP TABLE IF EXISTS admin_settings CASCADE');
    await pool.query('DROP TABLE IF EXISTS admin_users CASCADE');
    
    console.log('=== Creating admin_users table ===');
    await pool.query(`
      CREATE TABLE admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('=== Creating admin_settings table ===');
    await pool.query(`
      CREATE TABLE admin_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('=== Inserting default admin user ===');
    await pool.query(
      'INSERT INTO admin_users (username, password) VALUES ($1, $2)',
      ['admin', 'admin']
    );
    
    console.log('=== Inserting default business settings ===');
    const defaultSettings = [
      { key: 'businessEmail', value: 'info@caliing.com' },
      { key: 'phoneNumber', value: '+383 44 123 456' },
      { key: 'officeAddress', value: 'Prishtinë, Kosovë' },
      { key: 'instagramUrl', value: 'https://instagram.com/caliing' }
    ];
    
    for (const setting of defaultSettings) {
      await pool.query(
        'INSERT INTO admin_settings (key, value) VALUES ($1, $2)',
        [setting.key, setting.value]
      );
    }
    
    console.log('=== HARD RESET COMPLETE: All tables recreated ===');
  } catch (err) {
    console.error('=== ERROR INITIALIZING TABLES ===');
    console.error(err);
  }
};

initializeSettings();

// --- Create Projects Table if it doesn't exist ---
const createProjectsTable = async () => {
  try {
    console.log('=== Checking if projects table exists ===');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT,
        location TEXT,
        year TEXT,
        area TEXT,
        gallery_1_url TEXT,
        gallery_2_url TEXT,
        gallery_3_url TEXT,
        gallery_4_url TEXT,
        gallery_5_url TEXT,
        gallery_6_url TEXT,
        gallery_1_caption TEXT,
        gallery_2_caption TEXT,
        gallery_3_caption TEXT,
        gallery_4_caption TEXT,
        gallery_5_caption TEXT,
        gallery_6_caption TEXT
      )
    `);
    console.log('=== Projects table created or already exists ===');
  } catch (err) {
    console.error('=== ERROR creating projects table ===');
    console.error(err);
  }
};

createProjectsTable();

// --- Database Migration for Projects Table ---
const migrateProjectsTable = async () => {
  try {
    console.log('=== Checking and migrating projects table ===');
    
    const addColumnIfNotExists = async (columnName, columnType) => {
      try {
        await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS ${columnName} ${columnType}`);
        console.log(`  - Column ${columnName} ensured`);
      } catch (err) {
        console.error(`  - Error with column ${columnName}:`, err.message);
      }
    };

    await addColumnIfNotExists('location', 'TEXT');
    await addColumnIfNotExists('year', 'TEXT');
    await addColumnIfNotExists('area', 'TEXT');
    await addColumnIfNotExists('gallery_1_url', 'TEXT');
    await addColumnIfNotExists('gallery_2_url', 'TEXT');
    await addColumnIfNotExists('gallery_3_url', 'TEXT');
    await addColumnIfNotExists('gallery_4_url', 'TEXT');
    await addColumnIfNotExists('gallery_5_url', 'TEXT');
    await addColumnIfNotExists('gallery_6_url', 'TEXT');
    await addColumnIfNotExists('gallery_1_caption', 'TEXT');
    await addColumnIfNotExists('gallery_2_caption', 'TEXT');
    await addColumnIfNotExists('gallery_3_caption', 'TEXT');
    await addColumnIfNotExists('gallery_4_caption', 'TEXT');
    await addColumnIfNotExists('gallery_5_caption', 'TEXT');
    await addColumnIfNotExists('gallery_6_caption', 'TEXT');

    console.log('=== Projects table migration complete ===');
  } catch (err) {
    console.error('=== ERROR migrating projects table ===');
    console.error(err);
  }
};

migrateProjectsTable();

// --- API ROUTES ---

app.put('/api/admin/password', async (req, res) => { 
  const { newPassword } = req.body; 
  if (!newPassword) return res.status(400).json({ error: "Shkruaj fjalëkalimin!" }); 
  try { 
    await pool.query("UPDATE admin_users SET password = $1 WHERE username = 'admin'", [newPassword]); 
    return res.status(200).json({ message: "OK" }); 
  } catch (err) { 
    return res.status(500).json({ error: "Database error" }); 
  } 
});

// 2. Admin: Get Business Info (Protected)
app.get('/api/admin/business-info', authenticateToken, async (req, res) => {
  try {
    console.log('=== GET /api/admin/business-info ===');
    const result = await pool.query('SELECT key, value FROM admin_settings');
    const settings = {};
    result.rows.forEach(row => {
      settings[row.key] = row.value;
    });
    console.log('Returning settings:', settings);
    res.json(settings);
  } catch (err) {
    console.error('=== ERROR GET /api/admin/business-info ===');
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Public: Get Business Info (No Auth)
app.get('/api/business-info', async (req, res) => {
  try {
    console.log('=== GET /api/business-info (Public) ===');
    const result = await pool.query('SELECT key, value FROM admin_settings');
    const settings = {};
    result.rows.forEach(row => {
      settings[row.key] = row.value;
    });
    console.log('Returning public settings:', settings);
    res.json(settings);
  } catch (err) {
    console.error('=== ERROR GET /api/business-info (Public) ===');
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// 3. Admin: Update Business Info (NO AUTH FOR TESTING)
app.put('/api/admin/business-info', async (req, res) => {
  try {
    console.log('=== PUT /api/admin/business-info ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    const { businessEmail, phoneNumber, officeAddress, instagramUrl } = req.body;
    
    const updates = [
      { key: 'businessEmail', value: businessEmail },
      { key: 'phoneNumber', value: phoneNumber },
      { key: 'officeAddress', value: officeAddress },
      { key: 'instagramUrl', value: instagramUrl }
    ];
    
    for (const setting of updates) {
      console.log('Updating setting:', setting.key);
      const result = await pool.query(
        `INSERT INTO admin_settings (key, value) 
         VALUES ($1, $2) 
         ON CONFLICT (key) 
         DO UPDATE SET value = EXCLUDED.value
         RETURNING *`,
        [setting.key, setting.value]
      );
      console.log('--- DATA SAVED TO DB ---', result.rows[0]);
    }
    
    console.log('Business info update successful!');
    res.json({ success: true, message: 'Të dhënat u ruajtën me sukses!' });
  } catch (err) {
    console.error('=== ERROR PUT /api/admin/business-info ===');
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// --- OTHER API ROUTES ---
// 4. Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    console.log('=== POST /api/contact ===');
    const { name, email, message } = req.body;
    const result = await pool.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('=== ERROR POST /api/contact ===');
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// 5. Projects Route
app.get('/api/projects', async (req, res) => {
  try {
    console.log('=== GET /api/projects ===');
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('=== ERROR GET /api/projects ===');
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// 6. Admin Login
app.post('/api/login', async (req, res) => {
  try {
    console.log('=== POST /api/login ===');
    const { username, password } = req.body;
    console.log('Login Attempt:', { username, password });
    
    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      console.log('Login Failed: User not found');
      return res.status(401).json({ error: 'Kredenciale të pasakta.' });
    }
    
    const admin = result.rows[0];
    console.log('Admin password in DB:', admin.password);
    const isPasswordValid = (password === admin.password);
    
    if (!isPasswordValid) {
      console.log('Login Failed: Invalid password');
      return res.status(401).json({ error: 'Kredenciale të pasakta.' });
    }
    
    const token = jwt.sign({ username: admin.username, id: admin.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('Login Successful, token generated');
    return res.json({ success: true, token });
  } catch (err) {
    console.error('=== ERROR POST /api/login ===');
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// 7. Admin: Get Messages (Protected)
app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 8. Admin: Delete Message (Protected)
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 9. Admin: Add Project (Minimal Version)
app.post('/api/projects', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery_1', maxCount: 1 },
  { name: 'gallery_2', maxCount: 1 },
  { name: 'gallery_3', maxCount: 1 },
  { name: 'gallery_4', maxCount: 1 },
  { name: 'gallery_5', maxCount: 1 },
  { name: 'gallery_6', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('--- MINIMAL PROJECT UPLOAD ---');
    console.log('Body:', req.body);
    console.log('Files:', req.files);

    const { 
      title, category, description, location, year, area,
      gallery_1_caption, gallery_2_caption, gallery_3_caption,
      gallery_4_caption, gallery_5_caption, gallery_6_caption
    } = req.body;
    
    if (!req.files?.image || !req.files.image[0]) {
      return res.status(400).json({ error: 'Nuk u ngarkua asnjë imazh kryesor.' });
    }

    const imageUrl = '/images/projects/' + req.files.image[0].filename;
    
    const getGalleryUrl = (index) => {
      const key = `gallery_${index}`;
      if (req.files[key] && req.files[key][0]) {
        return '/images/projects/' + req.files[key][0].filename;
      }
      return null;
    };

    const result = await pool.query(
      `INSERT INTO projects (
        title, category, image_url, description, location, year, area,
        gallery_1_url, gallery_2_url, gallery_3_url, gallery_4_url, gallery_5_url, gallery_6_url,
        gallery_1_caption, gallery_2_caption, gallery_3_caption, 
        gallery_4_caption, gallery_5_caption, gallery_6_caption
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
      RETURNING *`,
      [
        title, category, imageUrl, description, location, year, area,
        getGalleryUrl(1), getGalleryUrl(2), getGalleryUrl(3), 
        getGalleryUrl(4), getGalleryUrl(5), getGalleryUrl(6),
        gallery_1_caption, gallery_2_caption, gallery_3_caption,
        gallery_4_caption, gallery_5_caption, gallery_6_caption
      ]
    );
    
    console.log('Successfully saved to DB:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Minimal Upload Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 10. Admin: Delete Project (Protected)
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve uploads and root images
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
