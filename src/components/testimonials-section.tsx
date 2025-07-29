"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Solutions",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "ADmyBRAND AI has completely transformed our marketing strategy. We've seen a 300% increase in engagement and our content creation time has been cut by 80%. The AI-generated campaigns are incredibly effective.",
      results: "+300% engagement"
    },
    {
      name: "Michael Rodriguez",
      role: "CEO",
      company: "GrowthCorp",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "The ROI we've achieved with ADmyBRAND AI is phenomenal. Our marketing team is now 5x more productive, and the quality of our campaigns has never been better. It's like having a team of expert marketers at our fingertips.",
      results: "5x productivity boost"
    },
    {
      name: "Emily Thompson",
      role: "Head of Digital Marketing",
      company: "InnovateLab",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "The AI-powered insights have helped us understand our audience like never before. We've launched 12 successful campaigns this quarter alone, each one perfectly tailored to our target market. Outstanding platform!",
      results: "12 successful campaigns"
    },
    {
      name: "David Kim",
      role: "Founder",
      company: "StartupBoost",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "As a startup, we needed to punch above our weight. ADmyBRAND AI gave us enterprise-level marketing capabilities from day one. Our customer acquisition cost dropped by 60% while conversion rates doubled.",
      results: "60% lower CAC"
    },
    {
      name: "Lisa Wang",
      role: "CMO",
      company: "EcoTech Industries",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "The automation features are incredible. What used to take our team weeks now happens in hours. The AI understands our brand voice perfectly and consistently delivers on-brand content that resonates with our audience.",
      results: "Weeks to hours"
    }
  ]

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [nextTestimonial])

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Loved by Marketing
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their marketing 
            with ADmyBRAND AI Suite.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    {/* Quote Icon */}
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Quote className="w-8 h-8 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                      &ldquo;{testimonials[currentIndex].content}&rdquo;
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-col items-center">
                      {/* Profile Image Placeholder */}
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white font-bold text-2xl">
                          {testimonials[currentIndex].name[0]}
                        </span>
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </p>
                        <div className="mt-2 inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {testimonials[currentIndex].results}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white/90"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white/90"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "10,000+", label: "Happy Customers" },
            { number: "500M+", label: "Content Pieces Generated" },
            { number: "250%", label: "Average ROI Increase" },
            { number: "99.9%", label: "Uptime Guarantee" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
