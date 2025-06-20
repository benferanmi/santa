
import { useState, useEffect } from 'react';
import {
    Search,
    DollarSign,
    Package,
    Video,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import AppLayout from './ui/AppLayout';
import HeaderWithTitleAndSearch from './ui/HeaderWithTitleAndSearch';
import { useApi } from '../hooks/useApi';
import { dashboardAPI } from '../services/api';
import { DashboardStats } from '../types';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('2025-05');

    // Fetch dashboard stats
    const { data: stats, loading: statsLoading, error: statsError } = useApi<DashboardStats>(
        dashboardAPI.getStats,
        { showToast: false }
    );

    // Sample data for different months
    const chartData = {
        '2025-01': [
            { day: '1', orders: 45 },
            { day: '5', orders: 52 },
            { day: '10', orders: 48 },
            { day: '15', orders: 61 },
            { day: '20', orders: 55 },
            { day: '25', orders: 67 },
            { day: '31', orders: 73 }
        ],
        '2025-02': [
            { day: '1', orders: 38 },
            { day: '5', orders: 42 },
            { day: '10', orders: 51 },
            { day: '15', orders: 47 },
            { day: '20', orders: 59 },
            { day: '25', orders: 63 },
            { day: '28', orders: 58 }
        ],
        '2025-03': [
            { day: '1', orders: 41 },
            { day: '5', orders: 47 },
            { day: '10', orders: 53 },
            { day: '15', orders: 49 },
            { day: '20', orders: 62 },
            { day: '25', orders: 68 },
            { day: '31', orders: 71 }
        ],
        '2025-04': [
            { day: '1', orders: 44 },
            { day: '5', orders: 50 },
            { day: '10', orders: 46 },
            { day: '15', orders: 58 },
            { day: '20', orders: 64 },
            { day: '25', orders: 69 },
            { day: '30', orders: 75 }
        ],
        '2025-05': [
            { day: '1', orders: 48 },
            { day: '5', orders: 55 },
            { day: '10', orders: 52 },
            { day: '15', orders: 67 },
            { day: '20', orders: 71 },
            { day: '25', orders: 78 },
            { day: '30', orders: 82 }
        ]
    };

    const months = [
        { value: '2025-01', label: 'January 2025' },
        { value: '2025-02', label: 'February 2025' },
        { value: '2025-03', label: 'March 2025' },
        { value: '2025-04', label: 'April 2025' },
        { value: '2025-05', label: 'May 2025' }
    ];

    const summaryData = [
        {
            title: 'Revenue Summary',
            value: statsLoading ? '...' : `$${stats?.revenue?.toLocaleString() || '0'}`,
            change: statsLoading ? '...' : `${stats?.revenueChange > 0 ? '+' : ''}${stats?.revenueChange}%`,
            changeType: (stats?.revenueChange || 0) >= 0 ? 'increase' : 'decrease',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Total Orders',
            value: statsLoading ? '...' : stats?.totalOrders?.toLocaleString() || '0',
            change: statsLoading ? '...' : `${stats?.ordersChange > 0 ? '+' : ''}${stats?.ordersChange}%`,
            changeType: (stats?.ordersChange || 0) >= 0 ? 'increase' : 'decrease',
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Videos Completed',
            value: statsLoading ? '...' : stats?.videosCompleted?.toLocaleString() || '0',
            change: statsLoading ? '...' : `${stats?.videosChange > 0 ? '+' : ''}${stats?.videosChange}%`,
            changeType: (stats?.videosChange || 0) >= 0 ? 'increase' : 'decrease',
            icon: Video,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        }
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        console.log('Searching for:', e.target.value);
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
                                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
                                            <p className="text-2xl font-bold text-gray-900 mb-2">{item.value}</p>
                                            <div className="flex items-center">
                                                {item.changeType === 'increase' ? (
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                                )}
                                                <span className={`text-sm font-medium ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {item.change}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-1">vs last month</span>
                                            </div>
                                        </div>
                                        <div className={`flex-shrink-0 ${item.bgColor} rounded-lg p-3`}>
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
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Order Analytics</h2>

                            <div className="flex items-center space-x-2">
                                <label htmlFor="month-select" className="text-sm font-medium text-gray-700">
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
                                    data={chartData[selectedMonth]}
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
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                        labelFormatter={(value) => `Day ${value}`}
                                        formatter={(value) => [`${value} orders`, 'Orders']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', strokeWidth: 0, r: 6 }}
                                        activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <p>Daily order volume for {months.find(m => m.value === selectedMonth)?.label}</p>
                            <p className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                Orders
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
}

export default Dashboard;
