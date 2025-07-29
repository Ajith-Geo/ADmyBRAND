"use client"

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  TrendingUp,
  Users,
  Lightbulb,
  Target,
  Zap,
  BarChart3
} from 'lucide-react'

const BlogResourcesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Marketing: 2025 Trends You Can't Ignore",
      excerpt: "Discover the cutting-edge AI marketing trends that will dominate 2025 and how to prepare your brand for the revolution.",
      category: "trends",
      author: "Sarah Chen",
      date: "Jan 15, 2025",
      readTime: "8 min read",
      image: "/api/placeholder/400/250",
      featured: true,
      tags: ["AI Marketing", "Trends", "Strategy"]
    },
    {
      id: 2,
      title: "How We Increased Client ROI by 400% Using AI Content Generation",
      excerpt: "A detailed case study revealing the exact strategies and AI tools that delivered exceptional results for our enterprise clients.",
      category: "case-study",
      author: "Michael Rodriguez",
      date: "Jan 12, 2025",
      readTime: "12 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["Case Study", "ROI", "Content"]
    },
    {
      id: 3,
      title: "Complete Guide to AI Marketing Automation in 2025",
      excerpt: "Everything you need to know about implementing AI marketing automation, from setup to optimization.",
      category: "guide",
      author: "Emily Thompson",
      date: "Jan 10, 2025",
      readTime: "15 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["Guide", "Automation", "Implementation"]
    },
    {
      id: 4,
      title: "Breaking: Google's New AI Algorithm Update Impacts Marketing",
      excerpt: "What marketers need to know about the latest Google AI algorithm update and how to adapt your strategies.",
      category: "news",
      author: "David Park",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["News", "Google", "Algorithm"]
    },
    {
      id: 5,
      title: "AI vs Human Creativity: Finding the Perfect Balance",
      excerpt: "Exploring how AI and human creativity can work together to create more effective marketing campaigns.",
      category: "insights",
      author: "Lisa Wang",
      date: "Jan 5, 2025",
      readTime: "10 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["Creativity", "AI", "Human-AI Collaboration"]
    },
    {
      id: 6,
      title: "Measuring AI Marketing Success: Key Metrics That Matter",
      excerpt: "Learn which metrics truly matter when evaluating the success of your AI-powered marketing campaigns.",
      category: "analytics",
      author: "James Miller",
      date: "Jan 3, 2025",
      readTime: "9 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["Analytics", "Metrics", "Measurement"]
    }
  ]

  const resources = [
    {
      id: 1,
      title: "AI Marketing Mastery: Complete Playbook",
      description: "120-page comprehensive guide covering everything from AI strategy to implementation",
      type: "ebook",
      icon: BookOpen,
      downloadCount: "12.5K",
      category: "guide",
      featured: true
    },
    {
      id: 2,
      title: "Marketing ROI Calculator Template",
      description: "Excel template to calculate and track your marketing ROI with AI-powered insights",
      type: "template",
      icon: FileText,
      downloadCount: "8.2K",
      category: "template",
      featured: false
    },
    {
      id: 3,
      title: "AI Content Creation Masterclass",
      description: "90-minute video course on leveraging AI for content that converts",
      type: "video",
      icon: Video,
      downloadCount: "15.7K",
      category: "course",
      featured: true
    },
    {
      id: 4,
      title: "2025 AI Marketing Trends Report",
      description: "In-depth analysis of emerging AI marketing trends with actionable insights",
      type: "report",
      icon: BarChart3,
      downloadCount: "20.1K",
      category: "report",
      featured: false
    },
    {
      id: 5,
      title: "Campaign Optimization Checklist",
      description: "Step-by-step checklist to optimize your AI-powered marketing campaigns",
      type: "checklist",
      icon: Target,
      downloadCount: "9.8K",
      category: "template",
      featured: false
    },
    {
      id: 6,
      title: "AI Tools Comparison Guide",
      description: "Detailed comparison of the top 50 AI marketing tools in the market",
      type: "guide",
      icon: Lightbulb,
      downloadCount: "11.3K",
      category: "guide",
      featured: false
    }
  ]

  const categories = [
    { id: 'all', label: 'All Content', count: blogPosts.length + resources.length },
    { id: 'trends', label: 'Trends & News', count: 4 },
    { id: 'guides', label: 'Guides & Tutorials', count: 6 },
    { id: 'case-studies', label: 'Case Studies', count: 3 },
    { id: 'resources', label: 'Free Resources', count: resources.length }
  ]

  const filteredPosts = activeCategory === 'all' ? blogPosts : 
    blogPosts.filter(post => post.category === activeCategory || 
      (activeCategory === 'case-studies' && post.category === 'case-study') ||
      (activeCategory === 'guides' && ['guide', 'insights', 'analytics'].includes(post.category)) ||
      (activeCategory === 'trends' && ['trends', 'news'].includes(post.category)))

  const filteredResources = activeCategory === 'all' || activeCategory === 'resources' ? resources : []

  return (
    <section ref={sectionRef} id="resources" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 15, repeat: Infinity }}
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
          <Badge className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Hub</span>
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Learn & Grow with{' '}
            <span className="text-gradient-primary">Expert Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead of the curve with our comprehensive collection of AI marketing insights, 
            guides, and resources from industry experts.
          </p>
        </motion.div>

        {/* Content Tabs */}
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="blog" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <FileText className="w-4 h-4 mr-2" />
              Blog & Insights
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Free Resources
            </TabsTrigger>
          </TabsList>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/80 backdrop-blur-sm hover:bg-white"
                } transition-all duration-300`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </motion.div>

          <TabsContent value="blog" className="space-y-8">
            {/* Featured Post */}
            {filteredPosts.filter(post => post.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 bg-white/80 backdrop-blur-xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <FileText className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <p className="text-lg font-semibold">Featured Article</p>
                        </div>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900 border-yellow-300">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-500 group border-0 bg-white/80 backdrop-blur-xl">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-white opacity-80" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200">
                        Read Article
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  <Card className={`h-full overflow-hidden hover:shadow-xl transition-all duration-500 group border-0 bg-white/80 backdrop-blur-xl ${
                    resource.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}>
                    <CardHeader className="text-center pb-4">
                      {resource.featured && (
                        <Badge className="w-fit mx-auto mb-3 bg-blue-500 text-white">
                          Popular
                        </Badge>
                      )}
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <resource.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 text-center mb-6">
                        {resource.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {resource.downloadCount} downloads
                        </span>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download Free
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <motion.div
                className="absolute inset-0 bg-black/10"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Stay Updated with AI Marketing Insights</h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Get the latest AI marketing trends, case studies, and expert insights delivered 
                  directly to your inbox every week.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-xl text-gray-900 bg-white/90 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-blue-200 text-sm mt-4">
                  Join 25,000+ marketers who trust our insights. Unsubscribe anytime.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogResourcesSection
