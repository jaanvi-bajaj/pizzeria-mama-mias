import Timeline from '../Timeline'

export default function TimelineExample() {
  const milestones = [
    {
      year: "1985",
      title: "Opening Day",
      description: "Mama Maria opened the first location in Naples"
    },
    {
      year: "1995",
      title: "Expansion",
      description: "Opened second location due to popular demand"
    },
    {
      year: "2005",
      title: "International Growth",
      description: "First international location in Dubai"
    },
    {
      year: "2015",
      title: "30th Anniversary",
      description: "Celebrating three decades of excellence"
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online ordering and delivery"
    },
    {
      year: "2025",
      title: "Today",
      description: "Serving thousands of happy customers across multiple locations"
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Timeline items={milestones} />
    </div>
  )
}
