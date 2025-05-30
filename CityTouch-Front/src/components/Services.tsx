// components/ServicesSection.tsx
import {
  Package,
  Home,
  Briefcase,
  Truck,
  Warehouse,
  Trash2,
  GraduationCap,
  AlarmClock,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services = [
  {
    title: "Home Removals",
    description:
      "Local or long-distance home moves with professional care and efficiency.",
    icon: <Home className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Office & Business Moves",
    description:
      "Seamless office relocations with minimal downtime and maximum care.",
    icon: <Briefcase className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Man & Van Service",
    description:
      "Flexible hourly van and helper service for small moves or single items.",
    icon: <Truck className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Packing Services",
    description:
      "Expert packing using high-quality materials to protect your items.",
    icon: <Package className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Furniture Assembly",
    description:
      "We dismantle and reassemble your furniture as part of the move.",
    icon: <ClipboardList className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Storage Solutions",
    description:
      "Safe and secure storage options for short or long-term needs.",
    icon: <Warehouse className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Waste & Furniture Disposal",
    description:
      "Eco-friendly disposal services for old furniture or unwanted items.",
    icon: <Trash2 className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Student Moves",
    description:
      "Affordable moving solutions for students relocating between terms.",
    icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Last-Minute Removals",
    description:
      "Need to move fast? We’re available for urgent, same-day removals.",
    icon: <AlarmClock className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Delivery & Collection",
    description:
      "We pick up and deliver from stores or marketplaces like IKEA, eBay.",
    icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-background dark:bg-gray-900 py-5 sm:py-20"
    >
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-b from-indigo-400 to-purple-600 text-transparent bg-clip-text">
              Our Services
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            We provide a complete range of professional removal services.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon, title, description }: Service) => (
            <Card key={title} className="shadow hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {icon}
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
