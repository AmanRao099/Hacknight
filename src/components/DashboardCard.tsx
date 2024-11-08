import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function DashboardCard({ title, icon, children }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-600">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}