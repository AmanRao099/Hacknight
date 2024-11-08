import React from 'react';
import {
  Car,
  Zap,
  Droplet,
  Trash2,
  Wind,
  Activity,
  Users,
  AlertTriangle,
  Gauge,
  LineChart,
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardCard } from './components/DashboardCard';
import { StatCard } from './components/StatCard';
import { useSimulatedData } from './hooks/useSimulatedData';

function App() {
  const data = useSimulatedData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Smart City Dashboard</h1>
            </div>
            <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Traffic Congestion"
            value={`${Math.round(data.traffic.congestionLevel)}%`}
            trend={2.5}
            icon={<Car className="h-6 w-6" />}
          />
          <StatCard
            title="Active Vehicles"
            value={data.traffic.activeVehicles.toLocaleString()}
            trend={-1.2}
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Average Speed"
            value={`${Math.round(data.traffic.avgSpeed)} mph`}
            trend={1.8}
            icon={<Gauge className="h-6 w-6" />}
          />
          <StatCard
            title="Incidents"
            value={data.traffic.incidents}
            trend={-15}
            icon={<AlertTriangle className="h-6 w-6" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DashboardCard title="Traffic Flow Trends" icon={<LineChart className="h-6 w-6" />}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={data.trafficHistory}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          <DashboardCard title="Energy Consumption" icon={<Zap className="h-6 w-6" />}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={data.energyHistory}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        {/* Utilities Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Water Usage" icon={<Droplet className="h-6 w-6" />}>
            <div className="flex items-center justify-between mt-2">
              <div className="text-3xl font-bold text-blue-600">{Math.round(data.utilities.waterUsage)}%</div>
              <div className="text-sm text-gray-500">of daily capacity</div>
            </div>
          </DashboardCard>

          <DashboardCard title="Waste Collection" icon={<Trash2 className="h-6 w-6" />}>
            <div className="flex items-center justify-between mt-2">
              <div className="text-3xl font-bold text-green-600">{Math.round(data.utilities.wasteCollection)}%</div>
              <div className="text-sm text-gray-500">efficiency rate</div>
            </div>
          </DashboardCard>

          <DashboardCard title="Air Quality" icon={<Wind className="h-6 w-6" />}>
            <div className="flex items-center justify-between mt-2">
              <div className="text-3xl font-bold text-indigo-600">{Math.round(data.utilities.airQuality)}</div>
              <div className="text-sm text-gray-500">AQI (Good)</div>
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
}

export default App;