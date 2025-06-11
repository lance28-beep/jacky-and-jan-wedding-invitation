"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, Users, Mail, Calendar, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type GuestEntry = {
  timestamp: string
  name: string
  email: string
  guests: string
  message: string
}

export default function BookOfGuests() {
  const [guests, setGuests] = useState<GuestEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwwCDhqGjXZ9dmP37SxE7LAz2ZlgZB77FYn4r7oHH5kPdN760zjpvzl1-sU3SNGBQAI/exec",
        { cache: "no-store" }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data = await response.json()

      if (!data || !data.GoogleSheetData) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const rows: string[][] = data.GoogleSheetData
      if (!Array.isArray(rows) || rows.length <= 1) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const header = rows[0]
      const entries = rows.slice(1)

      const guestEntries: GuestEntry[] = entries.map((row) => {
        const rowObj: Record<string, string> = {}
        header.forEach((col, i) => {
          rowObj[col] = row[i] || ""
        })
        return {
          timestamp: rowObj["Timestamp"] || new Date().toISOString(),
          name: rowObj["Full Name"] || "Guest",
          email: rowObj["Email"] || "",
          guests: rowObj["Number Of Guests"] || "1",
          message: rowObj["Message"] || "",
        }
      })

      setGuests(guestEntries)
      setTotalGuests(guestEntries.reduce((sum, entry) => sum + parseInt(entry.guests), 0))
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 text-burgundy">
            <Users className="h-5 w-5" />
            <span className="font-serif text-lg">Total Guests: {totalGuests}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-burgundy" />
                <span className="text-burgundy font-serif">Loading guests...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-40 text-burgundy">
              <div className="flex flex-col items-center gap-3">
                <span className="font-serif">{error}</span>
              </div>
            </div>
          ) : guests.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-burgundy">
              <div className="flex flex-col items-center gap-3">
                <MessageSquare className="h-8 w-8" />
                <span className="font-serif">No guests have RSVP'd yet</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {guests.map((guest, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    index % 2 === 0 ? "bg-gold/5" : "bg-white"
                  } border border-gold/20`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-burgundy text-lg flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {guest.name}
                      </h4>
                      <div className="flex items-center text-sm text-wine/60 mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="font-serif">{guest.email}</span>
                      </div>
                    </div>
                    <Badge className="bg-gold/20 text-burgundy border-none font-serif px-3 py-1 rounded-full">
                      {guest.guests} {parseInt(guest.guests) === 1 ? "Guest" : "Guests"}
                    </Badge>
                  </div>

                  {guest.message && (
                    <div className="mt-3 pt-3 border-t border-gold/20">
                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-burgundy/30" />
                        <p className="text-sm text-wine/80 font-serif">{guest.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-wine/40 flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span className="font-serif">RSVP'd on {formatDate(guest.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 