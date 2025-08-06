import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarketplaceItemCard } from "@/components/marketplace-item";
import { Search, Filter } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const { toast } = useToast();

  const { data: items, isLoading } = useQuery({
    queryKey: ['/api/marketplace', { 
      search: searchQuery || undefined,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      location: selectedLocation !== "all" ? selectedLocation : undefined,
    }],
  });

  const handleContactSeller = (itemId: number) => {
    toast({
      title: "Contact Information",
      description: "Seller contact details have been sent to you.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">
            Buy and sell items in your local community
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
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
                  {CATEGORIES.MARKETPLACE.slice(1).map((category) => (
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

        {/* Marketplace Items */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items?.map((item: any) => (
                <MarketplaceItemCard
                  key={item.id}
                  item={item}
                  onContact={handleContactSeller}
                />
              ))}
            </div>

            {items?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Filter className="h-12 w-12 mx-auto mb-2" />
                  <p>No items found matching your criteria</p>
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

            {items && items.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">Load More Items</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
