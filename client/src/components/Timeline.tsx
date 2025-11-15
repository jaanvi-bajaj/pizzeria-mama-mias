import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-chart-2" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            data-testid={`timeline-item-${index}`}
          >
            <div className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 rounded-full bg-chart-2 border-4 border-background z-10" />
            
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
              <Card className="hover-elevate transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
