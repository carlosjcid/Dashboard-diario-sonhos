
import React from 'react';
import Layout from '../components/layout/Layout';
import DreamForm from '../components/dreams/DreamForm';

const NewDream = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Record New Dream</h1>
        <p className="text-muted-foreground">
          Document the details of your dream before they fade from memory
        </p>
      </div>
      
      <DreamForm />
    </Layout>
  );
};

export default NewDream;
