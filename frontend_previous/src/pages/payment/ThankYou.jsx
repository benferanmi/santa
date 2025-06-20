import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, Video, Mail, Share2, Sparkles, Clock, Gift } from 'lucide-react';
import AppLayout from '../../ui/AppLayout';

const OrderConfirmation = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    const sparkleVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const steps = [
        {
            icon: Video,
            title: "Video Creation",
            description: "Santa's elves are working hard to create your personalised video message.",
            color: "text-red-500"
        },
        {
            icon: Mail,
            title: "Delivery",
            description: "You'll receive your video within 24 hours, via the email or whatsapp number you provided.",
            color: "text-green-500"
        },
        {
            icon: Share2,
            title: "Share the Magic",
            description: "Download the video from dashboard and share the magical moment with your child!",
            color: "text-blue-500"
        }
    ];

    return (
        <AppLayout>
            <div className='py-10'>
                <div className=" bg-gradient-to-br from-red-50 via-white to-green-50 py-12 px-4">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Header Section */}
                        <motion.div
                            className="text-center mb-12"
                            variants={itemVariants}
                        >
                            <div className="relative inline-block">
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    variants={sparkleVariants}
                                    animate="animate"
                                >
                                    <Sparkles className="w-8 h-8 text-yellow-400" />
                                </motion.div>
                                <motion.div
                                    className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </motion.div>
                            </div>

                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                                variants={itemVariants}
                            >
                                Thank You for Your Order!
                            </motion.h1>

                            <motion.div
                                className="bg-red-100 border border-red-200 rounded-lg p-4 inline-block"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-2 text-red-700">
                                    <Gift className="w-5 h-5" />
                                    <span className="font-semibold text-lg">
                                        Santa is preparing a special video message for Milit
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* What Happens Next Section */}
                        <motion.div
                            className="mb-12"
                            variants={itemVariants}
                        >
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                                What Happens Next?
                            </h2>

                            <div className="grid md:grid-cols-3 gap-8">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                        variants={itemVariants}
                                        whileHover={{
                                            y: -5,
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 mr-3`}>
                                                {index + 1}
                                            </div>
                                            <step.icon className={`w-6 h-6 ${step.color}`} />
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            {step.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tip Section */}
                        <motion.div
                            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="flex items-start gap-3">
                                <Clock className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip:</h3>
                                    <p className="text-yellow-700">
                                        If you don't see the email in your inbox, please check your spam or promotions folder.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Support Section */}
                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <p className="text-gray-600 mb-6">
                                Have any questions? Feel free to contact our support team
                            </p>

                            <motion.button
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Generate Your Video
                            </motion.button>
                        </motion.div>

                        {/* Floating Decorative Elements */}
                        <motion.div
                            className="absolute top-20 left-10 text-red-300"
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles className="w-6 h-6" />
                        </motion.div>

                        <motion.div
                            className="absolute top-40 right-20 text-green-300"
                            animate={{
                                y: [0, 10, 0],
                                rotate: [0, -3, 3, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        >
                            <Gift className="w-8 h-8" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
};

export default OrderConfirmation;