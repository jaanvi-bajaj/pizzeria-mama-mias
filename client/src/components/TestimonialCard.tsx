import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function TestimonialCard({ name, rating, comment, date }: TestimonialCardProps) {
  const initial = name.charAt(0).toUpperCase();
  const colors = ['bg-primary', 'bg-chart-2', 'bg-chart-3'];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <Card className="hover-elevate transition-all duration-300 hover:shadow-lg" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className={`${colors[colorIndex]} text-white`}>
            <AvatarFallback className="bg-transparent">{initial}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-bold text-foreground" data-testid={`text-reviewer-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</h4>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'fill-chart-3 text-chart-3' : 'text-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground italic mb-3" data-testid={`text-review-comment-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          "{comment}"
        </p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  );
}
