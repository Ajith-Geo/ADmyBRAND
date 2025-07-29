"use client"

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Maximize, Calendar, Clock, Users, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const DemoVideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const demoFeatures = [
    {
      icon: Calendar,
      title: "Campaign Planning",
      description: "Watch AI create a complete marketing campaign in 60 seconds"
    },
    {
      icon: Clock,
      title: "Real-time Optimization",
      description: "See how our AI adapts campaigns based on live performance data"
    },
    {
      icon: Users,
      title: "Audience Targeting",
      description: "Experience precision targeting that finds your ideal customers"
    },
    {
      icon: Star,
      title: "Content Generation",
      description: "Witness AI creating compelling copy that converts"
    }
  ]

  return (
    <section ref={sectionRef} id="demo" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-md text-white border border-white/20 mb-6">
            <Play className="w-4 h-4" />
            <span>Watch AI in Action</span>
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            See the{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Future of Marketing
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the power of AI-driven marketing in our interactive demo. 
            Watch real campaigns come to life in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
              {/* YouTube Video Container */}
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/-0ULe8h2LrM?autoplay=0&mute=1&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="AI Marketing Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Live indicator */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2 bg-red-500/90 backdrop-blur-md rounded-full px-3 py-1">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-white text-xs font-medium">LIVE DEMO</span>
                </div>
              </div>

              {/* Fullscreen Button Overlay */}
              <div className="absolute bottom-4 right-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all duration-300"
                    >
                      <Maximize className="w-4 h-4 mr-2" />
                      Fullscreen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl bg-black border-0 p-0">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/-0ULe8h2LrM?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                        title="AI Marketing Demo Video - Fullscreen"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Floating stats */}
            <motion.div
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient-primary">1.2M+</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
            </motion.div>

            {/* Additional floating stat */}
            <motion.div
              className="absolute -top-6 -left-6 bg-white rounded-2xl p-3 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">98%</div>
                <div className="text-xs text-gray-600">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Demo Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                What You&apos;ll See in the Demo
              </h3>
              <p className="text-blue-100">
                Our interactive demo showcases real AI capabilities that are transforming 
                how businesses approach marketing.
              </p>
            </div>

            <div className="space-y-4">
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                          <p className="text-blue-100 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-6"
            >
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Interactive Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DemoVideoSection
