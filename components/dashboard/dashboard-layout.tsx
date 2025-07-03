'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { StatisticsTab } from './statistics-tab';
import { ProjectsTab } from './projects-tab';

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('statistics');

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <StatisticsTab />;
      case 'projects':
        return <ProjectsTab />;
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