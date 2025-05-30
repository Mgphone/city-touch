import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button.tsx";
import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle.tsx";
// import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#how-it-works",
    label: "How It Works",
  },
  {
    href: "/#about",
    label: "About",
  },
  {
    href: "/#services",
    label: "Services",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-40 w-full h-30 bg-white border-b-[1px] dark:border-b-slate-700 dark:bg-background flex items-center">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex items-center">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center"
            >
              {/* Image logo for medium and up */}
              <img
                src="/cityTouch.png"
                alt="City Touch Man and Van"
                className="w-28 hidden md:block"
              />

              {/* Text logo for small screens only */}
              <span className="md:hidden text-xl font-extrabold tracking-tight">
                City{" "}
                <span className="bg-gradient-to-b from-indigo-400 to-purple-600 text-transparent bg-clip-text">
                  Touch
                </span>{" "}
                Removal
              </span>
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            {/* <ModeToggle /> */}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    <a
                      rel="noreferrer noopener"
                      href="/"
                      className="ml-2 font-bold text-xl flex"
                    >
                      <img
                        src="/cityTouch.png"
                        alt="City Touch Man and Van"
                        className="w-28 "
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <Button className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg shadow transition">
                    Book Now
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
            <Button className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg shadow transition">
              Book Now
            </Button>
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
export default Navbar;
