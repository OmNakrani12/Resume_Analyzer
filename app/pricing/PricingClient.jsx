import PricingClient from './PricingClient'
import logo from '../../public/logo.png'

export const metadata = {
  title: 'Pricing - Resunexa',
  description:
    'Choose the best AI resume analysis plan for ATS optimization.',

  openGraph: {
    title: 'Pricing - Resunexa',
    description:
      'AI-powered resume analysis and ATS optimization.',
    url: 'https://resume-ai-virid-one.vercel.app/pricing',
    siteName: 'Resunexa',
    images: [
      {
        url: {logo},
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export default function Page() {
  return <PricingClient />
}