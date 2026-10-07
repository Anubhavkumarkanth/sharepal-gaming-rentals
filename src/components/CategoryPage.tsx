import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import PageIntro from "@/components/PageIntro";
import ProductSection from "@/components/ProductSection";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import DatePicker from "@/components/DatePicker";
import CartDrawer from "@/components/CartDrawer";
import MobileCartBar from "@/components/MobileCartBar";
import Toast from "@/components/Toast";
import { StoreProvider } from "@/lib/store";

export default function CategoryPage({ city }: { city: string }) {
  return (
    <StoreProvider>
      <Header city={city} />
      <CategoryNav city={city} />
      <main>
        <PageIntro city={city} />
        <ProductSection city={city} />
        <HowItWorks />
        <Faq />
      </main>
      <Footer city={city} />

      <DatePicker />
      <CartDrawer />
      <MobileCartBar />
      <Toast />
    </StoreProvider>
  );
}
