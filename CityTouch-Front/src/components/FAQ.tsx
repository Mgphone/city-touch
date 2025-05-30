import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faqData";
import { FAQProps } from "@/data/type/faqProps";

import { Check } from "lucide-react";

export const FAQ = () => {
  return (
    <section id="faq" className="bg-background dark:bg-gray-900 py-5 sm:py-20">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faq.map(({ id, question, answer }: FAQProps) => (
            <AccordionItem key={id} value={`faq-${id}`}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
              <AccordionContent className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <Check className="mt-1 min-w-[1rem] text-green-500" />
                <p className="flex-1">{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
