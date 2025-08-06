import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Star, MessageCircle } from "lucide-react";
import { CURRENCY_FORMAT, URGENCY_LEVELS } from "@/lib/constants";
import type { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
  poster?: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    rating: string;
    isVerified: boolean;
  };
  onApply?: (jobId: number) => void;
  onMessage?: (jobId: number) => void;
}

export function JobCard({ job, poster, onApply, onMessage }: JobCardProps) {
  const urgencyConfig = URGENCY_LEVELS[job.urgency as keyof typeof URGENCY_LEVELS];
  const timeAgo = job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently";

  return (
    <Card className="job-card">
      <CardContent className="p-4">
        {poster && (
          <div className="flex items-start space-x-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={poster.profileImage} alt={poster.firstName} />
              <AvatarFallback>
                {poster.firstName[0]}{poster.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Posted by {poster.firstName} {poster.lastName[0]}.
                    {poster.isVerified && (
                      <Badge variant="secondary" className="verified-badge ml-2">
                        Verified
                      </Badge>
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    {CURRENCY_FORMAT(job.budget)}
                  </Badge>
                  {job.urgency === 'urgent' && (
                    <Badge variant="destructive">
                      {urgencyConfig.label}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {poster && (
            <div className="flex items-center space-x-1">
              <div className="rating-stars flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(parseFloat(poster.rating))
                        ? "fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({poster.rating})
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            {onMessage && (
              <Button variant="outline" size="sm" onClick={() => onMessage(job.id)}>
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
            )}
            {onApply && (
              <Button size="sm" onClick={() => onApply(job.id)}>
                Apply
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
