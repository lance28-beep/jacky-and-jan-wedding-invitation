"use client"

import { useEffect, useState } from 'react'
import { Twitter, Facebook, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ShareButtons() {
  const [shareUrl, setShareUrl] = useState('https://jackandjan.com')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.origin)
    setMounted(true)
  }, [])

  const shareText = `Celebrating love at #TheJackAndJanWedding! Join us: ${shareUrl}`

  const shareButtons = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
      hoverColor: 'hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
      url: `https://www.instagram.com/create/story?url=${encodeURIComponent(shareUrl)}&caption=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'bg-black',
      hoverColor: 'hover:bg-gray-900',
      url: `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166FE5]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2]',
      hoverColor: 'hover:bg-[#1a8cd8]',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
  ]

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid grid-cols-2 gap-3 w-full">
        {shareButtons.map((button, index) => (
          <motion.a
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center px-4 py-3 ${button.color} ${button.hoverColor} text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button.icon className="w-5 h-5 mr-2" />
            <span className="font-medium">{button.name}</span>
          </motion.a>
        ))}
      </div>
      <p className="text-wine/70 text-sm mt-4 max-w-xs text-center">
        Share our wedding website with your friends and family!
      </p>
    </div>
  )
} 