<<<<<<< HEAD
import { Hero } from "@/src/app/components/Hero";
import { Projects } from "@/src/app/components/Projects";
import { ContactForm } from "@/src/app/components/ContactForm";
import { SocialLinks } from "@/src/app/components/SocialLinks";
=======
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { ContactForm } from "./components/ContactForm";

>>>>>>> c52a266caab5a71e6324acfee9908117fd3cdf51
export default function HomePage() {
  return (
    <main className="container-max space-y-28 py-14">
      <Hero />
      <Projects />
      <SocialLinks />
      <ContactForm />
      <footer className="py-10 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Subham. All rights reserved.
      </footer>
    </main>
  );
}