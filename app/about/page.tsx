import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Users, Award, Heart, Star } from "lucide-react"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      icon: ChefHat,
      title: "Authentic Recipes",
      description: "Traditional Middle Eastern recipes passed down through generations",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is prepared with care and passion for authentic flavors",
    },
    {
      icon: Users,
      title: "Family Atmosphere",
      description: "A warm, welcoming environment where everyone feels at home",
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      description: "Only the finest, freshest ingredients sourced from trusted suppliers",
    },
  ]

  const stats = [
    { number: "15+", label: "Years of Experience" },
    { number: "500+", label: "Happy Customers Daily" },
    { number: "50+", label: "Traditional Dishes" },
    { number: "4.9", label: "Customer Rating" },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                About Our Restaurant
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Authentic Middle Eastern Cuisine Since 2008
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                We bring you the finest traditional Middle Eastern dishes, prepared with authentic recipes and the
                freshest ingredients in a warm, family-friendly atmosphere.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-6 text-pretty">
                  Founded in 2008 by the Al-Asala family, our restaurant began as a dream to share the rich culinary
                  traditions of the Middle East with our community. What started as a small family kitchen has grown
                  into a beloved dining destination.
                </p>
                <p className="text-muted-foreground mb-6 text-pretty">
                  Every recipe in our kitchen tells a story - from our grandmother's secret spice blends to traditional
                  cooking methods that have been perfected over centuries. We believe that food is more than sustenance;
                  it's a way to connect cultures and create lasting memories.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Rated 4.9/5 by our customers</span>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/traditional-middle-eastern-restaurant-kitchen-with.jpg"
                  alt="Our kitchen and chefs"
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                These core values guide everything we do, from selecting ingredients to serving our guests.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm text-pretty">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our passionate team of chefs and staff are dedicated to providing you with an exceptional dining
                experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Chef Ahmad Al-Asala", role: "Head Chef & Owner", experience: "25+ years" },
                { name: "Fatima Hassan", role: "Sous Chef", experience: "15+ years" },
                { name: "Omar Khalil", role: "Pastry Chef", experience: "12+ years" },
              ].map((member, index) => (
                <Card key={index} className="text-center overflow-hidden">
                  <img
                    src={`/professional-middle-eastern-chef-portrait-.jpg?height=300&width=300&query=professional middle eastern chef portrait ${index + 1}`}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.experience} of culinary expertise</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Component */}
        <Footer />
      </div>
    </ThemeProvider>
  )
}
