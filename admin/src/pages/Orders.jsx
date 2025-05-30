import { useState } from 'react';
import {
    Search,
    Filter,
    Package,
    Calendar,
    User,
    Hash,
    CheckCircle,
    Clock,
    ChevronDown,
    Download,
    Eye
} from 'lucide-react';
import AppLayout from './ui/AppLayout'
import HeaderWithTitleAndSearch from './ui/HeaderWithTitleAndSearch';

const Orders = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Sample orders data
    const ordersData = [
        {
            id: 'ORD-001',
            date: '2025-05-28',
            name: 'John Smith',
            age: 28,
            status: 'delivered'
        },
        {
            id: 'ORD-002',
            date: '2025-05-27',
            name: 'Sarah Johnson',
            age: 34,
            status: 'pending'
        },
        {
            id: 'ORD-003',
            date: '2025-05-26',
            name: 'Michael Brown',
            age: 42,
            status: 'delivered'
        },
        {
            id: 'ORD-004',
            date: '2025-05-25',
            name: 'Emily Davis',
            age: 29,
            status: 'pending'
        },
        {
            id: 'ORD-005',
            date: '2025-05-24',
            name: 'David Wilson',
            age: 37,
            status: 'delivered'
        },
        {
            id: 'ORD-006',
            date: '2025-05-23',
            name: 'Lisa Anderson',
            age: 31,
            status: 'pending'
        },
        {
            id: 'ORD-007',
            date: '2025-05-22',
            name: 'Robert Martinez',
            age: 45,
            status: 'delivered'
        },
        {
            id: 'ORD-008',
            date: '2025-05-21',
            name: 'Jennifer Taylor',
            age: 26,
            status: 'pending'
        }
    ];

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            delivered: {
                icon: CheckCircle,
                label: 'Delivered',
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                iconColor: 'text-green-600'
            },
            pending: {
                icon: Clock,
                label: 'Pending',
                bgColor: 'bg-yellow-100',
                textColor: 'text-yellow-800',
                iconColor: 'text-yellow-600'
            }
        };

        const config = statusConfig[status];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                <Icon className={`w-3 h-3 mr-1 ${config.iconColor}`} />
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Filter and sort orders
    const filteredOrders = ordersData
        .filter(order => {
            const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'date':
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
                    break;
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'age':
                    aValue = a.age;
                    bValue = b.age;
                    break;
                case 'status':
                    aValue = a.status;
                    bValue = b.status;
                    break;
                default:
                    aValue = a.id;
                    bValue = b.id;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleViewOrder = (orderId) => {
        console.log('View order:', orderId);
    };

    const handleExport = () => {
        console.log('Export orders data');
    };

    const totalOrders = ordersData.length;
    const deliveredOrders = ordersData.filter(order => order.status === 'delivered').length;
    const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
    return (
        <AppLayout activePage='/orders'>
            <div className="space-y-6">
                {/* Header */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage and track all customer orders
                        </p>
                    </div>

                    <button
                        onClick={handleExport}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm  p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Package className="h-8 w-8 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm  p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Delivered</p>
                                <p className="text-2xl font-semibold text-gray-900">{deliveredOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm  p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900">{pendingOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm  p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="all">All Status</option>
                                <option value="delivered">Delivered</option>
                                <option value="pending">Pending</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <Filter className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-sm  overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <Hash className="w-4 h-4" />
                                            <span>Order ID</span>
                                            {sortBy === 'id' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('date')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Date</span>
                                            {sortBy === 'date' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <User className="w-4 h-4" />
                                            <span>Name</span>
                                            {sortBy === 'name' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('age')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Age</span>
                                            {sortBy === 'age' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Status</span>
                                            {sortBy === 'status' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(order.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {order.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.age}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => handleViewOrder(order.id)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                            >
                                                <Eye className="w-3 h-3 mr-1" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination info */}
                {filteredOrders.length > 0 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm border">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <p className="text-sm text-gray-700">
                                Showing {filteredOrders.length} of {totalOrders} orders
                            </p>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{filteredOrders.length}</span> of{' '}
                                    <span className="font-medium">{totalOrders}</span> orders
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}

export default Orders