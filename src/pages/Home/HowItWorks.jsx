import { User, Users, MessageSquare, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <User className="w-10 h-10 text-white" />,
    title: "Create Your Profile",
    description:
      "Sign up and create your personalized study partner profile with your subjects, skills, and availability.",
  },
  {
    id: 2,
    icon: <Users className="w-10 h-10 text-white" />,
    title: "Find Study Partners",
    description:
      "Search and browse highly rated study partners that match your subject and study preferences.",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-10 h-10 text-white" />,
    title: "Connect & Communicate",
    description:
      "Send partner requests and chat with your study partners to plan and schedule your sessions.",
  },
  {
    id: 4,
    icon: <CheckCircle className="w-10 h-10 text-white" />,
    title: "Achieve Together",
    description:
      "Collaborate, learn, and improve your skills with like-minded study partners for better results.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-linear-to-br from-[#2979FF] to-[#8E24AA]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-100 mb-12 max-w-2xl mx-auto">
          StudyMate makes it easy to find and collaborate with the best study
          partners. Follow these simple steps to get started.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 
              bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm opacity-90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
