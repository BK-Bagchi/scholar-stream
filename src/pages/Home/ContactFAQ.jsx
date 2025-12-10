import { useTheme } from "../../hooks/useTheme";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactFAQ = () => {
  const { theme } = useTheme();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      q: "What is ScholarStream?",
      a: "ScholarStream is a scholarship management platform where students can find, apply, and track scholarships while universities can post and manage them efficiently.",
    },
    {
      id: 2,
      q: "How do I apply for a scholarship?",
      a: "Simply browse available scholarships, open a scholarship page, and submit your application with the required information.",
    },
    {
      id: 3,
      q: "Is ScholarStream free for students?",
      a: "Yes! Students can search and apply for scholarships without any additional cost.",
    },
    {
      id: 4,
      q: "How do universities manage applications?",
      a: "Universities get an admin panel where they can post scholarships, review applicants, update statuses, and manage selection.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`py-12 min-h-screen transition ${
        theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-3xl font-bold text-center mb-10 ${
            theme ? "text-blue-600" : "text-blue-400"
          }`}
        >
          Contact Us & FAQs
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl border transition ${
              theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme ? "text-gray-800" : "text-gray-100"
              }`}
            >
              Get in Touch
            </h3>

            <p
              className={`mb-4 text-sm ${
                theme ? "text-gray-600" : "text-gray-300"
              }`}
            >
              We're here to help! Reach out to us with any questions about
              scholarships, applications, or platform support.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  support@scholarstream.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-500" />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  +1 (555) 987-6543
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-blue-500" />
                <span
                  className={`${theme ? "text-gray-700" : "text-gray-300"}`}
                >
                  123 Scholarship Ave, Education City
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl border transition ${
              theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme ? "text-gray-800" : "text-gray-100"
              }`}
            >
              Send Us a Message
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-3 py-2 rounded-md border ${
                  theme
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "bg-gray-700 border-gray-600 text-gray-100"
                }`}
              />

              <input
                type="email"
                placeholder="Your Email"
                className={`w-full px-3 py-2 rounded-md border ${
                  theme
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "bg-gray-700 border-gray-600 text-gray-100"
                }`}
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                className={`w-full px-3 py-2 rounded-md border resize-none ${
                  theme
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "bg-gray-700 border-gray-600 text-gray-100"
                }`}
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-xl border transition ${
            theme ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-6 ${
              theme ? "text-gray-800" : "text-gray-100"
            }`}
          >
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-lg border transition ${
                  theme
                    ? "bg-gray-100 border-gray-300"
                    : "bg-gray-700 border-gray-600"
                }`}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full flex justify-between items-center p-4"
                >
                  <span
                    className={`font-medium ${
                      theme ? "text-gray-800" : "text-gray-100"
                    }`}
                  >
                    {faq.q}
                  </span>

                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className={`${theme ? "text-gray-600" : "text-gray-300"}`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-4 pb-4 text-sm ${
                        theme ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactFAQ;
