import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema, insertReservationSchema, insertTestimonialSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

// WebSocket clients tracking
const orderClients = new Map<string, Set<WebSocket>>();

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  // WebSocket connection handler
  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === "subscribe_order" && data.orderNumber) {
          if (!orderClients.has(data.orderNumber)) {
            orderClients.set(data.orderNumber, new Set());
          }
          orderClients.get(data.orderNumber)?.add(ws);
          console.log(`Client subscribed to order: ${data.orderNumber}`);
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });

    ws.on("close", () => {
      // Remove client from all subscriptions
      orderClients.forEach((clients) => {
        clients.delete(ws);
      });
      console.log("WebSocket client disconnected");
    });
  });

  // Helper function to broadcast order updates
  function broadcastOrderUpdate(orderNumber: string, update: any) {
    const clients = orderClients.get(orderNumber);
    if (clients) {
      const message = JSON.stringify(update);
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }

  // Menu Items Routes
  app.get("/api/menu", async (req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/menu/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getMenuItemsByCategory(category);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Orders Routes
  app.post("/api/orders", async (req, res) => {
    try {
      const { order, items } = req.body;
      
      // Validate order
      const orderValidation = insertOrderSchema.safeParse(order);
      if (!orderValidation.success) {
        return res.status(400).json({ 
          message: fromZodError(orderValidation.error).message 
        });
      }

      // Validate order items array
      const itemsValidation = z.array(insertOrderItemSchema.omit({ orderId: true })).safeParse(items);
      if (!itemsValidation.success) {
        return res.status(400).json({ 
          message: fromZodError(itemsValidation.error).message 
        });
      }

      const result = await storage.createOrder(orderValidation.data, itemsValidation.data);
      
      // Broadcast new order notification
      broadcastOrderUpdate(result.order.orderNumber, {
        type: "order_created",
        order: result.order,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
      const { orderNumber } = req.params;
      const order = await storage.getOrderByOrderNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const order = await storage.updateOrderStatus(id, status);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Broadcast status update to subscribed clients
      broadcastOrderUpdate(order.orderNumber, {
        type: "order_status_updated",
        order,
      });

      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Reservations Routes
  app.post("/api/reservations", async (req, res) => {
    try {
      const validationResult = insertReservationSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: fromZodError(validationResult.error).message 
        });
      }

      const reservation = await storage.createReservation(validationResult.data);
      res.status(201).json(reservation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getAllReservations();
      res.json(reservations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/reservations/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const reservation = await storage.updateReservationStatus(id, status);
      
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      res.json(reservation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Testimonials Routes
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validationResult = insertTestimonialSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: fromZodError(validationResult.error).message 
        });
      }

      const testimonial = await storage.createTestimonial(validationResult.data);
      res.status(201).json(testimonial);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/testimonials/all", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/testimonials/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const { approved } = req.body;
      
      const testimonial = await storage.updateTestimonialApproval(id, approved);
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      res.json(testimonial);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Timeline Routes
  app.get("/api/timeline", async (req, res) => {
    try {
      const items = await storage.getTimelineItems();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
