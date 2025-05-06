
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Search, Tag } from 'lucide-react';

const dreams = [
  {
    id: 1,
    title: 'Flying Over Mountain Range',
    date: 'May 6, 2023',
    mood: 'Peaceful',
    clarity: 'High',
    tags: ['Flying', 'Nature', 'Freedom'],
    excerpt: 'I was soaring over mountains with a beautiful sunset in the background. I could feel the cool air against my skin as I glided effortlessly through the sky. The mountains below were covered in lush forests and I could see rivers winding through valleys.',
  },
  {
    id: 2,
    title: 'Exploring Ancient Temple',
    date: 'May 4, 2023',
    mood: 'Curious',
    clarity: 'Medium',
    tags: ['Adventure', 'Mystery', 'Ancient'],
    excerpt: 'I found myself wandering through a temple with glowing hieroglyphics on the walls. Each symbol seemed to tell a story, and I felt compelled to decipher their meaning. As I touched one of the symbols, it began to glow brighter, revealing a hidden passage.',
  },
  {
    id: 3,
    title: 'Underwater Civilization',
    date: 'May 2, 2023',
    mood: 'Amazed',
    clarity: 'High',
    tags: ['Water', 'Fantasy', 'Civilization'],
    excerpt: 'I discovered a hidden city beneath the ocean where people could breathe underwater. The buildings were made of coral and crystal, glowing with an inner light. Fish of all colors swam freely through open windows, and the people had developed gills along their necks.',
  },
  {
    id: 4,
    title: 'Endless Library',
    date: 'April 29, 2023',
    mood: 'Peaceful',
    clarity: 'Medium',
    tags: ['Books', 'Knowledge', 'Infinite'],
    excerpt: 'I was in a library that seemed to stretch on forever in all directions. Bookshelves reached impossibly high, and ladders floated through the air to help visitors reach the highest shelves. Each book I opened contained moving images instead of text.',
  },
  {
    id: 5,
    title: 'Chased Through a Maze',
    date: 'April 27, 2023',
    mood: 'Anxious',
    clarity: 'Low',
    tags: ['Chase', 'Maze', 'Danger'],
    excerpt: 'I was running through an ever-changing maze with walls that shifted position when I wasn\'t looking. Something was chasing me, but I couldn\'t see what it was. I could only hear footsteps getting closer each time I paused to catch my breath.',
  },
  {
    id: 6,
    title: 'Conversation with Future Self',
    date: 'April 25, 2023',
    mood: 'Curious',
    clarity: 'High',
    tags: ['Time', 'Self', 'Future'],
    excerpt: 'I met an older version of myself who shared wisdom about decisions I was currently facing. We sat in a garden that changed seasons rapidly as we talked. The conversation felt deeply meaningful, though I can\'t remember all the details now.',
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

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(dreams.flatMap(dream => dream.tags))
  ).sort();
  
  // Filter dreams based on search term and selected tag
  const filteredDreams = dreams.filter(dream => {
    const matchesSearch = searchTerm === '' || 
      dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTag = selectedTag === null || 
      dream.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
      
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dream Journal</h1>
        <p className="text-muted-foreground">
          Review and search through your recorded dreams
        </p>
      </div>
      
      <Card className="dream-card mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search dreams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                <Badge 
                  className={`cursor-pointer ${selectedTag === null ? 'bg-dream-600' : 'bg-secondary'}`}
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Badge>
                {allTags.map(tag => (
                  <Badge 
                    key={tag} 
                    className={`cursor-pointer ${selectedTag === tag ? 'bg-dream-600' : 'bg-secondary'}`}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {filteredDreams.length > 0 ? (
          filteredDreams.map((dream) => (
            <Card key={dream.id} className="dream-card overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-xl">{dream.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    <span>{dream.date}</span>
                  </div>
                </div>
                
                <p className="mb-4">{dream.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={getMoodColor(dream.mood)}>
                    {dream.mood}
                  </Badge>
                  <Badge className={getClarityColor(dream.clarity)}>
                    {dream.clarity}
                  </Badge>
                  {dream.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="bg-background cursor-pointer"
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No dreams found matching your search criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Journal;
