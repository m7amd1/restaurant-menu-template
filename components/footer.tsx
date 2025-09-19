import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Taste of Arabia</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Experience authentic Middle Eastern cuisine with traditional flavors and modern presentation. Every dish
              tells a story of heritage and passion.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Reservations
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Catering
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  123 Jerusalem Street
                  <br />
                  Palestine.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">+972-3-123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">info@tasteofarabia.co.il</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Sunday - Thursday</p>
                  <p>11:00 AM - 11:00 PM</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground ml-7">
                <p className="font-medium">Friday</p>
                <p>11:00 AM - 3:00 PM</p>
              </div>
              <div className="text-sm text-muted-foreground ml-7">
                <p className="font-medium">Saturday</p>
                <p>8:00 PM - 12:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {year} Authentic Restaurant. All rights reserved.
          </p>
          {/* <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
