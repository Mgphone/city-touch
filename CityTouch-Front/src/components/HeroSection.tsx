import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import emailjs from "@emailjs/browser";
export function HeroSection() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setStatus("Sending...");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setStatus("✅ Email sent successfully!");
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error(error);
        setStatus("❌ Failed to send. Try again later.");
      });
  };
  return (
    <section className="bg-background dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6 w-[90%] px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Get Your <span className="text-primary">Free Quote</span> for Reliable
          <br className="hidden sm:block" /> Man & Van Service
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Fast, friendly, and professional removals across London. Let us make
          your move smooth and hassle-free.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8">
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
            size="lg"
            onClick={() => (window.location.href = "/booking")}
          >
            Get Free Quote
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowEnquiry(!showEnquiry)}
          >
            Enquire Now
          </Button>
        </div>

        {showEnquiry && (
          <Card className="mt-10 max-w-md mx-auto shadow-xl">
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground text-center">
                Fill out your email and phone number, and one of our friendly
                team members will call you back promptly.
                <br />
                No pressure, no obligations — just a quick, free callback.
              </p>

              <>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="user_email">Email Address</Label>
                    <Input
                      type="email"
                      id="user_email"
                      name="user_email"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="user_phone">Phone Number</Label>
                    <Input
                      type="tel"
                      id="user_phone"
                      name="user_phone"
                      placeholder="+44 7700 900123"
                      required
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Briefly, what do you want to book?
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="E.g. Small removal, packing help, etc."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    size="lg"
                  >
                    Request Callback
                  </Button>
                </form>

                {status && (
                  <p className="mt-4 text-center text-sm text-gray-600">
                    {status}
                  </p>
                )}
              </>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
