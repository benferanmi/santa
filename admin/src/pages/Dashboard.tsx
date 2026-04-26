import { useState, useEffect } from "react";
import {
  Search,
  DollarSign,
  Package,
  Video,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AppLayout from "./ui/AppLayout";
import HeaderWithTitleAndSearch from "./ui/HeaderWithTitleAndSearch";
import { useApi } from "../hooks/useApi";
import { dashboardAPI } from "../services/api";
import { DashboardStats, ChartData, DailyVolume } from "../types";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2025-05");

  // Fetch dashboard stats
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useApi<DashboardStats>(dashboardAPI.getStats, { showToast: false });

  const demochartsData = {
    "2025-08-14": 3,
  };

  const transformDailyVolume = (dailyVolume?: DailyVolume): ChartData[] => {
    if (!dailyVolume) return []; // safeguard
    return Object.entries(dailyVolume).map(([date, orders]) => {
      const day = new Date(date).getDate().toString();
      return { day, orders };
    });
  };
  const chartsData = transformDailyVolume(demochartsData);
  console.log(chartsData, "this is");
  const monchartsData = transformDailyVolume(stats?.daily_volume);

  console.log(monchartsData);

  const months = [
    { value: "2025-01", label: "January 2025" },
    { value: "2025-02", label: "February 2025" },
    { value: "2025-03", label: "March 2025" },
    { value: "2025-04", label: "April 2025" },
    { value: "2025-05", label: "May 2025" },
  ];

  const summaryData = [
    {
      title: "Revenue Summary",
      value: statsLoading
        ? "..."
        : `$${stats?.revenue?.toLocaleString() || "0"}`,
      change: statsLoading
        ? "..."
        : `${stats?.revenueChange > 0 ? "+" : ""}${stats?.revenueChange}%`,
      changeType: (stats?.revenueChange || 0) >= 0 ? "increase" : "decrease",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: statsLoading
        ? "..."
        : stats?.total_orders?.toLocaleString() || "0",
      change: statsLoading
        ? "..."
        : `${stats?.ordersChange > 0 ? "+" : ""}${stats?.ordersChange}%`,
      changeType: (stats?.ordersChange || 0) >= 0 ? "increase" : "decrease",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Videos Completed",
      value: statsLoading
        ? "..."
        : stats?.videosCompleted?.toLocaleString() || "0",
      change: statsLoading
        ? "..."
        : `${stats?.videosChange > 0 ? "+" : ""}${stats?.videosChange}%`,
      changeType: (stats?.videosChange || 0) >= 0 ? "increase" : "decrease",
      icon: Video,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("Searching for:", e.target.value);
  };

  if (statsError) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600">Error loading dashboard data</p>
            <p className="text-sm text-gray-500 mt-1">{statsError}</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main>
        <div className="space-y-6">
          {/* Header with Title and Search */}
          <HeaderWithTitleAndSearch
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            title={"Dashboard Overview"}
          />

          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {item.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {item.value}
                      </p>
                      <div className="flex items-center"></div>
                    </div>
                    <div
                      className={`flex-shrink-0 ${item.bgColor} rounded-lg p-3`}
                    >
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Analytics Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                Order Analytics
              </h2>

              <div className="flex items-center space-x-2">
                <label
                  htmlFor="month-select"
                  className="text-sm font-medium text-gray-700"
                >
                  Month:
                </label>
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monchartsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelFormatter={(value) => `Day ${value}`}
                    formatter={(value) => [`${value} orders`, "Orders"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 0, r: 6 }}
                    activeDot={{
                      r: 8,
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <p>
                Daily order volume for{" "}
                {months.find((m) => m.value === selectedMonth)?.label}
              </p>
              <p className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Orders
              </p>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Dashboard;
