import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Banknote } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    instructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      setLocation('/cart');
    }
    setCartItems(cart);
  }, [setLocation]);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return await response.json();
    },
    onSuccess: (data: any) => {
      localStorage.removeItem('cart');
      setLocation(`/confirmation?orderNumber=${data.order.orderNumber}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error placing order",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join('-').substring(0, 19) : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 6);
    }
    return cleaned;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    if (paymentMethod === "card") {
      const cleanedCard = cardData.cardNumber.replace(/\D/g, '');
      if (cleanedCard.length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      if (!/^\d{2}\/\d{4}$/.test(cardData.expiry)) {
        newErrors.expiry = "Expiry must be in MM/YYYY format";
      }
      if (!/^\d{3,4}$/.test(cardData.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const orderNumber = 'MM' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * 3.67), 0);
      const deliveryFee = 15;
      const total = subtotal + deliveryFee;

      const cardLastFour = paymentMethod === "card" 
        ? cardData.cardNumber.replace(/\D/g, '').slice(-4)
        : null;

      const orderData = {
        order: {
          orderNumber,
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          deliveryAddress: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          deliveryInstructions: formData.instructions || null,
          subtotal: subtotal.toFixed(2),
          deliveryFee: deliveryFee.toFixed(2),
          total: total.toFixed(2),
          paymentMethod,
          cardLastFour,
          status: "pending",
        },
        items: cartItems.map(item => ({
          itemName: item.name,
          quantity: item.quantity,
          price: (item.price * 3.67).toFixed(2),
        })),
      };

      createOrderMutation.mutate(orderData);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * 3.67), 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartCount} />
      
      <div className="flex-1 py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
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
                          data-testid="input-checkout-name"
                        />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          data-testid="input-checkout-email"
                        />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          data-testid="input-checkout-phone"
                        />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          data-testid="input-checkout-address"
                        />
                        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          data-testid="input-checkout-city"
                        />
                        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <Label htmlFor="postalCode">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          data-testid="input-checkout-postal"
                        />
                        {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                        <Textarea
                          id="instructions"
                          value={formData.instructions}
                          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                          rows={3}
                          data-testid="input-checkout-instructions"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label>Payment Method *</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={(value: "cash" | "card") => setPaymentMethod(value)}
                      >
                        <div className="flex items-center space-x-3 border rounded-lg p-4 hover-elevate">
                          <RadioGroupItem value="cash" id="cash" data-testid="radio-payment-cash" />
                          <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Banknote className="h-5 w-5 text-muted-foreground" />
                            <span>Cash on Delivery</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border rounded-lg p-4 hover-elevate">
                          <RadioGroupItem value="card" id="card" data-testid="radio-payment-card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <span>Credit/Debit Card</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "card" && (
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              placeholder="xxxx-xxxx-xxxx-xxxx"
                              value={cardData.cardNumber}
                              onChange={(e) => setCardData({ 
                                ...cardData, 
                                cardNumber: formatCardNumber(e.target.value) 
                              })}
                              maxLength={19}
                              data-testid="input-card-number"
                            />
                            {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date *</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YYYY"
                                value={cardData.expiry}
                                onChange={(e) => setCardData({ 
                                  ...cardData, 
                                  expiry: formatExpiry(e.target.value) 
                                })}
                                maxLength={7}
                                data-testid="input-card-expiry"
                              />
                              {errors.expiry && <p className="text-sm text-destructive mt-1">{errors.expiry}</p>}
                            </div>

                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                placeholder="XXX"
                                type="password"
                                value={cardData.cvv}
                                onChange={(e) => setCardData({ 
                                  ...cardData, 
                                  cvv: e.target.value.replace(/\D/g, '').substring(0, 4) 
                                })}
                                maxLength={4}
                                data-testid="input-card-cvv"
                              />
                              {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      data-testid="button-place-order"
                      disabled={createOrderMutation.isPending}
                    >
                      {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>AED {(item.price * item.quantity * 3.67).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span data-testid="text-order-subtotal">AED {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span data-testid="text-delivery-fee">AED {deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary" data-testid="text-order-total">AED {total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
