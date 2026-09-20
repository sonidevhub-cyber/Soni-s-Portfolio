import { useState, useEffect } from 'react'

interface NavItem {
  id: string
  label: string
}

interface Skill {
  category: string
  items: string[]
}

interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  screenshot: string
}

interface ContactInfo {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  href?: string
}

interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  href: string
}

interface Stat {
  number: string
  label: string
}

const Icons = {
  sun: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  menu: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  x: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  github: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  mail: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  mapPin: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  briefcase: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  arrowRight: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  externalLink: ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
}

function App() {
  const [theme, setTheme] = useState<string>('dark')
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections: string[] = ['home', 'about', 'skills', 'projects', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const skills: Skill[] = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Django', 'Django REST Framework', 'Python', 'REST APIs', 'OOP'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'Database Design', 'SQL Optimization'],
    },
    {
      category: 'Tools & Concepts',
      items: ['Git', 'Linux', 'System Architecture', 'REST API Design', 'PDF Reporting', 'WeasyPrint'],
    },
  ]

  const projects: Project[] = [
    {
      title: 'EduOBE — Academic Management System',
      description:
        'Full-stack academic management platform with role-based dashboards, course and batch management, assessment tracking, reporting workflows, and PDF generation for institutional use.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Django', 'DRF', 'PostgreSQL'],
      link: 'https://familiar-playlist-unwashed.ngrok-free.dev',
      screenshot: '/image.png',
    },
    {
      title: 'Reports & Analytics Dashboard',
      description:
        'Dashboards for academic reports with data visualization, filtering, and PDF export. Includes attainment analysis, closing review workflows, and summary reporting for administration.',
      tech: ['Python', 'Django', 'React', 'Chart.js', 'PDF Reports'],
      link: '#',
      screenshot: '/Dashboard.png',
    },
    {
      title: 'Survey & Feedback Portal',
      description:
        'Survey and feedback workflows with form management, access gating, response tracking, and analytics views for students and administrators.',
      tech: ['Django', 'React', 'PostgreSQL', 'Analytics'],
      link: '#',
      screenshot: '/Survey.png',
    },
    {
      title: 'Database Design & SQL Project',
      description:
        'Normalized relational database design, schema planning, and optimized SQL implementations for academic and administrative data management.',
      tech: ['SQL', 'PostgreSQL', 'Database Design'],
      link: '#',
      screenshot: '/db.png',
    },
  ]

  const contactInfo: ContactInfo[] = [
    { icon: Icons.mail, label: 'Email', value: 'soniasultan645@gmail.com', href: 'mailto:soniasultan645@gmail.com' },
    { icon: Icons.mapPin, label: 'Location', value: 'Wah Cantt, Pakistan' },
    { icon: Icons.briefcase, label: 'Focus', value: 'Full Stack Development, Backend Systems, EdTech' },
  ]

  const socialLinks: SocialLink[] = [
    { icon: Icons.linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/sonia-sultan-957467399' },
    { icon: Icons.github, label: 'GitHub', href: 'https://github.com/sonidevhub-cyber' },
  ]

  const stats: Stat[] = [
    { number: '1+', label: 'Major Projects' },
    { number: '10+', label: 'Integrated Modules' },
    { number: '2026', label: 'Expected Graduation' },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['Inter']">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[rgba(212,175,55,0.15)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('home') }}
            className="font-['Space_Grotesk'] text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] bg-clip-text text-transparent"
          >
            Sonia Sultan
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.id ? 'text-[#d4af37]' : 'text-[#b0b0c0] hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Icons.sun size={18} /> : <Icons.moon size={18} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <Icons.x size={20} /> : <Icons.menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-0 bg-[#0a0a0f]/95 backdrop-blur-xl transition-all duration-500 ${
            mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                className="text-3xl font-['Space_Grotesk'] font-bold text-white hover:text-[#d4af37] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-between max-w-7xl mx-auto px-6 pt-24 pb-12 relative overflow-hidden code-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37] rounded-full blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#b8942e] rounded-full blur-[100px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b7355] rounded-full blur-[150px] opacity-10" />
        </div>

        <div className="flex-1 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[rgba(212,175,55,0.15)] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <span className="text-xs font-medium text-[#d4af37] uppercase tracking-wider">Open to Work</span>
          </div>

          <h1 className="font-['Space_Grotesk'] text-6xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
            <span className="block text-[#b0b0c0] text-3xl md:text-4xl font-normal mb-3">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-[#d4af37] via-[#f4e4bc] to-[#b8942e] bg-clip-text text-transparent mb-3">
              Sonia Sultan
            </span>
            <span className="block text-[#b0b0c0] text-3xl md:text-4xl font-medium">Full Stack Developer</span>
          </h1>

          <p className="text-lg text-[#e2e8f0] leading-relaxed mb-10 max-w-lg font-light">
            BS Information Technology student building production-style systems with Django, DRF, React, TypeScript, and PostgreSQL. Experienced in backend refactoring, REST API design, and full-stack project delivery.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollTo('projects') }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b8942e] text-[#0a0a0f] font-bold shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              View Projects
              <Icons.arrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[rgba(212,175,55,0.3)] text-white font-semibold hover:bg-white/5 hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[rgba(212,175,55,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="block font-['Space_Grotesk'] text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] bg-clip-text text-transparent">
                  {stat.number}
                </span>
                <span className="block text-xs text-[#6b6b7b] mt-1 uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-1 relative h-[600px] items-center justify-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 border border-[rgba(212,175,55,0.2)] rounded-xl rotate-12 animate-pulse" />
            <div className="absolute bottom-20 left-20 w-24 h-24 border border-[rgba(212,175,55,0.12)] rounded-lg -rotate-6" />
            <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-[rgba(212,175,55,0.25)] rounded-md rotate-45" />
            <div className="absolute bottom-1/3 right-20 w-40 h-40 border border-[rgba(212,175,55,0.08)] rounded-full" />
            <div className="absolute top-20 left-1/4 text-[#d4af37]/15 code-text text-sm">
              {`const system = { stack: ["Django", "React", "PostgreSQL"] };`}
            </div>
            <div className="absolute bottom-32 right-1/3 text-[#d4af37]/15 code-text text-sm">
              {`function buildAPI() { return scalable; }`}
            </div>
            <div className="absolute top-1/2 left-10 text-[#d4af37]/10 code-text text-xs">
              {`git push --prod`}
            </div>
          </div>
          <div className="relative w-full max-w-lg">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="/hero-main.jpg"
                alt="Sonia Sultan Portfolio"
                className="w-[320px] h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#d4af37] rounded-full blur-[80px] opacity-30" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#b8942e] rounded-full blur-[80px] opacity-20" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-16">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xl text-[#b0b0c0] leading-relaxed">
                I'm <strong className="text-white">Sonia Sultan</strong>, a full-stack developer from Wah Cantt, Pakistan, focused on building clean, maintainable web systems.
              </p>
              <p className="text-[#b0b0c0] leading-relaxed">
                I completed a Python/Django backend internship where I refactored legacy code using OOP and built production-style REST APIs. My flagship project is a full-stack academic management system with role-based access, reporting workflows, and PDF generation.
              </p>
              <p className="text-[#b0b0c0] leading-relaxed">
                I care about structured backend design, clean UI implementation, and delivering features end-to-end. I'm comfortable with PostgreSQL schema design, Django/DRF backend logic, and React/TypeScript frontends.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {[
                  { title: 'Full Stack', desc: 'Django + React delivery' },
                  { title: 'Clean Architecture', desc: 'APIs, RBAC, and reporting' },
                  { title: 'Database First', desc: 'Schema design and SQL optimization' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[rgba(212,175,55,0.3)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] transition-all duration-300"
                  >
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-[#6b6b7b]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(212,175,55,0.3)]">
                  <img
                    src="/hero-main.jpg"
                    alt="Sonia Sultan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-6 left-6 right-[-20px] bottom-[-20px] border-2 border-[#d4af37] rounded-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-16">
            Skills & Technologies
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[rgba(212,175,55,0.3)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-[rgba(212,175,55,0.1)] text-sm text-[#b0b0c0] hover:bg-[#d4af37] hover:text-[#0a0a0f] hover:border-[#d4af37] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
       </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-16">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-[rgba(212,175,55,0.3)] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(212,175,55,0.15)] transition-all duration-300"
              >
                <div className="relative h-56 bg-gradient-to-br from-[#d4af37] to-[#b8942e] flex items-center justify-center overflow-hidden">
                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-2xl font-['Space_Grotesk'] font-bold text-white/80">
                      {project.title.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    {project.link && project.link.startsWith('http') ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0a0a0f] transition-all">
                        Open App
                      </a>
                    ) : (
                      <a href={project.link || '#'} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0a0a0f] transition-all">
                        View Details
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-[#b0b0c0] leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-[#1a1a24] text-xs text-[#d4af37] font-mono font-medium border border-[rgba(212,175,55,0.1)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-16">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-['Space_Grotesk'] font-bold mb-6">Let's work together</h3>
              <p className="text-[#b0b0c0] leading-relaxed mb-10">
                I'm available for internships, full-stack development work, and backend-focused projects.
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-[#b0b0c0] hover:text-[#d4af37] transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-[#b0b0c0]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b0b0c0] hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0a0a0f] hover:-translate-y-1 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setFormSubmitted(true)
                setTimeout(() => setFormSubmitted(false), 3000)
              }}
              className="space-y-6"
            >
              {['name', 'email', 'subject'].map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label htmlFor={field} className="text-sm font-semibold text-white capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    required
                    className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-[#6b6b7b] focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] transition-all duration-300"
                    placeholder={`Your ${field}`}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-white">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-[#6b6b7b] focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b8942e] text-[#0a0a0f] font-bold shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300"
              >
                {formSubmitted ? 'Message Sent!' : 'Send Message'}
                {!formSubmitted && <Icons.arrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[rgba(212,175,55,0.1)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#6b6b7b] text-sm">
            &copy; {new Date().getFullYear()} Sonia Sultan. All rights reserved.
          </p>
          <p className="text-[#d4af37] text-sm mt-2">Sonia's Portfolio</p>
        </div>
      </footer>
    </div>
  )
}

export default App
