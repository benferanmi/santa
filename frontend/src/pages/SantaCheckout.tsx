
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, User, Mail, MapPin, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

export default function SantaCheckout() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate payment processing
        setTimeout(() => {
            navigate('/order-success');
        }, 1000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AppLayout>
            <div className='py-20'>
                <motion.div
                    className="bg-gradient-to-br from-red-50 to-green-50 p-6 rounded-2xl shadow-xl border border-red-100"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div
                        className="text-center mb-8"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Gift className="text-red-500 w-8 h-8" />
                            <h1 className="text-4xl font-bold text-red-700" style={{ fontFamily: 'cursive' }}>
                                Secure Checkout
                            </h1>
                            <Gift className="text-green-500 w-8 h-8" />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-green-700">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">256-bit SSL Encrypted</span>
                        </div>
                    </motion.div>

                    <form onSubmit={handleSubmit}>
                        {/* Two Row Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Row 1: Shipping Information */}
                            <motion.div
                                className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <User className="text-red-500 w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-red-700" style={{ fontFamily: 'cursive' }}>
                                        Delivery Details
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-semibold text-green-700 mb-2">
                                            <Mail className="inline w-4 h-4 mr-1" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                                            placeholder="your.email@northpole.com"
                                            required
                                        />
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-semibold text-green-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                                                placeholder="Ho Ho"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-semibold text-green-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                                                placeholder="Claus"
                                                required
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-semibold text-green-700 mb-2">
                                            <MapPin className="inline w-4 h-4 mr-1" />
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                                            placeholder="123 Christmas Lane"
                                            required
                                        />
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-semibold text-green-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                                                placeholder="North Pole"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-semibold text-green-700 mb-2">ZIP Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-red-50/30"
                                                placeholder="12345"
                                                required
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Row 2: Payment Information */}
                            <motion.div
                                className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <CreditCard className="text-green-500 w-6 h-6" />
                                    <h2 className="text-2xl font-bold text-green-700" style={{ fontFamily: 'cursive' }}>
                                        Payment Method
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-semibold text-red-700 mb-2">Name on Card</label>
                                        <input
                                            type="text"
                                            name="nameOnCard"
                                            value={formData.nameOnCard}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-green-50/30"
                                            placeholder="Santa Claus"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-semibold text-red-700 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-green-50/30"
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            required
                                        />
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-semibold text-red-700 mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-green-50/30"
                                                placeholder="12/25"
                                                maxLength={5}
                                                required
                                            />
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-semibold text-red-700 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-green-50/30"
                                                placeholder="123"
                                                maxLength={4}
                                                required
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Security Features */}
                                    <motion.div
                                        className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg border border-red-200"
                                        variants={itemVariants}
                                    >
                                        <div className="flex items-center gap-2 text-sm text-green-700">
                                            <Lock className="w-4 h-4" />
                                            <span className="font-semibold">Your payment is secured by Santa's magic encryption</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Complete Order Button */}
                        <motion.div
                            className="mt-8 text-center"
                            variants={itemVariants}
                        >
                            <motion.button
                                type="submit"
                                className="bg-gradient-to-r from-red-500 to-green-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg"
                                style={{ fontFamily: 'cursive' }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                🎅 Complete Christmas Order 🎁
                            </motion.button>

                            <motion.p
                                className="text-sm text-green-600 mt-3 font-medium"
                                variants={itemVariants}
                            >
                                Ho ho ho! Your order will be delivered by Christmas Eve ✨
                            </motion.p>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </AppLayout>
    );
}
