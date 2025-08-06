import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { Calendar, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Events() {
  const { toast } = useToast();

  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/events'],
  });

  const handleBuyTicket = (eventId: number) => {
    toast({
      title: "Ticket Purchased",
      description: "Your ticket has been purchased successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-muted-foreground">
            Discover and attend amazing events in your area
          </p>
        </div>

        {/* Event Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events?.map((event: any) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBuyTicket={handleBuyTicket}
                />
              ))}
            </div>

            {events?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Calendar className="h-12 w-12 mx-auto mb-2" />
                  <p>No upcoming events found</p>
                </div>
                <Button variant="outline">
                  Create Event
                </Button>
              </div>
            )}

            {events && events.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Load More Events</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
