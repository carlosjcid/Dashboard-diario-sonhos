
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

// Mock data for charts
const monthlyDreamData = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 18 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 22 },
  { month: 'May', count: 26 },
];

const dreamMoodsData = [
  { name: 'Peaceful', value: 35, color: '#3B82F6' },
  { name: 'Happy', value: 25, color: '#10B981' },
  { name: 'Anxious', value: 15, color: '#EF4444' },
  { name: 'Curious', value: 20, color: '#F59E0B' },
  { name: 'Surprised', value: 5, color: '#8B5CF6' },
];

const dreamClarityData = [
  { month: 'Jan', high: 5, medium: 5, low: 2 },
  { month: 'Feb', high: 7, medium: 8, low: 3 },
  { month: 'Mar', high: 6, medium: 7, low: 2 },
  { month: 'Apr', high: 9, medium: 10, low: 3 },
  { month: 'May', high: 12, medium: 9, low: 5 },
];

const dreamThemesData = [
  { name: 'Flying', count: 15, color: '#3B82F6' },
  { name: 'Falling', count: 8, color: '#EF4444' },
  { name: 'Chase', count: 10, color: '#F59E0B' },
  { name: 'Water', count: 12, color: '#06B6D4' },
  { name: 'Family', count: 9, color: '#10B981' },
  { name: 'Travel', count: 14, color: '#8B5CF6' },
  { name: 'Work', count: 6, color: '#EC4899' },
  { name: 'School', count: 5, color: '#F97316' },
];

const lucidDreamData = [
  { month: 'Jan', lucid: 2, total: 12 },
  { month: 'Feb', lucid: 5, total: 18 },
  { month: 'Mar', lucid: 4, total: 15 },
  { month: 'Apr', lucid: 7, total: 22 },
  { month: 'May', lucid: 8, total: 26 },
];

const Analytics = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dream Analytics</h1>
        <p className="text-muted-foreground">
          Analyze your dream patterns and trends over time
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="moods">Moods</TabsTrigger>
          <TabsTrigger value="clarity">Clarity</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="lucidity">Lucidity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card className="dream-card">
              <CardHeader>
                <CardTitle>Dreams Per Month</CardTitle>
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
                      formatter={(value) => [`${value} dreams`, 'Count']}
                    />
                    <Bar dataKey="count" fill="#866EFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="dream-card">
              <CardHeader>
                <CardTitle>Dream Mood Distribution</CardTitle>
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
                      formatter={(value) => [`${value}`, 'Dreams']}
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
              <CardTitle>Dream Mood Analysis</CardTitle>
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
                    formatter={(value) => [`${value} dreams`, 'Count']}
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
              <CardTitle>Dream Clarity Levels Over Time</CardTitle>
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
                  <Bar dataKey="high" name="High Clarity" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="medium" name="Medium Clarity" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="low" name="Low Clarity" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="themes" className="mt-6">
          <Card className="dream-card">
            <CardHeader>
              <CardTitle>Common Dream Themes</CardTitle>
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
                    formatter={(value) => [`${value} dreams`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(134, 110, 255, 0.2)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="count" name="Occurrences" radius={[0, 4, 4, 0]}>
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
              <CardTitle>Lucid Dreaming Progress</CardTitle>
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
                    name="Total Dreams" 
                    stroke="#866EFF" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lucid" 
                    name="Lucid Dreams" 
                    stroke="#4FD1C5" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold">Lucidity Rate: 28%</p>
                <p className="text-muted-foreground text-sm mt-1">26 total dreams, 8 were lucid</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Analytics;
