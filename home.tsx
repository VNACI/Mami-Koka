import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Search, 
  Plus, 
  Store, 
  Calendar, 
  Wallet, 
  Shield, 
  Smartphone, 
  MapPin,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import { JobCard } from "@/components/job-card";
import { MarketplaceItemCard } from "@/components/marketplace-item";
import { EventCard } from "@/components/event-card";
import { CURRENCY_FORMAT } from "@/lib/constants";

export default function Home() {
  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['/api/jobs'],
  });

  const { data: marketplaceItems, isLoading: marketplaceLoading } = useQuery({
    queryKey: ['/api/marketplace'],
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/events'],
  });

  const { data: currentUser } = useQuery({
    queryKey: ['/api/users/1'],
  });

  const quickActions = [
    { icon: Search, label: "Find Jobs", href: "/jobs" },
    { icon: Plus, label: "Post Job", href: "/jobs/post" },
    { icon: Store, label: "Marketplace", href: "/marketplace" },
    { icon: Calendar, label: "Events", href: "/events" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "All users are verified with phone and ID verification. Your safety is our priority."
    },
    {
      icon: Smartphone,
      title: "Mobile Money Integration",
      description: "Seamlessly withdraw earnings to Orange Money, MTN MoMo, or your bank account."
    },
    {
      icon: MapPin,
      title: "Location-Based Jobs",
      description: "Find opportunities near you with integrated Google Maps and location services."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Work. Earn Money. Build Your Future.
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Connect with local opportunities, manage your finances, and grow your network in one powerful app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/jobs">Find Jobs</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  Post a Job
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-64 h-64 bg-white/10 rounded-full">
                <Smartphone className="w-32 h-32 opacity-75" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card className="dashboard-card mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className="quick-action-btn"
                      >
                        <action.icon className="h-8 w-8 mb-2 mx-auto" />
                        <div className="text-sm">{action.label}</div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Jobs */}
              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Job Opportunities</h2>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/jobs">View All</Link>
                    </Button>
                  </div>
                  
                  {jobsLoading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-32 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {jobs?.slice(0, 2).map((job: any) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          poster={{
                            firstName: "John",
                            lastName: "Doe",
                            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
                            rating: "4.8",
                            isVerified: true,
                          }}
                          onApply={(id) => console.log("Apply to job", id)}
                          onMessage={(id) => console.log("Message about job", id)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet Card */}
              <Card className="wallet-gradient text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">My Wallet</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-2xl font-bold">
                        {currentUser ? CURRENCY_FORMAT(currentUser.walletBalance) : "Le 0"}
                      </div>
                      <div className="text-sm opacity-75">Available Balance</div>
                    </div>
                    <Wallet className="h-8 w-8 opacity-50" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">
                      Withdraw
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-white border-white hover:bg-white hover:text-primary">
                      Add Money
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Stats */}
              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Profile Stats</h3>
                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {currentUser?.completedJobs || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Jobs Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {currentUser?.rating || "0.0"}
                      </div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="rating-stars flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(parseFloat(currentUser?.rating || "0"))
                              ? "fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="secondary" className="verified-badge">
                      Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Savings Goal */}
              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Savings Goal</h3>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">New Laptop</span>
                      <span className="text-sm">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Le 775,000 of Le 1,250,000
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Marketplace</h2>
            <Button variant="outline" asChild>
              <Link href="/marketplace">View All</Link>
            </Button>
          </div>
          
          {marketplaceLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketplaceItems?.slice(0, 4).map((item: any) => (
                <MarketplaceItemCard
                  key={item.id}
                  item={item}
                  onContact={(id) => console.log("Contact about item", id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button variant="outline" asChild>
              <Link href="/events">View All</Link>
            </Button>
          </div>
          
          {eventsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events?.slice(0, 2).map((event: any) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBuyTicket={(id) => console.log("Buy ticket for event", id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Why Choose Mami Koka?</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to succeed in the gig economy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="feature-card text-center">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Mami Koka</h3>
              <p className="text-gray-400 mb-4">
                Empowering opportunities for everyone. Don't do nothing. Do Mami Koka.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs" className="hover:text-white">Find Jobs</Link></li>
                <li><Link href="/jobs/post" className="hover:text-white">Post Jobs</Link></li>
                <li><Link href="/profile" className="hover:text-white">My Profile</Link></li>
                <li><Link href="/wallet" className="hover:text-white">Wallet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
                <li><Link href="/events" className="hover:text-white">Events</Link></li>
                <li><a href="#" className="hover:text-white">Mobile Money</a></li>
                <li><a href="#" className="hover:text-white">Verification</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mami Koka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
