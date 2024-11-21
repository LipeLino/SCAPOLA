import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import ThemeContainer from "@/components/ThemeContainer";

export const metadata: Metadata = {
  title: "Scapola Comunica",
  description: "Assessoria em relações públicas e comunicação",
  // other metadata
};

export default function Home() {

  return (
    <ThemeContainer>
      <main>
        <Hero />      
        <Feature />
        <Brands />
        <About />
        <FeaturesTab />
      </main>
    </ThemeContainer>
  );
}
