import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  onAddToCart?: (id: string) => void;
}

export default function MenuItem({
  id,
  name,
  description,
  price,
  category,
  image,
  onAddToCart
}: MenuItemProps) {
  const aedPrice = (price * 3.67).toFixed(2);

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 hover:shadow-lg" data-testid={`card-menu-item-${id}`}>
      <div className="relative aspect-[4/3]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-3 right-3 bg-chart-3 text-chart-3-foreground border-0"
          data-testid={`badge-category-${id}`}
        >
          {category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground" data-testid={`text-name-${id}`}>{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`text-description-${id}`}>
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
              AED {aedPrice}
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              (${price})
            </span>
          </div>
          <Button 
            onClick={() => onAddToCart?.(id)}
            size="default"
            data-testid={`button-add-to-cart-${id}`}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
