import { Hero } from "@/src/app/components/Hero";
import { Projects } from "@/src/app/components/Projects";
import { ContactForm } from "@/src/app/components/ContactForm";
import { SocialLinks } from "@/src/app/components/SocialLinks";
export default function HomePage() {
  return (
    <main className="container-max space-y-28 py-14">
      <Hero />
      <Projects />
      <SocialLinks />
      <ContactForm />
      <footer className="py-10 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Arijit. All rights reserved.
      </footer>
    </main>
  );
}