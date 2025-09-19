import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Car, Utensils } from "lucide-react";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  // const contactInfo = [
  //   {
  //     icon: MapPin,
  //     title: "Address",
  //     details: ["123 Jerusalem Street", "Tel Aviv, Israel 12345"],
  //     action: "Get Directions",
  //   },
  //   {
  //     icon: Phone,
  //     title: "Phone",
  //     details: ["+972-3-123-4567", "+972-50-123-4567"],
  //     action: "Call Now",
  //   },
  //   {
  //     icon: Mail,
  //     title: "Email",
  //     details: ["info@tasteofarabia.co.il", "reservations@tasteofarabia.co.il"],
  //     action: "Send Email",
  //   },
  // ]

  const hours = [
    { day: "Sunday - Thursday", hours: "11:00 AM - 11:00 PM" },
    { day: "Friday", hours: "11:00 AM - 3:00 PM" },
    { day: "Saturday", hours: "8:00 PM - 12:00 AM" },
  ];

  const services = [
    {
      icon: Utensils,
      title: "Dine In",
      description: "Enjoy our full menu in our cozy restaurant",
    },
    {
      icon: Car,
      title: "Takeaway",
      description: "Order ahead and pick up your favorites",
    },
    {
      icon: Phone,
      title: "Delivery",
      description: "We deliver to your doorstep within 5km",
    },
  ];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Contact Us
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                We'd love to hear from you. Contact us for reservations,
                catering, or any questions about our authentic Middle Eastern
                cuisine.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <info.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-4">{info.title}</h3>
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div> */}

            {/* Contact Form and Info Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name
                      </label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name
                      </label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone
                    </label>
                    <Input type="tel" placeholder="+972-50-123-4567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </label>
                    <Input placeholder="What is this regarding?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>

              {/* Hours and Services */}
              <div className="space-y-8">
                {/* Opening Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Opening Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                      >
                        <span className="font-medium text-foreground">
                          {schedule.day}
                        </span>
                        <span className="text-muted-foreground">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Hours may vary during holidays.
                        Please call ahead to confirm.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Our Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <service.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {service.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Find Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                      <div className="w-full">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.331837056789!2d35.21371!3d31.768319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ2JzA2LjAiTiAzNcKwMTInNDkuNCJF!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Restaurant Location in Jerusalem"
                        ></iframe>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
