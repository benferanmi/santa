import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the personalised Santa video work?",
      answer:
        "Our magical elves create a custom video featuring Santa mentioning your child's name and personal details you provide. Santa will talk about their good behavior, wishes, and deliver a personalized Christmas message just for them.",
    },
    {
      question: "How long does it take to receive the video?",
      answer:
        "Most videos are ready within 24-48 hours. During peak Christmas season, it may take up to 72 hours. You'll receive an email notification as soon as your magical video is ready to download.",
    },
    {
      question: "Can I customize the message in the video?",
      answer:
        "Absolutely! You can include specific details about your child's interests, achievements, wishes, and any special messages you'd like Santa to mention. The more details you provide, the more personalized the video becomes.",
    },
    {
      question: "What if I need the video urgently?",
      answer:
        "We offer express delivery for urgent requests. Contact our support team, and we'll do our best to prioritize your order. Rush orders are typically completed within 12-24 hours for an additional fee.",
    },
    {
      question: "Can I order videos for more than one child?",
      answer:
        "Yes! You can order individual personalized videos for multiple children. Each video will be uniquely crafted with that specific child's name and personalized details.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-10 bg-gradient-to-br from-secondary to-primary py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-base-100 mb-6">
            Frequently Asked Questions
          </h2>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300"
          >
            Contact us
          </motion.button>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-base-content/5 backdrop-blur-sm rounded-2xl border border-base-content/10 overflow-hidden"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                className="w-full px-8 py-6 text-left flex justify-between items-center transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-base-100 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-base-100 flex-shrink-0"
                >
                  ↓
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <p className="text-base-100/70 leading-relaxed text-lg border-t border-base-100/10 pt-6">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-special text-lg italic">
            Still have questions? We're here to help! 🎅
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;
