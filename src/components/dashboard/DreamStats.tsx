
import React from 'react';
import { Card } from "@/components/ui/card";
import { Moon, Eye, Brain, TrendingUp } from 'lucide-react';

const statCards = [
  {
    title: 'Dreams This Month',
    value: '24',
    icon: Moon,
    color: 'bg-dream-100 text-dream-600',
    change: '+4',
    trend: 'up',
  },
  {
    title: 'Lucid Dreams',
    value: '7',
    icon: Eye,
    color: 'bg-purple-100 text-purple-600',
    change: '+2',
    trend: 'up',
  },
  {
    title: 'Avg. Dream Clarity',
    value: '73%',
    icon: Brain,
    color: 'bg-blue-100 text-blue-600',
    change: '+5%',
    trend: 'up',
  },
  {
    title: 'Recall Rate',
    value: '86%',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600',
    change: '+3%',
    trend: 'up',
  },
];

const DreamStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="stats-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className={`text-xs font-medium mt-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DreamStats;
