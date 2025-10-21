import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
