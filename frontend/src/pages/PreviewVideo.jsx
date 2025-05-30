import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, RefreshCw, MessageCircle, Mail, HardDrive, Check, Home, Video, X } from 'lucide-react';
import AppLayout from '../ui/AppLayout';

export default function PreviewVideo() {
    const [currentStep, setCurrentStep] = useState('video'); // 'video', 'delivery', 'success'
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState('');

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

    const handleDownloadClick = () => {
        setCurrentStep('delivery');
    };

    const handleDeliverySelect = (method) => {
        setSelectedDelivery(method);
        // Simulate processing
        setTimeout(() => {
            setCurrentStep('success');
        }, 1500);
    };

    const handleRegenerateVideo = () => {
        setCurrentStep('video');
        setIsPlaying(false);
        setSelectedDelivery('');
    };

    const handleCreateAnother = () => {
        setCurrentStep('video');
        setIsPlaying(false);
        setSelectedDelivery('');
    };

    const handleReturnHome = () => {
        // This would typically navigate to home page
        console.log('Returning to home page...');
    };

    // Video Step
    const VideoStep = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            {/* Header */}
            <motion.div className="text-center mb-8" variants={itemVariants}>
                <h1 className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'cursive' }}>
                    🎅 Here is your personalised Santa message
                </h1>
                <p className="text-green-600 font-medium">Made with Christmas magic just for you!</p>
            </motion.div>

            {/* Video Player */}
            <motion.div
                className="relative bg-gradient-to-br from-red-100 to-green-100 rounded-2xl p-8 shadow-xl border-2 border-red-200 mb-8"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
            >
                <div className="relative bg-black rounded-xl overflow-hidden aspect-video shadow-2xl">
                    {!isPlaying ? (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-red-600 to-green-600 flex items-center justify-center cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="bg-white rounded-full p-6 mb-4 inline-block shadow-2xl"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Play className="w-12 h-12 text-red-600 ml-1" />
                                </motion.div>
                                <h3 className="text-white text-2xl font-bold" style={{ fontFamily: 'cursive' }}>
                                    Play Your Santa Message
                                </h3>
                                <p className="text-red-100 mt-2">Click to watch your magical video</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-green-600 flex items-center justify-center">
                            <div className="text-center text-white">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="inline-block mb-4"
                                >
                                    🎅
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'cursive' }}>
                                    Ho Ho Ho! Playing Your Video...
                                </h3>
                                <p className="text-red-100">Santa is delivering your personalized message!</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
            >
                <motion.button
                    onClick={handleDownloadClick}
                    className="bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                    style={{ fontFamily: 'cursive' }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Download className="w-5 h-5" />
                    Download Video
                </motion.button>

                <motion.button
                    onClick={handleRegenerateVideo}
                    className="bg-red-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                    style={{ fontFamily: 'cursive' }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RefreshCw className="w-5 h-5" />
                    Regenerate Video
                </motion.button>
            </motion.div>
        </motion.div>
    );

    // Delivery Options Step
    const DeliveryStep = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div className="text-center mb-8" variants={itemVariants}>
                <h2 className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'cursive' }}>
                    🎁 Choose Your Delivery Option
                </h2>
                <p className="text-green-600 font-medium">How would you like to receive your magical video?</p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                variants={itemVariants}
            >
                {/* WhatsApp Delivery */}
                <motion.div
                    className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 cursor-pointer shadow-lg"
                    onClick={() => handleDeliverySelect('whatsapp')}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                >
                    <div className="text-center">
                        <div className="bg-green-500 rounded-full p-4 inline-block mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-700 mb-2" style={{ fontFamily: 'cursive' }}>
                            WhatsApp Delivery
                        </h3>
                        <p className="text-green-600 mb-4">Send directly to your WhatsApp for easy sharing</p>
                        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            Instant & Shareable
                        </div>
                    </div>
                </motion.div>

                {/* Email Delivery */}
                <motion.div
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 cursor-pointer shadow-lg"
                    onClick={() => handleDeliverySelect('email')}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                >
                    <div className="text-center">
                        <div className="bg-blue-500 rounded-full p-4 inline-block mb-4">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-700 mb-2" style={{ fontFamily: 'cursive' }}>
                            Email Delivery
                        </h3>
                        <p className="text-blue-600 mb-4">Receive in your inbox with download link</p>
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            Professional & Secure
                        </div>
                    </div>
                </motion.div>

                {/* Instant Download */}
                <motion.div
                    className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200 cursor-pointer shadow-lg"
                    onClick={() => handleDeliverySelect('instant')}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                >
                    <div className="text-center">
                        <div className="bg-purple-500 rounded-full p-4 inline-block mb-4">
                            <HardDrive className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-2" style={{ fontFamily: 'cursive' }}>
                            Instant Download
                        </h3>
                        <p className="text-purple-600 mb-4">Download immediately to your device</p>
                        <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            Quick & Direct
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Back Button */}
            <motion.div className="text-center mt-8" variants={itemVariants}>
                <motion.button
                    onClick={() => setCurrentStep('video')}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center justify-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                >
                    <X className="w-4 h-4" />
                    Back to Video
                </motion.button>
            </motion.div>
        </motion.div>
    );

    // Success Step
    const SuccessStep = () => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div
                className="text-center bg-gradient-to-br from-green-50 to-red-50 p-12 rounded-2xl border-2 border-green-200 shadow-xl"
                variants={itemVariants}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="bg-green-500 rounded-full p-6 inline-block mb-6"
                >
                    <Check className="w-16 h-16 text-white" />
                </motion.div>

                <motion.h2
                    className="text-4xl font-bold text-green-700 mb-4"
                    style={{ fontFamily: 'cursive' }}
                    variants={itemVariants}
                >
                    🎉 Download Successful!
                </motion.h2>

                <motion.p
                    className="text-green-600 text-xl mb-8 font-medium"
                    variants={itemVariants}
                >
                    Your magical Santa video has been delivered via {selectedDelivery === 'whatsapp' ? 'WhatsApp' : selectedDelivery === 'email' ? 'Email' : 'Instant Download'}!
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={itemVariants}
                >
                    <motion.button
                        onClick={handleCreateAnother}
                        className="bg-red-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                        style={{ fontFamily: 'cursive' }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Video className="w-5 h-5" />
                        Create Another Video
                    </motion.button>

                    <motion.button
                        onClick={handleReturnHome}
                        className="bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                        style={{ fontFamily: 'cursive' }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home className="w-5 h-5" />
                        Return to Home Page
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );

    return (
        <AppLayout>
            <div className='py-10'>
                <div className="max-w-6xl mx-auto p-6">
                    <AnimatePresence mode="wait">
                        {currentStep === 'video' && <VideoStep key="video" />}
                        {currentStep === 'delivery' && <DeliveryStep key="delivery" />}
                        {currentStep === 'success' && <SuccessStep key="success" />}
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
}