"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Heart, Calendar, MapPin, Clock, Gift, MessageCircle, Phone, ChevronDown, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Silk from "@/components/silk"
import { MobileNav } from "@/components/mobile-nav"
import CountdownDisplay from "@/components/countdown-display"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import Stack from "@/components/stack"
import CircularGallery from "@/components/circular-gallery"
import MessageForm from "@/components/message-form"
import MessageWallDisplay from "@/components/message-wall-display"
import BookOfGuests from "@/components/book-of-guests"
import RSVPForm from "@/components/rsvp-form"
import { useIsMobile } from "@/components/ui/use-mobile"
import QRCode from "@/components/qr-code"
import ShareButtons from "@/components/share-buttons"

interface Message {
  timestamp: string
  name: string
  message: string
}

export default function WeddingInvitation() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", guests: "1", attending: "yes", dietary: "" })
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useIsMobile()

  // Wedding date - December 10, 2025 at 4:00 PM Philippines time (UTC+8)
  const weddingDate = new Date("2025-12-10T16:00:00+08:00")

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbzSx8725uH6R2iFA-vzxG8BSkJLsIVpfG80EFuRTLQiayVKCGeO45MhB3oHKYn6IY-83Q/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your RSVP! We'll be in touch soon.")
    setRsvpForm({ name: "", email: "", guests: "1", attending: "yes", dietary: "" })
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen relative">
      {/* Silk Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <Silk speed={5} scale={1.5} color="#cfb88c" noiseIntensity={0.8} rotation={0.1} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 border-b border-gold/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-serif text-xl text-burgundy font-bold">Jackey & Jan</span>
                  <p className="text-xs text-wine/70 hidden sm:block">December 10, 2025</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-1">
                {[
                  "home",
                  "countdown",
                  "gallery",
                  "prenup",
                  "messages",
                  "details",
                  "entourage",
                  "rsvp",
                  "registry",
                  "faq",
                ].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                      activeSection === section
                        ? "bg-burgundy text-white shadow-lg"
                        : "text-wine hover:text-burgundy hover:bg-burgundy/10"
                    }`}
                  >
                    {section === "rsvp" ? "RSVP" : section === "faq" ? "FAQ" : section}
                  </button>
                ))}
              </div>

              {/* Mobile Navigation */}
              <MobileNav onNavigate={scrollToSection} />
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section - Fully Responsive */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-0"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-burgundy/5 via-transparent to-wine/5"></div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-beige/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 relative z-10 py-8 md:py-0">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Mobile-First Image (Shows on top for mobile, hidden on desktop) */}
              <div className="block lg:hidden w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative mx-auto"
                  style={{ maxWidth: "280px" }}
                >
                  {/* Main Image Container */}
                  <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-beige/20 to-gold/20 backdrop-blur-sm border border-gold/20">
                    <Image
                      src="/couple_image/image_3.png"
                      alt="Jackey and Jan - Beautiful couple portrait"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />

                    {/* Flower Overlay - Enhanced */}
                    <Image
                      src="/Flower.png"
                      alt="Decorative flower"
                      width={120}
                      height={120}
                      className="absolute -top-5 -left-5 w-24 h-24 md:w-32 md:h-32 drop-shadow-lg z-20 pointer-events-none select-none"
                      priority
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy/30 via-transparent to-transparent z-10"></div>
                  </div>

                  {/* Decorative Elements Around Image */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gold rounded-full opacity-60 animate-bounce delay-300"></div>
                  <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-burgundy rounded-full opacity-60 animate-bounce delay-700"></div>
                </motion.div>
              </div>

              {/* Left Column - Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <div className="mb-6 md:mb-8 lg:mb-12">
                  {/* Decorative Heart Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold to-beige rounded-full mb-4 md:mb-6 lg:mb-8 shadow-xl">
                    <Heart className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-burgundy" />
                  </div>

                  {/* Main Heading with Responsive Typography */}
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-burgundy mb-3 md:mb-4 lg:mb-6 leading-tight">
                    Jackey & Jan
                  </h1>

                  {/* Decorative Divider */}
                  <div className="flex items-center justify-center lg:justify-start mb-4 md:mb-6 lg:mb-8">
                    <div className="w-10 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                    <div className="mx-2 sm:mx-3 md:mx-4 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gold rounded-full"></div>
                    <div className="w-10 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-wine font-light mb-4 md:mb-6 lg:mb-8">
                    are getting married
                  </p>

                  {/* Wedding Details */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-base sm:text-lg md:text-xl text-wine/80 mb-6 md:mb-8 lg:mb-12">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gold" />
                      <span className="font-medium">December 10, 2025</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-gold rounded-full"></div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gold" />
                      <span className="font-medium">Nature's Village Resort</span>
                    </div>
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start">
                    <Button
                      onClick={() => scrollToSection("countdown")}
                      className="group bg-gradient-to-r from-burgundy to-wine hover:from-wine hover:to-burgundy text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                      <span className="mr-2">Join Our Celebration</span>
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" />
                    </Button>
                    <Button
                      onClick={() => scrollToSection("rsvp")}
                      variant="outline"
                      className="group border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:shadow-lg"
                    >
                      <span className="mr-2">RSVP Now</span>
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Couple Image (Hidden on mobile) */}
              <div className="hidden lg:flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="relative group"
                >
                  {/* Main Image Container */}
                  <div className="relative w-[26rem] h-[34rem] xl:w-[30rem] xl:h-[38rem] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-beige/20 to-gold/20 backdrop-blur-sm border border-gold/20">
                    <Image
                      src="/couple_image/image_1.png"
                      alt="Jackey and Jan - Beautiful couple portrait"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating Hearts Animation */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="h-6 w-6 text-gold animate-pulse" />
                    </div>
                  </div>

                  {/* Decorative Elements Around Image */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gold rounded-full opacity-60 animate-bounce delay-300"></div>
                  <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-burgundy rounded-full opacity-60 animate-bounce delay-700"></div>
                  <div className="absolute top-1/2 -left-6 w-4 h-4 bg-wine rounded-full opacity-40 animate-pulse"></div>
                  <div className="absolute top-1/4 -right-6 w-5 h-5 bg-beige rounded-full opacity-50 animate-pulse delay-500"></div>

                  {/* Image Caption */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gold/20">
                    <p className="text-sm font-medium text-burgundy whitespace-nowrap">Our Love Story Begins</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs sm:text-sm text-burgundy/70 font-medium">Scroll to explore</span>
                <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-burgundy" />
              </div>
            </div> */}
          </div>

          {/* Additional Decorative Background Elements */}
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-gold/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-beige/10 to-transparent rounded-full blur-3xl"></div>
        </section>

        {/* Enhanced Countdown Section with Animated Counters */}
        <section id="countdown" className="py-24 bg-white/80 backdrop-blur-sm relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-16"
            >
              <Badge
                variant="outline"
                className="border-gold text-burgundy mb-4 px-4 py-1.5 text-sm font-medium tracking-wider"
              >
                The Big Day
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">
                <span className="inline-block">Count Down</span> <span className="inline-block">With Us</span>
              </h2>
              <p className="text-wine/80 text-xl leading-relaxed">
                Every moment brings us closer to our forever. Join us as we count down to the most magical day of our
                lives.
              </p>
            </motion.div>

            {/* Animated Countdown Display */}
            <CountdownDisplay targetDate={weddingDate} />

            {/* Wedding Date Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 inline-flex items-center bg-gradient-to-r from-burgundy/10 to-wine/10 px-8 py-4 rounded-full shadow-lg"
            >
              <Calendar className="h-6 w-6 text-burgundy mr-3" />
              <div>
                <span className="text-burgundy font-medium">Wedding Date:</span>{" "}
                <span className="text-wine font-bold">December 10, 2025</span>
              </div>
            </motion.div>

            {/* Decorative Hearts */}
            <div className="absolute top-20 left-20 transform -rotate-12">
              <Heart className="h-8 w-8 text-burgundy/20" />
            </div>
            <div className="absolute bottom-20 right-20 transform rotate-12">
              <Heart className="h-10 w-10 text-gold/20" />
            </div>
          </div>
        </section>

        {/* Our Love Story Section */}
        {/* Our Love Story Section - Refactored */}
        <section id="gallery" className="py-24 bg-gradient-to-br from-beige/20 to-gold/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-burgundy text-burgundy mb-4">
                Our Story
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Our Love Story</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                From an unexpected night to forever together
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Interactive Stack Component - Now Featured First */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex justify-center mb-16 lg:mb-20"
              >
                <div className="relative">
                  {/* Decorative background for the stack */}
                  <div className="absolute inset-0 bg-gradient-to-br from-burgundy/5 to-wine/5 rounded-3xl blur-3xl scale-110"></div>
                  <div className="relative bg-white/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gold/20">
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-2xl md:text-3xl text-burgundy mb-4">Our Journey in Pictures</h3>
                      <p className="text-wine/70 text-lg">Drag and interact with our memories</p>
                    </div>
                    <Stack
                      randomRotation={true}
                      sensitivity={180}
                      sendToBackOnClick={false}
                      cardDimensions={{ width: 300, height: 300 }}
                      cardsData={[
                        {
                          id: 1,
                          img: "/couple_image/image_4.png",
                        },
                        {
                          id: 2,
                          img: "/couple_image/image_1.png",
                        },
                        {
                          id: 3,
                          img: "/couple_image/image_3.png",
                        },
                        {
                          id: 4,
                          img: "/couple_image/image_2.png",
                        },
                      ]}
                    />
                    {/* Interactive hint */}
                    <div className="text-center mt-6">
                      <p className="text-sm text-wine/60 italic">💡 Drag the photos to explore our memories</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Story Content - Now Below the Interactive Element */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <Card className="border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm">
                  <CardContent className="pt-8 md:pt-12 px-6 md:px-12">
                    <div className="prose prose-lg max-w-none text-wine/80 leading-relaxed">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-burgundy mb-4">Our Love Story</h3>
                      </div>

                      <p className="mb-6 text-lg">Welcome, dear friends and family!</p>

                      <p className="mb-6 text-lg">
                        Our love story began on an unexpected night, where two paths crossed thanks to our mutual
                        friends. I still remember the first time I laid eyes on Jan — we may have started off on the
                        wrong foot, but that didn't stop us from diving into conversation and discovering an instant
                        connection. As a strong-willed and outgoing person, I was drawn to Jan's charm and humor. He's a
                        social butterfly who lights up every room, and I found myself smiling and laughing.
                      </p>

                      <p className="mb-6 text-lg">
                        As our friendship grew, so did our late-night deep talks and post-work hangouts. The spark
                        between us was undeniable, from motorcycle rides filled with laughter (and a few bumps along the
                        way) to the adventures of living together in our tiny apartment. We shared so many meals while
                        cooking together, finding joy in every moment, even amidst the struggles of living paycheck to
                        paycheck.
                      </p>

                      <p className="mb-6 text-lg">
                        Like any couple, we've faced our share of challenges, including the heartbreaking loss of our
                        child. But it was in these moments that I truly saw the strength of our bond and Jan's
                        responsible nature, which kept us grounded. Together, we learned the importance of seizing every
                        moment and nurturing our dreams of creating a loving home.
                      </p>

                      <p className="mb-6 text-lg">
                        The day Jan proposed on February 14, 2023, was bittersweet, as we were unable to gain the
                        blessings from both our families. Yet, it felt like just another chapter in our journey — one
                        that only strengthened our resolve to our love.
                      </p>

                      <p className="mb-8 text-lg">
                        Finally, as we stand before you, we invite you to celebrate with us. We eagerly anticipate the
                        future, filled with laughter, friendship, and a love that continues to grow stronger every day.
                      </p>

                      <div className="text-center border-t border-gold/20 pt-8">
                        <p className="text-xl font-medium text-burgundy mb-2">With all our love,</p>
                        <div className="flex items-center justify-center space-x-4">
                          <span className="font-serif text-2xl text-burgundy">Jackey</span>
                          <Heart className="h-6 w-6 text-wine" />
                          <span className="font-serif text-2xl text-burgundy">Jan</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Prenup Section */}
        {/* Prenup Section - Mobile Optimized & July Timeline */}
        <section id="prenup" className="py-24 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-gold text-burgundy mb-4">
                Coming Soon
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Prenup Gallery</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                Our prenup photoshoot is scheduled for July 2025. Check back later to see our beautiful moments
                captured.
              </p>
            </div>

            <div className="max-w-6xl mx-auto relative">
              {/* Mobile-optimized gallery container */}
              <div
                className="rounded-xl overflow-hidden shadow-2xl relative"
                style={{
                  height: isMobile ? "400px" : "600px",
                  minHeight: "300px",
                }}
              >
                <CircularGallery
                  bend={isMobile ? 2 : 3}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  font={isMobile ? "bold 18px serif" : "bold 24px serif"}
                />

                {/* Coming Soon Overlay - Mobile Responsive */}
                <div className="absolute inset-0 bg-burgundy/80 backdrop-blur-md flex items-center justify-center z-10 rounded-xl">
                  <div className="text-center p-4 md:p-8 max-w-md mx-auto">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl"
                    >
                      <Camera className="h-8 w-8 md:h-10 md:w-10 text-gold" />
                    </motion.div>

                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-3xl font-serif text-white mb-3 md:mb-4"
                    >
                      Prenup Gallery Coming Soon
                    </motion.h3>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-gold text-base md:text-lg mb-4 md:mb-6 leading-relaxed"
                    >
                      Our beautiful prenup photos will be available here after the photoshoot. We can't wait to share
                      these special moments with you!
                    </motion.p>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center space-x-2 text-white/70 text-sm md:text-base"
                    >
                      <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Expected: July 2025</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Gallery Instructions - Mobile Responsive */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 md:mt-8 text-center"
              >
                <p className="text-wine/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
                  💡 Tip: Once available, you'll be able to drag and scroll through our prenup photos in this
                  interactive 3D gallery. The gallery is optimized for both desktop and mobile viewing.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Message Wall */}
        <section className="py-24 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-white to-pink-50/50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-gold burgundy mb-4">
                Love Notes
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Message Wall</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed font-serif">
                See the love and blessings from friends and family below! Your message will be posted instantly and shared
                with everyone who visits this page. Add your own and help make this wall a living memory for the couple.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center mb-8 px-2 gap-3">
              <span className="text-sm text-wine/80 font-serif">Messages: {messages.length}</span>
              <a
                href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTBPzdlgUKzbt0jSJMiRyAPycizOAdKdoPYrZYMY3RxVxUJgM1vvol0rrDKeWDIXqsefN2KklWJowA3/pubhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-burgundy to-wine hover:from-wine hover:to-burgundy text-white font-serif shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
              >
                View All Messages in Google Sheets
              </a>
            </div>

            <div className="space-y-6 md:space-y-10">
              <MessageWallDisplay messages={messages} loading={loading} />
            </div>

            <div className="text-center mb-10 mt-12">
              <h3 className="font-serif text-2xl md:text-3xl text-burgundy mb-3">
                Leave Your Congratulations
              </h3>
              <p className="text-wine/80 text-lg max-w-xl mx-auto font-serif">
                Add your message below and help make this wall a living memory for the couple!
              </p>
            </div>

            <MessageForm onSuccess={fetchMessages} />
          </div>
        </section>

        {/* Enhanced Wedding Details */}
        <section id="details" className="py-24 bg-gradient-to-br from-beige/20 to-gold/10 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="border-burgundy text-burgundy mb-4">
                Event Details
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Wedding Details</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                All the important information you need to celebrate our special day with us.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              {/* Main Event Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full">
                  <CardHeader className="bg-gradient-to-r from-burgundy/5 to-wine/5 border-b border-gold/20">
                    <CardTitle className="text-burgundy flex items-center text-2xl justify-center">
                      <Heart className="h-7 w-7 mr-3" />
                      Ceremony & Reception
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/30 rounded-full flex items-center justify-center shadow-lg">
                        <Clock className="h-8 w-8 text-gold" />
                      </div>
                      <div>
                        <p className="text-wine font-semibold text-xl">4:00 PM</p>
                        <p className="text-wine/70 text-lg">December 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/30 rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="h-8 w-8 text-gold" />
                      </div>
                      <div>
                        <p className="text-wine font-semibold text-xl">Nature's Village Resort</p>
                        <p className="text-wine/70 text-lg">Talisay Highway</p>
                        <p className="text-wine/70 text-lg">Metro Bacolod, 6115 Negros Occidental</p>
                        <a 
                          href="https://www.google.com/maps/place/Nature's+Village+Resort/@10.726085,122.9615211,17z/data=!4m20!1m10!3m9!1s0x33aed6c84a5dd153:0x177631c61f787610!2sNature's+Village+Resort!5m2!4m1!1i2!8m2!3d10.726085!4d122.964096!16s%2Fg%2F1tzzs0sz!3m8!1s0x33aed6c84a5dd153:0x177631c61f787610!5m2!4m1!1i2!8m2!3d10.726085!4d122.964096!16s%2Fg%2F1tzzs0sz?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-3 text-gold hover:text-burgundy transition-colors group"
                        >
                          <MapPin className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="text-lg">View on Google Maps</span>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Venue Image and QR Code Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-gold/20 shadow-2xl bg-white/95 backdrop-blur-lg hover:shadow-3xl transition-all duration-300 h-full">
                  <CardHeader className="bg-gradient-to-r from-burgundy/5 to-wine/5 border-b border-gold/20">
                    <CardTitle className="text-burgundy flex items-center text-2xl justify-center">
                      <Camera className="h-7 w-7 mr-3" />
                      Venue Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Venue Images Gallery */}
                      <div className="flex flex-col gap-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src="/NaturesResort.png"
                            alt="Nature's Village Resort"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                          />
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src="/NaturesResort2.png"
                            alt="Nature's Village Resort Area"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                      {/* QR Code and Info */}
                      <div className="flex flex-col items-center justify-center space-y-8">
                        <div className="text-center">
                          <h3 className="text-burgundy font-semibold text-xl mb-2">Quick Access</h3>
                          <p className="text-wine/80">Scan QR code for directions</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gold/10">
                          <QRCode />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Dress Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-burgundy/5 to-wine/5 border-b border-gold/20">
                    <CardTitle className="text-burgundy flex items-center text-xl justify-center">
                      <Gift className="h-6 w-6 mr-3" />
                      Entourage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <p className="text-wine font-medium text-lg text-center">Formal Attire</p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-wine/80">Ladies</p>
                          <p className="text-wine font-medium">Filipiniana</p>
                        </div>
                        <div>
                          <p className="text-wine/80">Gentlemen</p>
                          <p className="text-wine font-medium">Barong & Black Slacks</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-burgundy/5 to-wine/5 border-b border-gold/20">
                    <CardTitle className="text-burgundy flex items-center text-xl justify-center">
                      <Heart className="h-6 w-6 mr-3" />
                      Guests Attire
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-wine font-medium text-lg">For Ladies</p>
                        <p className="text-wine/70">Filipiniana or Long Dress</p>
                      </div>
                      <div className="text-center">
                        <p className="text-wine font-medium text-lg">For Gentlemen</p>
                        <p className="text-wine/70">Barong or Polo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Information Card */}
              <Card className="border-2 border-gold/20 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-burgundy/5 to-wine/5 border-b border-gold/20">
                  <CardTitle className="text-burgundy flex items-center text-xl justify-center">
                    <Calendar className="h-6 w-6 mr-3" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-wine font-medium text-lg">Parking</p>
                      <p className="text-wine/70">Available at venue</p>
                    </div>
                    <div>
                      <p className="text-wine font-medium text-lg">Arrival Time</p>
                      <p className="text-wine/70">15-20 minutes before ceremony</p>
                    </div>
                    <div>
                      <p className="text-wine font-medium text-lg">Contact</p>
                      <p className="text-wine/70">09165305160</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Entourage Section */}
        <section id="entourage" className="py-24 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-burgundy text-burgundy mb-4">
                Our People
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">The Entourage</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                The amazing people who have supported us on our journey and will stand by our side on our special day.
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
              {/* Parents */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Bride's Parent */}
                <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <h3 className="font-serif text-xl text-burgundy mb-4 text-center">Bride's Parent</h3>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-4">
                          <span className="text-white font-serif text-xl">F</span>
                        </div>
                        <h4 className="font-semibold text-burgundy text-lg">Felomina Dela Torre Kusakari</h4>
                        <p className="text-wine/70">Mother</p>
                      </div>
                    </CardContent>
                  </Card>
                {/* Groom's Parents */}
                <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <h3 className="font-serif text-xl text-burgundy mb-4 text-center">Groom's Parents</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-4">
                            <span className="text-white font-serif text-xl">J</span>
                          </div>
                          <h4 className="font-semibold text-burgundy text-lg">Jocelyn Dormido</h4>
                          <p className="text-wine/70">Mother</p>
                        </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-4">
                            <span className="text-white font-serif text-xl">R</span>
                          </div>
                          <h4 className="font-semibold text-burgundy text-lg">Roy Dormido</h4>
                          <p className="text-wine/70">Father</p>
                      </div>
                        </div>
                      </CardContent>
                    </Card>
              </div>

              {/* Wedding Party */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Bride's Party */}
                <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <h3 className="font-serif text-xl text-burgundy mb-4 text-center">Bride's Party</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-3">
                          <span className="text-white font-serif text-lg">I</span>
                          </div>
                        <h4 className="font-semibold text-burgundy text-base">Innah Nepomuceno Piorque</h4>
                        <p className="text-wine/70 text-sm">Maid of Honor</p>
                        </div>
                      {["Kathleen Faye Balo", "Hazel Ruth Abraham", "Rona Gamboa"].map((name, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-14 h-14 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-3">
                            <span className="text-white font-serif text-lg">{name.split(" ").map((n) => n[0]).join("")}</span>
                            </div>
                          <h4 className="text-burgundy font-medium text-base">{name}</h4>
                          <p className="text-wine/70 text-sm">Bridesmaid</p>
                        </div>
                      ))}
                          </div>
                        </CardContent>
                      </Card>
                {/* Groom's Party */}
                <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <h3 className="font-serif text-xl text-burgundy mb-4 text-center">Groom's Party</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-3">
                          <span className="text-white font-serif text-lg">F</span>
                  </div>
                        <h4 className="font-semibold text-burgundy text-base">Frank Niel Alabarta</h4>
                        <p className="text-wine/70 text-sm">Best Man</p>
                </div>
                      {["Lariel Aynaga", "Nelsen John Pudadera", "Christian Bernard Dormido", "Ace Mark Hechanova", "Ariel Remegio Jr.", "Mhiko Catacata", "Janro Pahilangga", "Daniel Charles Velayo"].map((name, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-14 h-14 bg-gradient-to-br from-burgundy to-wine rounded-full flex items-center justify-center mb-3">
                            <span className="text-white font-serif text-lg">{name.split(" ").map((n) => n[0]).join("")}</span>
                          </div>
                          <h4 className="text-burgundy font-medium text-base">{name}</h4>
                          <p className="text-wine/70 text-sm">Groomsman</p>
                        </div>
                      ))}
                          </div>
                        </CardContent>
                      </Card>
              </div>

              {/* Principal Sponsors */}
              <div>
                <h3 className="font-serif text-2xl text-burgundy mb-8 text-center">Principal Sponsors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {["Jeanie Velayo", "Teresa Nepomuceno", "Engr. Joenil Lavadia", "Femy Delator", "Tara Talafer", "Ariel Amedo", "Gemma De los Santos", "Dra. Gladys Pailano Tan", "Marivic Dormido", "Bryan Amaporado", "Lynee Penaflor", "Engr. Leo Pahilanga", "Rene Pailano", "Julie Peruelo", "Sampaguita Repique", "Margarita Gonschorek", "Daisy Carmona", "Erica Escanuela", "Connie Franco Gallego", "Bonifacio Alvarez Jr.", "Engr. Jeffrey Alvarez"].map((name, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-white/90 rounded-xl border border-gold/20 shadow hover:shadow-lg transition-all duration-200 py-4 px-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold to-beige rounded-full flex items-center justify-center mb-2">
                        <span className="text-burgundy font-serif text-xs">{name.split(" ").map((n) => n[0]).join("")}</span>
                          </div>
                      <h4 className="text-burgundy text-xs text-center font-medium">{name}</h4>
                        </div>
                  ))}
                </div>
              </div>

              {/* Special Roles */}
              <div>
                <h3 className="font-serif text-2xl text-burgundy mb-6 text-center">Special Roles</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="font-semibold text-burgundy mb-3">Flower Girls</h4>
                        <div className="space-y-2">
                          <p className="text-wine">Aria Francheska Dela Torre</p>
                          <p className="text-wine">Michaella Ysabelle Abraham</p>
                          <p className="text-wine">Jenine Alvarez</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="font-semibold text-burgundy mb-3">Ring Bearer</h4>
                        <p className="text-wine">Luke Andrei Realubit</p>

                        <h4 className="font-semibold text-burgundy mb-3 mt-4">Bible Bearer</h4>
                        <p className="text-wine">Lawrence Aynaga</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gold/20 shadow-lg bg-white/95 backdrop-blur-md">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h4 className="font-semibold text-burgundy mb-3">Coin Bearer</h4>
                        <p className="text-wine">Larthonie Aynaga</p>

                        <h4 className="font-semibold text-burgundy mb-3 mt-4">Pastor</h4>
                        <p className="text-wine">Johnny Lingco</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced RSVP Section */}
        <section id="rsvp" className="py-24 bg-gradient-to-br from-beige/20 to-gold/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-gold text-burgundy mb-4">
                Join Us
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">RSVP</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                Please confirm your attendance by <strong>November 15, 2025</strong>. We can't wait to celebrate with
                you!
              </p>
            </div>

            <Card className="max-w-3xl mx-auto border-2 border-gold/20 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-burgundy/5 to-wine/5">
                <CardTitle className="text-burgundy text-2xl text-center">Confirm Your Attendance</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <RSVPForm />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Book of Guests Section */}
        <section className="py-24 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-gold text-burgundy mb-4">
                Guest List
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Book of Guests</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                See who's joining us on our special day. Your RSVP will appear here once confirmed.
              </p>
            </div>

            <BookOfGuests />
          </div>
        </section>

        {/* Registry Section */}
        <section id="registry" className="py-24 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-gold text-burgundy mb-4">
                Gift Guide
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Gift Registry</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                Your presence is the greatest gift, but if you wish to honor us with something special, here are our
                registries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { store: "Williams Sonoma", icon: Gift, color: "from-burgundy to-wine" },
                { store: "Crate & Barrel", icon: Gift, color: "from-wine to-burgundy" },
                { store: "Amazon", icon: Gift, color: "from-gold to-beige" },
              ].map((registry, index) => (
                <Card
                  key={index}
                  className="border-2 border-gold/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm"
                >
                  <CardContent className="pt-8 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${registry.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}
                    >
                      <registry.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-burgundy mb-4 text-xl">{registry.store}</h3>
                    <Button
                      variant="outline"
                      className="border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white rounded-xl px-6 py-3 font-medium"
                    >
                      View Registry
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="inline-block bg-gradient-to-r from-burgundy/5 to-wine/5 border-2 border-gold/20">
                <CardContent className="pt-6">
                  <p className="text-wine/80 italic text-lg max-w-md">
                    "The best gifts are those that come from the heart. Your love and support mean the world to us."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-gradient-to-br from-beige/20 to-gold/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-burgundy text-burgundy mb-4">
                Questions & Answers
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">FAQ</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about our special day. Can't find what you're looking for? Feel free to
                reach out!
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "What should I wear?",
                  answer:
                    "For guests: Filipiniana or long dress for ladies, Barong or Polo for gentlemen. For the entourage: Strictly formal - Filipiniana for ladies, Barong & Black Slacks for gentlemen. Principal sponsors should wear formal attire.",
                },
                {
                  question: "Will there be parking available?",
                  answer:
                    "Yes! Nature's Village Resort offers parking facilities. Please arrive a few minutes early to allow time for parking and finding your seats.",
                },
                {
                  question: "What time should I arrive?",
                  answer:
                    "The ceremony begins at 4:00 PM on December 10, 2025. Please arrive 15-20 minutes early to find your seats and enjoy the pre-ceremony atmosphere.",
                },
                {
                  question: "Can I bring a plus-one?",
                  answer:
                    "Due to venue capacity, we can only accommodate guests specifically named on your invitation. Thank you for understanding! If you have questions about your invitation, please contact us at 09165305160.",
                },
                {
                  question: "When is the RSVP deadline?",
                  answer:
                    "Please confirm your attendance by November 15, 2025. You can RSVP through this website or contact us directly at 09165305160.",
                },
                {
                  question: "Where is the venue located?",
                  answer:
                    "Nature's Village Resort is located at Talisay Highway, Metro Bacolod, 6115 Negros Occidental. Both the ceremony and reception will be held at the same venue.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="border-2 border-gold/20 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="pt-8">
                    <h3 className="font-semibold text-burgundy mb-4 text-xl">{faq.question}</h3>
                    <p className="text-wine/80 text-lg leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Snap & Share Section */}
        <section id="snap-share" className="py-24 bg-gradient-to-br from-beige/20 to-gold/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-burgundy text-burgundy mb-4">
                Snap & Share
              </Badge>
              <h2 className="font-serif text-4xl md:text-6xl text-burgundy mb-6">Share Your Moments</h2>
              <p className="text-wine/80 text-xl max-w-2xl mx-auto leading-relaxed">
                Help us document our special day by sharing your captured moments using our official hashtag
              </p>
              <div className="mt-6 flex flex-col items-center justify-center">
                <span className="inline-block bg-burgundy/10 text-burgundy font-bold text-2xl md:text-3xl px-6 py-2 rounded-full tracking-wide mb-2">
                  #TheJackAndJanWedding
                </span>
                <p className="text-wine/70 text-base">Use this hashtag on your social media posts to be featured in our wedding gallery</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
              {/* QR Code for Website */}
              <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl border border-gold/20 px-8 py-8 mb-8 md:mb-0">
                <h3 className="text-burgundy font-semibold text-lg mb-4">Share Our Website</h3>
                <QRCode />
                <p className="text-wine/70 text-sm">Scan to visit or share our wedding website</p>
              </div>
              {/* Social Sharing */}
              <div className="flex-1 flex flex-col items-center gap-6">
                <ShareButtons />
                <p className="text-wine/70 text-sm mt-4 max-w-xs text-center">
                  Your photos will be automatically added to our wedding gallery when you use our hashtag!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-burgundy to-wine text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-burgundy" />
                </div>
                <span className="font-serif text-3xl">Jackey & Jan</span>
              </div>

              <div className="grid md:grid-cols-3 gap-12 mb-12 max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold mb-4 text-xl">Contact the Couple</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                      <Phone className="h-5 w-5 text-gold" />
                      <span>09165305160</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-xl">Venue</h3>
                  <div className="space-y-3">
                    <p className="text-lg">Nature's Village Resort</p>
                    <div className="flex items-center justify-center space-x-3">
                      <MapPin className="h-5 w-5 text-gold" />
                      <span className="text-sm">Talisay Highway, Metro Bacolod</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-xl">Important Dates</h3>
                  <div className="space-y-3">
                    <p>
                      RSVP Deadline: <strong>November 15, 2025</strong>
                    </p>
                    <p>
                      Wedding Day: <strong>December 10, 2025</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gold/30 pt-8">
                <p className="opacity-90">Made with ❤️ for Jackey & Jan • December 10, 2025</p>
                <p className="text-sm opacity-70 mt-2">Thank you for being part of our love story</p>
                <p className="text-sm opacity-70 mt-2">
                  Developed by <a href="https://lance28-beep.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">Lance</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Messenger Button */}
      <a
        href="https://m.me/ariaaisha0210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on Messenger"
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 bg-[#0084FF] hover:bg-[#006AFF] text-white rounded-full shadow-2xl p-4 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{ boxShadow: '0 0 24px 4px #0084FF55, 0 4px 24px 0 #0002' }}
      >
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#0084FF"/>
          <path d="M24 10.5C16.545 10.5 10.5 15.94 10.5 22.7c0 3.54 1.695 6.705 4.515 8.865v4.695c0 .405.435.66.78.465l4.305-2.52c1.29.36 2.655.555 3.9.555 7.455 0 13.5-5.535 13.5-12.295 0-6.76-6.045-12.3-13.5-12.3zm1.695 15.66l-3.195-3.405-6.195 3.405 7.305-7.905 3.195 3.405 6.195-3.405-7.305 7.905z" fill="#fff"/>
        </svg>
      </a>

      <style jsx global>{`
        @keyframes float-messenger {
          0% { transform: translateY(0); }
          50% { transform: translateY(-16px) scale(1.08); }
          100% { transform: translateY(0); }
        }
        .animate-float-messenger {
          animation: float-messenger 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
