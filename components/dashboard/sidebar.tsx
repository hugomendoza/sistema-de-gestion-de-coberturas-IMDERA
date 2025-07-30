'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  BarChart3, 
  FolderOpen, 
  LogOut, 
  Menu, 
  X, 
  Shield,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 'statistics',
      label: 'Estadísticas',
      icon: BarChart3,
    },
    {
      id: 'projects',
      label: 'Proyectos',
      icon: FolderOpen,
    },
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: User,
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 lg:relative lg:translate-x-0",
        isMobileOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      IMDERA
                    </h1>
                    <p className="text-xs text-muted-foreground">Dashboard</p>
                  </div>
                </div>
              )}
              
              {/* Desktop collapse button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hidden lg:flex h-8 w-8"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>

              {/* Mobile close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobile}
                className="lg:hidden h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    activeTab === item.id && "bg-gradient-to-r from-primary to-secondary text-white",
                    isCollapsed && "px-2 justify-center"
                  )}
                  onClick={() => {
                    onTabChange(item.id);
                    if (window.innerWidth < 1024) setIsMobileOpen(false);
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && item.label}
                </Button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={cn(
              "flex items-center justify-between mb-4",
              isCollapsed && "flex-col space-y-2"
            )}>
              <ThemeToggle />
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className={cn(
                "w-full transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground",
                isCollapsed && "px-2 justify-center"
              )}
              onClick={logout}
              title={isCollapsed ? "Cerrar Sesión" : undefined}
            >
              <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && "Cerrar Sesión"}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 lg:hidden"
        onClick={toggleMobile}
      >
        <Menu className="h-4 w-4" />
      </Button>
    </>
  );
}