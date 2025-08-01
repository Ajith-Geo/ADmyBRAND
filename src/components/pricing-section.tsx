"use client"

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Star, Zap, Crown, Sparkles, ArrowRight, Shield, Users, TrendingUp, Calculator, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Plan {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  monthlyPrice: number
  annualPrice: number
  popular: boolean
  features: string[]
  gradient: string
  bgGradient: string
  iconColor: string
}

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true)
  const [calculatorValues, setCalculatorValues] = useState({
    teamMembers: 5,
    contentPieces: 1000,
    campaigns: 10
  })
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Calculate dynamic pricing based on usage
  const calculateCustomPrice = () => {
    const basePrice = 29
    const teamMemberCost = Math.max(0, calculatorValues.teamMembers - 3) * 15
    const contentCost = Math.max(0, calculatorValues.contentPieces - 1000) * 0.02
    const campaignCost = Math.max(0, calculatorValues.campaigns - 10) * 5
    
    const monthlyTotal = basePrice + teamMemberCost + contentCost + campaignCost
    return {
      monthly: monthlyTotal,
      annual: monthlyTotal * 12 * 0.8 // 20% discount for annual
    }
  }

  const customPrice = calculateCustomPrice()

  const updateCalculatorValue = (key: keyof typeof calculatorValues, increment: boolean) => {
    setCalculatorValues(prev => {
      const current = prev[key]
      const step = key === 'contentPieces' ? 500 : key === 'campaigns' ? 5 : 1
      const min = key === 'contentPieces' ? 500 : key === 'campaigns' ? 5 : 1
      const max = key === 'teamMembers' ? 100 : key === 'contentPieces' ? 50000 : 100
      
      const newValue = increment 
        ? Math.min(max, current + step)
        : Math.max(min, current - step)
      
      return { ...prev, [key]: newValue }
    })
  }

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses starting their AI journey",
      icon: Zap,
      monthlyPrice: 29,
      annualPrice: 19,
      popular: false,
      features: [
        "Up to 1,000 AI-generated content pieces",
        "Basic analytics dashboard",
        "Email support",
        "3 team members",
        "Standard templates",
        "Social media scheduling",
        "Brand voice training",
        "Monthly reports"
      ],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600"
    },
    {
      name: "Professional",
      description: "Advanced features for growing marketing teams",
      icon: Star,
      monthlyPrice: 79,
      annualPrice: 59,
      popular: true,
      features: [
        "Unlimited AI content generation",
        "Advanced analytics & insights",
        "Priority support + phone",
        "15 team members",
        "Premium templates library",
        "Multi-channel distribution",
        "A/B testing suite",
        "Custom brand guidelines",
        "API access",
        "Advanced automation"
      ],
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      bgGradient: "from-purple-50 to-pink-50",
      iconColor: "text-purple-600"
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      icon: Crown,
      monthlyPrice: 199,
      annualPrice: 149,
      popular: false,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom AI model training",
        "White-label solutions",
        "Advanced security & compliance",
        "Custom integrations",
        "Priority feature requests",
        "SLA guarantee",
        "On-premise deployment"
      ],
      gradient: "from-gray-700 via-gray-800 to-black",
      bgGradient: "from-gray-50 to-slate-50",
      iconColor: "text-gray-700"
    }
  ]

  const PricingCalculator = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-16"
    >
      <Card className="glass border-2 border-white/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4"
          >
            <Calculator className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-gradient-primary mb-2">
            Custom Pricing Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Get personalized pricing based on your specific needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Members */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Team Members
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateCalculatorValue('teamMembers', false)}
                  className="h-10 w-10 rounded-full border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-blue-600">{calculatorValues.teamMembers}</div>
                  <div className="text-xs text-gray-500">members</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateCalculatorValue('teamMembers', true)}
                  className="h-10 w-10 rounded-full border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Pieces */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Monthly Content Pieces
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateCalculatorValue('contentPieces', false)}
                  className="h-10 w-10 rounded-full border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-purple-600">{calculatorValues.contentPieces.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">pieces</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateCalculatorValue('contentPieces', true)}
                  className="h-10 w-10 rounded-full border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Active Campaigns
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateCalculatorValue('campaigns', false)}
                  className="h-10 w-10 rounded-full border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-pink-600">{calculatorValues.campaigns}</div>
                  <div className="text-xs text-gray-500">campaigns</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateCalculatorValue('campaigns', true)}
                  className="h-10 w-10 rounded-full border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Calculated Price Display */}
          <motion.div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 rounded-2xl"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Your Custom Pricing</div>
              <div className="flex items-center justify-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">
                    ${isAnnual ? Math.round(customPrice.annual / 12) : Math.round(customPrice.monthly)}
                  </div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                {isAnnual && (
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Save ${Math.round((customPrice.monthly * 12) - customPrice.annual)}/year
                    </Badge>
                  </div>
                )}
              </div>
              <Button 
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const PricingCard = ({ plan, index }: { plan: Plan; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const cardIsInView = useInView(cardRef, { once: true, margin: "-100px" })
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 100, rotateX: -15 }}
        animate={cardIsInView ? { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            duration: 0.8, 
            delay: index * 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }
        } : {}}
        whileHover={{ 
          scale: plan.popular ? 1.02 : 1.05,
          y: plan.popular ? -5 : -10,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "relative group perspective-1000",
          plan.popular ? "z-20" : "z-10"
        )}
      >
        {/* Glow Effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500",
            `bg-gradient-to-r ${plan.gradient}`
          )}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />

        {/* Popular Badge */}
        {plan.popular && (
          <motion.div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-sm font-bold shadow-2xl">
              <Sparkles className="w-4 h-4 mr-2" />
              Most Popular
            </Badge>
          </motion.div>
        )}

        <Card className={cn(
          "relative h-full overflow-hidden border-0 shadow-2xl bg-white backdrop-blur-xl transition-all duration-500",
          plan.popular 
            ? "ring-2 ring-blue-500 shadow-blue-500/20" 
            : "hover:shadow-3xl",
          "group-hover:shadow-3xl"
        )}>
          {/* Static Border */}
          <div className="absolute inset-0 border border-gray-200/50 rounded-2xl" />

          <CardHeader className="text-center pb-6 relative z-10">
            <motion.div
              className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${plan.gradient} p-5 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <plan.icon className="w-full h-full text-white" />
            </motion.div>
            
            <CardTitle className="text-3xl font-black text-gray-900 mb-2">
              {plan.name}
            </CardTitle>
            
            <CardDescription className="text-gray-600 leading-relaxed">
              {plan.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center relative z-10">
            {/* Price Display */}
            <motion.div 
              className="mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-baseline justify-center mb-2">
                <motion.span 
                  className="text-6xl font-black text-gradient-primary"
                  key={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </motion.span>
                <span className="text-gray-600 ml-2 text-lg font-medium">
                  /month
                </span>
              </div>
              
              {isAnnual && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Features List */}
            <div className="space-y-4 mb-8 text-left">
              {plan.features.map((feature: string, featureIndex: number) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={cardIsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.6 + featureIndex * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className={cn(
                  "w-full h-14 text-lg font-bold shadow-2xl transition-all duration-300 group relative overflow-hidden",
                  plan.popular 
                    ? "btn-gradient hover:shadow-blue-500/30" 
                    : "bg-gray-900 hover:bg-gray-800 text-white hover:shadow-gray-500/30"
                )}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>

            <p className="text-sm text-gray-500 mt-4 font-medium">
              No credit card required • Cancel anytime
            </p>
          </CardContent>

          {/* Floating Icons */}
          <motion.div
            className="absolute top-8 right-8 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className={`w-8 h-8 ${plan.iconColor}`} />
          </motion.div>
        </Card>
      </motion.div>
    )
  }

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="relative py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden"
    >
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
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">Transparent Pricing</span>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gray-900">Choose Your</span>
            <br />
            <span className="text-gradient-primary">Power Level</span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unlock the full potential of AI-powered brand management. 
            <span className="font-semibold text-blue-600"> Start your 14-day free trial</span> today.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            className="flex items-center justify-center space-x-4 bg-white/80 backdrop-blur-xl rounded-2xl p-2 w-fit mx-auto shadow-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all duration-300 relative",
                !isAnnual 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all duration-300 relative",
                isAnnual 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Annual
              <Badge className="absolute -top-3 -right-3 text-xs bg-green-500 text-white border-0">
                Save 33%
              </Badge>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="plans" className="w-full mb-20">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="plans" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              Pre-built Plans
            </TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              Custom Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
              {plans.map((plan, index) => (
                <PricingCard key={plan.name} plan={plan} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator">
            <PricingCalculator />
          </TabsContent>
        </Tabs>

        {/* Trust Indicators */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by Industry Leaders
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "99.9%", label: "Uptime SLA", icon: Shield },
              { value: "14-day", label: "Free Trial", icon: Star },
              { value: "24/7", label: "Support", icon: Users },
              { value: "Cancel", label: "Anytime", icon: Check }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-black text-gradient-primary mb-1">{item.value}</div>
                <div className="text-sm font-medium text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
