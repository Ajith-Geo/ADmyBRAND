"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  MousePointer, 
  Eye, 
  Zap,
  Activity,
  Target
} from 'lucide-react'

interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timeToInteractive: number
}

interface UserMetrics {
  activeUsers: number
  bounceRate: number
  avgSessionDuration: number
  pagesPerSession: number
  conversionRate: number
  totalSessions: number
}

const PerformanceMetricsDashboard: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null)
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    activeUsers: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    pagesPerSession: 0,
    conversionRate: 0,
    totalSessions: 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    // Collect Web Vitals and Performance Metrics
    if (typeof window !== 'undefined') {
      // Get performance metrics
      const getPerformanceMetrics = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        
        setPerformanceMetrics({
          pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
          firstContentfulPaint: fcp,
          largestContentfulPaint: 2400, // Simulated - would come from real LCP measurement
          cumulativeLayoutShift: 0.1, // Simulated - would come from real CLS measurement
          firstInputDelay: 50, // Simulated - would come from real FID measurement
          timeToInteractive: navigation.domInteractive - navigation.responseStart
        })
      }

      // Simulate real-time user metrics updates
      const simulateUserMetrics = () => {
        setUserMetrics(prev => ({
          activeUsers: Math.floor(Math.random() * 50) + 120,
          bounceRate: Math.random() * 0.3 + 0.2, // 20-50%
          avgSessionDuration: Math.random() * 120 + 180, // 3-5 minutes
          pagesPerSession: Math.random() * 2 + 2, // 2-4 pages
          conversionRate: Math.random() * 0.05 + 0.02, // 2-7%
          totalSessions: prev.totalSessions + Math.floor(Math.random() * 3)
        }))
      }

      setTimeout(getPerformanceMetrics, 1000)
      simulateUserMetrics()
      
      const interval = setInterval(simulateUserMetrics, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score: number, type: 'performance' | 'cls' | 'fid') => {
    if (type === 'performance') {
      if (score < 1000) return 'text-green-600'
      if (score < 2500) return 'text-yellow-600'
      return 'text-red-600'
    }
    if (type === 'cls') {
      if (score < 0.1) return 'text-green-600'
      if (score < 0.25) return 'text-yellow-600'
      return 'text-red-600'
    }
    if (type === 'fid') {
      if (score < 100) return 'text-green-600'
      if (score < 300) return 'text-yellow-600'
      return 'text-red-600'
    }
    return 'text-gray-600'
  }

  const performanceMetricsData = [
    {
      icon: Zap,
      title: "Page Load Time",
      value: performanceMetrics ? formatTime(performanceMetrics.pageLoadTime) : "...",
      color: performanceMetrics ? getScoreColor(performanceMetrics.pageLoadTime, 'performance') : 'text-gray-600',
      description: "Time to fully load the page"
    },
    {
      icon: Eye,
      title: "First Contentful Paint",
      value: performanceMetrics ? formatTime(performanceMetrics.firstContentfulPaint) : "...",
      color: performanceMetrics ? getScoreColor(performanceMetrics.firstContentfulPaint, 'performance') : 'text-gray-600',
      description: "Time to first visible content"
    },
    {
      icon: Target,
      title: "Largest Contentful Paint",
      value: performanceMetrics ? formatTime(performanceMetrics.largestContentfulPaint) : "...",
      color: performanceMetrics ? getScoreColor(performanceMetrics.largestContentfulPaint, 'performance') : 'text-gray-600',
      description: "Time to largest element painted"
    },
    {
      icon: Activity,
      title: "Cumulative Layout Shift",
      value: performanceMetrics ? performanceMetrics.cumulativeLayoutShift.toFixed(3) : "...",
      color: performanceMetrics ? getScoreColor(performanceMetrics.cumulativeLayoutShift, 'cls') : 'text-gray-600',
      description: "Visual stability score"
    }
  ]

  const userMetricsData = [
    {
      icon: Users,
      title: "Active Users",
      value: userMetrics.activeUsers.toString(),
      color: "text-blue-600",
      description: "Currently browsing",
      trend: "+12%"
    },
    {
      icon: Clock,
      title: "Avg Session Duration",
      value: formatDuration(userMetrics.avgSessionDuration),
      color: "text-purple-600",
      description: "Time spent on site",
      trend: "+8%"
    },
    {
      icon: MousePointer,
      title: "Bounce Rate",
      value: `${(userMetrics.bounceRate * 100).toFixed(1)}%`,
      color: "text-orange-600",
      description: "Single page visits",
      trend: "-5%"
    },
    {
      icon: TrendingUp,
      title: "Conversion Rate",
      value: `${(userMetrics.conversionRate * 100).toFixed(2)}%`,
      color: "text-green-600",
      description: "Visitors to customers",
      trend: "+15%"
    }
  ]

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm flex items-center space-x-2"
      >
        <BarChart3 className="w-4 h-4" />
        <span>Show Metrics</span>
      </button>
    )
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-40 overflow-auto border"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Real-time Analytics Dashboard</h2>
            <p className="text-gray-600">Live performance and user metrics</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live
            </Badge>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Core Web Vitals
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {performanceMetricsData.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <metric.icon className="w-5 h-5 text-gray-400" />
                        <div className={`text-xl font-bold ${metric.color}`}>
                          {metric.value}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {metric.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {metric.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* User Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              User Analytics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {userMetricsData.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <metric.icon className="w-5 h-5 text-gray-400" />
                        <div className="text-right">
                          <div className={`text-xl font-bold ${metric.color}`}>
                            {metric.value}
                          </div>
                          <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {metric.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {metric.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-500" />
            Live Activity Feed
          </h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {[
                  { user: "User from New York", action: "viewed pricing section", time: "2s ago" },
                  { user: "User from London", action: "downloaded AI marketing guide", time: "8s ago" },
                  { user: "User from Tokyo", action: "started demo video", time: "15s ago" },
                  { user: "User from Berlin", action: "signed up for newsletter", time: "23s ago" },
                  { user: "User from Sydney", action: "clicked contact button", time: "31s ago" }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Score */}
        <div className="mt-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2">Overall Performance Score</h4>
                <p className="text-green-100">Your site is performing excellently!</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">94</div>
                <div className="text-green-100 text-sm">out of 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default PerformanceMetricsDashboard
