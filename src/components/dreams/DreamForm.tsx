
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
  { value: "high", label: "High - Vivid and clear details" },
  { value: "medium", label: "Medium - Some details remembered" },
  { value: "low", label: "Low - Vague impressions only" },
];

const moodOptions = [
  { value: "peaceful", label: "Peaceful" },
  { value: "happy", label: "Happy" },
  { value: "anxious", label: "Anxious" },
  { value: "curious", label: "Curious" },
  { value: "surprised", label: "Surprised" },
  { value: "confused", label: "Confused" },
  { value: "scared", label: "Scared" },
  { value: "neutral", label: "Neutral" },
];

const dreamFormSchema = z.object({
  title: z.string().min(3, {
    message: "Dream title must be at least 3 characters.",
  }).max(100, {
    message: "Dream title must not exceed 100 characters.",
  }),
  description: z.string().min(10, {
    message: "Please provide a more detailed description.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  clarity: z.string({
    required_error: "Please select a clarity level.",
  }),
  mood: z.string({
    required_error: "Please select a mood.",
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
      title: "Dream recorded successfully!",
      description: "Your dream has been saved to your journal.",
    });
    
    console.log("Form submitted:", data);
    
    // In a real app, this is where we'd send data to a backend
    // Navigate back to dashboard after submission
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <Card className="dream-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Record New Dream</CardTitle>
        <CardDescription>Document the details of your dream experience</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dream Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Flying over mountains" {...field} />
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
                    <FormLabel>Date</FormLabel>
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
                              <span>Pick a date</span>
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
                    <FormLabel>Dream Mood</FormLabel>
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
                  <FormLabel>Dream Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your dream in as much detail as you can remember..." 
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
                  <FormLabel>Dream Clarity</FormLabel>
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
                    <Input placeholder="E.g., flying, forest, water (comma-separated)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add tags to categorize your dream
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
                    <FormLabel>Lucid Dream</FormLabel>
                    <FormDescription>
                      Check if you were aware that you were dreaming during the dream
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
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-dream-600 hover:bg-dream-700"
              >
                Save Dream
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DreamForm;
