import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Truck, ChefHat, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Order, OrderItem } from "@shared/schema";

const statusConfig = {
  pending: { label: "Order Received", icon: Package, description: "We're preparing your order" },
  preparing: { label: "Preparing", icon: ChefHat, description: "Our chefs are cooking your delicious meal" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, description: "Your order is on its way!" },
  delivered: { label: "Delivered", icon: CheckCircle2, description: "Enjoy your meal!" },
};

export default function Confirmation() {
  const [location] = useLocation();
  const [orderStatus, setOrderStatus] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get('orderNumber');

  const { data: orderData, isLoading } = useQuery<{ order: Order; items: OrderItem[] }>({
    queryKey: ["/api/orders", orderNumber],
    enabled: !!orderNumber,
  });

  useEffect(() => {
    if (!orderNumber) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "subscribe_order", orderNumber }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "order_status_updated" && data.order) {
          setOrderStatus(data.order.status);
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [orderNumber]);

  useEffect(() => {
    if (orderData?.order) {
      setOrderStatus(orderData.order.status);
    }
  }, [orderData]);

  if (!orderNumber) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation cartItemCount={0} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No order found</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation cartItemCount={0} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation cartItemCount={0} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Order not found</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { order, items } = orderData;
  const currentStatus = statusConfig[orderStatus as keyof typeof statusConfig] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={0} />
      
      <div className="flex-1 py-12 md:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-20 h-20 text-chart-2 mx-auto mb-6" />
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                  Order Confirmed!
                </h1>
                
                <p className="text-lg text-muted-foreground mb-2">
                  Thank you for your order, {order.customerName}!
                </p>
                
                <div className="inline-block bg-accent px-6 py-3 rounded-md mb-8">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-order-number">
                    {order.orderNumber}
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <StatusIcon className="w-8 h-8 text-primary" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-muted-foreground">Order Status</p>
                    <p className="text-2xl font-bold text-primary" data-testid="text-order-status">
                      {currentStatus.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentStatus.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.itemName} × {item.quantity}</span>
                      <span>AED {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>AED {order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>AED {order.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">AED {order.total}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-3">Delivery Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Address:</span> {order.deliveryAddress}</p>
                  <p><span className="font-medium">City:</span> {order.city}</p>
                  <p><span className="font-medium">Phone:</span> {order.phone}</p>
                  {order.deliveryInstructions && (
                    <p><span className="font-medium">Instructions:</span> {order.deliveryInstructions}</p>
                  )}
                </div>
              </div>

              <div className="bg-accent/50 rounded-lg p-6 mb-8 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold mb-1">Estimated Delivery Time</p>
                <p className="text-2xl font-bold text-primary">30-45 minutes</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/menu">
                  <Button variant="outline" size="lg" data-testid="button-order-again">
                    Order Again
                  </Button>
                </Link>
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
