"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Target, 
  Zap, 
  BarChart3, 
  Shield, 
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Lock,
  Bolt
} from 'lucide-react'

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  badge: string
  benefits: string[]
  gradient: string
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "AI-Powered Brand Intelligence",
    description: "Advanced machine learning algorithms analyze market trends, competitor strategies, and consumer behavior to optimize your brand positioning with unprecedented precision.",
    badge: "Core AI",
    benefits: ["Predictive Analytics", "Market Intelligence", "Consumer Insights"],
    gradient: "from-blue-500 via-purple-500 to-pink-500"
  },
  {
    icon: Target,
    title: "Precision Targeting Engine",
    description: "Leverage quantum-computing inspired algorithms to identify and engage your ideal customers with laser-focused campaigns that deliver exceptional ROI.",
    badge: "Targeting",
    benefits: ["Quantum Algorithms", "ROI Optimization", "Audience Precision"],
    gradient: "from-green-500 via-teal-500 to-blue-500"
  },
  {
    icon: Zap,
    title: "Lightning-Fast Automation",
    description: "Deploy campaigns in milliseconds with our revolutionary automation engine that adapts in real-time to market conditions and user behavior patterns.",
    badge: "Automation",
    benefits: ["Real-time Adaptation", "Millisecond Deployment", "Smart Workflows"],
    gradient: "from-yellow-500 via-orange-500 to-red-500"
  },
  {
    icon: BarChart3,
    title: "Quantum Analytics Dashboard",
    description: "Visualize complex data relationships through our multi-dimensional analytics platform that reveals hidden patterns and opportunities in your market.",
    badge: "Analytics",
    benefits: ["Multi-dimensional View", "Pattern Recognition", "Opportunity Mapping"],
    gradient: "from-purple-500 via-indigo-500 to-blue-500"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Military-grade encryption and zero-trust architecture ensure your brand data and customer information remain absolutely secure and compliant.",
    badge: "Security",
    benefits: ["Zero-trust Architecture", "Military Encryption", "Full Compliance"],
    gradient: "from-gray-500 via-slate-500 to-zinc-500"
  },
  {
    icon: Rocket,
    title: "Hyper-Scale Performance",
    description: "Built on cloud-native architecture that scales infinitely, handling billions of data points while maintaining sub-millisecond response times.",
    badge: "Performance",
    benefits: ["Infinite Scaling", "Billion+ Data Points", "Sub-ms Response"],
    gradient: "from-pink-500 via-rose-500 to-red-500"
  }
]

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale }}
      initial={{ opacity: 0, y: 100, rotateX: -10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          duration: 0.8, 
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1]
        }
      } : {}}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="group perspective-1000"
    >
      <Card className="relative h-full overflow-hidden border-0 shadow-2xl bg-white backdrop-blur-xl hover:shadow-3xl transition-all duration-500">
        {/* Background Gradient */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          initial={false}
        />
        
        {/* Static Border */}
        <div className="absolute inset-0 border border-gray-200/50 rounded-xl" />

        <div className="relative p-8 h-full flex flex-col">
          {/* Icon and Badge */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <feature.icon className="w-full h-full text-white" />
            </motion.div>
            
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 font-semibold"
            >
              {feature.badge}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.h3 
              className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gradient-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {feature.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {feature.description}
            </motion.p>

            {/* Benefits */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {feature.benefits.map((benefit, benefitIndex) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 + benefitIndex * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: benefitIndex * 0.2 }}
                  />
                  <span className="text-sm font-medium text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hover Effect Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-blue-500 opacity-60" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          style={{ y: headerY }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200 mb-6"
          >
            <Bolt className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">Revolutionary Features</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient-primary">Superhuman AI</span>
            <br />
            <span className="text-gray-900">Powers Everything</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of brand management with our cutting-edge AI suite that delivers 
            <span className="font-semibold text-blue-600"> unprecedented performance</span> and 
            <span className="font-semibold text-purple-600"> intelligent automation</span>.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
              { value: "<1ms", label: "Response Time", icon: Zap },
              { value: "500M+", label: "Data Points", icon: BarChart3 },
              { value: "24/7", label: "AI Monitoring", icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-black text-gradient-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
