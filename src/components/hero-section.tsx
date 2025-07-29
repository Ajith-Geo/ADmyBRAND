"use client"

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Sparkles, Zap, Brain, Rocket, Star } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, scale: 1 },
    { Icon: Zap, delay: 1, scale: 0.8 },
    { Icon: Brain, delay: 2, scale: 1.2 },
    { Icon: Rocket, delay: 3, scale: 0.9 },
    { Icon: Star, delay: 4, scale: 1.1 },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)`
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-morphing"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-morphing"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-float-slow"
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, scale }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1], 
            scale: [scale * 0.8, scale * 1.2, scale * 0.8],
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0]
          }}
          transition={{
            duration: 6 + delay,
            repeat: Infinity,
            delay: delay * 0.5,
            ease: "easeInOut"
          }}
          style={{
            left: `${20 + index * 15}%`,
            top: `${15 + index * 10}%`,
          }}
        >
          <Icon className="w-8 h-8 text-blue-500" />
        </motion.div>
      ))}

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Centered Badge - Outside of Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
          className="mb-12 flex justify-center"
        >
          <Badge className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 shadow-lg hover:shadow-xl animate-glow">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span>✨ Introducing AI-Powered Marketing Revolution</span>
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center lg:text-left"
          >

            {/* Main Headline with Staggered Animation */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-4"
              >
                <motion.span 
                  className="block text-gradient-primary"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Transform
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Your Brand
                </motion.span>
                <motion.span 
                  className="block text-gray-900"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  with <span className="text-gradient-primary">AI Magic</span>
                </motion.span>
              </motion.h1>
            </div>

            {/* Enhanced Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed font-medium"
            >
              Unleash the power of artificial intelligence to create{' '}
              <span className="text-gradient font-semibold">extraordinary marketing campaigns</span>,{' '}
              optimize performance in real-time, and{' '}
              <span className="text-gradient font-semibold">scale your brand presence</span>{' '}
              like never before.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex justify-center lg:justify-start mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="xl" 
                  onClick={() => scrollToSection('pricing')}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 btn-gradient relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    🚀 Start Your AI Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-6 font-medium">
                🌟 Trusted by 10,000+ innovative businesses worldwide
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-70">
                {['Google', 'Microsoft', 'Shopify', 'Slack', 'Adobe'].map((company, index) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + index * 0.1 }}
                    className="text-lg font-bold text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative lg:scale-110"
          >
            <div className="relative">
              {/* Main Dashboard Container */}
              <motion.div 
                className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-700 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-300">ADmyBRAND AI Dashboard</div>
                </div>

                {/* Enhanced Dashboard Content */}
                <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden border border-gray-600 shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">AI Performance</h3>
                      <motion.div 
                        className="px-3 py-1 bg-green-500/30 rounded-full text-green-300 text-sm font-medium border border-green-400/50"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🟢 Live
                      </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Campaign ROI', value: '+347%', color: 'text-green-400' },
                        { label: 'Content Generated', value: '12.4K', color: 'text-blue-400' },
                        { label: 'Engagement Rate', value: '+289%', color: 'text-purple-400' },
                        { label: 'Time Saved', value: '847hrs', color: 'text-pink-400' }
                      ].map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          className="bg-gray-800 rounded-xl p-4 border border-gray-600"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2 + index * 0.1 }}
                        >
                          <div className="text-sm text-gray-300 mb-1">{metric.label}</div>
                          <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
