import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Is there parking available?",
      answer: "Yes, parking is available at the venue."
    },
    {
      question: "What are your gift preferences?",
      answer: "We prefer monetary gifts."
    },
    {
      question: "Are phones allowed during the ceremony?",
      answer: "We kindly request that phones remain out of sight during the ceremony as much as possible."
    }
  ];

  const colorPalette = [
    { color: "#451c20", name: "Deep Burgundy" },
    { color: "#590b18", name: "Dark Wine" },
    { color: "#ffc178", name: "Warm Gold" },
    { color: "#cfb88c", name: "Soft Beige" }
  ];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif text-center mb-8">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-16">
        <h3 className="text-2xl font-serif text-center mb-6">Wedding Color Palette</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {colorPalette.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-20 h-20 rounded-full mb-2 shadow-md"
                style={{ backgroundColor: color.color }}
              />
              <span className="text-sm text-gray-600">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 