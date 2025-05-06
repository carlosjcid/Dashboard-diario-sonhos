
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
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your dream diary preferences
        </p>
      </div>
      
      <Card className="dream-card mb-6">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you want to be reminded</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Morning Dream Reminder</p>
              <p className="text-sm text-muted-foreground">Receive a notification in the morning to record your dreams</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Dream Summary</p>
              <p className="text-sm text-muted-foreground">Get a weekly report of your dream patterns</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dream Pattern Alerts</p>
              <p className="text-sm text-muted-foreground">Be notified of recurring patterns in your dreams</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      
      <Card className="dream-card mb-6">
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Customize how your dream diary looks and behaves</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark color theme</p>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Dream Icons</p>
              <p className="text-sm text-muted-foreground">Display icons based on dream themes</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Animation Effects</p>
              <p className="text-sm text-muted-foreground">Enable animations throughout the app</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card className="dream-card mb-6">
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
          <CardDescription>Manage your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Dream Data</p>
              <p className="text-sm text-muted-foreground">Download all your dream records</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Clear All Dreams</p>
              <p className="text-sm text-muted-foreground">Delete all dream records (cannot be undone)</p>
            </div>
            <Button variant="destructive">Clear Data</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end mt-8">
        <Button 
          className="bg-dream-600 hover:bg-dream-700"
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
