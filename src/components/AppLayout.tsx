
import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <AppHeader onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 px-6 py-4">
          {children}
        </main>
      </div>
    </div>
  );
};
