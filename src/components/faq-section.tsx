"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI content generation work?",
      answer: "Our AI uses advanced machine learning models trained on millions of high-performing marketing content pieces. Simply input your brand guidelines, target audience, and campaign objectives, and our AI will generate compelling, on-brand content tailored to your specific needs. The AI learns from your feedback and improves over time."
    },
    {
      question: "Can I integrate ADmyBRAND AI with my existing marketing tools?",
      answer: "Absolutely! We offer seamless integrations with over 50 popular marketing tools including HubSpot, Salesforce, Mailchimp, Google Analytics, Facebook Ads Manager, and many more. Our API also allows for custom integrations with your proprietary systems."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, security is our top priority. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and maintain SOC 2 Type II certification. Your data is never used to train our models for other customers, and you maintain full ownership of all content generated."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most customers see immediate improvements in content creation speed and quality. Significant ROI improvements typically occur within 30-60 days as the AI learns your brand voice and optimizes campaigns. Some customers report 200%+ engagement increases within the first month."
    },
    {
      question: "Do you offer training and support?",
      answer: "Yes! All plans include comprehensive onboarding, training materials, and ongoing support. Professional and Enterprise plans include dedicated account managers, live training sessions, and priority support. We also have an extensive knowledge base and community forum."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties or fees. Your account will remain active until the end of your billing period, and you'll continue to have access to all features during that time. We also offer a 14-day free trial with no credit card required."
    },
    {
      question: "What makes ADmyBRAND AI different from other marketing tools?",
      answer: "Unlike generic AI tools, ADmyBRAND AI is specifically designed for marketing professionals. We combine content generation, audience targeting, campaign optimization, and performance analytics in one platform. Our AI is trained on marketing-specific data and understands conversion psychology, brand consistency, and campaign effectiveness."
    },
    {
      question: "How does pricing work for team members?",
      answer: "Team members are included in your plan limits (3 for Starter, 15 for Professional, unlimited for Enterprise). Additional team members can be added for $15/month each on Starter and Professional plans. All team members get full access to platform features with role-based permissions you can customize."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Frequently Asked
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about ADmyBRAND AI Suite. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden"
              >
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-6 text-left text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Our support team is here to help you succeed with ADmyBRAND AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg">
                Contact Support
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule a Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
