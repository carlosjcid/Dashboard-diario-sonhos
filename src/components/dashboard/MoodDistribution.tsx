
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Peaceful', value: 8, color: '#3B82F6' },
  { name: 'Happy', value: 6, color: '#10B981' },
  { name: 'Anxious', value: 4, color: '#EF4444' },
  { name: 'Curious', value: 5, color: '#F59E0B' },
  { name: 'Surprised', value: 3, color: '#8B5CF6' },
];

const COLORS = data.map(item => item.color);

const MoodDistribution = () => {
  return (
    <Card className="dream-card">
      <CardHeader>
        <CardTitle>Dream Moods</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value) => <span style={{color: '#666'}}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MoodDistribution;
