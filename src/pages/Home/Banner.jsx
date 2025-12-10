import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Unlock Scholarship Opportunities",
    description:
      "Thousands of verified scholarships from universities and organizations — all in one place.",
    image:
      "https://wpvip.edutopia.org/wp-content/uploads/2024/12/hero_blog_Brain-Based-Learning_Teaching-Strategies_photo_iStock_2154414848_SeventyFour.jpg?w=2880&quality=85",
  },
  {
    title: "Apply With Confidence",
    description:
      "Track applications, manage deadlines, and stay ahead with real-time updates.",
    image:
      "https://0.soompi.io/wp-content/uploads/2025/01/19061432/study-group-2-copy.jpg",
  },
  {
    title: "Your Future Starts Here",
    description:
      "ScholarStream makes finding financial support simple, smart, and stress-free.",
    image:
      "https://wpvip.edutopia.org/wp-content/uploads/2023/10/hero_blog_Student-Wellness_Homework_photo_iStock_878931780_monkeybusinessimages.jpg?w=2880&quality=85",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-10 md:py-16 px-4 md:px-12 bg-linear-to-br from-[#233C69] via-[#3E2451] to-[#22544B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-softWhite leading-tight">
            Find the Right Scholarship for Your Future
          </h1>

          <p className="text-lg md:text-xl text-softWhite max-w-md">
            Explore verified scholarships, apply easily, and manage your
            academic future — all from one powerful platform.
          </p>

          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/all-scholarships")}
          >
            Search Scholarship
          </button>
        </motion.div>

        <div className="w-full md:w-1/2 relative h-[280px] md:h-[420px] overflow-hidden rounded-xl shadow-lg">
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={slides[currentIndex].image}
              alt="Scholarship Banner"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
          >
            ❯
          </button>

          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  idx === currentIndex ? "bg-blue-600 scale-125" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
