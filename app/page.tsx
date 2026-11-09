import Image from "next/image";

const github = "https://github.com/Prince18-code";
const linkedin = "https://linkedin.com/in/prince-shukla341254330";
const leetcode = "https://leetcode.com/u/prince_18_code/";
const email = "2431871.prince@gmail.com";

function SocialIcon({ type }: { type: "github" | "linkedin" | "mail" | "leetcode" }) {
  if (type === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.63c.55.1.76-.24.76-.54v-2.13c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .71 2.63.5 3.27.38.1-.72.4-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.43.11-2.97 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.69.11 2.97.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.52.4.35.76 1.02.76 2.06v3.28c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
  if (type === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 2H3.55C2.7 2 2 2.67 2 3.5v17c0 .83.7 1.5 1.55 1.5h16.9c.86 0 1.55-.67 1.55-1.5v-17c0-.83-.7-1.5-1.55-1.5ZM7.93 18.7H4.99V9.24h2.94v9.46ZM6.46 7.95a1.7 1.7 0 1 1 .02-3.4 1.7 1.7 0 0 1-.02 3.4ZM19 18.7h-2.94v-4.6c0-1.1-.02-2.51-1.53-2.51-1.54 0-1.78 1.2-1.78 2.43v4.68H9.8V9.24h2.82v1.29h.04a3.1 3.1 0 0 1 2.79-1.53c2.98 0 3.53 1.96 3.53 4.5v5.2Z" /></svg>;
  if (type === "mail") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8L4 7v10h16V7l-8 6Zm0-2.3L19 7H5l7 3.7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 2.5 6.8v10.4L12 22.5l9.5-5.3V6.8L12 1.5Zm0 3.1 5.7 3.2-5.7 3.1-5.7-3.1L12 4.6Zm-6.5 5 5 2.8v6.1l-5-2.8V9.6Zm13 6.1-5 2.8v-6.1l5-2.8v6.1Z" /></svg>;
}

const skillAssets: Record<string, string> = {
  JavaScript: "/js.png", React: "/react.png", "React.js": "/react.png", HTML5: "/html.png", CSS3: "/css.png",
  "Node.js": "/node-js.png", "Express.js": "/express.png", MongoDB: "/mongodb.png", "Google Gemini API": "/Firebase.png",
  C: "/c.svg", "C++": "/cpp.svg", GitHub: "/github-skill.svg",
};

const skillMarks: Record<string, string> = {
  "C++": "C++", C: "C", Python: "Py", SQL: "SQL", "REST APIs": "API", "JWT Authentication": "JWT",
  "Oracle SQL": "SQL", DBMS: "DB", "Python for Data Science": "Py", Git: "Git", GitHub: "GH", "VS Code": "VS",
  "Data Structures & Algorithms": "DSA", "Object-Oriented Programming": "OOP",
};

const skillRows = [
  ["JavaScript", "React.js", "HTML5", "CSS3", "Node.js", "MongoDB", "Express.js"],
  ["C++", "C", "Python", "SQL", "REST APIs", "JWT Authentication"],
  ["Google Gemini API", "Oracle SQL", "DBMS", "Python for Data Science", "Git"],
  ["GitHub", "VS Code", "Data Structures & Algorithms", "Object-Oriented Programming"],
];

const projects: Array<{ n: string; name: string; symbol: string; desc: string; stack: string; art: string; href?: string }> = [
  { n: "01", name: "Task AI", symbol: "AI", desc: "An AI-integrated productivity dashboard that turns complex goals into actionable nested tasks.", stack: "React.js · Node.js · Express.js · Gemini API · MongoDB", art: "task-art" },
  { n: "02", name: "AlphaChat", symbol: "AC", desc: "A real-time chat platform with private messaging, JWT authentication, and live user presence.", stack: "React.js · Node.js · Express.js · Socket.io · MongoDB", art: "chat-art", href: "https://alphachateight.vercel.app" },
  { n: "03", name: "Purpose", symbol: "P", desc: "A full-stack commerce application with product filtering, sorting, centralized cart state, and CRUD operations.", stack: "React.js · Node.js · Express.js · MongoDB", art: "purpose-art", href: "https://purposestores.vercel.app" },
  { n: "04", name: "Disaster Alert", symbol: "DA", desc: "A web application providing real-time weather and disaster alerts with practical safety suggestions.", stack: "HTML · CSS · JavaScript · APIs", art: "disaster-art" },
];

export default function Home() {
  return <main id="top" className="portfolio">
    <header className="topbar">
      <a className="brand" href="#top"><Image className="brand-logo" src="/NavLogo.png" alt="" width={35} height={35}/><span>PRINCE SHUKLA</span></a>
      <nav className="main-nav" aria-label="Main navigation"><a href="#about">About me</a><a href="#skills">Skills</a><a href="#projects">Projects</a></nav>
      <div className="top-social"><a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"><SocialIcon type="github" /></a><a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon type="linkedin" /></a><a href={leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><SocialIcon type="leetcode" /></a></div>
    </header>

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <video className="blackhole-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/blackhole.webm" type="video/webm" /></video>
      <div className="hero-copy">
        <p className="hero-label"><span>✧</span> Fullstack Developer Portfolio</p>
        <h1 id="hero-title">Building the <em>future</em><br />with thoughtful code.</h1>
        <p className="hero-description">I’m Prince Shukla, a Full Stack Developer passionate about building modern, scalable and user-focused digital experiences.</p>
        <a className="hero-cta" href="#about">Learn More! <span>↗</span></a>
      </div>
      <div className="orbit-system"><Image src="/mainIconsdark.svg" alt="Floating icons for web technologies" width={610} height={610}/></div>
      <a className="down-cue" href="#about" aria-label="Scroll to About me"><span /></a>
    </section>

    <section id="about" className="about-section section-shell">
      <div className="about-layout"><div className="about-heading"><p className="section-kicker">A LITTLE ABOUT MY JOURNEY</p><h2>About <em>Prince.</em></h2></div>
        <div className="about-copy"><p className="about-lead">BCA undergraduate with hands-on experience building full-stack applications in JavaScript and Python, including AI-integrated productivity tools.</p><p>Strong foundation in data structures, object-oriented programming and databases. I enjoy taking ideas from first sketch to a thoughtful, working product.</p><div className="education-line"><span className="education-dot"/><div><small>2023 — 2027 · KANPUR, INDIA</small><strong>BCA — PSIT College of Higher Education</strong><span>CSJM University · 76.66% through 4th semester</span></div></div></div>
      </div>
    </section>

    <section id="skills" className="skills-section section-shell">
      <div className="skills-heading"><p className="section-kicker"><span>✧</span> Think better with modern technology</p><h2>Making apps with modern technologies</h2><p>Never miss a task, deadline or idea</p></div>
      <div className="skills-showcase"><video className="skills-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/cards-video.webm" type="video/webm" /></video><div className="skill-logo-rows">{skillRows.map((row, index) => <div className="skill-logo-row" key={index}>{row.map((item) => <span className="skill-logo" key={item} title={item} aria-label={item}>{skillAssets[item] ? <Image src={skillAssets[item]} alt={item} width={72} height={72}/> : <b>{skillMarks[item] ?? item.slice(0, 2)}</b>}</span>)}</div>)}</div></div>
      <p className="security-transition-title">Performance <span>&amp;</span> Security</p>
    </section>

    <section className="security-section section-shell">
      <div className="security-layout"><div className="lock-scene"><video className="encryption-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/encryption.webm" type="video/webm" /></video><div className="lock-group"><Image className="lock-top" src="/LockTop.png" alt="" width={50} height={50}/><Image className="lock-main" src="/LockMain.png" alt="" width={70} height={70}/></div></div><div className="security-copy"><h2>Encryption</h2><p className="encryption-tagline">Secure your data with end-to-end encryption</p></div></div>
    </section>

    <section id="projects" className="projects-section section-shell">
      <div className="projects-heading"><h2>My Projects</h2></div>
      <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.name}><div className={`project-visual ${project.art}`}><div className="project-visual-grid"/><div className="project-visual-orb"/><span className="project-visual-mark">{project.symbol}</span><span className="project-index">{project.n}</span></div><h3>{project.name}</h3><p>{project.desc}</p><div className="project-stack">{project.stack}</div>{project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer">View project <span aria-hidden="true">↗</span></a>}</article>)}</div>
    </section>

    <footer className="site-footer"><div className="footer-top"><div className="footer-column"><h3>Community</h3><a href={github} target="_blank" rel="noreferrer">GitHub</a><a href={leetcode} target="_blank" rel="noreferrer">LeetCode</a></div><div className="footer-column"><h3>Social Media</h3><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${email}`}>Email</a></div><div className="footer-column"><h3>About</h3><a href="#about">Learning about me</a><a href="#projects">My projects</a></div></div><div className="footer-bottom"><span>© 2026 PRINCE SHUKLA. ALL RIGHTS RESERVED.</span><span>KANPUR, INDIA <i>·</i> MADE WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
  </main>;
}
