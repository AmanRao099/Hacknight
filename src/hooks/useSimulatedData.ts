import { useState, useEffect } from 'react';

interface CityData {
  traffic: {
    congestionLevel: number;
    activeVehicles: number;
    avgSpeed: number;
    incidents: number;
  };
  energy: {
    consumption: number;
    renewable: number;
    grid: number;
  };
  utilities: {
    waterUsage: number;
    wasteCollection: number;
    airQuality: number;
  };
  trafficHistory: Array<{ time: string; value: number }>;
  energyHistory: Array<{ time: string; value: number }>;
}

export function useSimulatedData() {
  const [data, setData] = useState<CityData>({
    traffic: {
      congestionLevel: 65,
      activeVehicles: 12500,
      avgSpeed: 35,
      incidents: 2,
    },
    energy: {
      consumption: 450,
      renewable: 35,
      grid: 65,
    },
    utilities: {
      waterUsage: 85,
      wasteCollection: 92,
      airQuality: 78,
    },
    trafficHistory: [],
    energyHistory: [],
  });

  useEffect(() => {
    const generateHistoryData = () => {
      const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      return times.map((time) => ({
        time,
        value: Math.floor(Math.random() * 100),
      }));
    };

    // Initial history data
    setData(prev => ({
      ...prev,
      trafficHistory: generateHistoryData(),
      energyHistory: generateHistoryData(),
    }));

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        traffic: {
          congestionLevel: Math.min(100, Math.max(0, prev.traffic.congestionLevel + (Math.random() - 0.5) * 10)),
          activeVehicles: Math.max(0, prev.traffic.activeVehicles + (Math.random() - 0.5) * 1000),
          avgSpeed: Math.max(0, prev.traffic.avgSpeed + (Math.random() - 0.5) * 5),
          incidents: Math.max(0, Math.floor(prev.traffic.incidents + (Math.random() - 0.5) * 2)),
        },
        energy: {
          consumption: Math.max(0, prev.energy.consumption + (Math.random() - 0.5) * 20),
          renewable: Math.min(100, Math.max(0, prev.energy.renewable + (Math.random() - 0.5) * 5)),
          grid: Math.min(100, Math.max(0, prev.energy.grid + (Math.random() - 0.5) * 5)),
        },
        utilities: {
          waterUsage: Math.min(100, Math.max(0, prev.utilities.waterUsage + (Math.random() - 0.5) * 5)),
          wasteCollection: Math.min(100, Math.max(0, prev.utilities.wasteCollection + (Math.random() - 0.5) * 5)),
          airQuality: Math.min(100, Math.max(0, prev.utilities.airQuality + (Math.random() - 0.5) * 5)),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
}