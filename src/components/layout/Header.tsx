"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationTriggerClass,
} from "@/components/ui/navigation-menu";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/markets", label: "Markets" },
  { href: "/quality-and-certifications", label: "Quality & certifications" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [compressed, setCompressed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCompressed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-ivory-50/95 backdrop-blur-sm transition-[border-color,box-shadow]",
        compressed
          ? "border-rule-strong shadow-[0_1px_16px_-10px_rgba(34,26,20,0.5)]"
          : "border-rule"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-200",
            compressed ? "h-[4.25rem]" : "h-20 sm:h-[5.5rem]"
          )}
        >
          <Logo compact={compressed} />

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(isActive("/products") && "text-peacock-600")}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 top-full w-screen max-w-none border-b border-rule-strong bg-ivory-50 shadow-[0_18px_40px_-28px_rgba(34,26,20,0.45)]">
                  <MegaMenu />
                </NavigationMenuContent>
              </NavigationMenuItem>

              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        navigationTriggerClass,
                        isActive(link.href) && "text-peacock-600"
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.whatsapp.href}
              aria-label="Message Allvora Resources on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 items-center justify-center rounded-[2px] text-peacock-900 transition-colors hover:bg-ivory-100 hover:text-peacock-600 sm:inline-flex"
            >
              <MessageCircle className="size-[1.15rem]" />
            </a>
            <Button asChild variant="gold" size={compressed ? "sm" : "md"} className="hidden sm:inline-flex">
              <Link href="/request-a-quote">Request a quote</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
