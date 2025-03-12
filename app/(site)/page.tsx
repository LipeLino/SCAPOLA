import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import Contact from "@/components/Contact";
import FunFact from "@/components/FunFact";
import Footer from "@/components/Footer";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";
//import Testimonial from "@/components/Testimonial";
import ThemeContainer from "@/components/ThemeContainer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastifyContainer from "@/components/Toastify/ToastifyContainer";

//import { useTheme } from "next-themes";

export const metadata = {
  title: "Scapola Comunica",
  description: "",
};

export default function Home() {

  //const { theme } = useTheme();

  return (
    <ThemeContainer>
      <main>
        <Hero />      
        <Feature />
        <Brands />
        <About />
        <FeaturesTab />
        <Contact />
      </main>
      <ToastifyContainer />
    </ThemeContainer>
  );
}