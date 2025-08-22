import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ContactForm } from "@/components/ContactForm";

export default function HomePage() {
  return (
    <main className="container-max space-y-28 py-14">
      <Hero />
      <Projects />
      <ContactForm />
      <footer className="py-10 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Arijit. All rights reserved.
      </footer>
    </main>
  );
}