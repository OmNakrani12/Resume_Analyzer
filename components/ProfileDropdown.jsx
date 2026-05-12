'use client'

import {
  useState,
  useEffect,
  useRef,
} from 'react'
import { auth } from '@/app/firebase/config'
import Link from 'next/link'

import { signOut} from 'firebase/auth'
import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import {
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import Cookies from 'js-cookie'

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] =
    useState(false)

  const { user, logout } = useAuth()

  const dropdownRef = useRef(null)

  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(
      event
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
  }, [])

  const handleLogout = async() => {
    try {
        await logout()
        Cookies.remove('token')
        setIsOpen(false)
        router.push('/signin')
    } catch (err) {
        console.error(err)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/signin"
          className="text-sm font-medium text-gray-300 transition hover:text-white"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    )
  }

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
    },

    {
      icon: User,
      label: 'Profile',
      href: '/profile',
    },

    {
      icon: Settings,
      label: 'Settings',
      href: '/settings',
    },
  ]

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Avatar Trigger */}
      <motion.button
        whileTap={{
          scale: 0.96,
        }}
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="group relative"
      >
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-12 w-12 rounded-full border border-white/10 object-cover shadow-[0_10px_40px_rgba(59,130,246,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500/30"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-white via-blue-300 to-purple-300 shadow-[0_10px_40px_rgba(59,130,246,0.25)]">
              <User
                size={20}
                className="text-white"
              />
            </div>
          )}

          {/* Online Status */}
          {/* <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0b1120] bg-green-400 shadow-lg" /> */}
        </div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-0 z-50 mt-4 w-60 overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120]/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
          >
            {/* Glow */}
            <div className="absolute left-0 top-0 h-40 w-40 rounded-2xl bg-blue-500/10 blur-[80px]" />

            {/* User Card */}
            <div className="relative mb-3 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="h-12 w-12 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-white via-blue-300 to-purple-300">
                  <User
                    size={20}
                    className="text-white"
                  />
                </div>
              )}

              <div>
                <p className="max-w-[120px] truncate text-sm font-semibold text-white">
                  {user.displayName ||
                    'User'}
                </p>

                <p className="text-xs text-gray-400">
                  Premium Account
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="relative flex flex-col gap-1">
              {menuItems.map(
                (item, idx) => {
                  const Icon =
                    item.icon

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-white/5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:bg-blue-500/10">
                        <Icon
                          size={18}
                          className="text-gray-300 transition-colors duration-300 group-hover:text-blue-400"
                        />
                      </div>

                      <span className="text-sm font-medium text-white">
                        {item.label}
                      </span>
                    </Link>
                  )
                }
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="group mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-red-500/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:bg-red-500/10">
                  <LogOut
                    size={18}
                    className="text-gray-300 transition-colors duration-300 group-hover:text-red-400"
                  />
                </div>

                <span className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-red-400">
                  Sign Out
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}