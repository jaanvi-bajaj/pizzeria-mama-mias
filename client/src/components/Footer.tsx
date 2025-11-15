import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Sheikh Zayed Road, Dubai Marina<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+97141234567" className="text-sm hover:text-white transition-colors">
                  +971 4 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@mamamiaspizzeria.ae" className="text-sm hover:text-white transition-colors">
                  info@mamamiaspizzeria.ae
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">Sunday - Thursday</p>
                  <p>11:00 AM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 ml-8">
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">Friday - Saturday</p>
                  <p>11:00 AM - 12:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Location</h3>
            <p className="text-sm mb-4">
              Visit us at our Dubai Marina location for an authentic Italian dining experience.
            </p>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.open('https://www.google.com/maps/place/Dubai+Marina', '_blank')}
              data-testid="button-view-map"
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Google Maps
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 text-center text-sm">
          <p>&copy; 2025 Mama Mia's Pizzeria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
