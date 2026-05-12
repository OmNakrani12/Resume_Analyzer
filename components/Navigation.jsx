'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
  useState,
  useEffect,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  LogOut,
} from 'lucide-react'

import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

import Cookies from 'js-cookie'

import { auth } from '@/app/firebase/config'

import ProfileDropdown from './ProfileDropdown'

import logo from '../public/logo.png'

export default function Navigation() {
  const router = useRouter()

  const [isOpen, setIsOpen] =
    useState(false)

  const [scrolled, setScrolled] =
    useState(false)

  const [user, setUser] =
    useState(null)

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser)
        }
      )

    return () => unsubscribe()
  }, [])

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 10
      )
    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  /* ================= LOGOUT ================= */
  const handleLogout =
    async () => {
      try {
        await signOut(auth)

        Cookies.remove('token')

        setIsOpen(false)

        router.push('/signin')
      } catch (err) {
        console.error(err)
      }
    }

  const navItems = [
    {
      label: 'Home',
      href: '/',
    },

    {
      label: 'Analyze',
      href: '/analyze',
    },

    {
      label: 'Dashboard',
      href: '/dashboard',
    },

    {
      label: 'Pricing',
      href: '/pricing',
    },

    {
      label: 'About',
      href: '/about',
    },
  ]

  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-black/30 backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* ================= LOGO ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Link
              href="/"
              className="group flex items-center gap-3"
            >
              {/* Logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl transition-all duration-300 group-hover:bg-purple-500/40" />

                <div className="relative rounded-2xl p-2 backdrop-blur-xl">
                  <Image
                    src={logo}
                    alt="ResuNexa Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <h1 className="flex text-2xl font-black tracking-tight text-white">
                  <span>Resu</span>

                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                    Nexa
                  </span>
                </h1>

                <p className="text-xs text-gray-400">
                  AI Resume Analyzer
                </p>
              </div>
            </Link>
          </motion.div>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(
              (item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay:
                      idx * 0.1,
                  }}
                >
                  <Link
                    href={item.href}
                    className="group relative text-sm font-medium text-gray-300 transition hover:text-white"
                  >
                    {item.label}

                    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              )
            )}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden items-center gap-4 md:flex">

            {/* Upgrade */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30"
              >
                <Sparkles size={16} />

                Upgrade

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Auth */}
            {user ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:bg-white/10 md:hidden"
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="border-t border-white/10 bg-black/60 backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-2 px-4 py-6">

              {/* Nav Items */}
              {navItems.map(
                (item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        idx * 0.1,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() =>
                        setIsOpen(
                          false
                        )
                      }
                      className="block rounded-2xl border border-transparent px-4 py-3 text-gray-300 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}

              {/* Mobile Buttons */}
              <div className="mt-6 grid gap-3">

                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() =>
                        setIsOpen(
                          false
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={
                        handleLogout
                      }
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 font-semibold text-white shadow-xl shadow-red-500/20 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <LogOut
                        size={18}
                      />

                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/signup"
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white shadow-xl shadow-blue-500/20"
                    >
                      Get Started

                      <ArrowRight
                        size={18}
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}