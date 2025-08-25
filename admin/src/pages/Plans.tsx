import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  CreditCard,
  DollarSign,
  Video,
  Plus,
  Edit,
  Trash2,
  Download,
  ChevronDown,
  X,
  Save,
  Package,
  Hash,
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
import { pricingAPI, PricingPlan } from "../services/api";
import { useToast } from "../hooks/use-toast";

const PlanListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    price: "",
    videos_included: "",
    description: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch plans
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => pricingAPI.getAllPlans().then((res) => res.data),
  });

  // Create plan mutation
  const createPlanMutation = useMutation({
    mutationFn: (planData: {
      price: number;
      videos_included: number;
      description: string;
    }) => pricingAPI.createPlan(planData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      setShowAddModal(false);
      setFormData({ price: "", videos_included: "", description: "" });
      toast({
        title: "Success",
        description: "Plan created successfully",
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

  // Update plan mutation
  const updatePlanMutation = useMutation({
    mutationFn: ({
      planId,
      planData,
    }: {
      planId: string;
      planData: { price: number; videos_included: number; description: string };
    }) => pricingAPI.updatePlan(planId, planData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      setShowEditModal(false);
      setSelectedPlan(null);
      setFormData({ price: "", videos_included: "", description: "" });
      toast({
        title: "Success",
        description: "Plan updated successfully",
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

  // Delete plan mutation
  const deletePlanMutation = useMutation({
    mutationFn: (planId: string) => pricingAPI.deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      setShowDeleteModal(false);
      setSelectedPlan(null);
      toast({
        title: "Success",
        description: "Plan deleted successfully",
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

  // Helper function to format price from cents to dollars
  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  // Filter and sort plans
  const filteredPlans = plans
    .filter((plan: PricingPlan) => {
      const matchesSearch =
        plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatPrice(plan.price)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        plan.videos_included.toString().includes(searchTerm);
      return matchesSearch;
    })
    .sort((a: PricingPlan, b: PricingPlan) => {
      let aValue: number | string, bValue: number | string;

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "videos_included":
          aValue = a.videos_included;
          bValue = b.videos_included;
          break;
        case "description":
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
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

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleAddPlan = () => {
    setFormData({ price: "", videos_included: "", description: "" });
    setShowAddModal(true);
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setFormData({
      price: (plan.price / 100).toString(), // Convert cents to dollars for display
      videos_included: plan.videos_included.toString(),
      description: plan.description,
    });
    setShowEditModal(true);
  };

  const handleDeletePlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setShowDeleteModal(true);
  };

  const handleSavePlan = () => {
    const price = parseFloat(formData.price);
    const videosIncluded = parseInt(formData.videos_included);

    if (price > 0 && videosIncluded > 0 && formData.description.trim()) {
      const planData = {
        price: Math.round(price * 100), // Convert dollars to cents
        videos_included: videosIncluded,
        description: formData.description.trim(),
      };

      if (showAddModal) {
        createPlanMutation.mutate(planData);
      } else if (showEditModal && selectedPlan) {
        updatePlanMutation.mutate({
          planId: selectedPlan.id,
          planData,
        });
      }
    }
  };

  const confirmDeletePlan = () => {
    if (selectedPlan) {
      deletePlanMutation.mutate(selectedPlan.id);
    }
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedPlan(null);
    setFormData({ price: "", videos_included: "", description: "" });
  };

  const handleExport = () => {
    console.log("Export plans data");
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
              Pricing Plans Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage pricing plans and video packages
            </p>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddPlan}>
              <Plus className="w-4 h-4 mr-2" />
              Add Plan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Plans
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {plans.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Lowest Price
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {plans.length > 0
                      ? formatPrice(Math.min(...plans.map((p) => p.price)))
                      : "$0.00"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Max Videos
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {plans.length > 0
                      ? Math.max(...plans.map((p) => p.videos_included))
                      : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by description, price, videos, or plan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Plans Table */}
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
                      <span>Plan ID</span>
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
                    onClick={() => handleSort("description")}
                  >
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>Description</span>
                      {sortBy === "description" && (
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
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Price</span>
                      {sortBy === "price" && (
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
                    onClick={() => handleSort("videos_included")}
                  >
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>Videos Included</span>
                      {sortBy === "videos_included" && (
                        <ChevronDown
                          className={`w-4 h-4 transform ${
                            sortOrder === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan: PricingPlan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.id}</TableCell>
                    <TableCell>{plan.description}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatPrice(plan.price)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4 text-blue-500" />
                        <span>{plan.videos_included}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPlan(plan)}
                          title="Edit Plan"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePlan(plan)}
                          title="Delete Plan"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No plans found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria or add a new plan.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination info */}
        {filteredPlans.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{filteredPlans.length}</span> of{" "}
                  <span className="font-medium">{plans.length}</span> plans
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Plan Modal */}
        <Modal
          isOpen={showAddModal || showEditModal}
          onClose={closeModals}
          title={showAddModal ? "Add New Plan" : "Edit Plan"}
        >
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Plan Description
                </label>
                <Input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="e.g., Two video generation"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    id="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="19.00"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="videos_included"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Videos Included
                </label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    id="videos_included"
                    min="1"
                    value={formData.videos_included}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        videos_included: e.target.value,
                      })
                    }
                    placeholder="2"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Button onClick={closeModals} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSavePlan}
              disabled={
                !formData.description.trim() ||
                !formData.price ||
                parseFloat(formData.price) <= 0 ||
                !formData.videos_included ||
                parseInt(formData.videos_included) <= 0 ||
                createPlanMutation.isPending ||
                updatePlanMutation.isPending
              }
            >
              <Save className="w-4 h-4 mr-2" />
              {showAddModal ? "Add Plan" : "Save Changes"}
            </Button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={closeModals}
          title="Delete Plan"
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
            {selectedPlan && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete the plan{" "}
                  <span className="font-medium text-gray-900">
                    "{selectedPlan.description}"
                  </span>{" "}
                  ({formatPrice(selectedPlan.price)} for{" "}
                  {selectedPlan.videos_included} videos)?
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Button onClick={closeModals} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={confirmDeletePlan}
              variant="destructive"
              disabled={deletePlanMutation.isPending}
            >
              Delete Plan
            </Button>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default PlanListPage;
