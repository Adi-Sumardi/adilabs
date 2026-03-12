import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import JokiServices from '@/components/JokiServices';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      {/* <About /> */}
      {/* <TechStack /> */}
      {/* <Projects /> */}
      {/* <Services /> */}
      {/* <JokiServices /> */}
      <Contact />
      <Footer />
      {/* <ChatWidget /> */}
    </main>
  );
}
