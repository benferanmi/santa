import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Users,
  User,
  Hash,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  UserPlus,
  Mail,
} from "lucide-react";

import AppLayout from "./ui/AppLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Card, CardContent } from "../components/ui/card";
import { usersAPI } from "../services/api";
import { useToast } from "../hooks/use-toast";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  pagination: {
    current_page: number;
    has_next: boolean;
    has_prev: boolean;
    total_pages: number;
    total_users: number;
  };
}

const UserListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch users with pagination
  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () =>
      usersAPI
        .getUsers({ page: currentPage })
        .then((res) => res.data as UsersResponse),
  });

  const users = usersResponse?.users || [];
  const totalUsers = usersResponse?.total || 0;
  const pagination = usersResponse?.pagination;

  console.log("this is the user data", usersResponse);

  // Comment out mutation operations as requested
  /*
    // Create user mutation
    const createUserMutation = useMutation({
        mutationFn: (userData: { firstName: string; lastName: string; email: string }) => usersAPI.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setShowAddModal(false);
            setFormData({ firstName: '', lastName: '', email: '' });
            toast({
                title: "Success",
                description: "User created successfully",
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

    // Update user mutation
    const updateUserMutation = useMutation({
        mutationFn: ({ userId, userData }: { userId: string; userData: { firstName: string; lastName: string; email: string } }) =>
            usersAPI.updateUser(userId, userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setShowEditModal(false);
            setSelectedUser(null);
            setFormData({ firstName: '', lastName: '', email: '' });
            toast({
                title: "Success",
                description: "User updated successfully",
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

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: (userId: string) => usersAPI.deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setShowDeleteModal(false);
            setSelectedUser(null);
            toast({
                title: "Success",
                description: "User deleted successfully",
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
    */

  // Filter and sort users (client-side filtering for current page)
  const filteredUsers = users
    .filter((user: User) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        fullName.includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower);
      return matchesSearch;
    })
    .sort((a: User, b: User) => {
      let aValue: string, bValue: string;

      switch (sortBy) {
        case "firstName":
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
          break;
        case "lastName":
          aValue = a.lastName.toLowerCase();
          bValue = b.lastName.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination functions
  const handlePageChange = (page: number) => {
    if (page >= 1 && pagination && page <= pagination.total_pages) {
      setCurrentPage(page);
      // Reset search when changing pages to avoid confusion
      setSearchTerm("");
    }
  };

  const handlePrevPage = () => {
    if (pagination && pagination.has_prev) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.has_next) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleAddUser = () => {
    setFormData({ firstName: "", lastName: "", email: "" });
    setShowAddModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveUser = () => {
    if (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim()
    ) {
      /*
            if (showAddModal) {
                createUserMutation.mutate({
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email.trim()
                });
            } else if (showEditModal && selectedUser) {
                updateUserMutation.mutate({
                    userId: selectedUser.id,
                    userData: {
                        firstName: formData.firstName.trim(),
                        lastName: formData.lastName.trim(),
                        email: formData.email.trim()
                    }
                });
            }
            */
      console.log("Save user action - mutations commented out");
    }
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      // deleteUserMutation.mutate(selectedUser.id);
      console.log("Delete user action - mutation commented out");
    }
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    if (!pagination) return [];

    const { current_page, total_pages } = pagination;
    const pages: (number | string)[] = [];

    if (total_pages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (current_page > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, current_page - 1);
      const end = Math.min(total_pages - 1, current_page + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== total_pages) {
          pages.push(i);
        }
      }

      if (current_page < total_pages - 2) {
        pages.push("...");
      }

      // Show last page
      if (total_pages > 1) {
        pages.push(total_pages);
      }
    }

    return pages;
  };

  const Modal = ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

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
            <h1 className="text-2xl font-bold text-gray-800">
              Users Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage customer accounts and information
            </p>
          </div>

          {/* <div className="flex space-x-3">
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddUser}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div> */}
        </div>

        {/* Stats Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pagination?.total_users || totalUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagination Info */}
        {pagination && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Page {pagination.current_page} of {pagination.total_pages}
                </div>
                <div>
                  Showing {users.length} of {pagination.total_users} users
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, or customer ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center space-x-1">
                      <Hash className="w-4 h-4" />
                      <span>Customer ID</span>
                      {sortBy === "id" && (
                        <ChevronDown
                          className={`w-4 h-4 transform ${
                            sortOrder === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("firstName")}
                  >
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Customer Name</span>
                      {sortBy === "firstName" && (
                        <ChevronDown
                          className={`w-4 h-4 transform ${
                            sortOrder === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>Customer Email</span>
                      {sortBy === "email" && (
                        <ChevronDown
                          className={`w-4 h-4 transform ${
                            sortOrder === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created At</span>
                      {sortBy === "createdAt" && (
                        <ChevronDown
                          className={`w-4 h-4 transform ${
                            sortOrder === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  {/* <TableHead>Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    {/* <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user)}
                          title="Delete User"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No users found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria or add a new user.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        {pagination && pagination.total_pages > 1 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={!pagination.has_prev}
                    className="flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((pageNum, index) => (
                      <React.Fragment key={index}>
                        {pageNum === "..." ? (
                          <span className="px-3 py-1 text-gray-500">...</span>
                        ) : (
                          <Button
                            variant={
                              currentPage === pageNum ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(pageNum as number)}
                            className="min-w-[36px]"
                          >
                            {pageNum}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={!pagination.has_next}
                    className="flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  Page {pagination.current_page} of {pagination.total_pages}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results info */}
        {filteredUsers.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{filteredUsers.length}</span> of{" "}
                  <span className="font-medium">{users.length}</span> users on
                  this page
                  {searchTerm && (
                    <span className="text-gray-500">
                      {" "}
                      (filtered from {pagination?.total_users ||
                        totalUsers}{" "}
                      total)
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit User Modal */}
        <Modal
          isOpen={showAddModal || showEditModal}
          onClose={closeModals}
          title={showAddModal ? "Add New User" : "Edit User"}
        >
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Customer Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter customer email"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Button onClick={closeModals} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSaveUser}
              disabled={
                !formData.firstName.trim() ||
                !formData.lastName.trim() ||
                !formData.email.trim()
              }
            >
              <Save className="w-4 h-4 mr-2" />
              {showAddModal ? "Add User" : "Save Changes"}
            </Button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={closeModals}
          title="Delete User"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  Confirm Deletion
                </h4>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            {selectedUser && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete the user{" "}
                  <span className="font-medium text-gray-900">{`${selectedUser.firstName} ${selectedUser.lastName}`}</span>{" "}
                  ({selectedUser.email})?
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Button onClick={closeModals} variant="outline">
              Cancel
            </Button>
            <Button onClick={confirmDeleteUser} variant="destructive">
              Delete User
            </Button>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default UserListPage;
