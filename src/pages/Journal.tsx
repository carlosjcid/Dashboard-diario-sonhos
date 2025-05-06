
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Search, Tag } from 'lucide-react';

const dreams = [
  {
    id: 1,
    title: 'Voando Sobre Cordilheiras',
    date: '6 de maio, 2023',
    mood: 'Tranquilo',
    clarity: 'Alta',
    tags: ['Voando', 'Natureza', 'Liberdade'],
    excerpt: 'Eu estava voando sobre montanhas com um lindo pôr do sol ao fundo. Eu podia sentir o ar frio contra minha pele enquanto planava sem esforço pelo céu. As montanhas abaixo estavam cobertas de florestas exuberantes e eu podia ver rios serpenteando pelos vales.',
  },
  {
    id: 2,
    title: 'Explorando Templo Antigo',
    date: '4 de maio, 2023',
    mood: 'Curioso',
    clarity: 'Média',
    tags: ['Aventura', 'Mistério', 'Antigo'],
    excerpt: 'Me encontrei vagando por um templo com hieróglifos brilhantes nas paredes. Cada símbolo parecia contar uma história, e eu me senti compelido a decifrar seu significado. Ao tocar um dos símbolos, ele começou a brilhar mais forte, revelando uma passagem secreta.',
  },
  {
    id: 3,
    title: 'Civilização Subaquática',
    date: '2 de maio, 2023',
    mood: 'Admirado',
    clarity: 'Alta',
    tags: ['Água', 'Fantasia', 'Civilização'],
    excerpt: 'Descobri uma cidade escondida sob o oceano onde as pessoas podiam respirar debaixo d\'água. Os edifícios eram feitos de coral e cristal, brilhando com uma luz interior. Peixes de todas as cores nadavam livremente através de janelas abertas, e as pessoas haviam desenvolvido guelras ao longo de seus pescoços.',
  },
  {
    id: 4,
    title: 'Biblioteca Infinita',
    date: '29 de abril, 2023',
    mood: 'Tranquilo',
    clarity: 'Média',
    tags: ['Livros', 'Conhecimento', 'Infinito'],
    excerpt: 'Eu estava em uma biblioteca que parecia se estender para sempre em todas as direções. Estantes de livros alcançavam alturas impossíveis, e escadas flutuavam pelo ar para ajudar os visitantes a alcançar as prateleiras mais altas. Cada livro que eu abria continha imagens em movimento em vez de texto.',
  },
  {
    id: 5,
    title: 'Perseguido em um Labirinto',
    date: '27 de abril, 2023',
    mood: 'Ansioso',
    clarity: 'Baixa',
    tags: ['Perseguição', 'Labirinto', 'Perigo'],
    excerpt: 'Eu estava correndo por um labirinto em constante mudança com paredes que mudavam de posição quando eu não estava olhando. Algo estava me perseguindo, mas eu não conseguia ver o que era. Eu só podia ouvir passos se aproximando cada vez que eu parava para recuperar o fôlego.',
  },
  {
    id: 6,
    title: 'Conversa com Meu Eu Futuro',
    date: '25 de abril, 2023',
    mood: 'Curioso',
    clarity: 'Alta',
    tags: ['Tempo', 'Eu', 'Futuro'],
    excerpt: 'Encontrei uma versão mais velha de mim mesmo que compartilhou sabedoria sobre decisões que eu estava enfrentando atualmente. Estávamos sentados em um jardim que mudava de estações rapidamente enquanto conversávamos. A conversa parecia profundamente significativa, embora eu não consiga lembrar de todos os detalhes agora.',
  },
];

const getMoodColor = (mood: string) => {
  const moodColors = {
    'Tranquilo': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Curioso': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'Admirado': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Ansioso': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Feliz': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };
  return moodColors[mood as keyof typeof moodColors] || 'bg-gray-100 text-gray-800';
};

const getClarityColor = (clarity: string) => {
  const clarityColors = {
    'Alta': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Média': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Baixa': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };
  return clarityColors[clarity as keyof typeof clarityColors] || 'bg-gray-100 text-gray-800';
};

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Obter todas as tags únicas
  const allTags = Array.from(
    new Set(dreams.flatMap(dream => dream.tags))
  ).sort();
  
  // Filtrar sonhos com base no termo de pesquisa e na tag selecionada
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
        <h1 className="text-3xl font-bold mb-2">Diário de Sonhos</h1>
        <p className="text-muted-foreground">
          Revise e pesquise seus sonhos registrados
        </p>
      </div>
      
      <Card className="dream-card mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar sonhos..." 
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
                  Todas
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
            <p>Nenhum sonho encontrado com seus critérios de pesquisa.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Journal;
