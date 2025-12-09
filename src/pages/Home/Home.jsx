import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import TopScholarships from "./TopScholarships";

const Home = () => {
  return (
    <>
      <Banner />
      <TopScholarships />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
