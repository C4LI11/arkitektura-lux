export const API_URL = "https://arkitektura-backend.onrender.com/api";

// --- DATA SOURCE CONFIGURATION ---
// We are now strictly using the PERN stack (PostgreSQL, Express, React, Node).
// Firebase is kept only for architectural reference or legacy chat features.
// All core project and message data flows through the :5000 API.
// ---------------------------------

// Ky funksion trajton dërgimin e mesazheve te Backend-i (SQL)
export async function saveContactMessage(payload) {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.emri,
      email: payload.email,
      message: payload.mesazhi,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

// Kjo linjë zgjidh gabimin në AiChat.jsx duke krijuar një "binjak" të funksionit
export const saveLead = saveContactMessage;

// Funksioni për të marrë projektet nga Databaza SQL
export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

// Funksioni për Login e Adminit (përdor JWT)
export async function loginAdmin(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("admin_token", data.token);
  }
  return data;
}

// Funksioni për të parë mesazhet në Admin Dashboard
export async function getAdminMessages() {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${API_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("admin_token");
    }
    throw new Error("Failed to fetch messages");
  }

  return response.json();
}

// Funksioni për fshirjen e mesazheve nga Admini
export async function deleteAdminMessage(id) {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete message");
  }

  return response.json();
}

// Funksioni për fshirjen e projekteve nga Admini
export async function deleteAdminProject(id) {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
}

// Funksioni për shtimin e projekteve nga Admini
export async function addAdminProject(formData) {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(errorText);
  }

  return response.json();
}

export async function updatePassword(currentPassword, newPassword) {
  const response = await fetch(`${API_URL}/admin/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || data.message || "Dështoi ndryshimi i fjalëkalimit",
    );
  }

  return data;
}

// Funksioni për marrjen e informacioneve të biznesit
export async function getBusinessInfo() {
  const response = await fetch(`${API_URL}/business-info`);

  if (!response.ok) {
    throw new Error("Failed to fetch business info");
  }

  return response.json();
}

// Funksioni për marrjen e informacioneve të biznesit (publike)
export async function getPublicBusinessInfo() {
  const response = await fetch(`${API_URL}/business-info`);
  if (!response.ok) {
    throw new Error("Failed to fetch business info");
  }
  return response.json();
}

// Funksioni për përditësimin e informacioneve të biznesit
export async function updateBusinessInfo(info) {
  const token = localStorage.getItem("admin_token");
  console.log("=== Frontend: updateBusinessInfo called ===");
  console.log("Dërgimi i të dhënave:", info);

  const response = await fetch(`${API_URL}/admin/business-info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(info),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "Failed to update business info" }));
    throw new Error(errorData.error || "Failed to update business info");
  }

  return response.json();
}
