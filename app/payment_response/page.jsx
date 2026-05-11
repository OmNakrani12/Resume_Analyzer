import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
      <div className="w-full max-w-lg rounded-3xl border border-green-500/20 bg-white/5 p-10 text-center backdrop-blur-2xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-500/20 p-5">
            <CheckCircle
              size={60}
              className="text-green-400"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-black text-white">
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-lg text-gray-400">
          Your premium subscription has been activated
          successfully.
        </p>

        {/* Button */}
        <Link href="/">
          <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white transition hover:scale-105">
            Go To Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}