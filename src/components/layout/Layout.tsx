
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
