import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { saveLead } from "../services/dataStore.js";

const firstAiMessage =
  "Mirëseerdhët në Cali Ing. Unë jam asistenti juaj virtual. Si mund t’ju ndihmojmë me projektin tuaj të ëndrrave?";

const knowledgeBase = [
  {
    keywords: ["arkitekti", "inxhinieri", "bardhyl", "halitjaha"],
    response:
      "Arkitekti dhe inxhinieri kryesor i Cali Ing është Bardhyl Halitjaha, një profesionist me përvojë të gjatë në projektim dhe menaxhim rezidencial.",
  },
  {
    keywords: ["materialet", "preferuara", "mermer", "beton", "dru", "qelq"],
    response:
      "Ne specializohemi në përdorimin e: Mermerit të Zi, Betonit Arkitektonik, Drurit të Lisit, dhe Qelqit të Zi.",
  },
  {
    keywords: ["interieri", "dizajn", "brendshëm"],
    response:
      "Po, ne ofrojmë shërbime të plota për dizajnin e interierit, nga koncepti deri te mobilimi.",
  },
  {
    keywords: ["kontakt", "konsultim", "email", "takim"],
    response:
      "Ju lutemi përdorni formën e kontaktit në faqen tonë ose na dërgoni një email tek bardhyl@caliing.com për një konsultim profesional.",
  },
  {
    keywords: ["projekti", "diploma", "çka është kjo"],
    response:
      'Ky është projekti im i diplomës: Një platformë luksoze për studion "Cali Ing", që integron arkitekturën moderne me inteligjencën artificiale.',
  },
  {
    keywords: ["vizioni", "qëllimi"],
    response:
      'Vizioni ynë është "Refining Space, Defining Luxury" — transformimi i hapësirave të thjeshta në monumente arti.',
  },
];

function getMappedResponse(input) {
  const text = input.toLowerCase().trim();
  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => text.includes(keyword)),
  );
  if (match) return match.response;
  return 'Kjo është një kërkesë specifike për stafin tonë teknik. Si pjesë e projektit "Cali Ing", ne sigurohemi që çdo detaj të jetë i përsosur. A dëshironi të bisedoni me arkitektin kryesor?';
}

const quickReplies = [
  {
    q: "Kush është arkitekti kryesor?",
    a: "Arkitekti dhe inxhinieri kryesor i Cali Ing është Sali Halitjaha, i specializuar në projektim modern dhe menaxhim ekzekutiv.",
    icon: "📐",
  },
  {
    q: "Çfarë materialesh përdorni?",
    a: "Ne punojmë me materiale luksoze si Mermeri i Zi, Betonit Arkitektonik, Drurit të Lisit dhe Qelqit të Zi për të krijuar kontraste unike.",
    icon: "🏛️",
  },
  {
    q: "Ku gjenden zyrat tuaja?",
    a: "Studioja jonë ndodhet në Prishtinë, por ne operojmë me projekte në të gjithë rajonin.",
    icon: "📍",
  },
  {
    q: "A ofroni mbikëqyrje punimesh?",
    a: "Po, ne ofrojmë menaxhim të plotë të projektit, nga skica e parë deri në dorëzimin e çelësave.",
    icon: "🏗️",
  },
  {
    q: "Si mund të caktoj një takim?",
    a: "Mund të na shkruani direkt këtu ose të plotësoni formën te faqja e Kontaktit për një konsultim falas.",
    icon: "✉️",
  },
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: firstAiMessage },
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping, open]);

  const handleQuickReply = (reply) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: reply.q }]);
    setIsTyping(true);
    setMenuOpen(false);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: reply.a }]);
      setIsTyping(false);
    }, 800);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);

    window.setTimeout(() => {
      const response = getMappedResponse(userText);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] font-sans sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1A1A1B]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:w-[350px]"
          >
            <div className="flex items-center justify-between border-b border-white/5 bg-[#242426] px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.3)]" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">
                  2B ING AI
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#A1A1A6] hover:text-white transition-colors duration-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={listRef}
              className="max-h-[400px] space-y-6 overflow-y-auto px-8 py-8 scrollbar-hide bg-[#1A1A1B]"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={[
                    "w-fit max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-relaxed",
                    msg.role === "ai"
                      ? "bg-[#242426] text-[#A1A1A6] border border-white/5 font-light shadow-sm"
                      : "ml-auto bg-[#C5A059] text-white font-bold shadow-lg",
                  ].join(" ")}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping ? (
                <div className="w-fit rounded-3xl bg-[#242426] border border-white/5 px-6 py-4 text-sm text-[#C5A059]/40 shadow-sm">
                  <span className="animate-pulse tracking-widest">•••</span>
                </div>
              ) : null}
            </div>

            <div className="relative border-t border-white/5">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex w-full items-center justify-between bg-[#242426] px-8 py-4 transition-all duration-500 hover:bg-[#2A2A2C]"
              >
                <span className="text-[9px] font-bold tracking-[0.4em] text-[#A1A1A6] uppercase">
                  Konsultim i Shpejtë
                </span>
                <motion.span
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  className="text-[#C5A059]/40"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#1A1A1B]"
                  >
                    <div className="grid grid-cols-1 gap-1 p-4">
                      {quickReplies.map((reply, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ x: 8, backgroundColor: "#242426" }}
                          onClick={() => handleQuickReply(reply)}
                          disabled={isTyping}
                          className="flex items-center gap-4 w-full text-left text-[11px] px-5 py-3 rounded-2xl transition-all text-[#A1A1A6] hover:text-[#C5A059] group shadow-sm border border-transparent hover:border-white/5"
                        >
                          <span className="text-lg opacity-20 group-hover:opacity-100 transition-opacity">
                            {reply.icon}
                          </span>
                          <span className="flex-1 tracking-wide font-medium">
                            {reply.q}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form
              onSubmit={submitMessage}
              className="relative bg-[#242426] p-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Shkruani mesazhin..."
                className="w-full rounded-2xl border border-white/5 bg-[#1A1A1B] py-4 pl-6 pr-16 text-sm text-white placeholder:text-white/10 focus:border-[#C5A059]/30 focus:outline-none transition-all duration-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[#C5A059] transition-all duration-500 hover:scale-110 disabled:scale-100 disabled:opacity-20"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 19l9-7-9-7V7l9 7-9 7v-2z"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A059] text-white shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all duration-700 hover:bg-[#D5B069]"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <span className="text-xl">💬</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
