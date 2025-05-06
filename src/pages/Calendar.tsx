
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Mock dream data with dates
const dreamDates = [
  { date: new Date(2023, 4, 2), count: 2, moods: ['Amazed', 'Curious'] },
  { date: new Date(2023, 4, 4), count: 1, moods: ['Curious'] },
  { date: new Date(2023, 4, 6), count: 1, moods: ['Peaceful'] },
  { date: new Date(2023, 4, 9), count: 1, moods: ['Happy'] },
  { date: new Date(2023, 4, 11), count: 2, moods: ['Curious', 'Anxious'] },
  { date: new Date(2023, 4, 14), count: 1, moods: ['Peaceful'] },
  { date: new Date(2023, 4, 17), count: 1, moods: ['Surprised'] },
  { date: new Date(2023, 4, 20), count: 2, moods: ['Peaceful', 'Happy'] },
  { date: new Date(2023, 4, 23), count: 1, moods: ['Confused'] },
  { date: new Date(2023, 4, 25), count: 1, moods: ['Anxious'] },
  { date: new Date(2023, 4, 28), count: 1, moods: ['Surprised'] },
  { date: new Date(2023, 5, 1), count: 2, moods: ['Happy', 'Curious'] },
  { date: new Date(2023, 5, 4), count: 1, moods: ['Peaceful'] },
];

const selectedDayDreams = [
  {
    id: 1,
    title: 'Flying Over Mountain Range',
    mood: 'Peaceful',
    clarity: 'High',
    time: 'Morning',
    tags: ['Flying', 'Nature'],
    excerpt: 'I was soaring over mountains with a beautiful sunset...',
  },
  {
    id: 2,
    title: 'Lost in a Strange City',
    mood: 'Anxious',
    clarity: 'Medium',
    time: 'Early morning',
    tags: ['City', 'Lost'],
    excerpt: 'I was wandering through unfamiliar streets, trying to find my way...',
  }
];

const getMoodColor = (mood: string) => {
  const moodColors = {
    'Peaceful': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Curious': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'Amazed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Anxious': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Happy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Surprised': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
    'Confused': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };
  return moodColors[mood as keyof typeof moodColors] || 'bg-gray-100 text-gray-800';
};

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Custom day rendering to show dream indicators
  const dayRender = (day: Date) => {
    const dreamDate = dreamDates.find(d => 
      d.date.getDate() === day.getDate() && 
      d.date.getMonth() === day.getMonth() && 
      d.date.getFullYear() === day.getFullYear()
    );
    
    if (!dreamDate) return null;
    
    return (
      <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 pb-0.5">
        {Array.from({ length: dreamDate.count }).map((_, i) => (
          <div 
            key={i} 
            className="h-1.5 w-1.5 rounded-full bg-dream-500 mx-0.5"
          ></div>
        ))}
      </div>
    );
  };
  
  // Format the selected date for display
  const formattedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '';
  
  // Check if the selected date has dreams
  const hasDreams = selectedDate && dreamDates.some(d => 
    d.date.getDate() === selectedDate.getDate() && 
    d.date.getMonth() === selectedDate.getMonth() && 
    d.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dream Calendar</h1>
        <p className="text-muted-foreground">
          Track your dream patterns over time
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="dream-card">
            <CardContent className="p-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                components={{
                  DayContent: ({ day }) => (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {day.getDate()}
                      {dayRender(day)}
                    </div>
                  ),
                }}
              />
              <div className="mt-5">
                <p className="text-sm text-muted-foreground mb-2">Legend:</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-dream-500 mr-1.5"></div>
                    <span className="text-sm">Dream recorded</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-dream-500 mr-1.5"></div>
                    <div className="h-2 w-2 rounded-full bg-dream-500 mr-1.5"></div>
                    <span className="text-sm">Multiple dreams</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="dream-card h-full">
            <CardHeader>
              <CardTitle>{formattedDate}</CardTitle>
            </CardHeader>
            <CardContent>
              {hasDreams ? (
                <div className="space-y-6">
                  {selectedDayDreams.map(dream => (
                    <div key={dream.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{dream.title}</h3>
                        <span className="text-sm text-muted-foreground">{dream.time}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{dream.excerpt}</p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getMoodColor(dream.mood)}>
                          {dream.mood}
                        </Badge>
                        {dream.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="bg-background">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No dreams recorded for this date.</p>
                  <a href="/new-dream" className="text-dream-600 hover:text-dream-700 block mt-2 font-medium">
                    Record a dream
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarView;
