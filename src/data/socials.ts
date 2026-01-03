import { Mail, Phone, MapPin, Linkedin, Github, Briefcase } from "lucide-react";

export type SocialLink = {
  id: number;
  title: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const primarySocials: SocialLink[] = [
  {
    id: 5000,
    title: "Email",
    value: "usama.amjad32@gmail.com",
    href: "mailto:usama.amjad32@gmail.com",
    icon: Mail,
  },
  {
    id: 5003,
    title: "LinkedIn",
    value: "muhammad-usama-691699185",
    href: "https://www.linkedin.com/in/muhammad-usama-691699185/",
    icon: Linkedin,
  },
  {
    id: 5004,
    title: "GitHub",
    value: "usama86",
    href: "https://github.com/usama86",
    icon: Github,
  },
];

// Full list (footer/contact)
export const allSocials: SocialLink[] = [
  ...primarySocials,
  {
    id: 5001,
    title: "WhatsApp",
    value: "+92 345 0538250",
    href: "https://wa.me/923450538250",
    icon: Phone,
  },
  {
    id: 5005,
    title: "Upwork",
    value: "View profile",
    href: "https://www.upwork.com/freelancers/~01798f1c775f13992c",
    icon: Briefcase,
  },
  {
    id: 5002,
    title: "Location",
    value: "Pakistan (PKT)",
    href: "#",
    icon: MapPin,
  },
];
