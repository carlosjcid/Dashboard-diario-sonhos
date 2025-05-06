
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from 'lucide-react';

const dreams = [
  {
    id: 1,
    title: 'Flying Over Mountain Range',
    date: 'May 6, 2023',
    mood: 'Peaceful',
    clarity: 'High',
    tags: ['Flying', 'Nature', 'Freedom'],
    excerpt: 'I was soaring over mountains with a beautiful sunset in the background...'
  },
  {
    id: 2,
    title: 'Exploring Ancient Temple',
    date: 'May 4, 2023',
    mood: 'Curious',
    clarity: 'Medium',
    tags: ['Adventure', 'Mystery', 'Ancient'],
    excerpt: 'I found myself wandering through a temple with glowing hieroglyphics...'
  },
  {
    id: 3,
    title: 'Underwater Civilization',
    date: 'May 2, 2023',
    mood: 'Amazed',
    clarity: 'High',
    tags: ['Water', 'Fantasy', 'Civilization'],
    excerpt: 'I discovered a hidden city beneath the ocean where people could breathe underwater...'
  },
];

const getMoodColor = (mood: string) => {
  const moodColors = {
    'Peaceful': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Curious': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'Amazed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Anxious': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Happy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };
  return moodColors[mood as keyof typeof moodColors] || 'bg-gray-100 text-gray-800';
};

const getClarityColor = (clarity: string) => {
  const clarityColors = {
    'High': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Low': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };
  return clarityColors[clarity as keyof typeof clarityColors] || 'bg-gray-100 text-gray-800';
};

const RecentDreams = () => {
  return (
    <Card className="dream-card">
      <CardHeader>
        <CardTitle>Recent Dreams</CardTitle>
        <CardDescription>Your latest recorded dream experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {dreams.map((dream) => (
            <div key={dream.id} className="p-4 border border-border rounded-lg hover:border-dream-200/50 transition-colors">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-lg">{dream.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 mr-1" />
                  <span>{dream.date}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-3 text-sm">{dream.excerpt}</p>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={getMoodColor(dream.mood)}>
                  {dream.mood}
                </Badge>
                <Badge className={getClarityColor(dream.clarity)}>
                  {dream.clarity}
                </Badge>
                {dream.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-background">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/journal" className="text-dream-600 hover:text-dream-700 text-sm font-medium">
            View all dreams →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentDreams;
