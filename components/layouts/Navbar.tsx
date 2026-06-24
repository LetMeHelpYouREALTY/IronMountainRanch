"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agentInfo, primaryNav } from "@/lib/site-config";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col max-w-[220px] sm:max-w-none">
            <span className="text-base md:text-lg lg:text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
              Iron Mountain Ranch
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">
              Homes by Dr. Jan Duffy
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-5">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link
                href={agentInfo.phoneTel}
                className="flex items-center gap-2"
                aria-label={agentInfo.phoneCallLabel}
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span className="hidden xl:inline">{agentInfo.phoneFormatted}</span>
                <span className="xl:hidden">Call</span>
              </Link>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link
                href={agentInfo.phoneTel}
                className="flex items-center gap-2"
                aria-label={agentInfo.phoneCallLabel}
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span className="sr-only">{agentInfo.phoneCallLabel}</span>
              </Link>
            </Button>
            <button
              className="text-slate-700 focus:outline-none rounded-md p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-1 pt-4">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-2 px-3 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                  <Link
                    href={agentInfo.phoneTel}
                    className="flex items-center justify-center gap-2"
                    aria-label={agentInfo.phoneCallLabel}
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    Call {agentInfo.phoneFormatted}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
