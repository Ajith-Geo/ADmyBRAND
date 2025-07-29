"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
      secondary: 'bg-gray-100 text-gray-800 border border-gray-200',
      destructive: 'bg-red-100 text-red-800 border border-red-200',
      outline: 'border border-gray-300 text-gray-700 bg-transparent',
      success: 'bg-green-100 text-green-800 border border-green-200'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
