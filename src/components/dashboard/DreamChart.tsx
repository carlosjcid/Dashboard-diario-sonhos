
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'May 1', dreams: 1, clarity: 50 },
  { date: 'May 2', dreams: 0, clarity: 0 },
  { date: 'May 3', dreams: 2, clarity: 75 },
  { date: 'May 4', dreams: 1, clarity: 60 },
  { date: 'May 5', dreams: 1, clarity: 85 },
  { date: 'May 6', dreams: 0, clarity: 0 },
  { date: 'May 7', dreams: 2, clarity: 70 },
  { date: 'May 8', dreams: 1, clarity: 65 },
  { date: 'May 9', dreams: 0, clarity: 0 },
  { date: 'May 10', dreams: 1, clarity: 90 },
  { date: 'May 11', dreams: 2, clarity: 75 },
  { date: 'May 12', dreams: 1, clarity: 80 },
  { date: 'May 13', dreams: 0, clarity: 0 },
  { date: 'May 14', dreams: 1, clarity: 70 },
];

const DreamChart = () => {
  return (
    <Card className="dream-card mb-8">
      <CardHeader className="pb-2">
        <CardTitle>Dream Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDreams" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#866EFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#866EFF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis yAxisId="left" tickFormatter={(value) => `${value}`} tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                border: '1px solid rgba(134, 110, 255, 0.2)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="dreams" 
              stroke="#866EFF" 
              fillOpacity={1} 
              fill="url(#colorDreams)" 
              strokeWidth={2}
              name="Dreams"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="clarity" 
              stroke="#4FD1C5" 
              fillOpacity={1} 
              fill="url(#colorClarity)" 
              strokeWidth={2}
              name="Clarity %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DreamChart;
