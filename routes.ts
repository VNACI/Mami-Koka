import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertJobSchema,
  insertJobApplicationSchema,
  insertMarketplaceItemSchema,
  insertEventSchema,
  insertEventTicketSchema,
  insertReviewSchema,
  insertNotificationSchema,
} from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await storage.getUser(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ ...user, password: undefined });
  });

  app.patch("/api/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const updates = req.body;
    
    const user = await storage.updateUser(userId, updates);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ ...user, password: undefined });
  });

  // Job routes
  app.get("/api/jobs", async (req, res) => {
    const { category, location, search } = req.query;
    const jobs = await storage.getJobs({
      category: category as string,
      location: location as string,
      search: search as string,
    });
    
    res.json(jobs);
  });

  app.get("/api/jobs/:id", async (req, res) => {
    const jobId = parseInt(req.params.id);
    const job = await storage.getJob(jobId);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.json(job);
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.json(job);
    } catch (error) {
      res.status(400).json({ message: "Invalid job data" });
    }
  });

  app.patch("/api/jobs/:id", async (req, res) => {
    const jobId = parseInt(req.params.id);
    const updates = req.body;
    
    const job = await storage.updateJob(jobId, updates);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.json(job);
  });

  app.delete("/api/jobs/:id", async (req, res) => {
    const jobId = parseInt(req.params.id);
    const success = await storage.deleteJob(jobId);
    
    if (!success) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.json({ message: "Job deleted successfully" });
  });

  // Job application routes
  app.get("/api/jobs/:id/applications", async (req, res) => {
    const jobId = parseInt(req.params.id);
    const applications = await storage.getJobApplications(jobId);
    res.json(applications);
  });

  app.post("/api/jobs/:id/applications", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const applicationData = insertJobApplicationSchema.parse({
        ...req.body,
        jobId,
      });
      
      const application = await storage.createJobApplication(applicationData);
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  app.get("/api/users/:id/applications", async (req, res) => {
    const userId = parseInt(req.params.id);
    const applications = await storage.getJobApplicationsByUser(userId);
    res.json(applications);
  });

  // Marketplace routes
  app.get("/api/marketplace", async (req, res) => {
    const { category, location, search } = req.query;
    const items = await storage.getMarketplaceItems({
      category: category as string,
      location: location as string,
      search: search as string,
    });
    
    res.json(items);
  });

  app.get("/api/marketplace/:id", async (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = await storage.getMarketplaceItem(itemId);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.json(item);
  });

  app.post("/api/marketplace", async (req, res) => {
    try {
      const itemData = insertMarketplaceItemSchema.parse(req.body);
      const item = await storage.createMarketplaceItem(itemData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid item data" });
    }
  });

  app.patch("/api/marketplace/:id", async (req, res) => {
    const itemId = parseInt(req.params.id);
    const updates = req.body;
    
    const item = await storage.updateMarketplaceItem(itemId, updates);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.json(item);
  });

  app.delete("/api/marketplace/:id", async (req, res) => {
    const itemId = parseInt(req.params.id);
    const success = await storage.deleteMarketplaceItem(itemId);
    
    if (!success) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.json({ message: "Item deleted successfully" });
  });

  // Event routes
  app.get("/api/events", async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = await storage.getEvent(eventId);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  // Event ticket routes
  app.post("/api/events/:id/tickets", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const ticketData = insertEventTicketSchema.parse({
        ...req.body,
        eventId,
        ticketNumber: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
      
      const ticket = await storage.createEventTicket(ticketData);
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ message: "Invalid ticket data" });
    }
  });

  app.get("/api/users/:id/tickets", async (req, res) => {
    const userId = parseInt(req.params.id);
    const tickets = await storage.getEventTicketsByUser(userId);
    res.json(tickets);
  });

  // Review routes
  app.get("/api/users/:id/reviews", async (req, res) => {
    const userId = parseInt(req.params.id);
    const reviews = await storage.getReviewsForUser(userId);
    res.json(reviews);
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // Notification routes
  app.get("/api/users/:id/notifications", async (req, res) => {
    const userId = parseInt(req.params.id);
    const notifications = await storage.getNotifications(userId);
    res.json(notifications);
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const notificationData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(notificationData);
      res.json(notification);
    } catch (error) {
      res.status(400).json({ message: "Invalid notification data" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    const notificationId = parseInt(req.params.id);
    const success = await storage.markNotificationAsRead(notificationId);
    
    if (!success) {
      return res.status(404).json({ message: "Notification not found" });
    }
    
    res.json({ message: "Notification marked as read" });
  });

  // Wallet routes
  app.post("/api/users/:id/wallet/withdraw", async (req, res) => {
    const userId = parseInt(req.params.id);
    const { amount, method } = req.body;
    
    // Mock mobile money withdrawal
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    
    const user = await storage.updateUserBalance(userId, -amount);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Create notification
    await storage.createNotification({
      userId,
      title: "Withdrawal Processed",
      message: `Le ${amount.toLocaleString()} has been withdrawn to your ${method} account`,
      type: "payment",
    });
    
    res.json({ message: "Withdrawal processed successfully", balance: user.walletBalance });
  });

  app.post("/api/users/:id/wallet/deposit", async (req, res) => {
    const userId = parseInt(req.params.id);
    const { amount, method } = req.body;
    
    // Mock mobile money deposit
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    
    const user = await storage.updateUserBalance(userId, amount);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Create notification
    await storage.createNotification({
      userId,
      title: "Deposit Successful",
      message: `Le ${amount.toLocaleString()} has been added to your wallet from ${method}`,
      type: "payment",
    });
    
    res.json({ message: "Deposit successful", balance: user.walletBalance });
  });

  const httpServer = createServer(app);
  return httpServer;
}
