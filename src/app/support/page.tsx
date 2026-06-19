import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Phone, Clock } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">How can we help you?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center p-6 border-none shadow-md bg-primary/5">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-muted-foreground mb-4">+91 1800-FLY-KART</p>
          <Button variant="outline" className="w-full">Call Now</Button>
        </Card>
        
        <Card className="text-center p-6 border-none shadow-md bg-primary/5">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-muted-foreground mb-4">support@flykart.com</p>
          <Button variant="outline" className="w-full">Send Email</Button>
        </Card>

        <Card className="text-center p-6 border-none shadow-md bg-primary/5">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
          <p className="text-muted-foreground mb-4">Available 24/7</p>
          <Button className="w-full">Start Chat</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          {/* @ts-ignore - Radix UI typing mismatch */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold text-lg">How long does delivery take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Standard delivery takes 2-3 business days. We also offer Express Delivery which guarantees same-day or next-day delivery depending on your location and the time of order.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold text-lg">What is your return policy?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                We accept returns within 7 days of delivery. Items must be unopened and in their original packaging. Please contact support to initiate a return.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold text-lg">How can I track my order?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Once your order is dispatched, you will receive a tracking link via email and SMS. You can also track your order in real-time from your Dashboard &gt; Orders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold text-lg">Do you offer international shipping?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Currently, we only ship within India. We are working on expanding our delivery network globally in the near future.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Contact Form */}
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Order Inquiry" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full text-base h-12">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
