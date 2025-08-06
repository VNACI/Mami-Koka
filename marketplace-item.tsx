import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { CURRENCY_FORMAT, ITEM_CONDITIONS } from "@/lib/constants";
import type { MarketplaceItem } from "@shared/schema";

interface MarketplaceItemProps {
  item: MarketplaceItem;
  onContact?: (itemId: number) => void;
}

export function MarketplaceItemCard({ item, onContact }: MarketplaceItemProps) {
  const conditionConfig = ITEM_CONDITIONS[item.condition as keyof typeof ITEM_CONDITIONS];
  const timeAgo = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently";

  return (
    <Card className="marketplace-item">
      <div className="aspect-square relative">
        <img
          src={item.images?.[0] || "/api/placeholder/300/200"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {conditionConfig && (
          <Badge
            className={`absolute top-2 right-2 ${conditionConfig.color} text-white`}
          >
            {conditionConfig.label}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <p className="text-lg font-bold text-primary mb-2">
          {CURRENCY_FORMAT(item.price)}
        </p>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
          {onContact && (
            <Button variant="outline" size="sm" onClick={() => onContact(item.id)}>
              Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
