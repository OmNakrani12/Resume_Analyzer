'use client'

import { ThemeProvider } from 'next-themes'
import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

const translations = {
  en: {
    dashboard: "Dashboard",
    resumes: "My Resumes",
    profile: "Profile",
    settings: "Settings",
    analyze: "Analyze",
    signout: "Sign Out",
    overview: "Overview Dashboard",
    welcome: "Welcome back!",
    newAnalysis: "New Analysis",
    usage: "Usage",
    upgrade: "Upgrade Pro",
    recent: "Recent Extractions",
    appearance: "Appearance",
    language: "Language",
    security: "Security",
    save: "Save Changes",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    resumes: "मेरे बायोडाटा",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    analyze: "विश्लेषण करें",
    signout: "साइन आउट",
    overview: "अवलोकन डैशबोर्ड",
    welcome: "वापसी पर स्वागत है!",
    newAnalysis: "नया विश्लेषण",
    usage: "उपयोग",
    upgrade: "प्रो अपग्रेड करें",
    recent: "हाल के निष्कर्ष",
    appearance: "प्रकटीकरण",
    language: "भाषा",
    security: "सुरक्षा",
    save: "परिवर्तन सहेजें",
  }
}

export default function Providers({ children }) {
  const [lang, setLang] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('lang')
    if (savedLang) setLang(savedLang)
  }, [])

  const changeLanguage = (l) => {
    setLang(l)
    localStorage.setItem('lang', l)
  }

  if (!mounted) return <>{children}</>

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t: translations[lang] }}>
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}
