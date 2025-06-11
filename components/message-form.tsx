"use client"

import { useRef, useState } from "react"
import { MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface MessageFormProps {
  onSuccess?: () => void
}

export default function MessageForm({ onSuccess }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSct70qIqyc1ewLMxfSnNGVK4iGQO8Fl6fBIsEi4HZbTUbv4JQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent!",
        description: "Thank you for your wishes 💌",
        duration: 3000,
      })

      formRef.current?.reset()
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardContent className="pt-8">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-burgundy font-serif tracking-wide">Your Name</label>
            <Input
              name="name"
              required
              placeholder="Enter your name"
              className="border-2 border-gold/30 focus:border-burgundy rounded-xl py-3 text-lg font-serif placeholder:text-wine/40 transition-all duration-200 hover:border-gold/50 focus:ring-2 focus:ring-burgundy/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-burgundy font-serif tracking-wide">Your Message</label>
            <Textarea
              name="message"
              required
              placeholder="Share your love, memories, or well wishes for the happy couple..."
              className="border-2 border-gold/30 focus:border-burgundy rounded-xl min-h-[120px] text-lg font-serif placeholder:text-wine/40 transition-all duration-200 hover:border-gold/50 focus:ring-2 focus:ring-burgundy/20"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-burgundy to-wine hover:from-wine hover:to-burgundy text-white px-8 py-3 rounded-xl text-lg font-serif shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Post Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 