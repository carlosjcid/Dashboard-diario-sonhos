
import React from 'react';
import Layout from '../components/layout/Layout';
import DreamForm from '../components/dreams/DreamForm';

const NewDream = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Registrar Novo Sonho</h1>
        <p className="text-muted-foreground">
          Documente os detalhes do seu sonho antes que desapareçam da memória
        </p>
      </div>
      
      <DreamForm />
    </Layout>
  );
};

export default NewDream;
