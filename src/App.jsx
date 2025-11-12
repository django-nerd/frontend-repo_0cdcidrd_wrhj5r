import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Instagram, Twitter, Linkedin, MapPin, Link as LinkIcon, Sparkles } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function useMouseParallax(strength = 20) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handler = (e) => {
      const { innerWidth, innerHeight } = window
      const relX = (e.clientX / innerWidth) * 2 - 1
      const relY = (e.clientY / innerHeight) * 2 - 1
      x.set(relX * strength)
      y.set(relY * strength)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [strength, x, y])

  return { x, y }
}

const gradientBg = (
  <div className="absolute inset-0 overflow-hidden">
    <div className="pointer-events-none absolute -inset-[30%] opacity-70">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,122,255,0.25),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.25),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.2),transparent_45%)] blur-3xl" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
    <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)', opacity: 0.08 }} />
  </div>
)

function Logo() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 p-[2px] shadow-[0_0_40px_rgba(139,92,246,0.35)]">
        <div className="h-full w-full rounded-[10px] bg-black/80 backdrop-blur" />
      </div>
      <span className="text-xl font-semibold tracking-tight text-white">LocalConnect</span>
    </div>
  )
}

function Hero() {
  const { x, y } = useMouseParallax(12)
  const rotateX = useTransform(y, (v) => v / 8)
  const rotateY = useTransform(x, (v) => -v / 8)

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0B0B10]">{gradientBg}
      <div className="absolute inset-0" aria-hidden>
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 pt-24 text-center">
        <motion.div style={{ rotateX, rotateY }} className="w-full">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>Next‑gen local discovery</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-6 bg-gradient-to-br from-white via-white to-violet-200 bg-clip-text text-5xl font-bold leading-[1.05] text-transparent sm:text-6xl md:text-7xl"
        >
          Connecting You to Your Local World.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          Discover, support, and engage with local businesses around you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex items-center gap-4"
        >
          <a href="#waitlist" className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.7)] transition-transform hover:scale-[1.02] focus:outline-none">
            <span className="relative z-10">Join the Waitlist</span>
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.25)' }} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 flex items-center gap-3 text-white/40"
        >
          <Logo />
        </motion.div>
      </div>
    </section>
  )
}

function Vision() {
  const items = [
    { icon: MapPin, title: 'Hyper‑local', desc: 'Personalized discovery tuned to your neighborhood.' },
    { icon: LinkIcon, title: 'Connected', desc: 'Seamless engagement between people and businesses.' },
    { icon: Sparkles, title: 'Delightful', desc: 'Premium design and motion that feels effortless.' },
  ]

  return (
    <section className="relative w-full bg-[#0C0C12] py-24">
      <div className="absolute inset-0">{gradientBg}</div>
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl font-semibold text-white md:text-4xl"
        >
          A vision for local connection
        </motion.h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
              <it.icon className="h-6 w-6 text-violet-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">{it.title}</h3>
              <p className="mt-2 text-sm text-white/70">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="relative w-full bg-[#0B0B10] py-28">
      <div className="absolute inset-0">{gradientBg}</div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-semibold text-white md:text-4xl"
        >
          Get Early Access
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto mt-4 max-w-xl text-white/70"
        >
          Be the first to experience personalized local discovery when we launch.
        </motion.p>

        <div className="mx-auto mt-8 w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-xl bg-transparent px-4 text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-5 font-medium text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.7)] transition-transform hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? 'Submitting…' : 'Get Early Access'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-left backdrop-blur"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400"
                />
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/30" />
                  <div>
                    <h3 className="text-white">You’re on the list!</h3>
                    <p className="mt-1 text-sm text-white/70">We’ll notify you when LocalConnect goes live.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Countdown() {
  const target = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 21) // ~3 weeks
    return d
  }, [])

  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime()
      const diff = target.getTime() - now
      if (diff <= 0) {
        setTimeLeft('Launching very soon')
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section className="relative w-full bg-[#0C0C12] py-20">
      <div className="absolute inset-0">{gradientBg}</div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-white"
          >
            Launching Soon
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/30 px-5 py-3 text-lg text-white/90"
          >
            {timeLeft}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const socials = [
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://x.com', icon: Twitter, label: 'X' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  ]

  return (
    <footer className="relative w-full bg-[#0B0B10] py-10">
      <div className="absolute inset-0">{gradientBg}</div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="text-white/70">© {new Date().getFullYear()} LocalConnect. All rights reserved.</div>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:text-white">
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-6 sm:flex">
            <a href="#waitlist" className="text-sm text-white/70 transition-colors hover:text-white">Waitlist</a>
            <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">Vision</a>
            <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">Contact</a>
          </nav>
          <a href="#waitlist" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/10">Get Early Access</a>
        </div>
      </header>
      <main>
        <Hero />
        <Vision />
        <Waitlist />
        <Countdown />
      </main>
      <Footer />
    </div>
  )
}
