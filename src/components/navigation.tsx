"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Moon } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { scrollToSection } from '@/lib/utils'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Calculate scroll progress
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(100, (scrolled / maxScroll) * 100)
      setScrollProgress(progress)
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'pricing', 'testimonials', 'faq']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'Demo', href: 'demo' },
    { name: 'Features', href: 'features' },
    { name: 'Pricing', href: 'pricing' },
    { name: 'Resources', href: 'resources' },
    { name: 'Contact', href: 'contact' }
  ]

  const handleNavClick = (href: string) => {
    scrollToSection(href)
    setIsOpen(false)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 rounded-t-3xl overflow-hidden",
        isScrolled 
          ? "backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg" 
          : "backdrop-blur-sm bg-white/60"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-md"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src="https://camo.githubusercontent.com/e4ad37339ddd2e077e52e4189e9ff620eb4139f6c2dcdb506a5f7b77fbc7bdbb/68747470733a2f2f6d656469612e6c6963646e2e636f6d2f646d732f696d6167652f76322f4335313042415145514b6c72663147355153412f636f6d70616e792d6c6f676f5f3230305f3230302f636f6d70616e792d6c6f676f5f3230305f3230302f302f313633303633333031303739352f61646d796272616e645f6c6f676f3f653d3231343734383336343726763d6265746126743d536e6f41786e6d5132426d4f63474b515254584f56346d5f667064565a6643716e4b584f6c496952437173"
                  alt="ADmyBRAND Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <span className="text-xl font-bold text-gray-900">
                ADmyBRAND
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-full px-1 py-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    activeSection === item.href
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side - Theme Toggle, Login, CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Moon className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* Login */}
            <motion.button
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => handleNavClick('pricing')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                size="sm"
              >
                Start Free Trial
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className="backdrop-blur-xl bg-white/95 rounded-2xl mt-4 mb-4 border border-gray-200/50 shadow-xl p-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-full font-medium transition-all duration-200",
                        activeSection === item.href
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <motion.button
                      className="flex items-center space-x-2 text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Moon className="w-4 h-4" />
                      <span className="text-sm font-medium">Login</span>
                    </motion.button>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button 
                        onClick={() => handleNavClick('pricing')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-4 py-2 text-sm"
                        size="sm"
                      >
                        Start Free Trial
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        style={{
          width: `${scrollProgress}%`
        }}
        initial={{ width: 0 }}
        animate={{ 
          width: `${scrollProgress}%`
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  )
}

export default Navigation
