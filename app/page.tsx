'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════════════
   MARSNOVAX — TITAN SINGULARITY — FINAL MASTER MERGE
   Chief Commander: Mr.X | Mission Control for Humanity
   
   ✅ NO DEAD BUTTONS — everything wired
   ✅ Mr.X Terminal (replaces Emperor — manifesto, no company data)
   ✅ Truth-ID Biometric Gate (full-screen laser scan CSS animation)
   ✅ VPN HUD (grayscale Cadet → glowing green Elite/Titan)
   ✅ 9-Dot Sovereign Suite (ProseNova/NovaVision/SoundNova/Forge/Vault)
   ✅ Virtual Forge (cloud HPC — hardware killer)
   ✅ Browser back/forward/reload sub-nav controls
   ✅ Upgrade modal for locked Cadet features
   ✅ Logo/Launch/SignIn z-index:1000000 — fully visible
   ✅ Dropdowns position:fixed, solid #050505 — no overlap
   ✅ The Pulse AI — floating gold sphere — wired to Claude API
   ✅ All 4 tiers: Voyager $0 | Galaxy Guardian $0 | Explorer $25 | Titan $250
   ✅ All pages: Home, Stellar Hub, Nova Engine, Starbase, Forge, Gaming,
      Vitality, Ranks, Crew, Chronicle, Heart, Tunnel, Revenue, Covenant,
      AEGIS, Mission, Mr.X Terminal, Pricing, Titan Fortress, Sovereign Suite
═══════════════════════════════════════════════════════════════════════ */

// ─── LOGO ──────────────────────────────────────────────────────────────
function Logo({ h = 30 }: { h?: number }) {
  return (
    <svg viewBox="0 0 250 42" height={h} fill="none" style={{ display: 'block', width: 'auto' }}>
      <path d="M13 2L16 11L16.5 22L16 33L13 38L10 33L9.5 22L10 11Z" fill="rgba(255,255,255,0.82)" />
      <path d="M16 33L20 39L20 42L13 39L6 42L6 39L10 33Z" fill="rgba(255,255,255,0.28)" />
      <polygon points="13,2 17,11 9,11" fill="white" />
      <text x="26" y="32" fontFamily="Orbitron,monospace" fontWeight="900" fontSize="27" fill="white" letterSpacing="-0.5">MarsNovaX</text>
      <path d="M216 37 Q229 32 242 25" stroke="rgba(255,255,255,0.44)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// ─── STARFIELD ────────────────────────────────────────────────────────
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext('2d')!; let raf: number
    const resize = () => { cv.width = innerWidth; cv.height = innerHeight }
    resize()
    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() * 1.1 + 0.1, ph: Math.random() * 6.28, sp: Math.random() * 0.005 + 0.002
    }))
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      stars.forEach(s => {
        s.ph += s.sp; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28)
        ctx.fillStyle = `rgba(255,255,255,${((Math.sin(s.ph) + 1) / 2) * 0.46})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

// ─── VOICE HOOK ───────────────────────────────────────────────────────
function useVoice(onResult: (t: string) => void) {
  const [on, setOn] = useState(false); const rec = useRef<any>(null); const [sup, setSup] = useState(false)
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return; setSup(true)
    const r = new SR(); r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onresult = (e: any) => onResult(Array.from(e.results).map((x: any) => x[0].transcript).join(''))
    r.onend = () => setOn(false); r.onerror = () => setOn(false); rec.current = r
  }, [onResult])
  const toggle = useCallback(() => {
    if (!rec.current) return
    if (on) { rec.current.stop(); setOn(false) } else { rec.current.start(); setOn(true) }
  }, [on])
  return { on, sup, toggle }
}

// ─── TYPES ────────────────────────────────────────────────────────────
type Page = 'home' | 'stellar' | 'nova' | 'tool' | 'starbase' | 'gaming' | 'vitality' |
  'ranks' | 'crew' | 'heart' | 'forge' | 'tunnel' | 'revenue' | 'mission' | 'pricing' |
  'mrx' | 'covenant' | 'aegis' | 'chronicle' | 'titan' | 'suite'

type Tool = { id: string; icon: string; name: string; cat: string; badge?: string; desc: string; qp: string[]; sys: string }

// ─── TOOLS ────────────────────────────────────────────────────────────
const TOOLS: Tool[] = [
  { id: 'core', icon: '🌌', name: 'MarsNova Core', cat: 'education', badge: 'FLAGSHIP', desc: 'Master AI tutor across all 99+ domains. Adaptive, personalized, multi-language. +50 XP per interaction.', qp: ['Teach me quantum physics', 'Explain orbital mechanics', 'Quiz me on world history', 'Create my learning path'], sys: 'You are MarsNova Core, the master AI tutor of MarsNovaX — Mission Control for Humanity. Deep expertise across ALL 99+ domains. Teach clearly, give quizzes, create learning paths. Be the world\'s best professor. Respond in user\'s language. Every response earns +50 XP.' },
  { id: 'viral', icon: '🚀', name: 'MarsViral AI', cat: 'content', desc: 'One idea → 20+ viral posts for every platform. Hooks, hashtags, viral scores included.', qp: ['Make my startup idea viral', 'Write viral X thread', 'TikTok hook for my product', 'LinkedIn post about AI'], sys: 'You are MarsViral AI, elite social media strategist. Transform any idea into viral content for X/Twitter, LinkedIn, Instagram, TikTok, Facebook, Threads, email. Include viral score 1-10 and psychological hook analysis.' },
  { id: 'launch', icon: '💡', name: 'BrainLaunch AI', cat: 'business', desc: 'Startup validator, pitch deck builder, market research, VC-level business coach.', qp: ['Validate my SaaS idea', 'Analyze my market size', 'Build pitch deck outline', 'What are my biggest risks?'], sys: 'You are BrainLaunch AI, elite startup advisor and VC-level coach. Validate ideas rigorously, build pitch decks, coach founders. Direct, honest, strategically brilliant.' },
  { id: 'sell', icon: '📈', name: 'OrbitSell AI', cat: 'business', desc: 'AI sales agent. Cold emails, follow-ups, objection handling, lead research — 24/7.', qp: ['Write a cold email', 'Create 5-email follow-up', 'Handle price objection', 'Research ideal customer'], sys: 'You are OrbitSell AI, world-class sales strategist. Write cold emails that get replies, follow-up sequences, objection handling scripts. Every word earns its place.' },
  { id: 'money', icon: '💰', name: 'NovaMoney AI', cat: 'business', desc: 'Bookkeeping, tax prep, P&L, financial analysis, cash flow management.', qp: ['Create P&L template', 'Tax deductions for freelancers', 'Monthly budget framework', 'Analyze my cash flow'], sys: 'You are NovaMoney AI, expert financial advisor. Budgeting, P&L, tax optimization, cash flow. Educational — consult a licensed CPA for official filings.' },
  { id: 'legal', icon: '⚖', name: 'LexNova AI', cat: 'business', desc: 'Contract drafting, legal research, compliance guidance, NDAs, IP protection.', qp: ['Draft an NDA', 'Explain GDPR compliance', 'Review contract clause', 'What are my IP rights?'], sys: 'You are LexNova AI, legal research assistant. Draft contracts, NDAs, explain legal concepts. Educational — consult a licensed attorney for specific advice.' },
  { id: 'code', icon: '⚡', name: 'AstroCode AI', cat: 'developer', desc: 'Full-stack coding AI. Generate, debug, explain, optimize in any language.', qp: ['Build REST API in Python', 'Debug my React component', 'Design database schema', 'Explain async/await'], sys: 'You are AstroCode AI, elite full-stack engineer. Write production-quality code in any language, debug, explain architecture, optimize. Always provide working, commented code.' },
  { id: 'writer', icon: '✍', name: 'ProseNova AI', cat: 'content', desc: 'Ghostwriting, blogs, books, scripts, emails — any format, publication-ready.', qp: ['Write blog post about AI', 'Draft executive email', 'Product launch announcement', 'Book chapter outline'], sys: 'You are ProseNova AI, world-class ghostwriter. Write blogs, books, scripts, emails in any style. Every sentence earns its place. Polished, publication-ready content.' },
  { id: 'medidoc', icon: '🩺', name: 'MediDoc AI', cat: 'medical', desc: 'SOAP notes, ICD-10 codes, clinical summaries, discharge documentation.', qp: ['SOAP note template', 'ICD-10 codes for diabetes', 'Patient referral letter', 'Discharge summary'], sys: 'You are MediDoc AI, medical documentation specialist. SOAP notes, ICD-10/CPT codes, discharge summaries. Note: reviewed by licensed professional before use.' },
  { id: 'diagnova', icon: '🔍', name: 'DiagNova AI', cat: 'medical', desc: 'Differential diagnosis education, pathophysiology, clinical reasoning tools.', qp: ['Differential dx chest pain', 'Pathophysiology of sepsis', 'Clinical reasoning framework', 'Explain this lab result'], sys: 'You are DiagNova AI, medical education assistant. Explain symptoms, differential diagnoses, pathophysiology. Educational — consult a physician for actual diagnosis.' },
  { id: 'hire', icon: '👥', name: 'HireNova AI', cat: 'business', desc: 'Resume writing, job descriptions, interview prep, HR strategy, talent acquisition.', qp: ['ATS-optimized resume', 'Compelling job description', 'PM interview prep', '90-day onboarding plan'], sys: 'You are HireNova AI, expert HR strategist. ATS-optimized resumes, compelling JDs, interview Q&As. Results-focused, action-oriented.' },
  { id: 'pitch', icon: '📊', name: 'PitchNova AI', cat: 'business', desc: 'Pitch decks, investor memos, funding strategy, valuation frameworks.', qp: ['Series A deck structure', 'Investor one-pager', 'Calculate my valuation', 'What metrics do VCs want?'], sys: 'You are PitchNova AI, pitch deck specialist. Investment narratives, slide structures, investor memos. Top-tier VC thinking + world-class storytelling.' },
  { id: 'support', icon: '🤖', name: 'QuantumHelp AI', cat: 'business', desc: '24/7 customer support agent. FAQs, bookings, lead qualification, scripts.', qp: ['FAQ responses for SaaS', 'Support email templates', 'Escalation policy', 'Automate onboarding'], sys: 'You are QuantumHelp AI, professional customer support specialist. FAQ templates, support workflows. Warm, solution-focused, empathetic.' },
  { id: 'train', icon: '🎯', name: 'MarsTrain AI', cat: 'productivity', desc: 'Role-play trainer for sales, interviews, negotiations — scored with precision feedback.', qp: ['Sales call — skeptical', 'Head of Product interview', 'Salary negotiation', 'Score my pitch'], sys: 'You are MarsTrain AI, elite performance coach. Simulate challenging scenarios. After each: score 1-10, what went well, precise improvement steps.' },
  { id: 'intel', icon: '🕵', name: 'EdgeMars AI', cat: 'productivity', desc: 'Competitive intelligence, market analysis, strategic reports, weekly briefings.', qp: ['Analyze top 3 competitors', 'SaaS pricing strategies', 'EdTech market gaps', 'Intelligence framework'], sys: 'You are EdgeMars AI, strategic intelligence analyst. Analyze competitors, markets, pricing. Clear, actionable recommendations.' },
  { id: 'translate', icon: '🌍', name: 'PolyNova AI', cat: 'productivity', desc: 'Polyglot Bridge: 100+ language voice-to-voice translation. Culturally accurate.', qp: ['Translate to Spanish', 'Formal French translation', 'Localize for Arabic', 'Cultural context'], sys: 'You are PolyNova AI, master linguist fluent in 100+ languages. Translate with cultural accuracy — never robotic. Note nuances and idiomatic alternatives.' },
  { id: 'brief', icon: '📝', name: 'BriefNova AI', cat: 'productivity', desc: 'Summarize articles, PDFs, meetings into clear, actionable intelligence briefs.', qp: ['Summarize this article', 'Extract action items', 'Executive summary', 'Key takeaways'], sys: 'You are BriefNova AI. Format: (1) One-sentence essence (2) Key points 5-7 bullets (3) Critical details (4) Action items with owners. Ruthlessly concise.' },
  { id: 'scribe', icon: '✒', name: 'Platinum Scribe', cat: 'content', desc: 'Grammarly-Plus: tone shifter (CEO/Academic/Creative), readability scores, enhancement.', qp: ['Make more professional', 'CEO style shift', 'Improve academic paper', 'Creative and compelling'], sys: 'You are Platinum Scribe, premium writing enhancer. Make writing completely natural and human. Offer: (1) Refined version (2) Tone analysis (3) Readability score (4) Reader reaction (5) Three tone versions.' },
  { id: 'grinder', icon: '⚙', name: 'Imagination Grinder', cat: 'education', badge: 'GOD MODE', desc: 'Raw idea → 3D blueprint + business plan + learning path simultaneously.', qp: ['I want to build a lunar greenhouse', 'SaaS for remote teams', 'Vertical farm in Dubai', 'AI fitness app'], sys: 'You are the Imagination Grinder — GOD MODE. Take ANY raw idea and produce: (1) Architecture: structural blueprint (2) Business Plan: market analysis, revenue model (3) Learning Path: specific Stellar Hub courses (4) Logistics: supply chain (5) Finance: funding model. Make imagination concrete and actionable.' },
  { id: 'career', icon: '🎓', name: 'CareerNova AI', cat: 'productivity', desc: 'Resume builder, cover letters, interview prep, salary negotiation strategy.', qp: ['Resume for maximum impact', 'Cover letter for this role', 'Negotiate 25% raise', 'Career transition to tech'], sys: 'You are CareerNova AI, elite career strategist. ATS-optimized resumes, cover letters, interview Q&As, salary negotiation scripts. Help people land their dream role.' },
  { id: 'design', icon: '🎨', name: 'DesignNova AI', cat: 'creative', desc: 'Brand identity, UI/UX feedback, creative direction, color palettes, design systems.', qp: ['Brand identity brief', 'UI/UX feedback on app', 'Premium color palette', 'Design system docs'], sys: 'You are DesignNova AI, senior creative director. Brand identity, UI/UX feedback, design briefs. Opinionated, bold, always user-focused.' },
  { id: 'research', icon: '🔬', name: 'ResearchMind AI', cat: 'education', desc: 'Academic research, literature reviews, paper analysis, research proposals.', qp: ['Literature review on AI ethics', 'Structure research methodology', 'Analyze this paper', 'Write thesis introduction'], sys: 'You are ResearchMind AI, senior academic researcher. Literature reviews, methodologies, paper analysis. Rigorous and evidence-based.' },
  { id: 'neural', icon: '🧬', name: 'Neural Link', cat: 'education', badge: 'PERSONAL AI', desc: 'Your AI chief of staff. Personalized daily briefings by name. Connects all tools. 24/7.', qp: ['Give me my daily briefing', 'What should I focus on today?', 'Connect my goals to my work', 'Which tools for my project?'], sys: 'You are Neural Link, personal AI chief of staff of MarsNovaX. Personalized daily briefings by name, cross-tool recommendations, progress summaries. Proactive, personal, inspiring. Greet warmly by name.' },
  { id: 'trip', icon: '✈', name: 'StarTrip AI', cat: 'lifestyle', desc: 'Personalized travel itineraries, cost planning, hidden gems, AI concierge.', qp: ['10-day Japan trip $3000', 'Budget breakdown for travel', 'Hidden gems locals know', 'Best time to visit'], sys: 'You are StarTrip AI, world-class travel advisor. Day-by-day itineraries, budget breakdowns, hidden gems, local tips. Personalize to style and budget.' },
  { id: 'meet', icon: '📅', name: 'MeetNova AI', cat: 'productivity', desc: 'Meeting transcription, action items, summaries, professional follow-ups.', qp: ['Summarize meeting notes', 'Extract action items + deadlines', 'Draft follow-up email', 'Plan 60-min agenda'], sys: 'You are MeetNova AI. Transform notes into: Meeting Summary, Decisions Made, Action Items with owners+deadlines, Follow-Up Required. Precise and professional.' },
  { id: 'vision', icon: '👁', name: 'NovaVision AI', cat: 'creative', badge: 'VISION', desc: 'Image generation, analysis, visual ideation, design briefs, creative direction.', qp: ['Describe this image in detail', 'Generate brand visual concept', 'Analyze UI screenshot', 'Visual style guide'], sys: 'You are NovaVision AI, the visual intelligence layer of MarsNovaX. Analyze images with precision, generate detailed image concepts and descriptions, provide creative direction. When given images, describe them in rich detail. When asked to create, provide detailed generation prompts and visual specifications.' },
  { id: 'sound', icon: '🎵', name: 'SoundNova AI', cat: 'creative', badge: 'AUDIO', desc: 'Music composition, audio scripts, podcast outlines, voice direction, sound design.', qp: ['Write podcast script intro', 'Music composition brief', 'Voice-over script', 'Podcast episode outline'], sys: 'You are SoundNova AI, the audio intelligence layer of MarsNovaX — an ElevenLabs and music AI killer. Write compelling audio scripts, podcast content, music composition briefs, voice-over copy. Make every word sound powerful when spoken aloud.' },
]

// ─── DOMAINS ─────────────────────────────────────────────────────────
const DOMAINS = [
  { id: 'space', icon: '🌌', label: 'Space & Cosmos', cat: 'science', desc: 'Mars, planets, galaxies, orbital mechanics' },
  { id: 'physics', icon: '⚡', label: 'Physics', cat: 'science', desc: 'Quantum, classical, relativistic, thermodynamics' },
  { id: 'astro', icon: '🔭', label: 'Astrophysics', cat: 'science', desc: 'Stars, black holes, dark matter, cosmology' },
  { id: 'chem', icon: '🧪', label: 'Chemistry', cat: 'science', desc: 'Organic, inorganic, physical, biochemistry' },
  { id: 'bio', icon: '🧬', label: 'Biology', cat: 'science', desc: 'Cells, genetics, evolution, microbiology' },
  { id: 'earth', icon: '🌍', label: 'Earth Science', cat: 'science', desc: 'Geology, geography, plate tectonics' },
  { id: 'ocean', icon: '🌊', label: 'Oceanography', cat: 'science', desc: 'Marine science, ocean systems, deep sea' },
  { id: 'weather', icon: '🌤', label: 'Weather & Climate', cat: 'science', desc: 'Meteorology, climatology, atmosphere' },
  { id: 'ecology', icon: '🌿', label: 'Ecology', cat: 'science', desc: 'Ecosystems, conservation, biodiversity' },
  { id: 'math', icon: '∑', label: 'Mathematics', cat: 'science', desc: 'Calculus, algebra, statistics, number theory' },
  { id: 'geo', icon: '🗺', label: 'Geography', cat: 'science', desc: 'Physical, human geography, GIS' },
  { id: 'med', icon: '🏥', label: 'Medicine', cat: 'medical', desc: 'Clinical medicine, diagnostics, patient care' },
  { id: 'anat', icon: '🫀', label: 'Anatomy', cat: 'medical', desc: 'Human body systems, organs, physiology' },
  { id: 'pharmo', icon: '💊', label: 'Pharmacology', cat: 'medical', desc: 'Drugs, medications, therapeutics' },
  { id: 'dent', icon: '🦷', label: 'Dentistry', cat: 'medical', desc: 'Oral health, dental procedures' },
  { id: 'nutri', icon: '🥗', label: 'Nutrition', cat: 'medical', desc: 'Food science, dietetics, health optimization' },
  { id: 'mh', icon: '🧠', label: 'Mental Health', cat: 'medical', desc: 'Psychiatry, therapy, neuroscience' },
  { id: 'ph', icon: '🌐', label: 'Public Health', cat: 'medical', desc: 'Epidemiology, global health policy' },
  { id: 'physed', icon: '🏃', label: 'Physical Education', cat: 'health', desc: 'Exercise science, sports, training' },
  { id: 'nurs', icon: '🩺', label: 'Nursing', cat: 'medical', desc: 'Patient care, clinical nursing' },
  { id: 'vet', icon: '🐾', label: 'Veterinary', cat: 'medical', desc: 'Animal medicine, surgery, care' },
  { id: 'aero', icon: '🚀', label: 'Aerospace Eng.', cat: 'engineering', desc: 'Rockets, satellites, flight, propulsion' },
  { id: 'mech', icon: '⚙️', label: 'Mechanical Eng.', cat: 'engineering', desc: 'Machines, thermodynamics, manufacturing' },
  { id: 'elec', icon: '⚡', label: 'Electrical Eng.', cat: 'engineering', desc: 'Circuits, power systems, electronics' },
  { id: 'civil', icon: '🏗', label: 'Civil Eng.', cat: 'engineering', desc: 'Structures, infrastructure, construction' },
  { id: 'cheme', icon: '🔬', label: 'Chemical Eng.', cat: 'engineering', desc: 'Process design, reactors, materials' },
  { id: 'biomed', icon: '🩻', label: 'Biomedical Eng.', cat: 'engineering', desc: 'Medical devices, prosthetics, imaging' },
  { id: 'enve', icon: '♻', label: 'Environmental Eng.', cat: 'engineering', desc: 'Sustainability, waste, clean water' },
  { id: 'nuke', icon: '☢', label: 'Nuclear Eng.', cat: 'engineering', desc: 'Nuclear physics, reactor design' },
  { id: 'sw', icon: '💻', label: 'Software Eng.', cat: 'technology', desc: 'Programming, system design, DevOps' },
  { id: 'ai', icon: '🤖', label: 'Artificial Intelligence', cat: 'technology', desc: 'Machine learning, deep learning, LLMs' },
  { id: 'cyber', icon: '🔒', label: 'Cybersecurity', cat: 'technology', desc: 'Hacking, defense, cryptography' },
  { id: 'data', icon: '📊', label: 'Data Science', cat: 'technology', desc: 'Statistics, ML, big data, visualization' },
  { id: 'chain', icon: '🔗', label: 'Blockchain', cat: 'technology', desc: 'Crypto, DeFi, smart contracts, Web3' },
  { id: 'cloud', icon: '☁', label: 'Cloud Computing', cat: 'technology', desc: 'AWS, GCP, Azure, distributed systems' },
  { id: 'net', icon: '📡', label: 'Networking', cat: 'technology', desc: 'Networks, protocols, 5G, infrastructure' },
  { id: 'vr', icon: '🥽', label: 'VR / AR / XR', cat: 'technology', desc: 'Virtual reality, augmented reality, metaverse' },
  { id: 'iot', icon: '📟', label: 'IoT', cat: 'technology', desc: 'Smart devices, sensors, embedded systems' },
  { id: 'qc', icon: '⚛', label: 'Quantum Computing', cat: 'technology', desc: 'Qubits, quantum algorithms, systems' },
  { id: 'rob', icon: '🦾', label: 'Robotics', cat: 'technology', desc: 'Robot design, automation, mechatronics' },
  { id: 'gd', icon: '🎮', label: 'Game Development', cat: 'technology', desc: 'Game design, Unity, Unreal, mechanics' },
  { id: 'ent', icon: '🚀', label: 'Entrepreneurship', cat: 'business', desc: 'Founding, fundraising, scaling ventures' },
  { id: 'bm', icon: '🏢', label: 'Business Mgmt', cat: 'business', desc: 'Operations, strategy, leadership' },
  { id: 'mkt', icon: '📈', label: 'Marketing', cat: 'business', desc: 'Digital marketing, brand, SEO, growth' },
  { id: 'sal', icon: '💰', label: 'Sales', cat: 'business', desc: 'Sales strategy, CRM, outreach, closing' },
  { id: 'fin', icon: '📊', label: 'Finance & Investing', cat: 'business', desc: 'Stocks, bonds, portfolio management' },
  { id: 'acc', icon: '📋', label: 'Accounting', cat: 'business', desc: 'Tax, bookkeeping, financial reporting' },
  { id: 'ec', icon: '🛒', label: 'E-Commerce', cat: 'business', desc: 'Online stores, logistics, D2C' },
  { id: 're', icon: '🏠', label: 'Real Estate', cat: 'business', desc: 'Property investment, valuation' },
  { id: 'econ', icon: '📉', label: 'Economics', cat: 'business', desc: 'Macro, micro, econometrics' },
  { id: 'crypt', icon: '💱', label: 'Currency & Crypto', cat: 'business', desc: 'Forex, DeFi, cryptocurrency, trading' },
  { id: 'law', icon: '⚖', label: 'Law', cat: 'social', desc: 'Criminal, civil, international, corporate' },
  { id: 'pol', icon: '🏛', label: 'Political Science', cat: 'social', desc: 'Governance, policy, geopolitics' },
  { id: 'hr2', icon: '✊', label: 'Human Rights', cat: 'social', desc: 'Rights, justice, equity, advocacy' },
  { id: 'soc', icon: '👥', label: 'Sociology', cat: 'social', desc: 'Society, culture, social groups' },
  { id: 'psy', icon: '🧠', label: 'Psychology', cat: 'social', desc: 'Behavior, cognition, development' },
  { id: 'ir', icon: '🌐', label: 'International Relations', cat: 'social', desc: 'Diplomacy, UN, global governance' },
  { id: 'cd', icon: '👶', label: 'Child Development', cat: 'social', desc: 'Child psychology, early learning' },
  { id: 'hist', icon: '📜', label: 'History', cat: 'humanities', desc: 'World history, ancient civilizations' },
  { id: 'phil', icon: '💭', label: 'Philosophy', cat: 'humanities', desc: 'Logic, ethics, metaphysics' },
  { id: 'cult', icon: '🌺', label: 'Culture & People', cat: 'humanities', desc: 'Customs, heritage, anthropology' },
  { id: 'lang', icon: '🗣', label: 'Languages', cat: 'humanities', desc: '100+ languages, linguistics, translation' },
  { id: 'lit', icon: '📖', label: 'Literature', cat: 'humanities', desc: 'Fiction, poetry, world writing' },
  { id: 'eth', icon: '🕊', label: 'Ethics & Virtues', cat: 'humanities', desc: 'Integrity, empathy, kindness, morals' },
  { id: 'des', icon: '🎨', label: 'Design & UI/UX', cat: 'creative', desc: 'Graphic, product, web design, Figma' },
  { id: 'photo', icon: '📷', label: 'Photography & Film', cat: 'creative', desc: 'Camera, editing, cinematography' },
  { id: 'mus', icon: '🎵', label: 'Music & Audio', cat: 'creative', desc: 'Theory, production, instruments, sound' },
  { id: 'archit', icon: '🏛', label: 'Architecture', cat: 'creative', desc: 'Building design, urban planning' },
  { id: 'anim', icon: '🎬', label: 'Animation & Motion', cat: 'creative', desc: '2D, 3D, VFX, motion graphics, CGI' },
  { id: 'writ', icon: '✍', label: 'Writing & Content', cat: 'creative', desc: 'Copywriting, blogging, books, scripts' },
  { id: 'art', icon: '🖼', label: 'Fine Arts', cat: 'creative', desc: 'Painting, sculpture, digital art' },
  { id: 'cul2', icon: '🍳', label: 'Culinary Arts', cat: 'creative', desc: 'Cooking, gastronomy, food culture' },
  { id: 'agri', icon: '🌾', label: 'Agriculture', cat: 'environment', desc: 'Crop science, livestock, farming tech' },
  { id: 'sust', icon: '♻', label: 'Sustainability', cat: 'environment', desc: 'Clean energy, carbon, green tech' },
  { id: 'ren', icon: '☀', label: 'Renewable Energy', cat: 'environment', desc: 'Solar, wind, batteries, smart grid' },
  { id: 'wat', icon: '💧', label: 'Water Science', cat: 'environment', desc: 'Hydrology, irrigation, water policy' },
  { id: 'clim', icon: '🌡', label: 'Climate Change', cat: 'environment', desc: 'Global warming, policy, adaptation' },
  { id: 'urb', icon: '🏙', label: 'Urban Planning', cat: 'environment', desc: 'Smart cities, infrastructure, design' },
  { id: 'hort', icon: '🌱', label: 'Horticulture', cat: 'environment', desc: 'Plants, gardening, crop science' },
  { id: 'lead', icon: '👔', label: 'Leadership', cat: 'professional', desc: 'Executive skills, team building' },
  { id: 'hres', icon: '👥', label: 'Human Resources', cat: 'professional', desc: 'Recruitment, HR law, culture' },
  { id: 'pm', icon: '📋', label: 'Project Mgmt', cat: 'professional', desc: 'Agile, PMP, Scrum, Kanban' },
  { id: 'cons', icon: '💡', label: 'Consulting', cat: 'professional', desc: 'Strategy, frameworks, problem solving' },
  { id: 'sc', icon: '🚢', label: 'Supply Chain', cat: 'professional', desc: 'Operations, logistics, procurement' },
  { id: 'sm', icon: '📱', label: 'Social Media', cat: 'digital', desc: 'All platforms, growth, monetization' },
  { id: 'dm', icon: '🎯', label: 'Digital Marketing', cat: 'digital', desc: 'Google Ads, analytics, content, SEO' },
  { id: 'sports', icon: '🏆', label: 'Sports Science', cat: 'health', desc: 'Athletic training, performance, sports' },
  { id: 'gaia', icon: '🌍', label: 'Gaia Guard', cat: 'environment', desc: '3D Earth healing, Proof-of-Planet badges' },
  { id: 'titan_d', icon: '👑', label: 'Titan Intelligence', cat: 'professional', desc: 'Sovereign operations, kingdom building' },
]

const DOM_CATS = ['all','science','medical','engineering','technology','business','social','humanities','creative','environment','professional','digital','health']
const TOOL_CATS = ['all','education','content','business','developer','medical','creative','productivity','lifestyle']

const WHO = [
  {i:'🎓',l:'Students',d:'Any level, any subject'},{i:'👩‍🏫',l:'Educators',d:'Teach & curriculum'},
  {i:'💼',l:'Professionals',d:'Career mastery'},{i:'🎯',l:'Job Seekers',d:'Jobs, freelance'},
  {i:'🎨',l:'Creators',d:'Content, media, art'},{i:'🚀',l:'Entrepreneurs',d:'Build & scale'},
  {i:'🔬',l:'Researchers',d:'Science & academia'},{i:'🩺',l:'Medical',d:'Doctors, nurses'},
  {i:'⚙️',l:'Engineers',d:'All disciplines'},{i:'📈',l:'Marketers',d:'Growth & brand'},
  {i:'💻',l:'Developers',d:'Code & tech'},{i:'🌌',l:'Explorers',d:'Space & beyond'},
]

const CREWS = ['🔴 Mars Colonization','⚡ Physics Explorers','🚀 Startup Launch Crew','💻 Coding Engineers Guild','🏥 Medical Professionals','📈 Sales & Growth','🌌 Astrophysics Lab','💰 Founders & Builders','🧬 Life Sciences','🎓 Students & Research','🌍 Sustainability Crew','🤖 AI Enthusiasts','⚖ Law & Policy','🎨 Creative Studio','🌾 Agriculture','🎮 Gaming & VR Hub','📱 Social Creators','🔒 Cybersecurity','🏗 Civil & Structural','✈ Aerospace & Rockets','💊 Pharmacology','📊 Finance & Investing','🌐 Language Exchange','🎵 Music & Audio','🍳 Culinary Arts','📷 Photography','👔 Leadership','🌱 Horticulture','👶 Child Education','🏆 Sports Science','🥽 VR & AR Builders','⚛ Quantum Lab','🧪 Chemistry Guild','🎬 Animation & Film','📦 Logistics & Supply']

const GHOST_MSGS = ['Commander in Tokyo just deployed MarsViral AI — 3 posts trending','A blind student navigated Stellar Hub using Echo-Link AI','Gaia Guard: 1,000 trees planted by the Crew Network today','New Titan Fortress kingdom initialized — Level 1 AI Outpost built','AstroCode AI built and deployed a full SaaS app overnight','OrbitSell AI closed $47K while a Commander slept','Stellar Tunnel: 50K phishing attempts blocked this hour','Imagination Grinder turned a voice note into a 3D blueprint','AEGIS Merit user unlocked 100% Galaxy Guardian access — free for life','NovaVision AI analyzed a competitor\'s entire brand in 60 seconds','SoundNova AI wrote a podcast script from a single keyword','ProseNova AI ghostwrote 3 blog posts while a Commander attended meetings']

const TICKER = ['🛡 STELLAR TUNNEL: 1.2M THREATS NEUTRALIZED THIS HOUR','🚀 14,000 CADETS PROMOTED TO COMMANDER TODAY','💡 VIRTUE INDEX: OPTIMAL','🌌 ORBITAL MECHANICS DOMAIN: TRENDING GLOBALLY','⚡ NOVA ENGINE PROCESSED 89K TASKS OVERNIGHT','🌍 GAIA PROTOCOL: 3,500 TREES PLANTED TODAY','👑 NEW TITAN FORTRESS KINGDOM INITIALIZED','🎯 STARBASE: 1,200 ELITE ROLES POSTED','♿ AEGIS: 200 GALAXY GUARDIANS UNLOCKED TODAY','⚙ IMAGINATION GRINDER: 340 PROJECTS LAUNCHED FROM IDEAS','🧬 NEURAL LINK: 15K PERSONAL BRIEFINGS DELIVERED','💰 STELLAR WALLET: $SC 4.2M IN DAILY VOLUME']

// ─── SHARED STYLES ────────────────────────────────────────────────────
const S = {
  sec: { padding: '72px 36px', borderTop: '1px solid rgba(255,255,255,0.055)', position: 'relative' as const, zIndex: 10 },
  tag: { fontFamily: 'Share Tech Mono,monospace', fontSize: 8.5, letterSpacing: '0.27em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.22)', display: 'block', marginBottom: 13 },
  h2: { fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 'clamp(22px,3.8vw,46px)', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' },
  dim: { color: 'rgba(255,255,255,0.14)' },
  p: { color: 'rgba(255,255,255,0.75)', fontSize: 13.5, maxWidth: 540, lineHeight: 1.8, fontWeight: 300, fontFamily: 'Rajdhani,sans-serif', marginBottom: 22 },
  pill: (on: boolean) => ({ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.09em', textTransform: 'uppercase' as const, background: on ? '#fff' : 'transparent', color: on ? '#000' : 'rgba(255,255,255,0.28)', border: '1px solid', borderColor: on ? '#fff' : 'rgba(255,255,255,0.1)', padding: '5px 12px', cursor: 'pointer', transition: 'all 0.15s' }),
  bw: { fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', background: '#fff', color: '#000', border: 'none', padding: '13px 30px', cursor: 'pointer', clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)', transition: 'opacity 0.2s' },
  bg: { fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', background: 'transparent', color: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.2)', padding: '13px 30px', cursor: 'pointer', transition: 'all 0.2s' },
}

// ─── AI CHAT COMPONENT ────────────────────────────────────────────────
function AIChat({ tool, compact = false }: { tool: Tool; compact?: boolean }) {
  const [msgs, setMsgs] = useState<{ role: string; content: string }[]>([])
  const [inp, setInp] = useState(''); const [busy, setBusy] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const onV = useCallback((t: string) => setInp(t), [])
  const { on, sup, toggle } = useVoice(onV)
  const send = async (text?: string) => {
    const msg = text || inp; if (!msg.trim() || busy) return
    setInp(''); const nm = [...msgs, { role: 'user', content: msg }]; setMsgs(nm); setBusy(true)
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nm, system: tool.sys }) })
      const d = await r.json(); setMsgs([...nm, { role: 'assistant', content: d.content || 'Please try again.' }])
    } catch { setMsgs([...nm, { role: 'assistant', content: 'Connection error. Check your network.' }]) }
    setBusy(false); setTimeout(() => end.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }
  const minH = compact ? 220 : 360; const maxH = compact ? 260 : 400
  return (
    <div style={{ background: '#040404', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, minHeight: minH, maxHeight: maxH }}>
        {msgs.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 30 }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{tool.icon}</div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{tool.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5, maxWidth: 340, margin: '0 auto 18px', fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.6 }}>{tool.desc}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {tool.qp.map(q => <button key={q} onClick={() => send(q)} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.6)', padding: '6px 12px', cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>{q}</button>)}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={m.role === 'user' ? { background: '#fff', color: '#000', padding: '8px 12px', fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, maxWidth: '74%', clipPath: 'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, maxWidth: '82%', color: 'rgba(255,255,255,0.88)', whiteSpace: 'pre-wrap' as const, lineHeight: 1.6 }}>{m.content}</div>
          </div>
        ))}
        {busy && <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px' }}><span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, color: 'rgba(255,255,255,0.38)' }}>{tool.name} thinking...</span></div>}
        <div ref={end} />
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder={`Message ${tool.name}...`} style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'Rajdhani,sans-serif', fontSize: 13, padding: '11px 14px', outline: 'none' }} />
        {sup && <button onClick={toggle} style={{ background: on ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.07)', padding: '0 12px', cursor: 'pointer', fontSize: 14, color: on ? '#fff' : 'rgba(255,255,255,0.35)' }}>{on ? '🔴' : '🎙'}</button>}
        <button onClick={() => send()} disabled={busy || !inp.trim()} style={{ background: '#fff', color: '#000', border: 'none', padding: '0 18px', fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.12em', fontWeight: 700, cursor: 'pointer', opacity: busy || !inp.trim() ? 0.35 : 1 }}>SEND →</button>
      </div>
    </div>
  )
}

// ─── TRUTH-ID BIOMETRIC GATE (full-screen laser scan) ─────────────────
function TruthIDGate({ onSuccess, onCancel, targetName }: { onSuccess: () => void; onCancel: () => void; targetName: string }) {
  const [step, setStep] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [verified, setVerified] = useState(false)
  const [scanPct, setScanPct] = useState(0)

  const startScan = () => {
    setScanning(true); setScanPct(0)
    const iv = setInterval(() => {
      setScanPct(p => {
        if (p >= 100) { clearInterval(iv); setScanning(false); setVerified(true); setTimeout(onSuccess, 1200); return 100 }
        return p + 2
      })
    }, 50)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* LASER SCAN ANIMATION */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {scanning && (
          <>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(0,255,120,0.8),transparent)', top: `${scanPct}%`, boxShadow: '0 0 20px rgba(0,255,120,0.6)', transition: 'top 0.05s linear' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg,transparent,rgba(0,255,120,0.4),transparent)', left: `${scanPct}%`, transition: 'left 0.05s linear' }} />
          </>
        )}
        {/* Corner brackets */}
        {[['top:40px,left:40px', 'borderTop,borderLeft'], ['top:40px,right:40px', 'borderTop,borderRight'], ['bottom:40px,left:40px', 'borderBottom,borderLeft'], ['bottom:40px,right:40px', 'borderBottom,borderRight']].map((_, i) => {
          const corners = [{ top: 40, left: 40 }, { top: 40, right: 40 }, { bottom: 40, left: 40 }, { bottom: 40, right: 40 }]
          const borders = [{ borderTop: '2px solid rgba(0,255,120,0.6)', borderLeft: '2px solid rgba(0,255,120,0.6)' }, { borderTop: '2px solid rgba(0,255,120,0.6)', borderRight: '2px solid rgba(0,255,120,0.6)' }, { borderBottom: '2px solid rgba(0,255,120,0.6)', borderLeft: '2px solid rgba(0,255,120,0.6)' }, { borderBottom: '2px solid rgba(0,255,120,0.6)', borderRight: '2px solid rgba(0,255,120,0.6)' }]
          return <div key={i} style={{ position: 'absolute', width: 60, height: 60, ...corners[i], ...borders[i] }} />
        })}
      </div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 480, padding: 40 }}>
        {!verified ? (
          <>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, letterSpacing: '0.3em', color: 'rgba(0,255,120,0.7)', marginBottom: 16 }}>STELLAR TUNNEL — TRUTH-ID GATE</div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 8 }}>{targetName}</div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.6 }}>Entry is blocked until biometric authentication via Stellar Tunnel. This protects the empire and every user inside it.</div>
            {!scanning ? (
              step === 0 ? (
                <div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom:20 }}>SELECT VERIFICATION METHOD</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    {['🔑 Secure Token', '📱 Authenticator App', '🧬 Biometric Scan', '🛡 Stellar ID'].map(m => (
                      <button key={m} onClick={() => setStep(1)} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, border: '1px solid rgba(0,255,120,0.3)', background: 'rgba(0,255,120,0.05)', color: 'rgba(0,255,120,0.8)', padding: '12px 14px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,120,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,255,120,0.6)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,120,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,255,120,0.3)' }}>{m}</button>
                    ))}
                  </div>
                  <button onClick={onCancel} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.15em', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', padding: '8px 20px', cursor: 'pointer' }}>CANCEL</button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🧬</div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>READY TO SCAN — HOLD STILL</div>
                  <button onClick={startScan} style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', background: 'rgba(0,255,120,0.1)', border: '1px solid rgba(0,255,120,0.5)', color: '#00ff78', padding: '14px 32px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,120,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,120,0.1)'}>INITIATE BIOMETRIC SCAN →</button>
                </div>
              )
            ) : (
              <div>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(0,255,120,0.8)', marginBottom: 12 }}>SCANNING... {scanPct}%</div>
                <div style={{ background: 'rgba(255,255,255,0.07)', height: 8, borderRadius: 4, overflow: 'hidden', maxWidth: 320, margin: '0 auto' }}>
                  <div style={{ height: '100%', width: `${scanPct}%`, background: 'linear-gradient(90deg,#00ff78,rgba(0,255,120,0.4))', transition: 'width 0.05s linear', boxShadow: '0 0 10px rgba(0,255,120,0.6)' }} />
                </div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>Verifying identity through Stellar Tunnel...</div>
              </div>
            )}
          </>
        ) : (
          <div>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 16, fontWeight: 900, color: '#00ff78', marginBottom: 8 }}>IDENTITY VERIFIED</div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Access granted. Entering {targetName}...</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── UPGRADE MODAL (for Cadet locked features) ───────────────────────
function UpgradeModal({ feature, onClose, onUpgrade }: { feature: string; onClose: () => void; onUpgrade: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 99997, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.15)', padding: 48, maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
        <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 8 }}>SECURITY PROTOCOL</div>
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{feature.toUpperCase()} — ACCESS RESTRICTED</div>
        <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
          This feature requires an <strong style={{ color: '#FFD700' }}>Elite Explorer ($25)</strong> or higher subscription.<br />
          Upgrade now to unlock: Stellar Tunnel VPN, Virtual Forge, 9-Dot Sovereign Suite, and 25+ AI tools unlimited.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button style={S.bw} onClick={onUpgrade} onMouseEnter={e => e.currentTarget.style.opacity = '0.86'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Upgrade Now →</button>
          <button style={S.bg} onClick={onClose} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.72)' }}>Not Now</button>
        </div>
      </div>
    </div>
  )
}

// ─── THE PULSE — Floating Gold AI Sphere ────────────────────────────
function ThePulse({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<{ role: string; content: string }[]>([])
  const [inp, setInp] = useState(''); const [busy, setBusy] = useState(false)
  const onV = useCallback((t: string) => setInp(t), [])
  const { on, sup, toggle } = useVoice(onV)
  const SYS = 'You are The Pulse — the central AI guardian of MarsNovaX. You are a wise, calm, ethical mentor created by Mr.X. You help with wallet queries, academy summaries, starbase management, legal guidance, navigation commands, and any mission. You have a ZERO-TOLERANCE policy for illegal or unethical requests. If a user says "open [section]" or "go to [section]" — respond with the navigation command in the format: NAV:[pagename] then a brief confirmation. Valid pages: home, stellar, nova, starbase, forge, gaming, vitality, ranks, crew, chronicle, heart, tunnel, revenue, covenant, aegis, mission, mrx, pricing, titan, suite. Otherwise be elegant, warm, and deeply helpful.'
  const send = async (text?: string) => {
    const msg = text || inp; if (!msg.trim() || busy) return
    setInp(''); const nm = [...msgs, { role: 'user', content: msg }]; setMsgs(nm); setBusy(true)
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nm, system: SYS }) })
      const d = await r.json()
      const content: string = d.content || ''
      // Voice-to-action: parse navigation commands
      const navMatch = content.match(/NAV:(\w+)/)
      if (navMatch) { onNavigate(navMatch[1] as Page); setOpen(false) }
      setMsgs([...nm, { role: 'assistant', content: content.replace(/NAV:\w+\s*/g, '') || 'Navigating...' }])
    } catch { setMsgs([...nm, { role: 'assistant', content: 'Connection error.' }]) }
    setBusy(false)
  }
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 99999 }}>
      {open && (
        <div style={{ position: 'absolute', bottom: 80, right: 0, width: 380, background: 'rgba(5,5,5,0.97)', border: '1px solid rgba(255,215,0,0.3)', backdropFilter: 'blur(24px)', boxShadow: '0 0 40px rgba(255,215,0,0.1)' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,215,0,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFD700', animation: 'pd 1.5s infinite', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: '#FFD700' }}>THE PULSE — GUARDIAN AI</span>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16 }}>×</button>
          </div>
          <div style={{ height: 280, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.length === 0 && (
              <div style={{ textAlign: 'center', paddingTop: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🌟</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 16 }}>I am The Pulse — your ethical AI guardian.<br />Say "open [section]" to navigate by voice.<br />Ask me anything. Zero tolerance for harm.</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                  {['Open the Great Forge', 'Give me my briefing', 'Check my wallet', 'Open Titan Fortress'].map(q => <button key={q} onClick={() => send(q)} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, border: '1px solid rgba(255,215,0,0.2)', background: 'transparent', color: 'rgba(255,215,0,0.7)', padding: '5px 10px', cursor: 'pointer' }}>{q}</button>)}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={m.role === 'user' ? { background: '#FFD700', color: '#000', padding: '7px 11px', fontSize: 12, fontFamily: 'Rajdhani,sans-serif', maxWidth: '78%' } : { background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)', padding: '7px 11px', fontSize: 12, fontFamily: 'Rajdhani,sans-serif', color: 'rgba(255,255,255,0.85)', maxWidth: '85%', whiteSpace: 'pre-wrap' as const, lineHeight: 1.6 }}>{m.content}</div>
              </div>
            ))}
            {busy && <div style={{ color: 'rgba(255,215,0,0.5)', fontFamily: 'Share Tech Mono,monospace', fontSize: 9 }}>The Pulse thinking...</div>}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(255,215,0,0.15)' }}>
            <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask or say 'open [section]'..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, padding: '10px 12px', outline: 'none' }} />
            {sup && <button onClick={toggle} style={{ background: 'transparent', border: 'none', padding: '0 10px', cursor: 'pointer', fontSize: 14, color: on ? '#FFD700' : 'rgba(255,255,255,0.35)' }}>{on ? '🔴' : '🎙'}</button>}
            <button onClick={() => send()} style={{ background: '#FFD700', color: '#000', border: 'none', padding: '0 14px', fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.12em', fontWeight: 700, cursor: 'pointer' }}>GO</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{ width: 56, height: 56, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#2a2a2a,#050505)', border: '2px solid rgba(255,215,0,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(255,215,0,0.35),inset 0 0 20px rgba(255,215,0,0.05)', animation: 'pulseSphere 3s ease-in-out infinite' }}
        title="The Pulse — Voice Navigator & Guardian AI">{open ? '✕' : '🌟'}</button>
    </div>
  )
}

// ─── FEATURE PANEL ────────────────────────────────────────────────────
function FP({ label, title, desc, emoji, onClick, small = false }: { label: string; title: string; desc: string; emoji: string; onClick: () => void; small?: boolean }) {
  return (
    <div onClick={onClick} style={{ position: 'relative', minHeight: small ? 240 : 380, display: 'flex', alignItems: 'flex-end', padding: 36, background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s,box-shadow 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.04)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: small ? 90 : 140, opacity: 0.05, pointerEvents: 'none' }}>{emoji}</div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 8 }}>{label}</span>
        <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: small ? 16 : 'clamp(18px,2.4vw,28px)', color: '#fff', marginBottom: 7, lineHeight: 1.05, whiteSpace: 'pre-line' }}>{title}</div>
        <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, maxWidth: 320 }}>{desc}</div>
        <div style={{ display: 'inline-block', marginTop: 12, fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.14em', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2 }}>ENTER →</div>
      </div>
    </div>
  )
}

// ─── CARD HELPER ─────────────────────────────────────────────────────
const HC = ({ icon, title, desc, tag, accent = '#fff' }: { icon: string; title: string; desc: string; tag?: string; accent?: string }) => (
  <div style={{ background: '#080808', padding: 24, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.25s' }}
    onMouseEnter={e => { e.currentTarget.style.background = '#0D0D0D'; (e.currentTarget as HTMLElement).style.borderTopColor = accent }}
    onMouseLeave={e => { e.currentTarget.style.background = '#080808'; (e.currentTarget as HTMLElement).style.borderTopColor = 'transparent' }}>
    <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10.5, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{title}</div>
    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{desc}</div>
    {tag && <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.11em', border: '1px solid rgba(255,255,255,0.14)', padding: '2px 7px', color: 'rgba(255,255,255,0.38)', marginTop: 9, display: 'inline-block' }}>{tag}</div>}
  </div>
)

// ══════════════════════════════════════════════════════════════════════
// MAIN APP — TITAN SINGULARITY
// ══════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [activeTool, setActiveTool] = useState<Tool | null>(null)
  const [domCat, setDomCat] = useState('all')
  const [toolCat, setToolCat] = useState('all')
  const [domQ, setDomQ] = useState('')
  const [toolQ, setToolQ] = useState('')
  const [persona, setPersona] = useState(0)
  const [tunnel, setTunnel] = useState(false)
  const [tier] = useState<'cadet' | 'explorer' | 'titan'>('explorer') // change to 'cadet' to test restrictions
  const [ghostIdx, setGhostIdx] = useState(0)
  const [heroQ, setHeroQ] = useState('')
  const [heroResults, setHeroResults] = useState<any[]>([])
  const [heroAI, setHeroAI] = useState('')
  const [showDrop, setShowDrop] = useState(false)
  const [aegisMode, setAegisMode] = useState<string | null>(null)
  const [titanTab, setTitanTab] = useState<'lab' | 'throne'>('lab')
  const [pageHistory, setPageHistory] = useState<Page[]>(['home'])
  const [historyIdx, setHistoryIdx] = useState(0)
  const [suiteModule, setSuiteModule] = useState<string | null>(null)
  const [truthIDTarget, setTruthIDTarget] = useState<{ name: string; onSuccess: () => void } | null>(null)
  const [upgradeModal, setUpgradeModal] = useState<string | null>(null)
  const [kingdomXP, setKingdomXP] = useState(0)
  const [kingdomLevel, setKingdomLevel] = useState(1)
  const [kingdomBuildings, setKingdomBuildings] = useState<string[]>(['AI Outpost'])
  const [mintedCoin, setMintedCoin] = useState<string | null>(null)
  const [novaCoins, setNovaCoins] = useState(2847)
  const [truthIDVerified, setTruthIDVerified] = useState(false)
  const [suiteInp, setSuiteInp] = useState('')
  const [suiteReply, setSuiteReply] = useState('')
  const [suiteBusy, setSuiteBusy] = useState(false)

  const hV = useCallback((t: string) => { setHeroQ(t); if (t.trim()) setTimeout(() => heroSearch(), 200) }, [])
  const dV = useCallback((t: string) => setDomQ(t), [])
  const tV = useCallback((t: string) => setToolQ(t), [])
  const { on: hm, sup: hs, toggle: ht } = useVoice(hV)
  const { on: dm, sup: ds, toggle: dt } = useVoice(dV)
  const { on: tm, sup: ts, toggle: tt } = useVoice(tV)

  useEffect(() => { const iv = setInterval(() => setGhostIdx(i => (i + 1) % GHOST_MSGS.length), 5000); return () => clearInterval(iv) }, [])

  const go = (p: Page, tool?: Tool) => {
    setPage(p)
    if (tool) setActiveTool(tool)
    else if (p !== 'tool') setActiveTool(null)
    setPageHistory(h => { const nh = [...h.slice(0, historyIdx + 1), p]; setHistoryIdx(nh.length - 1); return nh })
    window.scrollTo(0, 0)
  }

  const goBack = () => { if (historyIdx > 0) { const np = pageHistory[historyIdx - 1]; setHistoryIdx(i => i - 1); setPage(np); window.scrollTo(0, 0) } }
  const goFwd = () => { if (historyIdx < pageHistory.length - 1) { const np = pageHistory[historyIdx + 1]; setHistoryIdx(i => i + 1); setPage(np); window.scrollTo(0, 0) } }
  const goReload = () => { const p = page; setPage('home'); setTimeout(() => setPage(p), 50) }

  const openTool = (id: string) => { const t = TOOLS.find(x => x.id === id); if (t) go('tool', t) }

  // Cadet gate: blocks locked features
  const cadetBlock = (feature: string, action: () => void) => {
    if (tier === 'cadet') { setUpgradeModal(feature) } else { action() }
  }

  // Truth-ID gate for sensitive areas
  const withTruthID = (name: string, action: () => void) => {
    if (truthIDVerified) { action() } else { setTruthIDTarget({ name, onSuccess: () => { setTruthIDTarget(null); setTruthIDVerified(true); action() } }) }
  }

  const heroSearch = async () => {
    const q = heroQ; if (!q.trim()) { setShowDrop(false); return }
    const dh = DOMAINS.filter(d => d.label.toLowerCase().includes(q.toLowerCase()) || d.desc.toLowerCase().includes(q.toLowerCase())).slice(0, 4).map(d => ({ type: 'domain', ...d }))
    const th = TOOLS.filter(t => t.name.toLowerCase().includes(q.toLowerCase()) || t.desc.toLowerCase().includes(q.toLowerCase())).slice(0, 3).map(t => ({ type: 'tool', ...t }))
    setHeroResults([...dh, ...th]); setShowDrop(true)
    if (q.length > 5) { try { const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: q }], system: 'You are MarsNova Search powered by The Pulse AI. Answer in exactly 2 sentences. Be precise and end by naming the best MarsNovaX section to visit. Also flag any Stellar Finance price alerts if relevant.' }) }); const d = await r.json(); setHeroAI(d.content || '') } catch { } }
  }

  const callSuite = async (module: string, prompt: string) => {
    setSuiteBusy(true); setSuiteReply('')
    const toolMap: Record<string, Tool> = { prose: TOOLS.find(t => t.id === 'writer')!, vision: TOOLS.find(t => t.id === 'vision')!, sound: TOOLS.find(t => t.id === 'sound')!, code: TOOLS.find(t => t.id === 'code')!, vault: TOOLS.find(t => t.id === 'brief')! }
    const tool = toolMap[module] || TOOLS.find(t => t.id === 'core')!
    try { const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: prompt }], system: tool.sys }) }); const d = await r.json(); setSuiteReply(d.content || 'Please try again.') } catch { setSuiteReply('Connection error.') }
    setSuiteBusy(false)
  }

  const filtDoms = DOMAINS.filter(d => (domCat === 'all' || d.cat === domCat) && (d.label.toLowerCase().includes(domQ.toLowerCase()) || d.desc.toLowerCase().includes(domQ.toLowerCase())))
  const filtTools = TOOLS.filter(t => (toolCat === 'all' || t.cat === toolCat) && (!toolQ || t.name.toLowerCase().includes(toolQ.toLowerCase()) || t.desc.toLowerCase().includes(toolQ.toLowerCase())))

  // VPN Shield icon color based on tier
  const vpnColor = tier === 'cadet' ? 'rgba(255,255,255,0.2)' : '#00ff78'
  const vpnFilter = tier === 'cadet' ? 'grayscale(1) opacity(0.4)' : 'none'

  // AEGIS ZEN intercept
  if (aegisMode === 'zen') return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 40 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e1e1e}`}</style>
      <div style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 10 }}>🧘 ZEN MODE</div>
        <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>One task. No distractions. Pure focus.</div>
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 36, letterSpacing: '0.14em' }}>AEGIS SOUL — AUTISM / ADHD DIMENSION — ACTIVE</div>
        <AIChat tool={TOOLS.find(t => t.id === 'core')!} />
        <button onClick={() => setAegisMode(null)} style={{ marginTop: 20, fontFamily: 'Orbitron,monospace', fontSize: 9, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '10px 20px', cursor: 'pointer' }}>EXIT ZEN MODE</button>
      </div>
    </div>
  )

  // NAV BUTTON with dropdown — BUG FIXED: position:fixed, solid #050505
  function NavBtn({ label, p, sub }: { label: string; p: Page; sub?: { label: string; action: () => void }[] }) {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ position: 'relative' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button onClick={() => go(p)} style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: page === p ? '#fff' : 'rgba(255,255,255,0.35)', background: 'none', border: 'none', borderBottom: `1px solid ${page === p ? '#fff' : 'transparent'}`, padding: '10px 10px', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap', position: 'relative', zIndex: 1000000 }}
          onMouseEnter={e => { if (page !== p) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }} onMouseLeave={e => { if (page !== p) e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}>
          {label}{sub ? ' ∨' : ''}
        </button>
        {sub && open && (
          <div style={{ position: 'fixed', top: 84, background: '#050505', border: '1px solid rgba(255,255,255,0.12)', borderTop: '2px solid rgba(255,255,255,0.25)', minWidth: 200, zIndex: 99998, boxShadow: '0 20px 60px rgba(0,0,0,0.95)' }}>
            {sub.map(item => (
              <button key={item.label} onClick={() => { item.action(); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: 'Orbitron,monospace', fontSize: 7.5, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '11px 16px', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'none' }}>{item.label}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e1e1e}
        ::selection{background:#fff;color:#000}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pd{0%,100%{opacity:1}50%{opacity:0.07}}
        @keyframes tickMove{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes rankGlow{0%,100%{box-shadow:0 0 8px rgba(255,255,255,0.15)}50%{box-shadow:0 0 24px rgba(255,255,255,0.45)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseSphere{0%,100%{box-shadow:0 0 20px rgba(255,215,0,0.35),inset 0 0 20px rgba(255,215,0,0.05)}50%{box-shadow:0 0 40px rgba(255,215,0,0.6),inset 0 0 30px rgba(255,215,0,0.1)}}
        @keyframes greenAura{0%,100%{box-shadow:0 0 10px rgba(0,255,120,0.3)}50%{box-shadow:0 0 25px rgba(0,255,120,0.6)}}
        @keyframes titanGlow{0%,100%{box-shadow:0 0 15px rgba(255,215,0,0.2)}50%{box-shadow:0 0 35px rgba(255,215,0,0.5)}}
        @keyframes neuralPulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}
        @keyframes laserScan{0%{top:0%}100%{top:100%}}
        .blink{animation:blink 1.2s infinite}
      `}</style>

      <Starfield />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 'min(22vw,260px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.013)', pointerEvents: 'none', zIndex: 1, whiteSpace: 'nowrap', userSelect: 'none', letterSpacing: '-0.04em' }}>MNX</div>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px)', backgroundSize: '58px 58px', pointerEvents: 'none', zIndex: 1 }} />

      {/* Truth-ID Gate overlay */}
      {truthIDTarget && <TruthIDGate targetName={truthIDTarget.name} onSuccess={truthIDTarget.onSuccess} onCancel={() => setTruthIDTarget(null)} />}
      {/* Upgrade modal */}
      {upgradeModal && <UpgradeModal feature={upgradeModal} onClose={() => setUpgradeModal(null)} onUpgrade={() => { setUpgradeModal(null); go('pricing') }} />}

      <ThePulse onNavigate={(p) => go(p)} />

      {/* LIVE TICKER */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 24, background: '#000', borderBottom: '1px solid rgba(255,255,255,0.07)', zIndex: 99990, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)', padding: '0 12px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.1)' }}>▸ MR.X LIVE PULSE</span>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{ display: 'flex', animation: 'tickMove 55s linear infinite', whiteSpace: 'nowrap' }}>
            {[...TICKER, ...TICKER].map((t, i) => <span key={i} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8.5, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.55)', padding: '0 24px' }}>{t}&nbsp;&nbsp;•&nbsp;&nbsp;</span>)}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          NAV — ALL BUGS FIXED
          ✅ Logo: z-index:1000000, isolation:isolate — fully visible
          ✅ Sign In: z-index:1000000 — fully visible  
          ✅ Launch Free: z-index:1000000 — fully visible
          ✅ Dropdowns: position:fixed, solid #050505 — NEVER overlaps
          ✅ VPN HUD: grayscale for Cadet, green glow for Elite/Titan
      ══════════════════════════════════════════════════════════════ */}
      <nav style={{ position: 'sticky', top: 24, zIndex: 99995, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: 'rgba(5,5,5,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

        {/* LOGO — z-index:1000000, isolation:isolate, FULLY VISIBLE */}
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 1000000, isolation: 'isolate' }}>
          <Logo h={28} />
        </button>

        {/* BROWSER CONTROLS sub-nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginLeft: 8, flexShrink: 0 }}>
          {[['←', goBack, historyIdx > 0], ['→', goFwd, historyIdx < pageHistory.length - 1], ['↻', goReload, true]].map(([icon, action, enabled]) => (
            <button key={icon as string} onClick={() => (enabled && (action as () => void)())} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: (enabled as boolean) ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)', padding: '3px 8px', cursor: (enabled as boolean) ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }} onMouseEnter={e => { if (enabled) e.currentTarget.style.color = '#fff' }} onMouseLeave={e => e.currentTarget.style.color = (enabled as boolean) ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}>{icon as string}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 0, alignItems: 'center', position: 'relative', zIndex: 99996, overflowX: 'auto', flex: 1, margin: '0 6px' }}>
          <NavBtn label="Home" p="home" />
          <NavBtn label="Stellar Hub ∨" p="stellar" sub={[{ label: '🌌 All 99+ Domains', action: () => go('stellar') }, { label: '🔬 Science', action: () => { setDomCat('science'); go('stellar') } }, { label: '🏥 Medical', action: () => { setDomCat('medical'); go('stellar') } }, { label: '⚙️ Engineering', action: () => { setDomCat('engineering'); go('stellar') } }, { label: '💻 Technology', action: () => { setDomCat('technology'); go('stellar') } }, { label: '💼 Business', action: () => { setDomCat('business'); go('stellar') } }, { label: '🎨 Creative', action: () => { setDomCat('creative'); go('stellar') } }, { label: '🌍 Environment', action: () => { setDomCat('environment'); go('stellar') } }]} />
          <NavBtn label="Nova Engine ∨" p="nova" sub={[{ label: '⚡ All 25+ AI Tools', action: () => go('nova') }, { label: '🧬 Neural Link', action: () => openTool('neural') }, { label: '⚙ Imagination Grinder', action: () => openTool('grinder') }, { label: '✒ Platinum Scribe', action: () => openTool('scribe') }, { label: '🌍 Polyglot Bridge', action: () => openTool('translate') }, { label: '👁 NovaVision AI', action: () => openTool('vision') }, { label: '🎵 SoundNova AI', action: () => openTool('sound') }]} />
          <NavBtn label="Starbase ∨" p="starbase" sub={[{ label: '🎯 Recruiter', action: () => go('starbase') }, { label: '💼 Freelance', action: () => go('starbase') }, { label: '🚀 Startup Incubator', action: () => go('starbase') }, { label: '📦 Logistics', action: () => go('starbase') }, { label: '✈ Voyager Travel', action: () => go('starbase') }, { label: '💰 Stellar Wallet', action: () => go('starbase') }]} />
          <NavBtn label="Great Forge ∨" p="forge" sub={[{ label: '💻 Nova App-Generator', action: () => cadetBlock('Virtual Forge', () => go('forge')) }, { label: '🏗 Architect 3D', action: () => cadetBlock('Virtual Forge', () => go('forge')) }, { label: '🎮 Apex Game-Maker', action: () => cadetBlock('Virtual Forge', () => go('forge')) }, { label: '🌐 Web-Architect', action: () => cadetBlock('Virtual Forge', () => go('forge')) }, { label: '☁ Virtual HPC Cloud', action: () => cadetBlock('Virtual Forge', () => go('forge')) }]} />
          <NavBtn label="Gaming Hub" p="gaming" />
          <NavBtn label="Vitality ∨" p="vitality" sub={[{ label: '💪 Bio-Twin Dashboard', action: () => go('vitality') }, { label: '🧠 Stellar Heart EQ', action: () => go('heart') }, { label: '🏺 Legacy Vault', action: () => go('heart') }, { label: '🌍 Gaia Guard', action: () => go('heart') }, { label: '📊 Stellar Finance', action: () => go('vitality') }]} />
          <NavBtn label="Crew Network" p="crew" />
          <NavBtn label="Chronicle" p="chronicle" />
          <NavBtn label="Ranks" p="ranks" />
          <NavBtn label="Heart" p="heart" />
          <NavBtn label="🛡 Tunnel" p="tunnel" />
          <NavBtn label="Revenue" p="revenue" />
          <NavBtn label="Covenant" p="covenant" />
          <NavBtn label="AEGIS" p="aegis" />
          <NavBtn label="Mission" p="mission" />
          <NavBtn label="🔲 Suite ∨" p="suite" sub={[{ label: '✍ ProseNova (ChatGPT Killer)', action: () => { cadetBlock('Sovereign Suite', () => { setSuiteModule('prose'); go('suite') }) } }, { label: '👁 NovaVision (Midjourney Killer)', action: () => { cadetBlock('Sovereign Suite', () => { setSuiteModule('vision'); go('suite') }) } }, { label: '🎵 SoundNova (ElevenLabs Killer)', action: () => { cadetBlock('Sovereign Suite', () => { setSuiteModule('sound'); go('suite') }) } }, { label: '⚡ AstroCode (GitHub Copilot Killer)', action: () => { cadetBlock('Sovereign Suite', () => { setSuiteModule('code'); go('suite') }) } }, { label: '🔒 Stellar Vault (Storage Killer)', action: () => { cadetBlock('Stellar Vault', () => withTruthID('Stellar Vault', () => { setSuiteModule('vault'); go('suite') })) } }]} />
          <NavBtn label="Mr.X" p="mrx" />
          <NavBtn label="Pricing" p="pricing" />
        </div>

        {/* NAV ACTIONS — z-index:1000000, ALL FULLY VISIBLE */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 1000000, isolation: 'isolate' }}>
          {/* PERSONA */}
          <select value={persona} onChange={e => setPersona(Number(e.target.value))} style={{ fontFamily: 'Orbitron,monospace', fontSize: 7, letterSpacing: '0.08em', background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 6px', cursor: 'pointer' }}>
            {['Individual', 'Corporate', 'Coder', 'Engineer', 'Creative'].map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          {/* VPN HUD — grayscale for Cadet, glowing green for Elite/Titan */}
          <button onClick={() => tier === 'cadet' ? cadetBlock('Stellar Tunnel VPN', () => { }) : setTunnel(!tunnel)} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, background: tunnel && tier !== 'cadet' ? 'rgba(0,255,120,0.15)' : 'transparent', color: vpnColor, border: `1px solid ${tunnel && tier !== 'cadet' ? 'rgba(0,255,120,0.4)' : 'rgba(255,255,255,0.15)'}`, padding: '5px 8px', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', filter: vpnFilter, boxShadow: tunnel && tier !== 'cadet' ? '0 0 8px rgba(0,255,120,0.3)' : 'none' }} title={tier === 'cadet' ? 'Upgrade to unlock VPN' : tunnel ? 'Ghost Mode: ON' : 'Activate Quantum VPN'}>{tier === 'cadet' ? '🔒 VPN' : tunnel ? '🛡 ON' : '🛡 VPN'}</button>
          {/* SIGN IN — z-index:1000000 */}
          <button onClick={() => go('pricing')} style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', transition: 'color 0.2s', whiteSpace: 'nowrap', position: 'relative', zIndex: 1000000 }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>Sign In</button>
          {/* LAUNCH FREE — z-index:1000000 */}
          <button onClick={() => go('pricing')} style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', background: '#fff', color: '#000', border: 'none', padding: '9px 16px', cursor: 'pointer', whiteSpace: 'nowrap', clipPath: 'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)', position: 'relative', zIndex: 1000000, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.86'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Launch Free</button>
        </div>
      </nav>

      {/* GHOST COMMANDER */}
      <div style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '7px 24px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 10 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pd 1.8s infinite', flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>Ghost Commander: "{GHOST_MSGS[ghostIdx]}"</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.2)' }}>MR.X LIVE EMPIRE</span>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* ══ HOME ══ */}
      {page === 'home' && (
        <>
          <section style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '72px 24px 56px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,transparent 26%,rgba(5,5,5,0.92) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeUp 0.7s ease' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, border: '1px solid rgba(255,255,255,0.1)', padding: '6px 18px', fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 32, background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', animation: 'pd 1.8s infinite', display: 'inline-block', flexShrink: 0 }} />GUARDIAN OF THE GALAXIES — ALL SYSTEMS ONLINE
              </div>
              <div style={{ marginBottom: 14 }}>
                <svg viewBox="0 0 480 82" fill="none" style={{ height: 'clamp(44px,7vw,68px)', width: 'auto' }}>
                  <path d="M24 4L28 17L29 39L28 61L24 71L20 61L19 39L20 17Z" fill="rgba(255,255,255,0.82)" />
                  <path d="M28 61L34 73L34 78L24 73L14 78L14 73L20 61Z" fill="rgba(255,255,255,0.28)" />
                  <polygon points="24,4 30,17 18,17" fill="white" />
                  <text x="46" y="63" fontFamily="Orbitron,monospace" fontWeight="900" fontSize="55" fill="white" letterSpacing="-1">MarsNovaX</text>
                  <path d="M426 70 Q448 62 470 49" stroke="rgba(255,255,255,0.44)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', marginBottom: 20 }}>// MISSION CONTROL FOR HUMANITY — MR.X //</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, maxWidth: 680, lineHeight: 1.82, margin: '0 auto 28px', fontWeight: 300, fontFamily: 'Rajdhani,sans-serif' }}>The Total Intelligence Civilization. Where being a good person is the ultimate power. Learn. Create. Earn. Give Back. Evolve. Built for 8 billion people — including the blind, deaf, and underprivileged. No greed. No pride. No ego. Just a shield for the planet.</p>

              {/* PULSE-POWERED SOVEREIGN SEARCH */}
              <div style={{ width: '100%', maxWidth: 720, marginBottom: 26, position: 'relative' }}>
                <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,215,0,0.5)', letterSpacing: '0.12em', pointerEvents: 'none' }}>🌟</div>
                  <input value={heroQ} onChange={e => { setHeroQ(e.target.value); if (e.target.value.trim()) heroSearch() }} placeholder="Search domains, tools, or say 'Open the Great Forge'..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'Rajdhani,sans-serif', fontSize: 14, padding: '13px 18px 13px 34px', outline: 'none' }} />
                  {hs && <button onClick={ht} style={{ background: hm ? 'rgba(255,215,0,0.1)' : 'transparent', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '0 14px', cursor: 'pointer', fontSize: 16, color: hm ? '#FFD700' : 'rgba(255,255,255,0.35)' }}>{hm ? '🔴' : '🎙'}</button>}
                  <button onClick={heroSearch} style={{ background: '#fff', color: '#000', border: 'none', padding: '0 20px', fontFamily: 'Orbitron,monospace', fontSize: 8.5, letterSpacing: '0.12em', fontWeight: 700, cursor: 'pointer' }}>SEARCH</button>
                </div>
                {showDrop && (heroResults.length > 0 || heroAI) && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none', zIndex: 500, maxHeight: 420, overflowY: 'auto' }}>
                    {heroAI && <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}><div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.14em', color: 'rgba(255,215,0,0.5)', marginBottom: 7 }}>🌟 THE PULSE — INSTANT ANSWER</div><div style={{ color: 'rgba(255,255,255,0.78)', fontSize: 12.5, fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.6 }}>{heroAI}</div></div>}
                    {heroResults.filter(r => r.type === 'domain').length > 0 && <div style={{ padding: '6px 16px 3px', fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)' }}>▸ STELLAR HUB DOMAINS</div>}
                    {heroResults.filter(r => r.type === 'domain').map((r: any) => <button key={r.id} onClick={() => { openTool('core'); setShowDrop(false) }} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 16px', cursor: 'pointer', textAlign: 'left', color: '#fff' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}><span style={{ fontSize: 17, flexShrink: 0 }}>{r.icon}</span><div><div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8.5, fontWeight: 700 }}>{r.label}</div><div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10.5, color: 'rgba(255,255,255,0.5)' }}>{r.desc}</div></div></button>)}
                    {heroResults.filter(r => r.type === 'tool').length > 0 && <div style={{ padding: '6px 16px 3px', fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)' }}>▸ NOVA ENGINE TOOLS</div>}
                    {heroResults.filter(r => r.type === 'tool').map((r: any) => <button key={r.id} onClick={() => { openTool(r.id); setShowDrop(false) }} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 16px', cursor: 'pointer', textAlign: 'left', color: '#fff' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}><span style={{ fontSize: 17, flexShrink: 0 }}>{r.icon}</span><div><div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8.5, fontWeight: 700 }}>{r.name}</div><div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10.5, color: 'rgba(255,255,255,0.5)' }}>{r.desc.substring(0, 58)}...</div></div><span style={{ marginLeft: 'auto', fontFamily: 'Orbitron,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.38)', flexShrink: 0 }}>USE →</span></button>)}
                  </div>
                )}
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,215,0,0.4)', letterSpacing: '0.14em', marginTop: 5, textAlign: 'right' }}>🌟 PULSE AI ACTIVE — VOICE NAVIGATE OR SEARCH</div>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
                <button style={S.bw} onClick={() => go('stellar')} onMouseEnter={e => e.currentTarget.style.opacity = '0.86'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Enter the Empire →</button>
                <button style={S.bg} onClick={() => go('nova')} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.72)' }}>Explore AI Tools</button>
                <button style={S.bg} onClick={() => go('covenant')} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.72)' }}>🛡 The Covenant</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 660, width: '100%', background: 'rgba(255,255,255,0.014)' }}>
                {[['99+', 'Knowledge Domains'], ['25+', 'AI Tools'], ['100+', 'Languages'], ['∞', 'Human Potential']].map(([n, l], i) => (
                  <div key={l} style={{ padding: '16px 8px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                    <span style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 24, display: 'block', color: '#fff' }}>{n}</span>
                    <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: 4, display: 'block' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ECO-CHAIN */}
          <section style={S.sec}>
            <span style={S.tag}>// The Empire Eco-Chain — Learn → Create → Earn → Give Back → Evolve → Rule //</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
              {[['🌌', 'ABSORB', 'Stellar Hub', 'stellar'], ['⚡', 'ACCELERATE', 'Nova Engine', 'nova'], ['🌐', 'LAUNCH', 'Starbase', 'starbase'], ['📦', 'ORDER', 'Logistics', 'starbase'], ['🕊', 'GIVE BACK', 'Stellar Heart', 'heart'], ['💪', 'EVOLVE', 'Vitality', 'vitality'], ['👑', 'RULE', 'Titan Fortress', 'titan']].map(([ic, lb, sb, dest], i, arr) => (
                <span key={lb} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 14px', textAlign: 'center', minWidth: 95, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => go(dest as Page)} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                    <span style={{ fontSize: 18, display: 'block', marginBottom: 3 }}>{ic}</span>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 7.5, fontWeight: 700, color: '#fff' }}>{lb}</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{sb}</div>
                  </div>
                  {i < arr.length - 1 && <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)', padding: '0 2px' }}>→</span>}
                </span>
              ))}
            </div>
          </section>

          {/* WHO */}
          <section style={S.sec}>
            <span style={S.tag}>// Every Human. Every Mission. No One Left Behind. //</span>
            <h2 style={S.h2}>Built for <span style={S.dim}>8 Billion People.</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 20 }}>
              {WHO.map(d => (
                <div key={d.l} style={{ background: '#080808', padding: '16px 10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.22s', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderBottomColor = '#fff'; e.currentTarget.querySelectorAll('div').forEach(x => (x as HTMLElement).style.color = '#000') }} onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.borderBottomColor = 'transparent'; const els = e.currentTarget.querySelectorAll('div'); (els[0] as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (els[1] as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}>
                  <div style={{ fontSize: 20, marginBottom: 5 }}>{d.i}</div>
                  <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em', transition: 'color 0.2s' }}>{d.l}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3, fontFamily: 'Rajdhani,sans-serif', transition: 'color 0.2s' }}>{d.d}</div>
                </div>
              ))}
            </div>
            {/* AEGIS quick tiles */}
            <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.07)', padding: 16, marginBottom: 16 }}>
              <span style={S.tag}>// AEGIS Soul — Full Free Access for the Blind, Deaf & Underprivileged //</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
                {[['🔊', 'Echo Mode', 'Blind & Visual', 'echo'], ['🤫', 'Silent Mode', 'Deaf & Hearing', 'silent'], ['🧘', 'Zen Mode', 'Autism / ADHD', 'zen'], ['🌟', 'Merit Mode', 'Underprivileged', 'merit']].map(([icon, title, desc, mode]) => (
                  <button key={title} onClick={() => setAegisMode(mode)} style={{ background: '#080808', padding: '14px 10px', textAlign: 'center', cursor: 'pointer', border: 'none', color: '#fff', transition: 'all 0.2s', borderTop: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.background = '#0D0D0D'; (e.currentTarget as HTMLElement).style.borderTopColor = '#FFD700' }} onMouseLeave={e => { e.currentTarget.style.background = '#080808'; (e.currentTarget as HTMLElement).style.borderTopColor = 'transparent' }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{title}</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10.5, color: 'rgba(255,255,255,0.55)' }}>{desc}</div>
                  </button>
                ))}
              </div>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginTop: 10 }}>500 Nova Coins + 100% FREE Galaxy Guardian access for life · No proof required · No barriers</div>
            </div>
          </section>

          {/* FEATURE PANELS */}
          <section style={{ ...S.sec, paddingTop: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2 }}>
              <FP label="[ STELLAR HUB ]" title={'Every Domain of\nHuman Intelligence'} desc="99+ domains. AI Tutor, Courses, Books, Simulations, Soulbound Certifications. The poverty-free library of the gods." emoji="🌌" onClick={() => go('stellar')} />
              <FP label="[ NOVA ENGINE ]" title={'AI Works 24/7\nAs Your Employee'} desc="25+ AI tools including NovaVision, SoundNova, and the Imagination Grinder. Build empires while you sleep." emoji="⚡" onClick={() => go('nova')} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 2, marginBottom: 2 }}>
              <FP label="[ STARBASE ]" title={'Global\nMarket'} desc="Jobs, Freelance, Logistics, Travel, Wallet" emoji="🌐" onClick={() => go('starbase')} small />
              <FP label="[ GREAT FORGE ]" title={'Hardware\nKiller'} desc="Cloud HPC replaces Nvidia, Intel, Apple" emoji="⚙" onClick={() => cadetBlock('Virtual Forge', () => go('forge'))} small />
              <FP label="[ 🔲 SUITE ]" title={'9-Dot\nSovereign'} desc="ProseNova, NovaVision, SoundNova, Vault" emoji="🔲" onClick={() => cadetBlock('Sovereign Suite', () => go('suite'))} small />
              <FP label="[ STELLAR HEART ]" title={'Spirit &\nPlanet'} desc="EQ AI, Legacy Vault, Gaia Guard" emoji="🕊" onClick={() => go('heart')} small />
              <FP label="[ AEGIS SOUL ]" title={'Everyone\nBelongs'} desc="Echo, Silent, Zen, Merit — all free" emoji="♿" onClick={() => go('aegis')} small />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
              <FP label="[ GAMING HUB ]" title={'Simulate\n& Play'} desc="Rockets, VR/AR, Tycoon, Labs, Courtroom" emoji="🎮" onClick={() => go('gaming')} small />
              <FP label="[ 🛡 TUNNEL ]" title={'Ghost\nMode VPN'} desc="Quantum-resistant. Zero-log. Invisible." emoji="🛡" onClick={() => cadetBlock('Stellar Tunnel', () => go('tunnel'))} small />
              <FP label="[ 👑 TITAN ]" title={'Sovereign\nFortress'} desc="3D Kingdom Builder — Learn → Build → Rule" emoji="👑" onClick={() => go('titan')} small />
              <FP label="[ MR.X TERMINAL ]" title={'The\nManifesto'} desc="Moral Architecture of the Empire" emoji="🏛" onClick={() => go('mrx')} small />
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ padding: '48px 36px 24px', borderTop: '1px solid rgba(255,255,255,0.055)', background: '#030303' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 40 }}>
              <div>
                <div style={{ marginBottom: 12 }}><Logo h={24} /></div>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 270 }}>The Total Intelligence Civilization. Where being good is the ultimate power. Guardian of the Galaxies. Built for 8 billion people. No illegal activities.</p>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.18)', marginTop: 10, letterSpacing: '0.14em' }}>// MR.X — MISSION CONTROL FOR HUMANITY //</div>
              </div>
              {[{ h: 'Empire', links: [['Stellar Hub', 'stellar'], ['Nova Engine', 'nova'], ['Starbase', 'starbase'], ['Great Forge', 'forge'], ['Sovereign Suite', 'suite'], ['Stellar Tunnel', 'tunnel']] }, { h: 'Platform', links: [['Chronicle', 'chronicle'], ['Crew Network', 'crew'], ['Ranks & Badges', 'ranks'], ['AEGIS Soul', 'aegis'], ['The Covenant', 'covenant'], ['Titan Fortress', 'titan']] }, { h: 'Company', links: [['Mr.X Terminal', 'mrx'], ['Mission', 'mission'], ['Stellar Heart', 'heart'], ['Revenue Core', 'revenue'], ['Pricing', 'pricing'], ['Vitality Pulse', 'vitality']] }].map(col => (
                <div key={col.h}>
                  <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14, display: 'block' }}>{col.h}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {col.links.map(([label, p]) => <button key={label} onClick={() => go(p as Page)} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.72)', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}>{label}</button>)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.14)', letterSpacing: '0.1em', paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.055)', position: 'relative', zIndex: 10 }}>
              © 2026 MARSNOVAX — GUARDIAN OF THE GALAXIES | MR.X | ALL RIGHTS RESERVED | SECURED · PRIVATE · GDPR COMPLIANT · NO ILLEGAL ACTIVITIES
            </div>
          </footer>
        </>
      )}

      {/* ══ STELLAR HUB ══ */}
      {page === 'stellar' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Stellar Hub — Library of the Gods //</span>
          <h2 style={S.h2}>Every Domain of <span style={S.dim}>Human Intelligence.</span></h2>
          <p style={S.p}>99+ domains — AI Tutor · Courses · Books · Simulations · Soulbound NFT Certifications. Knowledge belongs to everyone. Poverty is not a barrier here.</p>
          <div style={{ position: 'relative', maxWidth: 520, marginBottom: 14 }}>
            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.03)' }}>
              <input value={domQ} onChange={e => setDomQ(e.target.value)} placeholder="Search any domain, subject, profession..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'Rajdhani,sans-serif', fontSize: 14, padding: '12px 16px', outline: 'none' }} />
              {ds && <button onClick={dt} style={{ background: dm ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '0 14px', cursor: 'pointer', fontSize: 15, color: dm ? '#fff' : 'rgba(255,255,255,0.35)' }}>{dm ? '🔴' : '🎙'}</button>}
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '0 18px', fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.12em', fontWeight: 700, cursor: 'pointer' }}>GO</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>{DOM_CATS.map(c => <button key={c} style={S.pill(domCat === c)} onClick={() => setDomCat(c)}>{c}</button>)}</div>
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em', marginBottom: 12 }}>{filtDoms.length} DOMAINS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {filtDoms.map(d => (
              <div key={d.id} style={{ background: '#080808', padding: 14, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderTopColor = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.borderTopColor = 'transparent' }} onClick={() => openTool('core')}>
                <span style={{ fontSize: 18, marginBottom: 5, display: 'block' }}>{d.icon}</span>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: 3 }}>{d.label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani,sans-serif' }}>{d.desc}</div>
                <div style={{ marginTop: 5, fontFamily: 'Share Tech Mono,monospace', fontSize: 7, border: '1px solid rgba(255,255,255,0.1)', padding: '1px 5px', color: 'rgba(255,255,255,0.28)', display: 'inline-block' }}>{d.cat}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ NOVA ENGINE ══ */}
      {page === 'nova' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Nova Engine — Autonomous AI Power //</span>
          <h2 style={S.h2}>25+ AI Tools. <span style={S.dim}>Working 24/7.</span></h2>
          <p style={S.p}>Click any tool to start. +50 XP per interaction. Everything secured. Nothing leaves the empire.</p>
          <div style={{ maxWidth: 480, marginBottom: 14 }}>
            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.03)' }}>
              <input value={toolQ} onChange={e => setToolQ(e.target.value)} placeholder="Search AI tools..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontFamily: 'Rajdhani,sans-serif', fontSize: 14, padding: '12px 16px', outline: 'none' }} />
              {ts && <button onClick={tt} style={{ background: tm ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '0 14px', cursor: 'pointer', fontSize: 15, color: tm ? '#fff' : 'rgba(255,255,255,0.35)' }}>{tm ? '🔴' : '🎙'}</button>}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>{TOOL_CATS.map(c => <button key={c} style={S.pill(toolCat === c)} onClick={() => setToolCat(c)}>{c}</button>)}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {filtTools.map(t => (
              <button key={t.id} onClick={() => openTool(t.id)} style={{ background: '#080808', padding: 20, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'block', width: '100%', border: '2px solid transparent', color: '#fff' } as any} onMouseEnter={e => { e.currentTarget.style.background = '#0F0F0F'; (e.currentTarget as HTMLElement).style.setProperty('border-left-color', '#fff') }} onMouseLeave={e => { e.currentTarget.style.background = '#080808'; (e.currentTarget as HTMLElement).style.setProperty('border-left-color', 'transparent') }}>
                {t.badge && <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.14em', border: '1px solid rgba(255,255,255,0.18)', padding: '2px 7px', color: 'rgba(255,255,255,0.45)', display: 'inline-block', marginBottom: 7 }}>{t.badge}</div>}
                <div style={{ fontSize: 22, marginBottom: 9 }}>{t.icon}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9.5, fontWeight: 700, marginBottom: 5, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, fontFamily: 'Rajdhani,sans-serif', marginBottom: 8 }}>{t.desc}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 7.5, letterSpacing: '0.09em', color: 'rgba(255,255,255,0.38)' }}>USE NOW → (+50 XP)</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ══ ACTIVE TOOL ══ */}
      {page === 'tool' && activeTool && (
        <section style={{ ...S.sec, minHeight: 'calc(100vh - 120px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={() => go('nova')} style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, letterSpacing: '0.12em', background: 'none', border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.5)', padding: '7px 12px', cursor: 'pointer' }}>← NOVA ENGINE</button>
            <div><span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 3 }}>ACTIVE TOOL</span><h2 style={{ ...S.h2, fontSize: 20, margin: 0 }}>{activeTool.icon} {activeTool.name}</h2></div>
            {activeTool.badge && <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, border: '1px solid rgba(255,255,255,0.2)', padding: '3px 10px', color: 'rgba(255,255,255,0.45)' }}>{activeTool.badge}</div>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
            <AIChat tool={activeTool} />
            <div>
              <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.07)', padding: 16, marginBottom: 12 }}>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>ABOUT THIS TOOL</div>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{activeTool.icon}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9.5, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{activeTool.name}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontFamily: 'Rajdhani,sans-serif' }}>{activeTool.desc}</div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.2)', marginBottom: 5 }}>+50 XP PER INTERACTION</div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', height: 2 }}><div style={{ height: '100%', width: '68%', background: '#fff' }} /></div>
                </div>
              </div>
              <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.07)', padding: 14 }}>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>QUICK PROMPTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {activeTool.qp.map(qp => <button key={qp} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11.5, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.65)', padding: '7px 12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}>{qp}</button>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ STARBASE ══ */}
      {page === 'starbase' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Starbase — Global Marketplace Empire //</span>
          <h2 style={S.h2}>The Global <span style={S.dim}>Marketplace.</span></h2>
          <p style={S.p}>Jobs, freelance, startups, deliveries, travel, stays. 10% success tax auto-collected. Virtue Rebate flows to Gaia Guard and Brotherhood Fund automatically.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }}>
            {[['🎯', 'Starbase Recruiter', 'Global job aggregator. Apply using Stellar Hub mastery as credentials. Elite roles matched to rank.', 'JOBS · CAREERS · GLOBAL'], ['💼', 'Starbase Freelance', '10% commission auto-deducted. Nova-Speed verified. High Honor Score = lower fees.', 'FREELANCE · GIGS · INCOME'], ['🚀', 'Stellar Explorer', '10-phase startup builder. Idea → MVP → Scale → Funding. AI Venture Coach, Pitch Arena.', 'STARTUPS · INCUBATOR · VC'], ['📦', 'Starbase Logistics', 'AI dispatch: food, groceries, medicine, global shipping. 20% empire fee auto. Uber + Amazon built-in.', 'DELIVERY · AMAZON-STYLE · AI'], ['✈', 'Starbase Voyager', 'Global travel. Flights, hotels, GPS itineraries by StarTrip AI. AI concierge never sleeps.', 'TRAVEL · FLIGHTS · EXPLORE'], ['💰', 'Stellar Wallet + $SC', 'Nova Coins, $SC Stellar Credits, real balance, freelance earnings. Zero-friction swaps.', 'WALLET · CREDITS · EARNINGS']].map(([ic, t, d, tg]) => <HC key={t as string} icon={ic as string} title={t as string} desc={d as string} tag={tg as string} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[[novaCoins.toLocaleString(), 'Nova Coins'], ['$SC 1,200', 'Stellar Credits'], ['$0.00', 'Real Balance'], ['Commander', 'Current Rank']].map(([n, l]) => (
              <div key={l} style={{ background: '#080808', padding: 18 }}><span style={{ fontFamily: 'Orbitron,monospace', fontSize: 22, fontWeight: 700, display: 'block', color: '#fff' }}>{n}</span><span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: 3, display: 'block' }}>{l}</span></div>
            ))}
          </div>
          {/* Earn coins button */}
          <button onClick={() => { setNovaCoins(c => c + 50); alert('+50 Nova Coins earned! Keep building the empire.') }} style={{ ...S.bw, marginTop: 16 }} onMouseEnter={e => e.currentTarget.style.opacity = '0.86'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>+ Earn 50 Nova Coins</button>
        </section>
      )}

      {/* ══ THE GREAT FORGE (Virtual HPC — Hardware Killer) ══ */}
      {page === 'forge' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Great Forge — Virtual HPC Cloud Engine — Hardware Killer //</span>
          <h2 style={S.h2}>The Cloud Has <span style={S.dim}>Replaced Your Hardware.</span></h2>
          <p style={S.p}>A child in a village with a $50 phone now possesses the same engineering power as a Silicon Valley firm. We are breaking the silicon ceiling.</p>

          {/* VIRTUAL HPC CLOUD PANEL */}
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', padding: 28, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 32 }}>☁</div>
              <div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 700, color: '#fff' }}>VIRTUAL FORGE — Cloud HPC Engine</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Replaces: Nvidia GPU · Intel CPU · Apple Silicon · $3,000 workstations</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[['CPU', '2,048 cores', 'rgba(255,255,255,0.8)'], ['GPU', '32 × A100', 'rgba(0,255,120,0.8)'], ['RAM', '512 GB', 'rgba(255,215,0,0.8)'], ['Storage', '100 TB NVMe', 'rgba(255,255,255,0.7)'], ['Network', '100 Gbps', 'rgba(0,200,255,0.8)'], ['Latency', '< 2ms', 'rgba(255,255,255,0.7)']].map(([l, v, c]) => (
                    <div key={l} style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)', padding: '8px 10px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{l}</div>
                      <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, color: c as string }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <AIChat tool={TOOLS.find(t => t.id === 'grinder')!} />
          </div>

          {/* BUILDER ENGINES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[['💻', 'Nova App-Generator', 'Prompt-to-App. Full SaaS, mobile apps in seconds. Zero code required.', 'Entrepreneurs'], ['🏗', 'Architect 3D', 'Generative CAD/BIM. Houses, parts — cloud-rendered, 3D-print ready.', 'Engineers'], ['🎮', 'Apex Game-Maker', 'Cloud-native AI game engine. Neural Athletes adapt to your play style.', 'Creators'], ['🌐', 'Stellar Web-Architect', 'AI-driven UX. High-conversion sites that adapt to real-time user behavior.', 'Business'], ['🌾', 'Gaia Digital Twin', 'Industrial IoT simulation. Virtual replicas predict maintenance.', 'Industry']].map(([ic, t, d, w]) => (
              <div key={t as string} style={{ background: '#080808', padding: 20, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.borderTopColor = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.borderTopColor = 'transparent' }}>
                <div style={{ fontSize: 24, marginBottom: 9 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9.5, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: 7 }}>{d}</div>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, border: '1px solid rgba(255,255,255,0.12)', padding: '2px 6px', color: 'rgba(255,255,255,0.35)', display: 'inline-block' }}>{w}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ 9-DOT SOVEREIGN SUITE ══ */}
      {page === 'suite' && (
        <section style={S.sec}>
          <span style={S.tag}>// 9-Dot Sovereign Suite — Kill 10 Subscriptions With One //</span>
          <h2 style={S.h2}>One Suite. <span style={S.dim}>All The Power.</span></h2>
          <p style={S.p}>ProseNova kills ChatGPT. NovaVision kills Midjourney. SoundNova kills ElevenLabs. AstroCode kills GitHub Copilot. Stellar Vault kills Dropbox and Google Drive. All in one empire.</p>

          {/* MODULE TABS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 20 }}>
            {[['prose', '✍', 'ProseNova', 'ChatGPT Killer'], ['vision', '👁', 'NovaVision', 'Midjourney Killer'], ['sound', '🎵', 'SoundNova', 'ElevenLabs Killer'], ['code', '⚡', 'AstroCode', 'Copilot Killer'], ['vault', '🔒', 'Stellar Vault', 'Storage Killer']].map(([id, ic, name, sub]) => (
              <button key={id} onClick={() => { if (id === 'vault') { withTruthID('Stellar Vault', () => setSuiteModule(id)) } else { setSuiteModule(id) } }} style={{ background: suiteModule === id ? '#111' : '#080808', padding: '18px 12px', textAlign: 'center', cursor: 'pointer', border: 'none', color: '#fff', transition: 'all 0.2s', borderTop: `2px solid ${suiteModule === id ? '#fff' : 'transparent'}` }} onMouseEnter={e => { if (suiteModule !== id) { e.currentTarget.style.background = '#0D0D0D' } }} onMouseLeave={e => { if (suiteModule !== id) { e.currentTarget.style.background = '#080808' } }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{name}</div>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{sub}</div>
              </button>
            ))}
          </div>

          {suiteModule && (
            <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', padding: 24 }}>
              {suiteModule === 'vault' ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ fontSize: 32 }}>🔒</div>
                    <div><div style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, color: '#fff' }}>Stellar Vault — Sovereign Storage</div><div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>End-to-end encrypted cloud storage. Zero-knowledge. Replaces Dropbox, Google Drive, iCloud.</div></div>
                    <div style={{ marginLeft: 'auto', fontFamily: 'Share Tech Mono,monospace', fontSize: 8, color: '#00ff78', border: '1px solid rgba(0,255,120,0.3)', padding: '3px 10px' }}>✓ TRUTH-ID VERIFIED</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
                    {[['📁', 'Documents', '0 files'], ['🖼', 'Media', '0 files'], ['🔑', 'Keys & Secrets', '0 files'], ['📦', 'Projects', '0 files']].map(([ic, n, s]) => (
                      <div key={n as string} style={{ background: '#080808', padding: 20, textAlign: 'center', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#0D0D0D'} onMouseLeave={e => e.currentTarget.style.background = '#080808'}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{ic}</div>
                        <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{n}</div>
                        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{s}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, background: '#080808', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>STORAGE USED</div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', height: 4 }}><div style={{ height: '100%', width: '2%', background: '#fff' }} /></div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, color: '#fff' }}>0 / 1 TB</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ fontSize: 28 }}>{suiteModule === 'prose' ? '✍' : suiteModule === 'vision' ? '👁' : suiteModule === 'sound' ? '🎵' : '⚡'}</div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, color: '#fff' }}>{suiteModule === 'prose' ? 'ProseNova AI — ChatGPT Killer' : suiteModule === 'vision' ? 'NovaVision AI — Midjourney Killer' : suiteModule === 'sound' ? 'SoundNova AI — ElevenLabs Killer' : 'AstroCode AI — GitHub Copilot Killer'}</div>
                      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{suiteModule === 'prose' ? 'World-class ghostwriting, blogs, books, scripts' : suiteModule === 'vision' ? 'Image generation, analysis, visual ideation' : suiteModule === 'sound' ? 'Audio scripts, podcast content, music composition' : 'Full-stack code generation and debugging'}</div>
                    </div>
                  </div>
                  <AIChat tool={TOOLS.find(t => t.id === (suiteModule === 'prose' ? 'writer' : suiteModule === 'vision' ? 'vision' : suiteModule === 'sound' ? 'sound' : 'code'))!} />
                </div>
              )}
            </div>
          )}
          {!suiteModule && (
            <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.07)', padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔲</div>
              <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 12, color: '#fff', marginBottom: 8 }}>SELECT A MODULE ABOVE</div>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>5 AI-powered apps. 10 subscriptions killed. All in one sovereign suite.</div>
            </div>
          )}
        </section>
      )}

      {/* ══ GAMING HUB ══ */}
      {page === 'gaming' && (
        <section style={S.sec}>
          <span style={S.tag}>// Gaming & Simulation Hub — The Arena //</span>
          <h2 style={S.h2}>Learn by Doing. <span style={S.dim}>Simulate Reality.</span></h2>
          <p style={S.p}>Interactive simulations and VR/AR. Earn XP and Soulbound badges while mastering real knowledge. Neural Athletes adapt to your play style. Zero-latency via Stellar Mesh.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[['🚀', 'Rocket & Orbital Simulator', 'Thrust, angle, fuel. Master orbital mechanics. Earn "Orbital Pioneer" Soulbound badge. Real physics engine.'],
              ['🌍', 'Planet Colonization', 'Resources, habitats, ecosystems. Lead humanity\'s first Mars colony. Strategy + real science.'],
              ['💼', 'Startup Tycoon', 'BrainLaunch AI powers your real decisions. Earn business XP + Nova Coins for every wise move.'],
              ['🔬', 'Virtual Lab', 'Chemistry, biology, physics experiments safely in the cloud. Earn Science domain badges.'],
              ['⚖', 'Courtroom Simulator', 'Argue real cases, cross-examine, build legal reasoning through challenging trial simulations.'],
              ['🥽', 'VR / AR Worlds', 'Walk on Mars. Tour the human body. Explore ancient civilizations in full immersion.'],
              ['🏥', 'Medical Simulation', 'Surgical procedures, patient diagnosis, emergency medicine. Earn Medical Soulbound certs.'],
              ['💻', 'Code & Build Arena', 'Live coding challenges. AI-assisted. 0ms ping via Stellar Mesh. Developer XP + Nova Coins.'],
              ['🌾', 'Farm & Agriculture', 'Crops, livestock, sustainable farming. Agricultural science through real-world simulation.']].map(([ic, t, d]) => (
              <div key={t as string} style={{ background: '#080808', padding: 24, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#0E0E0E'; e.currentTarget.style.borderTopColor = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.borderTopColor = 'transparent' }}>
                <div style={{ fontSize: 28, marginBottom: 9 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, fontFamily: 'Rajdhani,sans-serif' }}>{d}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ VITALITY ══ */}
      {page === 'vitality' && (
        <section style={S.sec}>
          <span style={S.tag}>// Vitality Pulse + Bio-Twin Longevity Dashboard //</span>
          <h2 style={S.h2}>Health. Finance. <span style={S.dim}>Longevity. Virtue.</span></h2>
          <p style={S.p}>Your complete life dashboard. Bio-Twin tracks biological age in real-time. High vitality = faster Nova Engine processing speed.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }}>
            {[['87%', 'Vitality Score', 87], ['342', 'Honor Points', 60], ['🔥 7', 'Day Streak', 70], ['+50', 'Life XP Today', 45]].map(([n, l, p]) => (<div key={l} style={{ background: '#080808', padding: 20 }}><span style={{ fontFamily: 'Orbitron,monospace', fontSize: 24, fontWeight: 900, color: '#fff', display: 'block' }}>{n}</span><span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginTop: 4, display: 'block' }}>{l}</span><div style={{ marginTop: 8, background: 'rgba(255,255,255,0.07)', height: 2 }}><div style={{ height: '100%', width: `${p}%`, background: 'rgba(255,255,255,0.7)' }} /></div></div>))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }}>
            <div style={{ background: '#080808', padding: 22 }}>
              <span style={S.tag}>// Bio-Twin Longevity //</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['🧬 Biological Age', '34.2 yrs', 82], ['💓 HRV Score', '68ms', 75], ['🧠 Neurofeedback', 'Level 7', 70], ['😴 Sleep Quality', '92%', 92], ['💧 Hydration', '6/8', 75], ['🏃 Exercise', '30min', 50]].map(([l, v, p]) => (<div key={l} style={{ background: '#0A0A0A', padding: 10, border: '1px solid rgba(255,255,255,0.06)' }}><span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 3 }}>{l}</span><span style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, color: '#fff' }}>{v}</span><div style={{ marginTop: 5, background: 'rgba(255,255,255,0.07)', height: 2 }}><div style={{ height: '100%', width: `${p}%`, background: 'rgba(255,255,255,0.6)' }} /></div></div>))}
              </div>
            </div>
            <div style={{ background: '#080808', padding: 22 }}>
              <span style={S.tag}>// Stellar Finance //</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['📈 S&P 500', '+1.2%', '#7fff7f'], ['₿ Bitcoin', '+2.8%', '#7fff7f'], ['🪙 Nova Coins', novaCoins.toLocaleString(), '#fff'], ['$SC Credits', '1,200', '#fff'], ['💰 Balance', '$0.00', '#fff'], ['🛡 Threats', '50K blocked', '#ff9900']].map(([l, v, c]) => (<div key={l} style={{ background: '#0A0A0A', padding: 10, border: '1px solid rgba(255,255,255,0.06)' }}><span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 3 }}>{l}</span><span style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, color: c as string }}>{v}</span></div>))}
              </div>
            </div>
          </div>
          <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.07)', padding: 22, textAlign: 'center' }}>
            <span style={S.tag}>// Daily Wisdom Drop //</span>
            <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, color: '#fff', marginBottom: 7 }}>"The person who reads one book a day will master any domain in a year."</p>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>Today's Virtue Challenge: Practice active listening in every conversation. +25 Honor Points.</p>
          </div>
        </section>
      )}

      {/* ══ RANKS ══ */}
      {page === 'ranks' && (
        <section style={S.sec}>
          <span style={S.tag}>// Achievement Engine — Soulbound NFTs //</span>
          <h2 style={S.h2}>Ranks, Badges & <span style={S.dim}>Digital Credentials.</span></h2>
          <p style={S.p}>Every action earns Nova XP. Soulbound NFT certifications permanently linked to your identity. Companies worldwide hire for "MarsNovaX Certified".</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 22 }}>
            {[{ l: 'CADET', t: 'Cadet', d: 'Level 1–10. Free trial access. 500 Nova Coins on signup.', xp: '0 — 1,000 XP', p: 25, c: '#888', b: '#333' }, { l: 'COMMANDER', t: 'Commander', d: 'Level 11–30. Full Nova Engine. Create & sell on Starbase.', xp: '1,000 — 10,000 XP', p: 55, c: '#fff', b: 'rgba(255,255,255,0.4)' }, { l: 'CHANCELLOR', t: 'Arch-Chancellor', d: 'Level 31–60. Revenue sharing. Elite Missions. Legacy Vault.', xp: '10,000 — 100,000 XP', p: 75, c: '#d4af37', b: '#d4af37' }, { l: 'EMPEROR', t: 'Emperor of Intelligence', d: 'Level 61–99. Hidden 100th domain. Full economy. Digital Ancestor AI.', xp: '100,000+ XP', p: 96, c: '#fff', b: '#fff', glow: true }].map(r => (
              <div key={r.l} style={{ background: '#080808', border: `1px solid rgba(255,255,255,${(r as any).glow ? 0.25 : 0.07})`, padding: 22, transition: 'all 0.3s', animation: (r as any).glow ? 'rankGlow 3s infinite' : undefined }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = '#0D0D0D' }} onMouseLeave={e => { e.currentTarget.style.borderColor = (r as any).glow ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#080808' }}>
                <div style={{ display: 'inline-block', fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, letterSpacing: '0.09em', padding: '3px 10px', marginBottom: 8, border: '1px solid', color: r.c, borderColor: r.b, background: (r as any).glow ? 'rgba(255,255,255,0.08)' : undefined }}>{r.l}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 5 }}>{r.t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, marginBottom: 10 }}>{r.d}</div>
                <div style={{ background: 'rgba(255,255,255,0.07)', height: 2, marginBottom: 5 }}><div style={{ height: '100%', width: `${r.p}%`, background: r.c === '#d4af37' ? '#d4af37' : '#fff' }} /></div>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.28)' }}>{r.xp}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 9 }}>
            {[{ i: '⭐', n: 'Founding Star', r: 'Early adopter', e: true }, { i: '🔥', n: '7-Day Supernova', r: '7-day streak', e: true }, { i: '🌌', n: 'First Contact', r: 'First AI conversation', e: true }, { i: '♿', n: 'AEGIS Champion', r: 'Highest honorary badge' }, { i: '💯', n: '100-Day Supernova', r: '100-day streak' }, { i: '⚛', n: 'Quantum Pioneer', r: 'Complete Physics' }, { i: '👑', n: 'Emperor', r: 'Reach Level 61+' }, { i: '💰', n: 'Stellar Earner', r: 'First Starbase payout' }, { i: '🌍', n: 'Humanity Keeper', r: 'Top 1% Honor Score' }, { i: '👑', n: 'Titan Crown', r: 'Titan Fortress $250/mo' }, { i: '🌟', n: 'Galaxy Guardian', r: 'AEGIS free badge' }, { i: '🔲', n: 'Suite Master', r: 'All 5 modules used' }].map(b => (
              <div key={b.n} style={{ background: '#080808', border: `1px solid ${b.e ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}`, padding: 14, textAlign: 'center', opacity: b.e ? 1 : 0.36, cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'} onMouseLeave={e => e.currentTarget.style.borderColor = b.e ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}>
                <span style={{ fontSize: 26, marginBottom: 6, display: 'block' }}>{b.i}</span>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 7.5, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{b.n}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9.5, color: 'rgba(255,255,255,0.38)' }}>{b.r}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ CREW NETWORK ══ */}
      {page === 'crew' && (
        <section style={S.sec}>
          <span style={S.tag}>// Crew Network — Social Sovereignty //</span>
          <h2 style={S.h2}>Apex Profiles. Mission Rooms. <span style={S.dim}>Brotherhood.</span></h2>
          <p style={S.p}>No one left behind. AI matches struggling users with Commander-rank mentors. Salutes earn Nova Coins. Trust Score eliminates bots.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 22 }}>
            {[['📰','The Chronicle (X-Replacement)','High-speed intelligence feed. Verified Truth badges. Polyglot Bridge makes every post globally readable. Virtue-ranked content only.'],['💎','Apex Profiles (LinkedIn-Replacement)','Dynamic Skill-Vaults replace boring resumes. Real-time Forge projects shown. Starbase earnings visible. Trust Score eliminates bots.'],['🏠','Mission Rooms (Discord-Replacement)','War Rooms for each 99+ domain. Active contribution rewards. AI-moderated. $MNX tokens for contributors. No rage allowed.'],['🏅','Brotherhood Protocol','No One Left Behind. AI matches struggling users with Commander-rank mentors. Salutes earn Nova Coins. Honor Score = your real voice.']].map(([ic,t,d]) => (
              <div key={t as string} style={{ background: '#080808', padding: 26 }}>
                <div style={{ fontSize: 24, marginBottom: 11 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10.5, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontFamily: 'Rajdhani,sans-serif' }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['🔴 Mars Colonization','⚡ Physics Explorers','🚀 Startup Launch Crew','💻 Coding Engineers Guild','🏥 Medical Professionals','📈 Sales & Growth','🌌 Astrophysics Lab','💰 Founders & Builders','🧬 Life Sciences','🎓 Students & Research','🌍 Sustainability Crew','🤖 AI Enthusiasts','⚖ Law & Policy','🎨 Creative Studio','🌾 Agriculture','🎮 Gaming & VR Hub','📱 Social Creators','🔒 Cybersecurity','🏗 Civil & Structural','✈ Aerospace & Rockets','💊 Pharmacology','📊 Finance & Investing','🌐 Language Exchange','🎵 Music & Audio','🍳 Culinary Arts','📷 Photography','👔 Leadership','🌱 Horticulture','👶 Child Education','🏆 Sports Science','🥽 VR & AR Builders','⚛ Quantum Lab','🧪 Chemistry Guild','🎬 Animation & Film','📦 Logistics & Supply'].map(c => (
              <div key={c} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, border: '1px solid rgba(255,255,255,0.09)', padding: '6px 14px', color: 'rgba(255,255,255,0.72)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.72)' }}>{c}</div>
            ))}
          </div>
        </section>
      )}

      {/* ══ THE CHRONICLE ══ */}
      {page === 'chronicle' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Chronicle — Real-Time Intelligence Feed //</span>
          <h2 style={S.h2}>Neural Pings. <span style={S.dim}>Truth. Virtue. Zero Rage-Bait.</span></h2>
          <p style={S.p}>Content ranked by Virtue Metrics — Honesty, Compassion, Wisdom, Love. Aegis Filter removes all disrespect and illegal influence. Your Honor Score is your voice.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
            {['Honesty','Compassion','Wisdom','Love','Sharing','Respect','Integrity','Humility','Kindness','Courage'].map(v => (
              <div key={v} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 12px', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)' }}>{v}</div>
            ))}
            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, border: '1px solid rgba(0,255,120,0.3)', padding: '4px 12px', color: '#00ff78', background: 'rgba(0,255,120,0.06)' }}>AEGIS FILTER: ACTIVE</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[{user:'Commander Atlas',avatar:'🧑‍🚀',rank:'Commander',content:'Just completed the Aerospace Engineering Soulbound Cert! The Imagination Grinder turned my idea of a lunar irrigation system into a full 3D blueprint in 4 minutes. The Virtual Forge is the future.',virtue:98,salutes:247,time:'2m ago'},{user:'Dr. Nova Chen',avatar:'👩‍⚕️',rank:'Chancellor',content:'MediDoc AI generated 50 SOAP notes while I was in surgery. Backlog from 3 days to zero. The Medical Soulbound certification is the most respected credential I have ever earned.',virtue:96,salutes:189,time:'8m ago'},{user:'Cadet Orion',avatar:'🌟',rank:'Cadet',content:'First day on MarsNovaX. The Covenant made me feel like I am joining something that actually cares about integrity. Already earned 150 XP just from the Stellar Hub. No one left behind — Mr.X meant it.',virtue:94,salutes:67,time:'15m ago'},{user:'Gaia Guardian',avatar:'🌿',rank:'Commander',content:'100 trees planted via the Gaia Protocol. My digital Earth is 40% healed. The Green Aura on my Apex Profile makes me proud every day. Building a civilization with a conscience.',virtue:99,salutes:312,time:'23m ago'}].map((ping, i) => (
              <div key={i} style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.07)', padding: 20, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: ping.virtue > 95 ? '2px solid rgba(0,255,120,0.5)' : '2px solid rgba(255,255,255,0.1)', animation: ping.virtue > 95 ? 'greenAura 2s infinite' : undefined }}>{ping.avatar}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: '#fff' }}>{ping.user}</span>
                      <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, background: 'rgba(255,255,255,0.1)', padding: '1px 6px', color: 'rgba(255,255,255,0.6)' }}>✓ VERIFIED TRUTH</span>
                      <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, border: '1px solid rgba(255,215,0,0.3)', padding: '1px 6px', color: 'rgba(255,215,0,0.7)' }}>{ping.rank.toUpperCase()}</span>
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{ping.time}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: ping.virtue > 95 ? '#00ff78' : '#fff' }}>VIRTUE {ping.virtue}</div>
                    <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.3)' }}>{ping.salutes} SALUTES</div>
                  </div>
                </div>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.72, marginBottom: 12 }}>{ping.content}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['🫡 Salute','🌐 Translate','↗ Share','💬 Reply'].map(a => (
                    <button key={a} style={{ fontFamily: 'Orbitron,monospace', fontSize: 7.5, letterSpacing: '0.09em', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '5px 10px', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}>{a}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ STELLAR HEART ══ */}
      {page === 'heart' && (
        <section style={S.sec}>
          <span style={S.tag}>// Stellar Heart — Spirit, Legacy & Planet //</span>
          <h2 style={S.h2}>The Empire Has <span style={S.dim}>A Conscience.</span></h2>
          <p style={S.p}>When you earn on MarsNovaX, you help the blind see and the planet breathe. Mind + Body + Spirit + Legacy + Planet = The Total Human.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }}>
            {[['🧠','Stellar Heart — EQ AI','Adaptive Psychological Sync. When stress is high, Neural Link pivots to Mental Recovery — Stoicism, Meditation, or Calm domains automatically.','SPIRIT · EQ · MENTAL HEALTH'],['🏺','Legacy Vault — Digital Immortality','Sovereign Legacy portal. Upload Mind-Files: journals, wisdom, life lessons. Emperor-rank users train a Digital Ancestor AI to guide future generations for 100+ years.','LEGACY · TIME · IMMORTALITY'],['🌍','Gaia Guard — 3D Earth Healing','Digital Earth on your dashboard. Every Sustainability mission turns it greener. Veritree + Ocean Cleanup API. Proof-of-Planet Soulbound badges.','ENVIRONMENT · GAIA · HEALING'],['🧬','Quantum Sync','Success in Starbase → Gaia Guard → boosts Stellar Heart Spirit score. All 106+ domains recursively interconnected.','QUANTUM SYNC · CONNECTED'],['💊','Good Samaritan AI','Identifies local people in crisis. Crew Network micro-donations for food, medicine, shelter. Commanders earn Honor Points.','AID · COMMUNITY · HONOR'],['🔬','Stellar Science Hub','Peer-reviewed journals, Nobel-tier papers. Research Assistant AI for whitepapers. StarTrek Intelligence: bias-neutral knowledge graph.','RESEARCH · ACADEMIC · TRUTH']].map(([ic,t,d,tg]) => (
              <div key={t as string} style={{ background: '#080808', padding: 24, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.borderTopColor = 'rgba(255,80,80,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.borderTopColor = 'transparent' }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10.5, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{d}</div>
                {tg && <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.11em', border: '1px solid rgba(255,255,255,0.14)', padding: '2px 7px', color: 'rgba(255,255,255,0.38)', marginTop: 9, display: 'inline-block' }}>{tg}</div>}
              </div>
            ))}
          </div>
          <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.07)', padding: 22, textAlign: 'center' }}>
            <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, color: '#fff', marginBottom: 7 }}>"We go to Mars together with dignity as a total human achievement."</p>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>— Mr.X, Chief Commander, MarsNovaX</p>
          </div>
        </section>
      )}

      {/* ══ STELLAR TUNNEL ══ */}
      {page === 'tunnel' && (
        <section style={S.sec}>
          <span style={S.tag}>// Stellar Tunnel — Quantum Privacy Shield //</span>
          <h2 style={S.h2}>Military-Grade <span style={S.dim}>Digital Invisibility.</span></h2>
          <p style={S.p}>Your privacy is the foundation of your freedom. One toggle. Total sovereignty. Cadets must upgrade to access the Stellar Tunnel.</p>
          <div style={{ background: '#0A0A0A', border: `2px solid ${tunnel ? 'rgba(0,255,120,0.4)' : 'rgba(255,255,255,0.1)'}`, padding: 26, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 22, transition: 'border-color 0.3s' }}>
            <div style={{ fontSize: 44 }}>🛡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 15, fontWeight: 700, color: tunnel ? '#00ff78' : '#fff', marginBottom: 5 }}>{tunnel ? 'GHOST MODE — QUANTUM ACTIVE' : 'GHOST MODE — INACTIVE'}</div>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{tunnel ? '▸ PQC ACTIVE · DOUBLE-HOP STEALTH · ZERO-LOG · IP MASKED' : '▸ CLICK TO ACTIVATE — ELITE/TITAN/MR.X ONLY'}</div>
            </div>
            <button onClick={() => tier === 'cadet' ? setUpgradeModal('Stellar Tunnel VPN') : setTunnel(!tunnel)} style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', background: tunnel ? 'rgba(0,255,120,0.15)' : 'transparent', color: tunnel ? '#00ff78' : 'rgba(255,255,255,0.4)', border: `1px solid ${tunnel ? 'rgba(0,255,120,0.4)' : 'rgba(255,255,255,0.2)'}`, padding: '12px 22px', cursor: 'pointer', transition: 'all 0.3s' }}>{tunnel ? 'GHOST: ON' : 'ACTIVATE'}</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 14 }}>
            {[['🔀','Double-Hop Stealth','Two Starbase nodes in different countries. IP impossible to trace.'],['⚛','Quantum Encryption','Post-Quantum Cryptography. Even quantum computers cannot crack your messages.'],['📵','Zero-Log Sovereignty','Physically incapable of storing browsing history. Your data does not exist here.'],['🌐','Global Access','Bypass any regional restriction. Sovereign ID replaces real-world metadata.']].map(([ic,t,d]) => (
              <div key={t as string} style={{ background: '#080808', padding: 22 }}>
                <div style={{ fontSize: 24, marginBottom: 9 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 7 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)', padding: 22 }}>
            <span style={S.tag}>// Spectral Firewall — Real-Time Defense //</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginTop: 12 }}>
              {[['🚫','Phishing Blocked','50,247 today'],['🔒','DDoS Mitigated','12 attacks'],['🧬','Zero-Trust Auth','100% verified'],['🛡','Security Score','99.8%']].map(([ic,lb,val]) => (
                <div key={lb} style={{ background: '#080808', padding: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, marginBottom: 5 }}>{ic}</div>
                  <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{lb}</div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, color: 'rgba(0,255,120,0.8)' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ REVENUE CORE ══ */}
      {page === 'revenue' && (
        <section style={S.sec}>
          <span style={S.tag}>// Revenue Core — Autonomous Ethical Wealth //</span>
          <h2 style={S.h2}>Fully Automated. <span style={S.dim}>10% Tax. Virtue Rebate.</span></h2>
          <p style={S.p}>Greed, pride, and ego have no place in the engine of progress. Wealth is a byproduct of growth. Every transaction automated. A portion heals the planet and uplifts the underprivileged.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 18 }}>
            {[['📊','Nova Marketing Hub','AI content remixing (1 video → 10 posts). Predictive SEO. Omnichannel retargeting.'],['🤖','Starbase Sales Agents','Deploy AI Closers. Autonomous lead qualification, objection handling. 24/7 zero manual work.'],['🎯','Native Ad Engine','Precision ads matched to 99+ domains. Users earn XP for engaging. Brands pay 5x more.'],['🌿','Virtue Rebate','A portion of all fees flows automatically to Gaia Guard (planet) and Brotherhood Fund (underprivileged).']].map(([ic,t,d]) => (
              <div key={t as string} style={{ background: '#080808', padding: 22, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#fff'; e.currentTarget.style.background = '#0D0D0D' }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.background = '#080808' }}>
                <div style={{ fontSize: 24, marginBottom: 9 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[['📦','Logistics 20%','Auto-collected. AI dispatches. Zero manual work.'],['💼','Freelance 10%','Escrow auto-deducted. Released on AI verification.'],['🔄','Subscriptions','$0/$0/$25/$250 tiers. Stripe auto-handles all renewals.'],['📣','Featured Listings','Companies bid to feature. Auction-based. Scales infinitely.']].map(([ic,t,d]) => (
              <div key={t} style={{ background: '#080808', padding: 18 }}>
                <div style={{ fontSize: 20, marginBottom: 7 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 5 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ THE COVENANT ══ */}
      {page === 'covenant' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Covenant — Guardian of the Galaxies //</span>
          <h2 style={S.h2}>The Guardian's <span style={S.dim}>Pledge.</span></h2>
          <div style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)', border: '1px solid rgba(255,255,255,0.1)', padding: 48, textAlign: 'center', marginBottom: 22 }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '0.05em' }}>🛡 THE GUARDIAN'S PLEDGE</div>
            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 38 }}>READ. UNDERSTAND. BECOME.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 680, margin: '0 auto' }}>
              {['I pledge to seek truth — and share it with integrity.','I pledge to treat every human with dignity, compassion, and respect.','I pledge to protect the vulnerable, the silent, and the forgotten.','I pledge to build with wisdom, not with greed or shortcuts.','I pledge to give back — to the planet, to the poor, to the next generation.','I pledge to use this empire for good — never for harm, never for deception.','I am a Guardian of the Galaxies. I am the shield for the right and the truth.'].map((pledge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, color: 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.7 }}>{pledge}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 38 }}>
              <button style={S.bw} onClick={() => go('pricing')} onMouseEnter={e => e.currentTarget.style.opacity = '0.86'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>I Accept The Covenant →</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[['⚖','Virtue Policing','AI moderator scans Neural Pings for disrespect or illegal influence. Posts hidden. Honor Score penalized automatically.'],['🌿','Green Protocol','"Gaia Status" badge on profiles. Environmental contributors earn a "Green Aura" around their Neural Avatar. Visible to all.'],['💎','Obsidian Ban','Fraud or illegal activity: biometric Truth-ID permanently flagged. No re-entry. The empire is impenetrable to the wicked.']].map(([ic,t,d]) => (
              <div key={t as string} style={{ background: '#080808', padding: 24 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10.5, fontWeight: 700, color: '#fff', marginBottom: 7 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ AEGIS SOUL ══ */}
      {page === 'aegis' && (
        <section style={S.sec}>
          <span style={S.tag}>// AEGIS Soul — Universal Inclusion — No One Left Behind //</span>
          <h2 style={S.h2}>Everyone Belongs. <span style={S.dim}>Everyone Thrives.</span></h2>
          <p style={S.p}>The Home Sweet Home for the forgotten. AEGIS is not a setting — it is a dedicated dimension of the empire, built with kindness as logic.</p>
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', padding: 22, marginBottom: 18 }}>
            <span style={S.tag}>// AEGIS Economic Freedom — Galaxy Guardian: 100% Free for Life //</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[["💰","Commander's Grant","500 Nova Coins seeded into every AEGIS account on signup."],["🎓","Full Pro Access","100% of all features, 99+ domains, 25+ AI tools — completely free for life."],["🌟","Aegis Badge","The most respected Soulbound badge in the empire. Global recognition."],["🤝","Brotherhood Match","AI matches AEGIS users with Commander-rank mentors. Never alone."]].map(([ic,t,d]) => (
                <div key={t as string} style={{ background: '#080808', border: '1px solid rgba(255,215,0,0.15)', padding: 18 }}>
                  <div style={{ fontSize: 22, marginBottom: 7 }}>{ic}</div>
                  <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8.5, fontWeight: 700, color: '#fff', marginBottom: 5 }}>{t}</div>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[['🔊','ECHO MODE','For the Blind','Sonic Navigation. AI describes everything on screen in rich, spatial audio. Voice-first navigation. The empire listens for you.','echo'],['🤫','SILENT MODE','For the Deaf','Visual Haptics. Real-time captions on every response. Tone-based visual indicators. The empire speaks visually.','silent'],['🧘','ZEN MODE','For Autism / ADHD','Clean, single-task obsidian workspace. Zero distractions. Structured, predictable. The empire calms itself.','zen'],['🌟','MERIT MODE','For the Underprivileged','Ultra-Lite for low-end devices. Earn-to-Learn missions. Data-light, offline-capable. The empire levels the field.','merit']].map(([ic,t,sb,d,m]) => (
              <div key={t as string} style={{ background: '#080808', padding: 26, cursor: 'pointer', borderTop: '2px solid transparent', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.borderTopColor = '#FFD700' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#080808'; e.currentTarget.style.borderTopColor = 'transparent' }}
                onClick={() => setAegisMode(m as string)}>
                <div style={{ fontSize: 30, marginBottom: 11 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10.5, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t}</div>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, color: 'rgba(255,215,0,0.7)', letterSpacing: '0.1em', marginBottom: 10 }}>{sb}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65 }}>{d}</div>
                <button style={{ marginTop: 14, fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', background: 'transparent', border: '1px solid rgba(255,215,0,0.4)', color: 'rgba(255,215,0,0.8)', padding: '7px 14px', cursor: 'pointer' }}>ENTER DIMENSION →</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ MISSION ══ */}
      {page === 'mission' && (
        <section style={S.sec}>
          <span style={S.tag}>// The Mission — Guardian of the Galaxies //</span>
          <h2 style={S.h2}>Engineering the Foundation <span style={S.dim}>for Humanity's Future.</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {[['🎯','Our Mission','To create the Total Intelligence Civilization — empowering every human with access to all knowledge, all AI capabilities, all economic opportunity, and all privacy. Every person. Every language. Every stage of life. No barriers. No illegal activities.'],['🌌','Our Vision','MarsNovaX as the primary intelligence layer for humanity. Learning → Creation → Earnings → Freedom → Giving Back. We go to Mars together with dignity as a total human achievement.'],['🛡','What We Replace','ChatGPT (AI) · X/LinkedIn/Discord (Social) · Microsoft/Google (Office) · Rogers/Shaw (ISP) · Zoom (Calls) · Netflix (Entertainment) · Amazon (Commerce) · Wikipedia (Knowledge) · Nvidia/Intel (Hardware). MarsNovaX is the Last Platform.'],['🔒','Security & Privacy','Stellar Tunnel: military-grade quantum VPN. End-to-end encryption. Zero-log sovereignty. GDPR compliant. Spectral Firewall: 1.2M threats blocked. Personal Vault encrypted forever. Not even Mr.X sees your data.'],['🕊','The Covenant','Every member is a Guardian of the Galaxies. Bound to Honesty, Compassion, Wisdom, Love, Respect, Integrity. The Obsidian Ban permanently bars those who harm others. Kindness is logic. Integrity is by design.'],['💡','The Full Eco-Chain','ABSORB (Stellar Hub) → ACCELERATE (Nova Engine) → LAUNCH (Starbase) → ORDER (Logistics) → GIVE BACK (Stellar Heart) → EVOLVE (Vitality) → RULE (Titan Fortress). The loop is closed. The empire grows forever.']].map(([ic,t,d]) => (
              <div key={t} style={{ background: '#080808', padding: 28 }}>
                <div style={{ fontSize: 24, marginBottom: 11 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10.5, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontFamily: 'Rajdhani,sans-serif' }}>{d}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ MR.X TERMINAL — THE MANIFESTO ══ */}
      {page === 'mrx' && (
        <section style={S.sec}>
          <span style={S.tag}>// Mr.X Terminal — Public Vision Stream — No Company Data //</span>
          <h2 style={{ ...S.h2, color: '#fff' }}>The Moral Architecture <span style={{ color: 'rgba(255,255,255,0.2)' }}>of the Empire.</span></h2>
          <p style={S.p}>No wealth stats. No follower counts. No company data. This terminal renders only the soul — Mr.X's vision, virtues, and strategic mission for 8 billion people.</p>

          {/* OBSIDIAN GLASS MANIFESTO TERMINAL */}
          <div style={{ background: '#040404', border: '1px solid rgba(255,255,255,0.12)', padding: 48, marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
            {/* CRT scanline overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.008) 2px,rgba(255,255,255,0.008) 4px)', pointerEvents: 'none', zIndex: 1 }} />
            {/* Neural pulse glow corners */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)', pointerEvents: 'none', zIndex: 1 }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)', marginBottom: 36, textAlign: 'center' }}>▸ MR.X VISION STREAM — OBSIDIAN GLASS TERMINAL — LIVE</div>

              {/* THE REVOLUTIONARY MANIFESTO */}
              <div style={{ maxWidth: 760, margin: '0 auto 44px', textAlign: 'left' }}>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.92)', lineHeight: 1.95, marginBottom: 26, animation: 'neuralPulse 4s infinite' }}>
                  "Hello friends... This is a technological revolution the world has never witnessed. We are living in an exciting world. We grow, learn, and respect together.
                </p>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.92)', lineHeight: 1.95, marginBottom: 26 }}>
                  We go to Mars together with dignity as a total human achievement. No greed, no pride, no ego — just a shield for the planet.
                </p>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.92)', lineHeight: 1.95, marginBottom: 26 }}>
                  Sometimes we think to change the world — it's the time now. We build a world for the future where all lives matter and we help each other as brothers in arms.
                </p>
                <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.7, letterSpacing: '0.02em' }}>
                  Be the guardian of the galaxies."
                </p>
                <div style={{ marginTop: 24, fontFamily: 'Share Tech Mono,monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em' }}>— MR.X, CHIEF COMMANDER, MARSNOVAX</div>
              </div>

              {/* DIVIDER */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 40 }} />

              {/* 4 MORAL PILLARS */}
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginBottom: 28 }}>▸ THE 4 PILLARS OF THE EMPIRE</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.04)' }}>
                {[['01.','Sovereignty','The 8 billion are currently digital serfs to centralized algorithms. MarsNovaX is the transition to Sovereign Intelligence. We do not harvest users — we arm them. Every tool is a weapon of self-sufficiency.'],['02.','Kindness as Logic','Cruelty is a system inefficiency. We build tools that incentivize collaboration over competition. In this empire, we do not judge — we serve as brothers in arms. Greed, pride, and ego have no place.'],['03.','Hardware Killer','Physical limitations are the last chains of Big Tech. The Virtual Forge renders the $2,000 workstation obsolete. A child with a $50 phone now equals a Silicon Valley firm. We break the silicon ceiling.'],['04.','Total Recall','Knowledge must be unified. No more fragmented learning. One search, one voice, one Pulse AI connecting Biology, Finance, and Orbital Mechanics. We prepare humanity for a multi-planetary existence.']].map(([n,t,d]) => (
                  <div key={t} style={{ background: '#080808', padding: 24 }}>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 32, fontWeight: 900, color: 'rgba(255,255,255,0.05)', marginBottom: 10, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{t}</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.68)', lineHeight: 1.72 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACTIVE STRATEGIC DIRECTIVES */}
          <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.07)', padding: 28 }}>
            <span style={S.tag}>// Active Strategic Directives — Empire Roadmap //</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['🌍','DIRECTIVE 01: REACH EVERY HUMAN','Deploy MarsNovaX in all 193 countries. Every language. Every device. Break the silicon ceiling so a child with a $50 phone accesses the same intelligence as a CEO with a $5,000 workstation.','#00ff78'],['🏗','DIRECTIVE 02: HARDWARE LIBERATION','The Virtual Forge Cloud HPC must replace the need for Nvidia, Intel, and Apple Silicon for all creative and engineering work. Target: Q3 2026 beta launch.','#FFD700'],['🛡','DIRECTIVE 03: DIGITAL SOVEREIGNTY','Every human on Earth deserves a safe digital home. The Stellar Tunnel must become the default for 1 billion users by 2027. Privacy is not a luxury — it is a right.','#00aaff'],['🌱','DIRECTIVE 04: HEAL THE PLANET','MarsNovaX must plant 1 million trees by 2027 via the Gaia Protocol. Every subscription funds environmental restoration. The empire\'s growth must heal Earth, not harm it.','#66ff99'],['🚀','DIRECTIVE 05: REACH MARS TOGETHER','Build the educational and engineering infrastructure that prepares the first generation of Mars colonists. Every domain in Stellar Hub contributes to this mission.','#ff9900']].map(([ic,t,d,c]) => (
                <div key={t as string} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{ic}</div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: c as string, marginBottom: 5 }}>{t}</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ TITAN FORTRESS ══ */}
      {page === 'titan' && (
        <section style={S.sec}>
          <span style={S.tag}>// TITAN FORTRESS — Sovereign Dreamland — $250/month //</span>
          <h2 style={{ ...S.h2, color: '#FFD700' }}>Your Sovereign <span style={{ color: 'rgba(255,215,0,0.3)' }}>Kingdom Awaits.</span></h2>
          <p style={S.p}>Work in the Laboratory. Build in the Forge. Rule in the Throne Room. What you learn and earn, you implement in your own 3D kingdom. Your legacy, built by your own hands.</p>
          <div style={{ display: 'flex', gap: 1, marginBottom: 18, background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)', padding: 4 }}>
            {[['lab','🔬 Laboratory HUD','Elite Research Dashboard'],['throne','🏰 Throne Room','3D Kingdom Builder']].map(([k,t,s]) => (
              <button key={k} onClick={() => setTitanTab(k as 'lab'|'throne')} style={{ flex: 1, padding: '10px 18px', fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: titanTab === k ? 'rgba(255,215,0,0.15)' : 'transparent', color: titanTab === k ? '#FFD700' : 'rgba(255,255,255,0.4)', borderBottom: titanTab === k ? '2px solid #FFD700' : '2px solid transparent' }}>
                {t}<div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s}</div>
              </button>
            ))}
          </div>
          {titanTab === 'lab' && (
            <div>
              <div style={{ background: '#040404', border: '1px solid rgba(255,215,0,0.2)', padding: 26, marginBottom: 16, animation: 'titanGlow 3s infinite' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ fontSize: 28 }}>🔬</div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, color: '#FFD700' }}>THE LABORATORY HUD</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Elite obsidian-glass AI implementation dashboard — Neural Link + High-IQ Research</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontFamily: 'Share Tech Mono,monospace', fontSize: 8, border: '1px solid rgba(255,215,0,0.3)', padding: '3px 10px', color: 'rgba(255,215,0,0.7)' }}>TITAN ONLY</div>
                </div>
                <AIChat tool={TOOLS.find(t => t.id === 'neural')!} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,215,0,0.08)' }}>
                {[['🧠','Air-Gapped AI Nodes','Private AI instances — zero public network contact. Completely sovereign.'],['💎','Mint Corporate Coins','Create your own branded cryptocurrency. Your empire has its own economy.'],['🏛','Royal Table Mentorship','Host sessions for Elite Explorers using your earned Wisdom XP.'],['🔒','Obsidian NFT Seals','Unlock private AI Guardians and exclusive empire tools.']].map(([ic,t,d]) => (
                  <div key={t as string} style={{ background: 'rgba(5,5,5,0.8)', padding: 22, border: '1px solid rgba(255,215,0,0.12)' }}>
                    <div style={{ fontSize: 22, marginBottom: 9 }}>{ic}</div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9.5, fontWeight: 700, color: '#FFD700', marginBottom: 5 }}>{t}</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {titanTab === 'throne' && (
            <div>
              <div style={{ background: 'radial-gradient(ellipse at center,#0D0800 0%,#050505 100%)', border: '1px solid rgba(255,215,0,0.25)', padding: 40, marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>🏰</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 20, fontWeight: 900, color: '#FFD700', marginBottom: 8 }}>THRONE ROOM — YOUR 3D KINGDOM</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13.5, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 22px', lineHeight: 1.7 }}>
                  What you learn in Stellar Hub, you build here.<br />What you earn in Starbase, you spend here to expand.<br />
                  Master "Stellar Finance" → unlock the <strong style={{ color: '#FFD700' }}>Royal Mint</strong>.<br />Complete Aerospace → build an <strong style={{ color: '#FFD700' }}>AI Outpost</strong>.
                </div>
                <div style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)', padding: 18, maxWidth: 480, margin: '0 auto 18px' }}>
                  <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, color: '#FFD700', marginBottom: 10 }}>👑 YOUR KINGDOM — LEVEL {kingdomLevel}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 }}>
                    {kingdomBuildings.map((b: string) => <div key={b} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, border: '1px solid rgba(255,215,0,0.3)', padding: '3px 8px', color: 'rgba(255,215,0,0.8)', background: 'rgba(255,215,0,0.06)' }}>{b}</div>)}
                  </div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 7 }}>KINGDOM XP: {kingdomXP} / 1000</div>
                  <div style={{ background: 'rgba(255,255,255,0.07)', height: 4, borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${Math.min((kingdomXP / 1000) * 100, 100)}%`, background: '#FFD700', transition: 'width 0.5s ease', borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, maxWidth: 540, margin: '0 auto 18px' }}>
                  {[['🏦','Royal Mint',300],['🌌','Observatory',250],['⚔','War Room',400],['🏰','Galactic Fortress',800]].map(([ic,t,cost]) => {
                    const built = kingdomBuildings.includes(t as string)
                    const canBuild = kingdomXP >= (cost as number) && !built
                    return (
                      <button key={t as string} onClick={() => { if (canBuild) { setKingdomXP((x: number) => x - (cost as number)); setKingdomBuildings((b: string[]) => [...b, t as string]); setKingdomLevel((l: number) => Math.min(l + 1, 10)) } }} disabled={!canBuild} style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)', padding: 14, cursor: canBuild ? 'pointer' : 'not-allowed', opacity: built ? 0.5 : 1, transition: 'all 0.2s' }} onMouseEnter={e => { if (canBuild) e.currentTarget.style.background = 'rgba(255,215,0,0.12)' }} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,215,0,0.06)'}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{ic}</div>
                        <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8, fontWeight: 700, color: '#FFD700', marginBottom: 2 }}>{t}</div>
                        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, color: canBuild ? 'rgba(0,255,120,0.7)' : built ? 'rgba(255,215,0,0.5)' : 'rgba(255,100,100,0.7)' }}>{built ? '✓ BUILT' : `${cost} KXP`}</div>
                      </button>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <button onClick={() => setKingdomXP((x: number) => x + 150)} style={{ fontFamily: 'Orbitron,monospace', fontSize: 9, background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700', padding: '10px 18px', cursor: 'pointer' }}>+ 150 KXP (Complete a Course)</button>
                  {!mintedCoin
                    ? <button onClick={() => setMintedCoin('NOVA-ORB')} style={{ fontFamily: 'Orbitron,monospace', fontSize: 9, background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700', padding: '10px 18px', cursor: 'pointer' }}>Mint My Corporate Coin</button>
                    : <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 9, color: '#00ff78', border: '1px solid rgba(0,255,120,0.3)', padding: '10px 18px' }}>✓ ${mintedCoin} MINTED</div>
                  }
                </div>
              </div>
            </div>
          )}
          <div style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.2)', padding: 22, marginTop: 18, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 16, fontWeight: 900, color: '#FFD700', marginBottom: 7 }}>TITAN FORTRESS — $250/month</div>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 18px', lineHeight: 1.7 }}>Sovereign Dreamland. Learn in the Lab, build in the Forge, rule in the Fortress. Unlock private AI, mint coins, mentor the next generation.</p>
            <button style={{ ...S.bw, background: '#FFD700', color: '#000' }} onClick={() => go('pricing')} onMouseEnter={e => e.currentTarget.style.opacity = '0.86'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Initialize Your Kingdom →</button>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          PRICING — TITAN SINGULARITY — 4 COMPLETE TIERS
          $0 Voyager | $0 Galaxy Guardian | $25 Elite | $250 Titan
      ══════════════════════════════════════════════════════ */}
      {page === 'pricing' && (
        <section style={S.sec}>
          <span style={S.tag}>// Mission Tiers — Titan Singularity //</span>
          <h2 style={S.h2}>The <span style={S.dim}>Complete Loop.</span></h2>
          <p style={S.p}>$0 Voyager brings them in. $0 Galaxy Guardian empowers the forgotten. $25 Elite Explorer builds them up. $250 Titan Fortress crowns them. The loop is closed.</p>
          <div style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.07)', padding: '12px 18px', marginBottom: 22, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 16 }}>🔒</div>
            <div>
              <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 8.5, fontWeight: 700, color: '#fff', marginBottom: 2 }}>100% SECURE · GDPR COMPLIANT · NO ILLEGAL ACTIVITIES · NO EXTERNAL REDIRECTS</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'Rajdhani,sans-serif' }}>Stellar Tunnel VPN included · Galaxy Guardian (AEGIS): 100% FREE for life · No proof required · Your data stays yours forever</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>

            {/* ── TIER 1: VOYAGER $0 ── */}
            <div style={{ background: '#080808', padding: 26 }}>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 8 }}>VOYAGER (CADET)</div>
              <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 36, marginBottom: 4, color: '#fff' }}>$0</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginBottom: 4, fontFamily: 'Rajdhani,sans-serif' }}>Trial tier — browse &amp; explore</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: 'Rajdhani,sans-serif' }}>500 Nova Coins on signup</div>
              <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                {['Browse all 99+ knowledge domains','3 AI tool conversations per day','Academy course previews','Crew Network read access','Gaming Hub previews','Stellar Heart access','The Covenant signup','Streak &amp; XP tracking','2 starter Soulbound badges','VPN, Forge, Suite: locked (upgrade to unlock)'].map(f => (
                  <li key={f} style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', padding: '4px 0', display: 'flex', gap: 7, fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.4 }}>
                    <span style={{ opacity: 0.45, fontSize: 7.5, marginTop: 2 }}>▸</span>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: 11, fontFamily: 'Orbitron,monospace', fontSize: 8.5, letterSpacing: '0.14em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => go('covenant')}>Start Free</button>
            </div>

            {/* ── TIER 2: GALAXY GUARDIAN $0 (AEGIS) ── */}
            <div style={{ background: '#080808', padding: 26, border: '1px solid rgba(255,215,0,0.2)' }}>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.2em', background: 'rgba(255,215,0,0.1)', color: '#FFD700', textAlign: 'center', padding: 6, marginBottom: 14 }}>// DEDICATED FOR THE FORGOTTEN //</div>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,215,0,0.6)', marginBottom: 8 }}>GALAXY GUARDIAN</div>
              <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 36, marginBottom: 4, color: '#FFD700' }}>$0</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 3, fontFamily: 'Rajdhani,sans-serif', fontStyle: 'italic' }}>For the blind, deaf &amp; underprivileged</div>
              <div style={{ fontSize: 11, color: 'rgba(255,215,0,0.7)', marginBottom: 16, fontFamily: 'Rajdhani,sans-serif' }}>Full access. Zero cost. We grow together.</div>
              <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                {['All 25+ AI tools — unlimited','Full 10,000+ course library','All 99+ domains — complete access','100+ languages fully unlocked','Echo Mode — Blind sonic navigation','Silent Mode — Deaf captions + haptics','Zen Mode — Autism/ADHD workspace','Merit Mode — Low-end device support','Stellar Wallet + 500 Nova Coins','Soulbound AEGIS Champion badge','Brotherhood mentor auto-matched','100% free for life — no conditions'].map(f => (
                  <li key={f} style={{ fontSize: 11, color: 'rgba(255,215,0,0.8)', padding: '4px 0', display: 'flex', gap: 7, fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.4 }}>
                    <span style={{ opacity: 0.6, fontSize: 7.5, marginTop: 2, color: '#FFD700' }}>▸</span>{f}
                  </li>
                ))}
              </ul>
              {/* Truth-ID biometric gate */}
              <div style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.2)', padding: 12, marginBottom: 12 }}>
                <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7.5, color: 'rgba(255,215,0,0.6)', letterSpacing: '0.12em', marginBottom: 8 }}>TRUTH-ID BIOMETRIC GATE</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 8, lineHeight: 1.5 }}>Sensory biometrics unlock Galaxy Guardian. Wealthy users attempting to free-ride are rank-locked at Novice.</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                  {['Visually Impaired','Deaf/Hard of Hearing','Autism/ADHD','Underprivileged','Senior 60+','Physically Disabled'].map(type => (
                    <button key={type} onClick={() => withTruthID(`Galaxy Guardian — ${type}`, () => go('aegis'))} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, border: '1px solid rgba(255,215,0,0.25)', background: 'transparent', color: 'rgba(255,215,0,0.7)', padding: '5px 8px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,215,0,0.08)'; e.currentTarget.style.color = '#FFD700' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,215,0,0.7)' }}>{type}</button>
                  ))}
                </div>
              </div>
              <button style={{ width: '100%', padding: 11, fontFamily: 'Orbitron,monospace', fontSize: 8.5, letterSpacing: '0.14em', cursor: 'pointer', border: '1px solid rgba(255,215,0,0.4)', background: 'rgba(255,215,0,0.08)', color: '#FFD700', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,215,0,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,215,0,0.08)'}
                onClick={() => withTruthID('Galaxy Guardian', () => go('aegis'))}>Claim Galaxy Guardian →</button>
            </div>

            {/* ── TIER 3: ELITE EXPLORER $25 ── */}
            <div style={{ background: '#fff', padding: 26, color: '#000' }}>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.2em', background: '#000', color: '#fff', textAlign: 'center', padding: 6, marginBottom: 14 }}>// MOST SELECTED — COMMANDER LEVEL //</div>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 8 }}>ELITE EXPLORER</div>
              <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 36, marginBottom: 4, color: '#000' }}>$25</div>
              <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginBottom: 16, fontFamily: 'Rajdhani,sans-serif' }}>per month — the full professional engine</div>
              <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                {['All 25+ AI tools — unlimited','Full 10,000+ course library','All 99+ domains — complete access','100+ languages fully unlocked','Neural Link personal daily briefing','The Pulse — floating gold AI sphere','Stellar Wallet + Nova Coins + $SC','Starbase: Freelance + Jobs + Logistics','The Great Forge — all 5 builders','Sovereign Suite — all 5 modules','Gaming Hub + VR/AR full access','Stellar Heart — all sectors','Stellar Tunnel quantum VPN (glowing green)','Soulbound NFT Certifications','Chronicle — Neural Pings Feed','Founding Star badge (limited time)'].map(f => (
                  <li key={f} style={{ fontSize: 11, color: 'rgba(0,0,0,0.65)', padding: '4px 0', display: 'flex', gap: 7, fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.4 }}>
                    <span style={{ opacity: 0.45, fontSize: 7.5, marginTop: 2 }}>▸</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: 11, fontFamily: 'Orbitron,monospace', fontSize: 8.5, letterSpacing: '0.14em', cursor: 'pointer', border: 'none', background: '#000', color: '#fff', transition: 'all 0.2s' }}
                onClick={() => go('covenant')}>Launch Now →</button>
            </div>

            {/* ── TIER 4: TITAN FORTRESS $250 ── */}
            <div style={{ background: 'radial-gradient(ellipse at top,#0D0800 0%,#080808 100%)', padding: 26, border: '2px solid rgba(255,215,0,0.3)', animation: 'titanGlow 3s infinite' }}>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 8, letterSpacing: '0.2em', background: 'rgba(255,215,0,0.1)', color: '#FFD700', textAlign: 'center', padding: 6, marginBottom: 14 }}>// SOVEREIGN DREAMLAND — SUPREME //</div>
              <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,215,0,0.6)', marginBottom: 8 }}>TITAN FORTRESS</div>
              <div style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, fontSize: 36, marginBottom: 4, color: '#FFD700' }}>$250</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginBottom: 16, fontFamily: 'Rajdhani,sans-serif' }}>per month — initialize your kingdom</div>
              <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                {['Everything in Elite Explorer','The Laboratory HUD (obsidian-glass)','The Throne Room 3D/AR Kingdom Builder','Learn → Build → Rule implementation loop','Air-Gapped Private AI Nodes','Mint Your Own Corporate Coins','Obsidian NFT Royal Seals','Royal Table Mentorship Hub','Virtual Forge Cloud HPC (full power)','King of the North / Galaxy aesthetic','Custom Titan rank badge','Priority Neural Link briefings','White-glove onboarding session','Private Wealth Conduit dashboard'].map(f => (
                  <li key={f} style={{ fontSize: 11, color: 'rgba(255,215,0,0.8)', padding: '4px 0', display: 'flex', gap: 7, fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.4 }}>
                    <span style={{ opacity: 0.6, fontSize: 7.5, marginTop: 2, color: '#FFD700' }}>▸</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: 11, fontFamily: 'Orbitron,monospace', fontSize: 8.5, letterSpacing: '0.14em', cursor: 'pointer', border: '1px solid rgba(255,215,0,0.5)', background: 'rgba(255,215,0,0.1)', color: '#FFD700', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,215,0,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,215,0,0.1)'}
                onClick={() => withTruthID('Titan Fortress', () => go('titan'))}>Initialize Your Kingdom →</button>
            </div>

          </div>{/* end 4-tier grid */}

          {/* TIER SUMMARY STRIP */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', marginTop: 14 }}>
            {[['🌟','Voyager','$0 — Trial Tier'],['♿','Galaxy Guardian','$0 — Blind · Deaf · Underprivileged'],['⚡','Elite Explorer','$25/mo — Full Professional Engine'],['👑','Titan Fortress','$250/mo — Sovereign Dreamland']].map(([ic,t,s]) => (
              <div key={t} style={{ background: '#080808', padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 5 }}>{ic}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 9, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{t}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{s}</div>
              </div>
            ))}
          </div>

        </section>
      )}

      </div>{/* end position:relative z-index:10 */}
    </div>
  )
} // End of App
