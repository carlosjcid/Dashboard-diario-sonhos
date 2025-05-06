
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

const clarityLevels = [
  { value: "high", label: "Alta - Detalhes vívidos e claros" },
  { value: "medium", label: "Média - Alguns detalhes lembrados" },
  { value: "low", label: "Baixa - Apenas impressões vagas" },
];

const moodOptions = [
  { value: "peaceful", label: "Tranquilo" },
  { value: "happy", label: "Feliz" },
  { value: "anxious", label: "Ansioso" },
  { value: "curious", label: "Curioso" },
  { value: "surprised", label: "Surpreso" },
  { value: "confused", label: "Confuso" },
  { value: "scared", label: "Assustado" },
  { value: "neutral", label: "Neutro" },
];

const dreamFormSchema = z.object({
  title: z.string().min(3, {
    message: "O título do sonho deve ter pelo menos 3 caracteres.",
  }).max(100, {
    message: "O título do sonho não deve exceder 100 caracteres.",
  }),
  description: z.string().min(10, {
    message: "Por favor, forneça uma descrição mais detalhada.",
  }),
  date: z.date({
    required_error: "Por favor, selecione uma data.",
  }),
  clarity: z.string({
    required_error: "Por favor, selecione um nível de clareza.",
  }),
  mood: z.string({
    required_error: "Por favor, selecione um humor.",
  }),
  tags: z.string().optional(),
  isLucid: z.boolean().default(false),
});

type DreamFormValues = z.infer<typeof dreamFormSchema>;

const DreamForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      clarity: "medium",
      mood: "neutral",
      tags: "",
      isLucid: false,
    },
  });

  function onSubmit(data: DreamFormValues) {
    toast({
      title: "Sonho registrado com sucesso!",
      description: "Seu sonho foi salvo no seu diário.",
    });
    
    console.log("Formulário enviado:", data);
    
    // Em um aplicativo real, é aqui que enviaríamos os dados para um backend
    // Navegue de volta para o painel após o envio
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <Card className="dream-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Novo Sonho</CardTitle>
        <CardDescription>Documente os detalhes da sua experiência de sonho</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Sonho</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Voando sobre montanhas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Humor do Sonho</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        {...field}
                      >
                        {moodOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Sonho</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva seu sonho com o máximo de detalhes que você conseguir lembrar..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clareza do Sonho</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {clarityLevels.map((level) => (
                        <FormItem key={level.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={level.value} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {level.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: voando, floresta, água (separados por vírgula)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Adicione tags para categorizar seu sonho
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isLucid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300 text-dream-600 focus:ring-dream-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sonho Lúcido</FormLabel>
                    <FormDescription>
                      Marque se você estava ciente de que estava sonhando durante o sonho
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-dream-600 hover:bg-dream-700"
              >
                Salvar Sonho
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DreamForm;
