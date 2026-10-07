import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { AboutRental, Faq, HowItWorks } from "@/components/InfoSections";
import Footer from "@/components/Footer";
import DatePicker from "@/components/DatePicker";
import CartDrawer from "@/components/CartDrawer";
import { BackToTop, MobileCartBar, Toast } from "@/components/Floating";
import { StoreProvider } from "@/lib/store";

export default function CategoryPage({ city }: { city: string }) {
  return (
    <StoreProvider>
      <Header city={city} />
      <main>
        <Hero city={city} />
        <ProductSection city={city} />
        <HowItWorks />
        <AboutRental city={city} />
        <Faq />
      </main>
      <Footer city={city} />
      <DatePicker />
      <CartDrawer />
      <MobileCartBar />
      <BackToTop />
      <Toast />
    </StoreProvider>
  );
}
