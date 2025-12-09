import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ariana Rahman",
    role: "Undergraduate Student",
    feedback:
      "ScholarStream made it incredibly easy to find scholarships that match my profile. I used to miss so many opportunities, but now everything is organized in one place!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Rafiul Hasan",
    role: "Computer Science Student",
    feedback:
      "The entire application process is smooth and stress-free. I can track my applications, view updates instantly, and apply to multiple scholarships with just a few clicks.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Taslima Nahar",
    role: "Engineering Student",
    feedback:
      "ScholarStream helped me discover university-funded scholarships that I never knew existed. I actually received one offer last month thanks to this platform!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#1D232A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
        <p className="text-gray-100 mb-12 max-w-2xl mx-auto">
          Hear from students who’ve found their scholarships at their fingertips
          and boosted their academic journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 
              shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-300 fill-yellow-300"
                  />
                ))}
              </div>
              <p className="text-gray-100 italic mb-4">“{t.feedback}”</p>
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-200">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
