import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";

const Layout = ({children, showHero = false}) => {
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          {showHero && <Hero />}
          <div className="container mx-auto flex-1 py-10">{children}</div>
          <Footer />
        </div>
    );
};

export default Layout;