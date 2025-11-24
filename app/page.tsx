import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import GitHubStats from '@/components/GitHubStats';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <TechStack />
      <GitHubStats />
      <Projects />
      <Blog />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
