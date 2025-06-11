"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-2 border-gold/20 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {messages.map((msg, index) => (
        <Card
          key={index}
          className="border-2 border-gold/20 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-lg">
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-burgundy text-lg">{msg.name}</h4>
                  <span className="text-sm text-wine/60 font-light">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <span className="absolute -left-2 -top-2 text-4xl text-gold/40 font-serif">"</span>
              <p className="text-wine/80 text-lg leading-relaxed pl-6 font-serif">{msg.message}</p>
              <span className="absolute -right-2 -bottom-2 text-4xl text-gold/40 font-serif">"</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 