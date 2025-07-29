"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'

// Analytics configuration
interface AnalyticsEvent {
  event: string
  timestamp: number
  data?: Record<string, unknown>
  sessionId: string
  userId?: string
}

interface UserInteraction {
  type: 'click' | 'scroll' | 'hover' | 'focus' | 'view'
  element: string
  timestamp: number
  value?: number | string
  coordinates?: { x: number; y: number }
}

class AdvancedAnalytics {
  private events: AnalyticsEvent[] = []
  private interactions: UserInteraction[] = []
  private sessionId: string
  private startTime: number
  private heatmapData: { x: number; y: number; intensity: number }[] = []

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    this.initializeTracking()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeTracking() {
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('page_visibility_change', {
        hidden: document.hidden,
        sessionDuration: Date.now() - this.startTime
      })
    })

    // Track clicks with heatmap data
    document.addEventListener('click', (e) => {
      this.trackInteraction({
        type: 'click',
        element: this.getElementPath(e.target as Element),
        timestamp: Date.now(),
        coordinates: { x: e.clientX, y: e.clientY }
      })

      // Add to heatmap data
      this.heatmapData.push({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
        intensity: 1
      })
    })

    // Track scroll behavior
    let scrollTimeout: NodeJS.Timeout
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        this.trackInteraction({
          type: 'scroll',
          element: 'window',
          timestamp: Date.now(),
          value: Math.round(scrollPercentage)
        })
      }, 100)
    })

    // Track hover events on interactive elements
    const interactiveElements = 'button, a, input, select, textarea, [role="button"], [tabindex]'
    document.addEventListener('mouseover', (e) => {
      const target = e.target as Element
      if (target.matches(interactiveElements)) {
        this.trackInteraction({
          type: 'hover',
          element: this.getElementPath(target),
          timestamp: Date.now()
        })
      }
    })

    // Track form interactions
    document.addEventListener('focus', (e) => {
      const target = e.target as Element
      if (target.matches('input, textarea, select')) {
        this.trackInteraction({
          type: 'focus',
          element: this.getElementPath(target),
          timestamp: Date.now()
        })
      }
    }, true)
  }

  private getElementPath(element: Element): string {
    const path = []
    let current = element

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase()
      
      if (current.id) {
        selector += `#${current.id}`
        path.unshift(selector)
        break
      }
      
      if (current.className) {
        const classes = Array.from(current.classList).slice(0, 2).join('.')
        if (classes) selector += `.${classes}`
      }

      path.unshift(selector)
      current = current.parentElement!
    }

    return path.join(' > ')
  }

  trackEvent(event: string, data?: Record<string, unknown>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      data,
      sessionId: this.sessionId
    }

    this.events.push(analyticsEvent)
    
    // In a real app, you would send this to your analytics service
    console.log('Analytics Event:', analyticsEvent)
  }

  trackInteraction(interaction: UserInteraction) {
    this.interactions.push(interaction)
    
    // Batch send interactions every 5 seconds
    if (this.interactions.length % 10 === 0) {
      this.sendBatchedData()
    }
  }

  trackCustomEvent(eventName: string, properties: Record<string, unknown> = {}) {
    this.trackEvent(`custom_${eventName}`, {
      ...properties,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    })
  }

  trackConversion(conversionType: string, value?: number) {
    this.trackEvent('conversion', {
      type: conversionType,
      value,
      sessionDuration: Date.now() - this.startTime,
      pageUrl: window.location.href
    })
  }

  trackSectionView(sectionId: string) {
    this.trackEvent('section_view', {
      sectionId,
      timestamp: Date.now(),
      scrollPosition: window.scrollY
    })
  }

  private sendBatchedData() {
    // In a real application, send to your analytics endpoint
    console.log('Batched Analytics Data:', {
      events: this.events.slice(-10),
      interactions: this.interactions.slice(-10),
      heatmapData: this.heatmapData.slice(-50),
      sessionId: this.sessionId
    })
  }

  getSessionStats() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      eventCount: this.events.length,
      interactionCount: this.interactions.length,
      heatmapPoints: this.heatmapData.length
    }
  }

  getHeatmapData() {
    return this.heatmapData
  }
}

// Global analytics instance
let analytics: AdvancedAnalytics | null = null

// Analytics Provider Component
export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !analytics) {
      analytics = new AdvancedAnalytics()
      
      // Track initial page load
      analytics.trackEvent('page_load', {
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`
      })

      // Track when user leaves the page
      const handleBeforeUnload = () => {
        const stats = analytics?.getSessionStats()
        analytics?.trackEvent('page_unload', {
          sessionDuration: stats?.duration,
          eventCount: stats?.eventCount,
          interactionCount: stats?.interactionCount
        })
      }

      window.addEventListener('beforeunload', handleBeforeUnload)
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

  return <>{children}</>
}

// Hook for using analytics in components
export const useAnalytics = () => {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    analytics?.trackEvent(event, data)
  }

  const trackCustomEvent = (eventName: string, properties?: Record<string, unknown>) => {
    analytics?.trackCustomEvent(eventName, properties)
  }

  const trackConversion = (conversionType: string, value?: number) => {
    analytics?.trackConversion(conversionType, value)
  }

  const trackSectionView = (sectionId: string) => {
    analytics?.trackSectionView(sectionId)
  }

  const getSessionStats = () => {
    return analytics?.getSessionStats()
  }

  return {
    trackEvent,
    trackCustomEvent,
    trackConversion,
    trackSectionView,
    getSessionStats
  }
}

// Section View Tracker Component
export const SectionViewTracker: React.FC<{ 
  sectionId: string 
  children: React.ReactNode 
  className?: string
}> = ({ sectionId, children, className }) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { trackSectionView } = useAnalytics()

  useEffect(() => {
    if (isInView) {
      trackSectionView(sectionId)
    }
  }, [isInView, sectionId, trackSectionView])

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  )
}

// Click Tracker Component
export const ClickTracker: React.FC<{
  eventName: string
  properties?: Record<string, unknown>
  children: React.ReactNode
  className?: string
}> = ({ eventName, properties, children, className }) => {
  const { trackCustomEvent } = useAnalytics()

  const handleClick = () => {
    trackCustomEvent(eventName, properties)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Scroll Progress Tracker
export const ScrollProgressTracker: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const { trackCustomEvent } = useAnalytics()
  const lastProgress = useRef(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const currentProgress = Math.round(progress * 100)
      
      // Track at 25%, 50%, 75%, and 100% milestones
      const milestones = [25, 50, 75, 100]
      for (const milestone of milestones) {
        if (lastProgress.current < milestone && currentProgress >= milestone) {
          trackCustomEvent('scroll_milestone', { 
            percentage: milestone,
            timestamp: Date.now()
          })
        }
      }
      
      lastProgress.current = currentProgress
    })

    return unsubscribe
  }, [scrollYProgress, trackCustomEvent])

  return null
}

// Real-time Analytics Dashboard Component (for demo purposes)
export const AnalyticsDebugger: React.FC = () => {
  const [stats, setStats] = useState<{
    sessionId: string
    duration: number
    eventCount: number
    interactionCount: number
    heatmapPoints: number
  } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { getSessionStats } = useAnalytics()

  useEffect(() => {
    const interval = setInterval(() => {
      const currentStats = getSessionStats()
      if (currentStats) {
        setStats(currentStats)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [getSessionStats])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm"
      >
        Show Analytics
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl p-4 z-50 max-w-sm border"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">Analytics Dashboard</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      {stats && (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Session Duration:</span>
            <span className="font-mono">{Math.round(stats.duration / 1000)}s</span>
          </div>
          <div className="flex justify-between">
            <span>Events Tracked:</span>
            <span className="font-mono">{stats.eventCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Interactions:</span>
            <span className="font-mono">{stats.interactionCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Heatmap Points:</span>
            <span className="font-mono">{stats.heatmapPoints}</span>
          </div>
          <div className="pt-2 border-t">
            <span className="text-gray-500">Session ID:</span>
            <div className="font-mono text-xs break-all">{stats.sessionId}</div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default AdvancedAnalytics
