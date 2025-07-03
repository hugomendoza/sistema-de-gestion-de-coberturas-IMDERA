'use client';

import { useAuth } from '@/contexts/auth-context';
import { LoginForm } from '@/components/login-form';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <DashboardLayout />;
}