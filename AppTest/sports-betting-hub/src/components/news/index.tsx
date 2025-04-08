"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock news data
const mockNews = [
  {
    id: 1,
    title: "Hamilton secures pole position in Monaco GP",
    sport: "formula1",
    time: "2h ago",
    image: "/images/f1-logo.png",
  },
  {
    id: 2,
    title: "Lakers advance to Western Conference Finals",
    sport: "basketball",
    time: "5h ago",
    image: "/images/nba-logo.png",
  },
  {
    id: 3,
    title: "Chiefs sign rookie quarterback to 4-year deal",
    sport: "football",
    time: "8h ago",
    image: "/images/nfl-logo.png",
  },
  {
    id: 4,
    title: "Verstappen wins Spanish Grand Prix",
    sport: "formula1",
    time: "1d ago",
    image: "/images/f1-logo.png",
  },
  {
    id: 5,
    title: "NBA Finals set to begin next week",
    sport: "basketball",
    time: "3h ago",
    image: "/images/nba-logo.png",
  },
];

export const NewsSection = () => {
  const [news, setNews] = useState(mockNews);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <Card className="w-[300px] border-none shadow-none">
      <CardContent className="p-2">
        <ScrollArea className="h-16">
          <div className="flex items-center gap-2">
            <img
              src={news[currentNewsIndex].image}
              alt={news[currentNewsIndex].sport}
              className="w-8 h-8 object-contain rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                {news[currentNewsIndex].title}
              </p>
              <p className="text-xs text-muted-foreground">
                {news[currentNewsIndex].time}
              </p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
