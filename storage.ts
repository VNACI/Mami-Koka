import {
  users,
  jobs,
  jobApplications,
  marketplaceItems,
  events,
  eventTickets,
  reviews,
  notifications,
  type User,
  type InsertUser,
  type Job,
  type InsertJob,
  type JobApplication,
  type InsertJobApplication,
  type MarketplaceItem,
  type InsertMarketplaceItem,
  type Event,
  type InsertEvent,
  type EventTicket,
  type InsertEventTicket,
  type Review,
  type InsertReview,
  type Notification,
  type InsertNotification,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  updateUserBalance(id: number, amount: number): Promise<User | undefined>;

  // Job methods
  getJobs(filters?: { category?: string; location?: string; search?: string }): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getJobsByUser(userId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined>;
  deleteJob(id: number): Promise<boolean>;

  // Job application methods
  getJobApplications(jobId: number): Promise<JobApplication[]>;
  getJobApplicationsByUser(userId: number): Promise<JobApplication[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  updateJobApplication(id: number, updates: Partial<JobApplication>): Promise<JobApplication | undefined>;

  // Marketplace methods
  getMarketplaceItems(filters?: { category?: string; location?: string; search?: string }): Promise<MarketplaceItem[]>;
  getMarketplaceItem(id: number): Promise<MarketplaceItem | undefined>;
  getMarketplaceItemsByUser(userId: number): Promise<MarketplaceItem[]>;
  createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem>;
  updateMarketplaceItem(id: number, updates: Partial<MarketplaceItem>): Promise<MarketplaceItem | undefined>;
  deleteMarketplaceItem(id: number): Promise<boolean>;

  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventsByUser(userId: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, updates: Partial<Event>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  // Event ticket methods
  getEventTickets(eventId: number): Promise<EventTicket[]>;
  getEventTicketsByUser(userId: number): Promise<EventTicket[]>;
  createEventTicket(ticket: InsertEventTicket): Promise<EventTicket>;
  updateEventTicket(id: number, updates: Partial<EventTicket>): Promise<EventTicket | undefined>;

  // Review methods
  getReviewsForUser(userId: number): Promise<Review[]>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Notification methods
  getNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private jobs: Map<number, Job> = new Map();
  private jobApplications: Map<number, JobApplication> = new Map();
  private marketplaceItems: Map<number, MarketplaceItem> = new Map();
  private events: Map<number, Event> = new Map();
  private eventTickets: Map<number, EventTicket> = new Map();
  private reviews: Map<number, Review> = new Map();
  private notifications: Map<number, Notification> = new Map();
  private currentId: number = 1;

  constructor() {
    // Add some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample users
    const sampleUsers = [
      {
        username: "sarah_k",
        email: "sarah@example.com",
        password: "password123",
        firstName: "Sarah",
        lastName: "Kamara",
        phone: "+23276123456",
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        isVerified: true,
        rating: "4.9",
        completedJobs: 23,
        walletBalance: "125000.00",
        location: "Freetown, Western Area",
        skills: ["Mathematics", "Tutoring", "Teaching"],
      },
      {
        username: "michael_a",
        email: "michael@example.com",
        password: "password123",
        firstName: "Michael",
        lastName: "Conteh",
        phone: "+23276234567",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        isVerified: true,
        rating: "4.2",
        completedJobs: 15,
        walletBalance: "85000.00",
        location: "Bo, Southern Province",
        skills: ["Web Design", "Programming", "Digital Marketing"],
      },
    ];

    sampleUsers.forEach((user) => {
      const id = this.currentId++;
      this.users.set(id, { ...user, id });
    });

    // Create sample jobs
    const sampleJobs = [
      {
        title: "House Cleaning Service",
        description: "Need someone to clean a 3-bedroom house. Must be reliable and bring own supplies.",
        category: "Cleaning",
        budget: "25000.00",
        location: "Freetown, Western Area",
        coordinates: { lat: 8.4606, lng: -13.2317 },
        userId: 1,
        status: "active",
        urgency: "normal",
        applicants: 3,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        title: "Delivery Driver",
        description: "Delivery packages across the city. Must have own motorbike.",
        category: "Delivery",
        budget: "15000.00",
        location: "Bo, Southern Province",
        coordinates: { lat: 7.9644, lng: -11.7383 },
        userId: 2,
        status: "active",
        urgency: "urgent",
        applicants: 1,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
    ];

    sampleJobs.forEach((job) => {
      const id = this.currentId++;
      this.jobs.set(id, { ...job, id });
    });

    // Create sample marketplace items
    const sampleItems = [
      {
        title: "Samsung Galaxy A54",
        description: "Excellent condition smartphone with all original accessories. Used for 6 months.",
        price: "950000.00",
        category: "Electronics",
        condition: "used",
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"],
        location: "Freetown",
        userId: 1,
        status: "active",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        title: "HP Laptop 15-inch",
        description: "Great laptop for work and study. Intel i5 processor, 8GB RAM, 256GB SSD.",
        price: "1200000.00",
        category: "Electronics",
        condition: "used",
        images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"],
        location: "Makeni",
        userId: 2,
        status: "active",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    ];

    sampleItems.forEach((item) => {
      const id = this.currentId++;
      this.marketplaceItems.set(id, { ...item, id });
    });

    // Create sample events
    const sampleEvents = [
      {
        title: "African Music Festival",
        description: "Join us for an amazing night of traditional and modern African music featuring top artists from across West Africa.",
        date: new Date("2024-12-15T19:00:00"),
        location: "Freetown",
        venue: "National Stadium",
        ticketPrice: "50000.00",
        totalTickets: 5000,
        soldTickets: 1250,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=250&fit=crop",
        userId: 1,
        status: "active",
        createdAt: new Date(),
      },
      {
        title: "Young Entrepreneurs Summit",
        description: "Network with fellow entrepreneurs, learn from successful business leaders, and discover new opportunities.",
        date: new Date("2024-12-20T09:00:00"),
        location: "Freetown",
        venue: "Bintumani Hotel",
        ticketPrice: "75000.00",
        totalTickets: 300,
        soldTickets: 89,
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=250&fit=crop",
        userId: 2,
        status: "active",
        createdAt: new Date(),
      },
    ];

    sampleEvents.forEach((event) => {
      const id = this.currentId++;
      this.events.set(id, { ...event, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      isVerified: false,
      rating: "0.00",
      completedJobs: 0,
      walletBalance: "0.00",
      profileImage: null,
      location: null,
      skills: [],
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUserBalance(id: number, amount: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const newBalance = (parseFloat(user.walletBalance) + amount).toFixed(2);
    return this.updateUser(id, { walletBalance: newBalance });
  }

  // Job methods
  async getJobs(filters?: { category?: string; location?: string; search?: string }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(job => job.status === "active");
    
    if (filters?.category) {
      jobs = jobs.filter(job => job.category === filters.category);
    }
    
    if (filters?.location) {
      jobs = jobs.filter(job => job.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    
    if (filters?.search) {
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    return jobs.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsByUser(userId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.userId === userId);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentId++;
    const job: Job = {
      ...insertJob,
      id,
      status: "active",
      applicants: 0,
      createdAt: new Date(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: number): Promise<boolean> {
    return this.jobs.delete(id);
  }

  // Job application methods
  async getJobApplications(jobId: number): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).filter(app => app.jobId === jobId);
  }

  async getJobApplicationsByUser(userId: number): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).filter(app => app.userId === userId);
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentId++;
    const application: JobApplication = {
      ...insertApplication,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.jobApplications.set(id, application);
    
    // Update job applicant count
    const job = this.jobs.get(insertApplication.jobId);
    if (job) {
      this.jobs.set(job.id, { ...job, applicants: job.applicants + 1 });
    }
    
    return application;
  }

  async updateJobApplication(id: number, updates: Partial<JobApplication>): Promise<JobApplication | undefined> {
    const application = this.jobApplications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, ...updates };
    this.jobApplications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Marketplace methods
  async getMarketplaceItems(filters?: { category?: string; location?: string; search?: string }): Promise<MarketplaceItem[]> {
    let items = Array.from(this.marketplaceItems.values()).filter(item => item.status === "active");
    
    if (filters?.category) {
      items = items.filter(item => item.category === filters.category);
    }
    
    if (filters?.location) {
      items = items.filter(item => item.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    
    if (filters?.search) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    return items.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getMarketplaceItem(id: number): Promise<MarketplaceItem | undefined> {
    return this.marketplaceItems.get(id);
  }

  async getMarketplaceItemsByUser(userId: number): Promise<MarketplaceItem[]> {
    return Array.from(this.marketplaceItems.values()).filter(item => item.userId === userId);
  }

  async createMarketplaceItem(insertItem: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const id = this.currentId++;
    const item: MarketplaceItem = {
      ...insertItem,
      id,
      status: "active",
      createdAt: new Date(),
    };
    this.marketplaceItems.set(id, item);
    return item;
  }

  async updateMarketplaceItem(id: number, updates: Partial<MarketplaceItem>): Promise<MarketplaceItem | undefined> {
    const item = this.marketplaceItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, ...updates };
    this.marketplaceItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteMarketplaceItem(id: number): Promise<boolean> {
    return this.marketplaceItems.delete(id);
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => event.status === "active")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventsByUser(userId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.userId === userId);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId++;
    const event: Event = {
      ...insertEvent,
      id,
      soldTickets: 0,
      status: "active",
      createdAt: new Date(),
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, updates: Partial<Event>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...updates };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  // Event ticket methods
  async getEventTickets(eventId: number): Promise<EventTicket[]> {
    return Array.from(this.eventTickets.values()).filter(ticket => ticket.eventId === eventId);
  }

  async getEventTicketsByUser(userId: number): Promise<EventTicket[]> {
    return Array.from(this.eventTickets.values()).filter(ticket => ticket.userId === userId);
  }

  async createEventTicket(insertTicket: InsertEventTicket): Promise<EventTicket> {
    const id = this.currentId++;
    const ticket: EventTicket = {
      ...insertTicket,
      id,
      status: "active",
      createdAt: new Date(),
    };
    this.eventTickets.set(id, ticket);
    
    // Update event sold tickets count
    const event = this.events.get(insertTicket.eventId);
    if (event) {
      this.events.set(event.id, { ...event, soldTickets: event.soldTickets + 1 });
    }
    
    return ticket;
  }

  async updateEventTicket(id: number, updates: Partial<EventTicket>): Promise<EventTicket | undefined> {
    const ticket = this.eventTickets.get(id);
    if (!ticket) return undefined;
    
    const updatedTicket = { ...ticket, ...updates };
    this.eventTickets.set(id, updatedTicket);
    return updatedTicket;
  }

  // Review methods
  async getReviewsForUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.revieweeId === userId);
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.reviewerId === userId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    
    // Update user rating
    const reviews = await this.getReviewsForUser(insertReview.revieweeId);
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await this.updateUser(insertReview.revieweeId, { rating: avgRating.toFixed(2) });
    
    return review;
  }

  // Notification methods
  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentId++;
    const notification: Notification = {
      ...insertNotification,
      id,
      isRead: false,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    this.notifications.set(id, { ...notification, isRead: true });
    return true;
  }
}

export const storage = new MemStorage();
