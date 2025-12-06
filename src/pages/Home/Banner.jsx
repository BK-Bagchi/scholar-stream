import { useEffect, useState } from "react";

const slides = [
  {
    title: "Find the Perfect Study Partner",
    description:
      "Connect with students based on subjects, location, and learning style.",
    image:
      "https://0.soompi.io/wp-content/uploads/2025/01/19061432/study-group-2-copy.jpg",
  },
  {
    title: "Enhance Your Learning Experience",
    description: "Collaborate, share notes, and improve your skills together.",
    image:
      "https://wpvip.edutopia.org/wp-content/uploads/2024/12/hero_blog_Brain-Based-Learning_Teaching-Strategies_photo_iStock_2154414848_SeventyFour.jpg?w=2880&quality=85",
  },
  {
    title: "Achieve Your Goals Faster",
    description: "Stay motivated and accountable with your study partner.",
    image:
      "https://wpvip.edutopia.org/wp-content/uploads/2023/10/hero_blog_Student-Wellness_Homework_photo_iStock_878931780_monkeybusinessimages.jpg?w=2880&quality=85",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[400px] md:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 bg-white text-gray-800 p-4 md:p-5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition flex items-center justify-center z-20"
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 bg-white text-gray-800 p-4 md:p-5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition flex items-center justify-center z-20"
          aria-label="Next Slide"
        >
          &#10095;
        </button>

        <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 md:w-5 md:h-5 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
