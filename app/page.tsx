import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import JokiServices from '@/components/JokiServices';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Services />
      <JokiServices />
      <Contact />
      <Footer />
    </main>
  );
}
