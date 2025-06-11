"use client"

import { useState } from "react"
import { Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
  onNavigate: (sectionId: string) => void
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "countdown", label: "Countdown" },
    { id: "gallery", label: "Gallery" },
    { id: "prenup", label: "Prenup" },
    { id: "messages", label: "Messages" },
    { id: "details", label: "Details" },
    { id: "entourage", label: "Entourage" },
    { id: "rsvp", label: "RSVP" },
    { id: "registry", label: "Registry" },
    { id: "faq", label: "FAQ" },
  ]

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-burgundy hover:bg-burgundy/10 relative z-50">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white/95 backdrop-blur-md border-l border-gold/20 z-[100]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4 border-b border-gold/20">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-burgundy" />
              <span className="font-serif text-xl text-burgundy">Jackey & Jan</span>
            </div>
          </div>

          <nav className="flex-1 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className="w-full text-left px-4 py-3 text-wine hover:text-burgundy hover:bg-burgundy/5 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-gold/20 pt-4">
            <p className="text-sm text-wine/60 text-center italic">"Two hearts, one love"</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
