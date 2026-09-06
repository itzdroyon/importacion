import Hero from "../components/hero/Hero";
import BrandStory from "../components/brand/BrandStory";
import InventoryGallery from "../components/inventory/InventoryGallery";
import ImportTimeline from "../components/process/ImportTimeline";
import Testimonials from "../components/trust/Testimonials";
import FinalCTA from "../components/cta/FinalCTA";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <InventoryGallery />
      <ImportTimeline />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
