import { motion } from 'framer-motion'
import { FormEvent, useEffect, useMemo, useState } from 'react'

const kpis = [
  { label: 'Total Employees', value: 1245, color: 'from-sky-500 to-cyan-400' },
  { label: 'Pending Offers', value: 32, color: 'from-violet-500 to-fuchsia-500' },
  { label: 'Approved Offers', value: 156, color: 'from-emerald-400 to-teal-400' },
  { label: 'Rejected Offers', value: 18, color: 'from-rose-500 to-orange-400' },
  { label: 'Active Recruitments', value: 24, color: 'from-blue-500 to-indigo-500' },
]

const activityFeed = [
  { title: 'Offer letter sent', description: 'Offer sent to Aarav Mehta', time: '3 min ago' },
  { title: 'Offer accepted', description: 'Priya Sharma accepted the offer', time: '18 min ago' },
  { title: 'New employee added', description: 'Profile created for Sneha Patel', time: '45 min ago' },
  { title: 'Interview scheduled', description: 'UX designer interview on Tue', time: '1h ago' },
  { title: 'Rejected offer logged', description: 'Offer declined by Anil Kumar', time: '2h ago' },
]

const scheduleItems = [
  { time: '09:30 AM', candidate: 'Rohan Gupta', role: 'Product Designer' },
  { time: '11:00 AM', candidate: 'Meera Iyer', role: 'HR Specialist' },
  { time: '01:30 PM', candidate: 'Vikram Singh', role: 'Backend Engineer' },
  { time: '03:00 PM', candidate: 'Aditi Varma', role: 'Finance Lead' },
]

const offerTemplates = [
  {
    title: 'Standard Offer Letter',
    description: 'A clean, professional letter for full-time hires.',
    tags: ['Full-time', 'Clear terms', 'Balanced tone'],
    preview: `Dear {{candidateName}},\n\nWe are pleased to offer you the position of {{jobTitle}} at {{companyName}}. Your start date will be {{startDate}}, and you will report to {{managerName}}.\n\nSalary: {{salary}} per annum\nBenefits: Health insurance, paid time off, and performance bonus.\n\nPlease sign and return this letter by {{deadline}}.\n\nSincerely,\n{{hrName}}`,
    accent: 'from-sky-500 to-cyan-400',
  },
  {
    title: 'Executive Offer Letter',
    description: 'A premium offer for leadership roles with executive-level formatting.',
    tags: ['Executive', 'Senior hire', 'High impact'],
    preview: `Dear {{candidateName}},\n\nWe are delighted to extend an executive offer for the position of {{jobTitle}} at {{companyName}}. Your leadership will be instrumental in driving strategic growth.\n\nBase compensation: {{salary}} per annum\nEquity: {{equityPackage}}\nAdditional perks: Executive coaching, travel allowance, and premium insurance.\n\nPlease review and confirm by {{deadline}}.\n\nWarm regards,\n{{ceoName}}`,
    accent: 'from-emerald-400 to-teal-400',
  },
  {
    title: 'Internship Offer Letter',
    description: 'A friendly and approachable template tailored for interns.',
    tags: ['Intern', 'Flexible terms', 'Mentorship'],
    preview: `Hi {{candidateName}},\n\nWe are excited to offer you an internship position as {{jobTitle}} at {{companyName}}. Your internship will begin on {{startDate}} and run through {{endDate}}.\n\nStipend: {{stipend}}\nMentor: {{mentorName}}\nSchedule: {{weeklyHours}} per week\n\nWelcome aboard — we look forward to helping you grow.\n\nBest,\n{{hrName}}`,
    accent: 'from-violet-500 to-fuchsia-500',
  },
]

const chartPoints = [80, 95, 90, 118, 105, 136, 128]
const statusSegments = [
  { label: 'Draft', value: 22, color: 'from-slate-500 to-slate-400' },
  { label: 'Sent', value: 44, color: 'from-blue-500 to-cyan-400' },
  { label: 'Accepted', value: 26, color: 'from-emerald-400 to-teal-400' },
  { label: 'Rejected', value: 8, color: 'from-rose-500 to-orange-400' },
]

const navItems = [
  'Dashboard',
  'Employees',
  'Offer Letters',
  'Recruitment',
  'Approvals',
  'Calendar',
  'Reports',
  'Notifications',
  'Settings',
]

const formatValue = (value: number) => value.toLocaleString()

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('olmsLoggedIn') === 'true'
  })
  const [mobilePreview, setMobilePreview] = useState(false)
  const [offerCreated, setOfferCreated] = useState(false)
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)
  const [templateUsed, setTemplateUsed] = useState<string | null>(null)
  const [templates, setTemplates] = useState(offerTemplates)
  const [isEditingTemplate, setIsEditingTemplate] = useState(false)
  const [templateDraft, setTemplateDraft] = useState(offerTemplates[0].preview)

  useEffect(() => {
    localStorage.setItem('olmsLoggedIn', loggedIn ? 'true' : 'false')
  }, [loggedIn])

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoggedIn(true)
  }

  const totalStatus = useMemo(
    () => statusSegments.reduce((sum, item) => sum + item.value, 0),
    [],
  )

  return (
    <div className="min-h-screen overflow-hidden px-4 py-6 sm:px-8">
      {!loggedIn ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[1.05fr_1fr]"
        >
          <section className="relative flex flex-col justify-center overflow-hidden rounded-[32px] border border-white/10 bg-[#040b19]/80 p-10 shadow-glass backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,141,255,0.18),transparent_28%),radial-gradient(circle_at_50%_20%,rgba(74,213,255,0.12),transparent_18%)]" />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-sky-500/10">
                <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]" />
                OLMS · Offer Letter Management System
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800/80 shadow-[0_20px_80px_rgba(56,189,248,0.12)] ring-1 ring-white/10">
                    <span className="text-xl font-black tracking-[0.18em] text-sky-300">O</span>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">OLMS</p>
                    <h1 className="text-4xl font-semibold text-white xl:text-5xl">Smart. Simple. Streamlined Offer Letter Management</h1>
                  </div>
                </div>
                <p className="max-w-xl text-lg leading-8 text-slate-300/90">
                  Build seamless HR workflows, monitor candidate pipeline progress, and approve offer letters faster with a premium SaaS dashboard experience.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.23)] backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Live stats</p>
                  <p className="mt-4 text-3xl font-semibold text-white">98.7%</p>
                  <p className="mt-2 text-sm text-slate-400">Offer acceptance rate</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.23)] backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Action ready</p>
                  <p className="mt-4 text-3xl font-semibold text-white">24</p>
                  <p className="mt-2 text-sm text-slate-400">Active recruitments</p>
                </div>
              </div>
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/90 p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Welcome back</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Sign in to your HR command center</h2>
              </div>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="priya@olms.com"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none ring-1 ring-transparent transition duration-200 focus:border-sky-400/30 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                    <a className="text-sm text-sky-300 hover:text-sky-200" href="#">Forgot password?</a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-slate-100 outline-none ring-1 ring-transparent transition duration-200 focus:border-sky-400/30 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input id="remember" type="checkbox" className="h-4 w-4 rounded border-slate-500 bg-slate-900 text-sky-400 focus:ring-sky-300" />
                  <label htmlFor="remember" className="text-sm text-slate-300">Remember me</label>
                </div>
                <div className="grid gap-4">
                  <button
                    type="submit"
                    className="rounded-3xl bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Sign in with Google
                  </button>
                </div>
              </form>

              <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Quick access</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">New</span>
                </div>
                <p>Secure HR login with frictionless onboarding and polished dashboard transitions.</p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[320px_1fr]"
        >
          <aside className="space-y-8 rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-glass backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-900/90 p-4 ring-1 ring-white/10">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-sky-300/70">HR Portal</p>
                  <h2 className="text-xl font-semibold text-white">Offer Letter HQ</h2>
                </div>
                <div className="h-11 w-11 rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-400 shadow-lg shadow-cyan-500/20 flex items-center justify-center text-white">O</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-400">
                Manage offer letters, recruitment progress, candidate approvals, and interview schedules from one premium workspace.
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item}
                  className={`flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                    index === 0 ? 'bg-slate-800/80 text-white shadow-[0_15px_50px_rgba(56,189,248,0.12)]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item}</span>
                  {item === 'Notifications' && <span className="rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-semibold uppercase text-slate-950">5</span>}
                </button>
              ))}
            </nav>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/85 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Onboarding</p>
                  <p className="mt-2 text-base font-semibold text-white">Offer pipeline is healthy</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-300">+</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">32 offers pending, 156 approved, and 18 declined. Continue the cycle with fast approvals and candidate updates.</p>
            </div>
          </aside>

          <main className="space-y-8">
            <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-950/95 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Dashboard</p>
                <h1 className="text-3xl font-semibold text-white">HR Command Center</h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex items-center rounded-full border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-300 shadow-sm shadow-slate-900/30">
                  <span className="mr-3 text-slate-400">🔍</span>
                  <input className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-500 sm:w-72" placeholder="Search candidates" />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLoggedIn(false)}
                    className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Logout
                  </button>
                  <button className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">🌙</button>
                  <button className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">🔔</button>
                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white flex items-center justify-center">P</div>
                    <div>
                      <p className="text-sm font-semibold">Priya Sharma</p>
                      <p className="text-xs text-slate-400">HR Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <section className="grid gap-5 xl:grid-cols-2 xl:grid-rows-[auto_1fr]">
              <div className="grid gap-5 lg:grid-cols-2">
                {kpis.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="group rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-slate-900/30`}>
                      <span className="text-xl">•</span>
                    </div>
                    <p className="mt-5 text-sm uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-white">{formatValue(item.value)}</p>
                    <p className="mt-3 text-sm text-slate-400">Real-time HR pipeline metrics</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Hiring statistics</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">Weekly trend</h3>
                    </div>
                    <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Updated 2 min ago</span>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 p-4">
                    <svg viewBox="0 0 340 120" className="h-48 w-full">
                      <defs>
                        <linearGradient id="stroke-gradient" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                      </defs>
                      <path
                        d={chartPoints
                          .map((value, index) => `${index === 0 ? 'M' : 'L'}${20 + index * 45} ${120 - value}`)
                          .join(' ')}
                        fill="none"
                        stroke="url(#stroke-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {chartPoints.map((value, index) => (
                        <circle
                          key={index}
                          cx={20 + index * 45}
                          cy={120 - value}
                          r="5"
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <span key={day} className="rounded-full bg-slate-800/70 px-3 py-1.5">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Offer status</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">Distribution</h3>
                    </div>
                    <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Overview</span>
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <div className="relative h-48 w-48 rounded-full bg-slate-900/80 p-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-950" />
                      <svg viewBox="0 0 200 200" className="relative h-full w-full">
                        {statusSegments.reduce<{ angle: number; items: JSX.Element[] }>(
                          (acc, item, idx) => {
                            const startAngle = acc.angle
                            const segmentAngle = (item.value / totalStatus) * 360
                            const endAngle = startAngle + segmentAngle
                            const path = describeDonutSegment(startAngle, endAngle)
                            acc.items.push(
                              <path key={item.label} d={path} fill="none" stroke={`url(#seg-${idx})`} strokeWidth="18" strokeLinecap="round" />,
                            )
                            acc.angle = endAngle
                            return acc
                          },
                          { angle: 0, items: [] },
                        ).items}
                        <defs>
                          {statusSegments.map((segment, index) => (
                            <linearGradient key={segment.label} id={`seg-${index}`} x1="0" x2="1" y1="0" y2="1">
                              <stop offset="0%" stopColor={segment.color.split(' ')[0].replace('from-', '')} />
                              <stop offset="100%" stopColor={segment.color.split(' ')[1].replace('to-', '')} />
                            </linearGradient>
                          ))}
                        </defs>
                      </svg>
                      <div className="absolute inset-12 flex items-center justify-center rounded-full bg-slate-950/90 text-center">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total</p>
                          <p className="mt-2 text-3xl font-semibold text-white">230</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {statusSegments.map((segment) => (
                      <div key={segment.label} className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                        <span className={`inline-flex h-3.5 w-3.5 rounded-full bg-gradient-to-br ${segment.color}`} />
                        <span>{segment.label}</span>
                        <span className="font-semibold text-white">{segment.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recent activity</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Workflow timeline</h3>
                  </div>
                  <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Live feed</span>
                </div>
                <div className="mt-6 space-y-4">
                  {activityFeed.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 transition hover:border-sky-400/20 hover:bg-slate-900/95">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Templates</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Offer letter templates</h3>
                  </div>
                  <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Designed for HR</span>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {templates.map((template, index) => (
                    <button
                      key={template.title}
                      type="button"
                      onClick={() => {
                        setSelectedTemplateIndex(index)
                        setTemplateDraft(template.preview)
                        setTemplateUsed(null)
                        setIsEditingTemplate(false)
                      }}
                      className={`group rounded-[28px] border p-5 text-left transition duration-200 ${
                        selectedTemplateIndex === index
                          ? 'border-sky-400/40 bg-slate-900/90 shadow-[0_25px_60px_rgba(56,189,248,0.16)]'
                          : 'border-white/10 bg-slate-950/80 hover:border-sky-400/20 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${template.accent} text-white shadow-lg shadow-slate-900/30`}>
                        <span className="text-lg font-bold">{template.title.charAt(0)}</span>
                      </div>
                      <h4 className="mt-5 text-base font-semibold text-white">{template.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{template.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {template.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Preview</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Selected template</h3>
                  </div>
                  <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">UX-ready</span>
                </div>
                <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-sm leading-7 text-slate-300 shadow-inner">
                  {isEditingTemplate ? (
                    <div className="space-y-4">
                      <textarea
                        value={templateDraft}
                        onChange={(event) => setTemplateDraft(event.target.value)}
                        className="h-64 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-sky-400/30 focus:ring-2 focus:ring-sky-500/20"
                      />
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setTemplates((current) =>
                              current.map((template, index) =>
                                index === selectedTemplateIndex ? { ...template, preview: templateDraft } : template,
                              ),
                            )
                            setIsEditingTemplate(false)
                          }}
                          className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                        >
                          Save changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTemplateDraft(templates[selectedTemplateIndex].preview)
                            setIsEditingTemplate(false)
                          }}
                          className="rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <pre className="whitespace-pre-wrap break-words font-sans text-sm text-slate-200">
{templates[selectedTemplateIndex].preview}
                      </pre>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingTemplate(true)}
                    className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                  >
                    Edit template
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOfferCreated(true)
                      setTemplateUsed(templates[selectedTemplateIndex].title)
                    }}
                    className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
                  >
                    Use this template
                  </button>
                </div>
                {templateUsed && (
                  <p className="mt-4 text-sm font-medium text-emerald-300">
                    {templateUsed} selected and ready to use.
                  </p>
                )}
              </motion.div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Interview schedule</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">This week</h3>
                  </div>
                  <button
                    onClick={() => setMobilePreview((prev) => !prev)}
                    className="rounded-3xl bg-slate-900/80 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
                  >
                    {mobilePreview ? 'Desktop view' : 'Mobile view'}
                  </button>
                </div>
                <div className="mt-6 space-y-4">
                  {scheduleItems.map((item) => (
                    <div key={`${item.time}-${item.candidate}`} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                      <p className="text-sm text-slate-300">{item.time}</p>
                      <p className="mt-2 text-base font-semibold text-white">{item.candidate}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.role}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-glass backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Mobile view</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Responsive preview</h3>
                </div>
                <button
                  onClick={() => setMobilePreview((prev) => !prev)}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800"
                >
                  Toggle preview
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-5">
                <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">OLMS Mobile</span>
                    <div className="space-x-2 text-slate-400">
                      <span>•</span>
                      <span>•</span>
                      <span>•</span>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4">
                    <div className="space-y-2 rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">KPI</p>
                      <div className="flex items-center justify-between text-white">
                        <span className="text-lg font-semibold">Pending Offers</span>
                        <span className="text-2xl font-semibold text-sky-300">32</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-3xl bg-slate-950/80 p-4">
                        <p className="text-sm text-slate-400">Approved</p>
                        <p className="mt-2 text-2xl font-semibold text-emerald-300">156</p>
                      </div>
                      <div className="rounded-3xl bg-slate-950/80 p-4">
                        <p className="text-sm text-slate-400">Rejected</p>
                        <p className="mt-2 text-2xl font-semibold text-rose-300">18</p>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Next action</p>
                      <p className="mt-2 text-base font-semibold text-white">Create Offer Letter</p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button
                    type="button"
                    onClick={() => setOfferCreated(true)}
                    className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
                  >
                      Create Offer Letter
                  </button>
                  </div>
                  {offerCreated && (
                    <p className="mt-4 text-sm font-medium text-emerald-300">New offer letter draft created successfully.</p>
                  )}
                </div>
                {mobilePreview && (
                  <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <div className="mb-4 flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-3 text-slate-300">
                      <span>Menu</span>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase text-slate-400">Active</span>
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-3xl bg-slate-950/90 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Search</p>
                        <div className="mt-3 flex items-center gap-2 rounded-3xl bg-slate-900/90 px-3 py-3 text-slate-400">
                          <span>🔍</span>
                          <span>Search candidate, company</span>
                        </div>
                      </div>
                      <div className="rounded-3xl bg-slate-950/90 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Insights</p>
                        <div className="mt-3 flex items-center justify-between text-white">
                          <span>Offers this week</span>
                          <span className="text-2xl font-semibold text-sky-300">70</span>
                        </div>
                      </div>
                      <div className="rounded-3xl bg-slate-950/90 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Schedule</p>
                        <p className="mt-3 text-sm text-slate-400">11:00 AM — Meera Iyer interview</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </div>
  )
}

function describeDonutSegment(startAngle: number, endAngle: number) {
  const radius = 80
  const radians = (angle: number) => (angle * Math.PI) / 180
  const start = {
    x: 100 + radius * Math.cos(radians(startAngle - 90)),
    y: 100 + radius * Math.sin(radians(startAngle - 90)),
  }
  const end = {
    x: 100 + radius * Math.cos(radians(endAngle - 90)),
    y: 100 + radius * Math.sin(radians(endAngle - 90)),
  }
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

export default App
