import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { CURRENCY_FORMAT } from "@/lib/constants";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  onBuyTicket?: (eventId: number) => void;
}

export function EventCard({ event, onBuyTicket }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100;

  return (
    <Card className="event-card">
      <div className="aspect-video relative">
        <img
          src={event.image || "/api/placeholder/500/250"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {!isUpcoming && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            Past Event
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{eventDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.soldTickets} / {event.totalTickets} tickets sold</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${soldPercentage}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            {CURRENCY_FORMAT(event.ticketPrice)}
          </div>
          {onBuyTicket && isUpcoming && event.soldTickets < event.totalTickets && (
            <Button onClick={() => onBuyTicket(event.id)}>
              <Ticket className="h-4 w-4 mr-2" />
              Buy Ticket
            </Button>
          )}
          {event.soldTickets >= event.totalTickets && (
            <Badge variant="secondary">Sold Out</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
