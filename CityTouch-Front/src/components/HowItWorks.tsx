import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  CalendarCheckIcon,
  PackageIcon,
  TruckIcon,
  HomeIcon,
} from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: StepProps[] = [
  {
    icon: <CalendarCheckIcon className="h-10 w-10 text-purple-600" />,
    title: "Book",
    description: "Schedule your move easily with our quick booking system.",
  },
  {
    icon: <PackageIcon className="h-10 w-10 text-purple-600" />,
    title: "Prepare",
    description: "Pack your items safely and get ready for moving day.",
  },
  {
    icon: <TruckIcon className="h-10 w-10 text-purple-600" />,
    title: "Collect",
    description: "Our team arrives on time to collect your belongings.",
  },
  {
    icon: <HomeIcon className="h-10 w-10 text-purple-600" />,
    title: "Deliver",
    description: "We deliver your items safely to your new location.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-background dark:bg-gray-900 py-5 sm:py-20"
    >
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Works
          </span>{" "}
          Step-by-Step Guide
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Sit back and relax — we'll handle the heavy lifting. Our simple,
          stress-free process makes it easy to book your move in minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ icon, title, description }: StepProps, index) => (
            <Card key={title} className="bg-muted/50 relative p-4">
              {/* Step number circle */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
