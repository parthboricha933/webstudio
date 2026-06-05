'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi Parth Web Studio! I'm interested in your website services."
    )
    window.open(`https://wa.me/918347185730?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      style={{ animation: 'whatsapp-pulse 2s infinite' }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
    </button>
  )
}
