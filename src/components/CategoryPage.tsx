import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import { MobileBanner } from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import Faq from "@/components/Faq";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import DatePicker from "@/components/DatePicker";
import CartDrawer from "@/components/CartDrawer";
import FloatingActions from "@/components/FloatingActions";
import Toast from "@/components/Toast";
import { StoreProvider } from "@/lib/store";

export default function CategoryPage({ city }: { city: string }) {
  return (
    <StoreProvider>
      <Header city={city} />
      <CategoryNav city={city} />
      <main>
        <MobileBanner />
        <ProductSection />
        <Faq city={city} />
        <Stats />
      </main>
      <Footer city={city} />

      <DatePicker />
      <CartDrawer />
      <FloatingActions />
      <Toast />
    </StoreProvider>
  );
}
