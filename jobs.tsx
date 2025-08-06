import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard } from "@/components/job-card";
import { Search, Filter } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const { toast } = useToast();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['/api/jobs', { 
      search: searchQuery || undefined,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      location: selectedLocation !== "all" ? selectedLocation : undefined,
    }],
  });

  const handleApplyToJob = (jobId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    });
  };

  const handleMessageAboutJob = (jobId: number) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the job poster.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground">
            Discover local jobs that match your skills and preferences
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.JOBS.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Freetown">Freetown</SelectItem>
                  <SelectItem value="Bo">Bo</SelectItem>
                  <SelectItem value="Kenema">Kenema</SelectItem>
                  <SelectItem value="Makeni">Makeni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs?.map((job: any) => (
                <JobCard
                  key={job.id}
                  job={job}
                  poster={{
                    firstName: "Sarah",
                    lastName: "Kamara",
                    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                    rating: "4.9",
                    isVerified: true,
                  }}
                  onApply={handleApplyToJob}
                  onMessage={handleMessageAboutJob}
                />
              ))}
            </div>

            {jobs?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Filter className="h-12 w-12 mx-auto mb-2" />
                  <p>No jobs found matching your criteria</p>
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}

            {jobs && jobs.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Load More Jobs</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
