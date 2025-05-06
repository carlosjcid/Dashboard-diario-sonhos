
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  BarChart2, 
  Settings, 
  PlusCircle,
  Moon
} from 'lucide-react';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

const menuItems = [
  { name: 'Painel', icon: Home, path: '/' },
  { name: 'Calendário', icon: Calendar, path: '/calendar' },
  { name: 'Diário', icon: BookOpen, path: '/journal' },
  { name: 'Análises', icon: BarChart2, path: '/analytics' },
  { name: 'Configurações', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <SidebarComponent>
      <SidebarHeader className="py-6">
        <div className="flex items-center px-4">
          <Moon className="h-6 w-6 mr-2 text-dream-500" />
          <span className="text-lg font-bold">DiárioDosSonhos</span>
        </div>
        <div className="absolute right-2 top-6 md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name} className="py-1">
                  <SidebarMenuButton asChild className={location.pathname === item.path ? "bg-sidebar-accent" : ""}>
                    <Link to={item.path} className="w-full flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <Link 
              to="/new-dream" 
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-dream-600 hover:bg-dream-700 text-white font-medium transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>Registrar Sonho</span>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
