import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Briefcase, Menu, User, Wallet, Settings, LogOut } from "lucide-react";

interface NavbarProps {
  currentUser?: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage?: string;
    isVerified: boolean;
  };
}

export function Navbar({ currentUser }: NavbarProps) {
  const [location] = useLocation();
  const [notificationCount] = useState(3);

  const navItems = [
    { href: "/jobs", label: "Find Jobs" },
    { href: "/jobs/post", label: "Post Jobs" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/events", label: "Events" },
    { href: "/wallet", label: "Wallet" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Mami Koka</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="notification-dot">{notificationCount}</Badge>
                  )}
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.profileImage} alt={currentUser.firstName} />
                        <AvatarFallback>
                          {currentUser.firstName[0]}{currentUser.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{currentUser.firstName} {currentUser.lastName}</p>
                          {currentUser.isVerified && (
                            <Badge variant="secondary" className="verified-badge">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wallet">
                        <Wallet className="mr-2 h-4 w-4" />
                        My Wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {currentUser && (
                  <>
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.profileImage} alt={currentUser.firstName} />
                          <AvatarFallback>
                            {currentUser.firstName[0]}{currentUser.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{currentUser.firstName} {currentUser.lastName}</p>
                          {currentUser.isVerified && (
                            <Badge variant="secondary" className="verified-badge text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link href="/profile" className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link href="/wallet" className="flex items-center space-x-2 text-sm">
                          <Wallet className="h-4 w-4" />
                          <span>My Wallet</span>
                        </Link>
                        <Button variant="ghost" className="w-full justify-start p-0 text-sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start p-0 text-sm text-red-600">
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
