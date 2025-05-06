
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <Layout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Configure as preferências do seu diário de sonhos
        </p>
      </div>
      
      <Card className="dream-card mb-4 sm:mb-6">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Configure como você deseja receber lembretes</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Lembrete Matinal de Sonho</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Receba uma notificação pela manhã para registrar seus sonhos</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resumo Semanal de Sonhos</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Receba um relatório semanal dos padrões dos seus sonhos</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Padrões de Sonhos</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Seja notificado sobre padrões recorrentes em seus sonhos</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      
      <Card className="dream-card mb-4 sm:mb-6">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>Preferências de Exibição</CardTitle>
          <CardDescription>Personalize a aparência e o comportamento do seu diário de sonhos</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Modo Escuro</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Usar tema de cores escuro</p>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mostrar Ícones de Sonhos</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Exibir ícones baseados nos temas dos sonhos</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Efeitos de Animação</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Ativar animações por todo o aplicativo</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card className="dream-card mb-4 sm:mb-6">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>Privacidade</CardTitle>
          <CardDescription>Gerencie seus dados e configurações de privacidade</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div>
              <p className="font-medium">Exportar Dados de Sonhos</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Baixar todos os seus registros de sonhos</p>
            </div>
            <Button variant="outline">Exportar</Button>
          </div>
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div>
              <p className="font-medium">Limpar Todos os Sonhos</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Excluir todos os registros de sonhos (não pode ser desfeito)</p>
            </div>
            <Button variant="destructive">Limpar Dados</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end mt-6 sm:mt-8">
        <Button 
          className="bg-dream-600 hover:bg-dream-700 w-full sm:w-auto"
          onClick={handleSave}
        >
          Salvar Configurações
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
