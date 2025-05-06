
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

// Dados de sonhos com datas
const dreamDates = [
  { date: new Date(2023, 4, 2), count: 2, moods: ['Admirado', 'Curioso'] },
  { date: new Date(2023, 4, 4), count: 1, moods: ['Curioso'] },
  { date: new Date(2023, 4, 6), count: 1, moods: ['Tranquilo'] },
  { date: new Date(2023, 4, 9), count: 1, moods: ['Feliz'] },
  { date: new Date(2023, 4, 11), count: 2, moods: ['Curioso', 'Ansioso'] },
  { date: new Date(2023, 4, 14), count: 1, moods: ['Tranquilo'] },
  { date: new Date(2023, 4, 17), count: 1, moods: ['Surpreso'] },
  { date: new Date(2023, 4, 20), count: 2, moods: ['Tranquilo', 'Feliz'] },
  { date: new Date(2023, 4, 23), count: 1, moods: ['Confuso'] },
  { date: new Date(2023, 4, 25), count: 1, moods: ['Ansioso'] },
  { date: new Date(2023, 4, 28), count: 1, moods: ['Surpreso'] },
  { date: new Date(2023, 5, 1), count: 2, moods: ['Feliz', 'Curioso'] },
  { date: new Date(2023, 5, 4), count: 1, moods: ['Tranquilo'] },
];

const selectedDayDreams = [
  {
    id: 1,
    title: 'Voando Sobre Montanhas',
    mood: 'Tranquilo',
    clarity: 'Alta',
    time: 'Manhã',
    tags: ['Voando', 'Natureza'],
    excerpt: 'Eu estava voando sobre montanhas com um lindo pôr do sol...',
  },
  {
    id: 2,
    title: 'Perdido em uma Cidade Estranha',
    mood: 'Ansioso',
    clarity: 'Média',
    time: 'Início da manhã',
    tags: ['Cidade', 'Perdido'],
    excerpt: 'Eu estava vagando por ruas desconhecidas, tentando encontrar o caminho...',
  }
];

const getMoodColor = (mood: string) => {
  const moodColors = {
    'Tranquilo': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Curioso': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'Admirado': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Ansioso': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Feliz': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Surpreso': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
    'Confuso': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };
  return moodColors[mood as keyof typeof moodColors] || 'bg-gray-100 text-gray-800';
};

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Renderização personalizada para mostrar indicadores de sonho
  const dayRender = (date: Date) => {
    const dreamDate = dreamDates.find(d => 
      d.date.getDate() === date.getDate() && 
      d.date.getMonth() === date.getMonth() && 
      d.date.getFullYear() === date.getFullYear()
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
  
  // Formatar a data selecionada para exibição
  const formattedDate = selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: pt }) : '';
  
  // Verificar se a data selecionada tem sonhos
  const hasDreams = selectedDate && dreamDates.some(d => 
    d.date.getDate() === selectedDate.getDate() && 
    d.date.getMonth() === selectedDate.getMonth() && 
    d.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <Layout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Calendário de Sonhos</h1>
        <p className="text-muted-foreground">
          Acompanhe seus padrões de sonhos ao longo do tempo
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <Card className="dream-card">
            <CardContent className="p-2 sm:p-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border p-1 sm:p-3 pointer-events-auto w-full"
                locale={pt}
                components={{
                  DayContent: ({ date }) => (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {date.getDate()}
                      {dayRender(date)}
                    </div>
                  ),
                }}
              />
              <div className="mt-3 sm:mt-5">
                <p className="text-sm text-muted-foreground mb-2">Legenda:</p>
                <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
                  <div className="flex items-center mb-1">
                    <div className="h-2 w-2 rounded-full bg-dream-500 mr-1.5"></div>
                    <span className="text-xs sm:text-sm">Sonho registrado</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="h-2 w-2 rounded-full bg-dream-500 mr-1.5"></div>
                    <div className="h-2 w-2 rounded-full bg-dream-500 mr-1.5"></div>
                    <span className="text-xs sm:text-sm">Múltiplos sonhos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="dream-card h-full">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle>{formattedDate}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              {hasDreams ? (
                <div className="space-y-4 sm:space-y-6">
                  {selectedDayDreams.map(dream => (
                    <div key={dream.id} className="p-3 sm:p-4 border border-border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
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
                  <p>Nenhum sonho registrado para esta data.</p>
                  <a href="/new-dream" className="text-dream-600 hover:text-dream-700 block mt-2 font-medium">
                    Registrar um sonho
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
