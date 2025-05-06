
import React from 'react';
import Layout from '../components/layout/Layout';
import DreamStats from '../components/dashboard/DreamStats';
import DreamChart from '../components/dashboard/DreamChart';
import RecentDreams from '../components/dashboard/RecentDreams';
import MoodDistribution from '../components/dashboard/MoodDistribution';

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dream Dashboard</h1>
        <p className="text-muted-foreground">
          Track and visualize your dream patterns over time
        </p>
      </div>
      
      <DreamStats />
      
      <DreamChart />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentDreams />
        </div>
        <div className="lg:col-span-2">
          <MoodDistribution />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
