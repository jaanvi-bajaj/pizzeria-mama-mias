import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Confirmation() {
  const [, setLocation] = useLocation();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (!lastOrder) {
      setLocation('/');
      return;
    }
    setOrderData(JSON.parse(lastOrder));
  }, [setLocation]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={0} />
      
      <div className="flex-1 py-12 md:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <CheckCircle2 className="w-20 h-20 text-chart-2 mx-auto mb-6" />
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                Order Confirmed!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-2">
                Thank you for your order!
              </p>
              
              <div className="inline-block bg-accent px-6 py-3 rounded-md mb-8">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-2xl font-bold text-foreground" data-testid="text-order-number">
                  {orderData.orderNumber}
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {orderData.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>AED {(item.price * item.quantity * 3.67).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>AED {orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>AED {orderData.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">AED {orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 mb-8">
                <p className="text-sm font-semibold mb-1">Estimated Delivery Time</p>
                <p className="text-2xl font-bold text-primary">30-45 minutes</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" data-testid="button-track-order">
                  Track Order
                </Button>
                <Link href="/">
                  <Button size="lg" data-testid="button-back-home">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
