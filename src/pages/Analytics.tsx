
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

// Dados fictícios para os gráficos
const monthlyDreamData = [
  { month: 'Jan', count: 12 },
  { month: 'Fev', count: 18 },
  { month: 'Mar', count: 15 },
  { month: 'Abr', count: 22 },
  { month: 'Mai', count: 26 },
];

const dreamMoodsData = [
  { name: 'Tranquilo', value: 35, color: '#3B82F6' },
  { name: 'Feliz', value: 25, color: '#10B981' },
  { name: 'Ansioso', value: 15, color: '#EF4444' },
  { name: 'Curioso', value: 20, color: '#F59E0B' },
  { name: 'Surpreso', value: 5, color: '#8B5CF6' },
];

const dreamClarityData = [
  { month: 'Jan', high: 5, medium: 5, low: 2 },
  { month: 'Fev', high: 7, medium: 8, low: 3 },
  { month: 'Mar', high: 6, medium: 7, low: 2 },
  { month: 'Abr', high: 9, medium: 10, low: 3 },
  { month: 'Mai', high: 12, medium: 9, low: 5 },
];

const dreamThemesData = [
  { name: 'Voando', count: 15, color: '#3B82F6' },
  { name: 'Caindo', count: 8, color: '#EF4444' },
  { name: 'Perseguição', count: 10, color: '#F59E0B' },
  { name: 'Água', count: 12, color: '#06B6D4' },
  { name: 'Família', count: 9, color: '#10B981' },
  { name: 'Viagem', count: 14, color: '#8B5CF6' },
  { name: 'Trabalho', count: 6, color: '#EC4899' },
  { name: 'Escola', count: 5, color: '#F97316' },
];

const lucidDreamData = [
  { month: 'Jan', lucid: 2, total: 12 },
  { month: 'Fev', lucid: 5, total: 18 },
  { month: 'Mar', lucid: 4, total: 15 },
  { month: 'Abr', lucid: 7, total: 22 },
  { month: 'Mai', lucid: 8, total: 26 },
];

const Analytics = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Análises de Sonhos</h1>
        <p className="text-muted-foreground">
          Analise seus padrões e tendências de sonhos ao longo do tempo
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="moods">Humores</TabsTrigger>
          <TabsTrigger value="clarity">Clareza</TabsTrigger>
          <TabsTrigger value="themes">Temas</TabsTrigger>
          <TabsTrigger value="lucidity">Lucidez</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card className="dream-card">
              <CardHeader>
                <CardTitle>Sonhos Por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyDreamData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderRadius: '8px',
                        border: '1px solid rgba(134, 110, 255, 0.2)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} sonhos`, 'Contagem']}
                    />
                    <Bar dataKey="count" fill="#866EFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="dream-card">
              <CardHeader>
                <CardTitle>Distribuição de Humor nos Sonhos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dreamMoodsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dreamMoodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Sonhos']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderRadius: '8px',
                        border: '1px solid rgba(134, 110, 255, 0.2)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="moods" className="mt-6">
          <Card className="dream-card">
            <CardHeader>
              <CardTitle>Análise de Humor nos Sonhos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={dreamMoodsData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {dreamMoodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} sonhos`, 'Contagem']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(134, 110, 255, 0.2)'
                    }} 
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clarity" className="mt-6">
          <Card className="dream-card">
            <CardHeader>
              <CardTitle>Níveis de Clareza ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={dreamClarityData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(134, 110, 255, 0.2)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="high" name="Alta Clareza" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="medium" name="Média Clareza" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="low" name="Baixa Clareza" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="themes" className="mt-6">
          <Card className="dream-card">
            <CardHeader>
              <CardTitle>Temas Comuns de Sonhos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={dreamThemesData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 60,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip 
                    formatter={(value) => [`${value} sonhos`, 'Contagem']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(134, 110, 255, 0.2)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="count" name="Ocorrências" radius={[0, 4, 4, 0]}>
                    {dreamThemesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lucidity" className="mt-6">
          <Card className="dream-card">
            <CardHeader>
              <CardTitle>Progresso de Sonhos Lúcidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={lucidDreamData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(134, 110, 255, 0.2)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    name="Total de Sonhos" 
                    stroke="#866EFF" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lucid" 
                    name="Sonhos Lúcidos" 
                    stroke="#4FD1C5" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold">Taxa de Lucidez: 28%</p>
                <p className="text-muted-foreground text-sm mt-1">26 sonhos no total, 8 foram lúcidos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Analytics;
