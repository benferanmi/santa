
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
    Eye,
    Edit,
    Trash2
} from 'lucide-react';

import AppLayout from './ui/AppLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ordersAPI } from '../services/api';
import { Order } from '../types';
import { useToast } from '../hooks/use-toast';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Fetch orders
    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: () => ordersAPI.getOrders().then(res => res.data),
    });

    // Update order status mutation
    const updateOrderMutation = useMutation({
        mutationFn: ({ orderId, status }: { orderId: string; status: 'delivered' | 'pending' }) =>
            ordersAPI.updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast({
                title: "Success",
                description: "Order status updated successfully",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // Delete order mutation
    const deleteOrderMutation = useMutation({
        mutationFn: (orderId: string) => ordersAPI.deleteOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast({
                title: "Success",
                description: "Order deleted successfully",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const StatusBadge = ({ status }: { status: 'delivered' | 'pending' }) => {
        const config = {
            delivered: { variant: 'default' as const, label: 'Delivered', icon: CheckCircle },
            pending: { variant: 'secondary' as const, label: 'Pending', icon: Clock }
        };

        const { variant, label, icon: Icon } = config[status];

        return (
            <Badge variant={variant} className="inline-flex items-center">
                <Icon className="w-3 h-3 mr-1" />
                {label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Filter and sort orders
    const filteredOrders = orders
        .filter((order: Order) => {
            const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a: Order, b: Order) => {
            let aValue: any, bValue: any;

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

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleUpdateStatus = (orderId: string, status: 'delivered' | 'pending') => {
        updateOrderMutation.mutate({ orderId, status });
    };

    const handleDeleteOrder = (orderId: string) => {
        deleteOrderMutation.mutate(orderId);
    };

    const handleExport = () => {
        console.log('Export orders data');
    };

    const totalOrders = orders.length;
    const deliveredOrders = orders.filter((order: Order) => order.status === 'delivered').length;
    const pendingOrders = orders.filter((order: Order) => order.status === 'pending').length;

    if (isLoading) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage and track all customer orders
                        </p>
                    </div>
                    <Button onClick={handleExport} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Package className="h-8 w-8 text-red-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                                    <p className="text-2xl font-semibold text-gray-900">{deliveredOrders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Clock className="h-8 w-8 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-semibold text-gray-900">{pendingOrders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by name or order ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
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
                                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <Hash className="w-4 h-4" />
                                            <span>Order ID</span>
                                            {sortBy === 'id' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('date')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Date</span>
                                            {sortBy === 'date' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <User className="w-4 h-4" />
                                            <span>Name</span>
                                            {sortBy === 'name' && (
                                                <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('age')}
                                    >
                                        Age
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('status')}
                                    >
                                        Status
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order: Order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{formatDate(order.date)}</TableCell>
                                        <TableCell>{order.name}</TableCell>
                                        <TableCell>{order.age}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={order.status} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => handleUpdateStatus(
                                                        order.id, 
                                                        order.status === 'pending' ? 'delivered' : 'pending'
                                                    )}
                                                    disabled={updateOrderMutation.isPending}
                                                >
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="destructive"
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    disabled={deleteOrderMutation.isPending}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredOrders.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try adjusting your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination info */}
                {filteredOrders.length > 0 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{filteredOrders.length}</span> of{' '}
                                    <span className="font-medium">{totalOrders}</span> orders
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default Orders;
