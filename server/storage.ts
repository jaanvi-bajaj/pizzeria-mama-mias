import { db } from "../db";
import { 
  menuItems, 
  orders, 
  orderItems, 
  reservations, 
  testimonials, 
  timeline,
  awards,
  type MenuItem,
  type InsertMenuItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type Reservation,
  type InsertReservation,
  type Testimonial,
  type InsertTestimonial,
  type Timeline,
  type InsertTimeline,
  type Award,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Menu Items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemById(id: string): Promise<MenuItem | undefined>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItemAvailability(id: string, available: boolean): Promise<MenuItem | undefined>;

  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<{ order: Order; items: OrderItem[] }>;
  getOrderById(id: string): Promise<{ order: Order; items: OrderItem[] } | undefined>;
  getOrderByOrderNumber(orderNumber: string): Promise<{ order: Order; items: OrderItem[] } | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;

  // Reservations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservationById(id: string): Promise<Reservation | undefined>;
  getAllReservations(): Promise<Reservation[]>;
  updateReservationStatus(id: string, status: string): Promise<Reservation | undefined>;

  // Testimonials
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  updateTestimonialApproval(id: string, approved: boolean): Promise<Testimonial | undefined>;

  // Timeline
  getTimelineItems(): Promise<Timeline[]>;
  createTimelineItem(item: InsertTimeline): Promise<Timeline>;

  // Awards
  getAwards(): Promise<Award[]>;
}

export class DbStorage implements IStorage {
  // Menu Items
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.available, true));
  }

  async getMenuItemById(id: string): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(
      and(
        eq(menuItems.category, category),
        eq(menuItems.available, true)
      )
    );
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [created] = await db.insert(menuItems).values(item).returning();
    return created;
  }

  async updateMenuItemAvailability(id: string, available: boolean): Promise<MenuItem | undefined> {
    const [updated] = await db.update(menuItems)
      .set({ available })
      .where(eq(menuItems.id, id))
      .returning();
    return updated;
  }

  // Orders
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<{ order: Order; items: OrderItem[] }> {
    const [createdOrder] = await db.insert(orders).values(order).returning();
    
    const itemsWithOrderId = items.map(item => ({
      ...item,
      orderId: createdOrder.id,
    }));
    
    const createdItems = await db.insert(orderItems).values(itemsWithOrderId).returning();
    
    return { order: createdOrder, items: createdItems };
  }

  async getOrderById(id: string): Promise<{ order: Order; items: OrderItem[] } | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return undefined;
    
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { order, items };
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<{ order: Order; items: OrderItem[] } | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    if (!order) return undefined;
    
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
    return { order, items };
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [updated] = await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return updated;
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  // Reservations
  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [created] = await db.insert(reservations).values(reservation).returning();
    return created;
  }

  async getReservationById(id: string): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return await db.select().from(reservations).orderBy(desc(reservations.createdAt));
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation | undefined> {
    const [updated] = await db.update(reservations)
      .set({ status })
      .where(eq(reservations.id, id))
      .returning();
    return updated;
  }

  // Testimonials
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(testimonial).returning();
    return created;
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.approved, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async updateTestimonialApproval(id: string, approved: boolean): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials)
      .set({ approved })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  // Timeline
  async getTimelineItems(): Promise<Timeline[]> {
    return await db.select().from(timeline).orderBy(timeline.order);
  }

  async createTimelineItem(item: InsertTimeline): Promise<Timeline> {
    const [created] = await db.insert(timeline).values(item).returning();
    return created;
  }

  // Awards
  async getAwards(): Promise<Award[]> {
    return await db.select().from(awards).orderBy(awards.order);
  }
}

export const storage = new DbStorage();
