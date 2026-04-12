import GlassSphereScene from "@/components/ui/GlassSphereScene";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import ScrollMarquee from "@/components/ScrollMarquee";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <GlassSphereScene />
        <Intro />
        <ScrollMarquee />
        <ContactForm />
      </main>
    </>
  );
}
