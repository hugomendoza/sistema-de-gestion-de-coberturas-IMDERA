'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { StatisticsTab } from './statistics-tab';
import { ProjectsTab } from './projects-tab';
import { ProfileTab } from './profile-tab';
import { useAuth } from '@/contexts/auth-context';

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('statistics');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <StatisticsTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <StatisticsTab />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}