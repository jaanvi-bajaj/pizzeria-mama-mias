import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from '@assets/generated_images/elegant_dining_setup_e50d09b1.png';

export default function Reservations() {
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!/^[A-Za-z\s]+$/.test(formData.name) && formData.name.length > 0) {
      newErrors.name = "Name must contain only letters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = "Phone number must be at least 8 digits";
    }
    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      
      if (selectedDate < today) {
        newErrors.date = "Date must be in the future";
      }
      if (selectedDate > maxDate) {
        newErrors.date = "Date must be within 3 months";
      }
    }
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }
    const guests = parseInt(formData.guests);
    if (isNaN(guests) || guests < 1 || guests > 20) {
      newErrors.guests = "Number of guests must be between 1 and 20";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      console.log("Reservation submitted:", formData);
      toast({
        title: "Reservation submitted successfully!",
        description: "We will contact you shortly to confirm your booking.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        notes: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartCount} />
      
      <Hero
        backgroundImage={heroImage}
        title="Make a Reservation"
        subtitle="Book your table for an unforgettable dining experience"
        height="h-[50vh]"
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">Dubai Marina</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Hours</h3>
                <p className="text-sm text-muted-foreground">11 AM - 12 AM</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Capacity</h3>
                <p className="text-sm text-muted-foreground">Up to 20 Guests</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-email"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-phone"
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="date">Reservation Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      data-testid="input-date"
                    />
                    {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      data-testid="input-time"
                    />
                    {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
                  </div>

                  <div>
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      data-testid="input-guests"
                    />
                    {errors.guests && <p className="text-sm text-destructive mt-1">{errors.guests}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Special Requests (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    data-testid="input-notes"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto" data-testid="button-book-now">
                  Book Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
