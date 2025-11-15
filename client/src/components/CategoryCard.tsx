import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function CategoryCard({ icon: Icon, title, description, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-lg cursor-pointer" 
      onClick={onClick}
      data-testid={`card-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-chart-2/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-chart-2" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
