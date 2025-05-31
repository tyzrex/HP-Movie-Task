"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, Clock, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useMedia from "use-media";
import { navigationItems } from "@/constants/nav-item";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width: 768px)");
  if (!isMobile) {
    return null;
  }

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 z-50">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center py-3 px-2 ${
                  isActive ? "text-red-600" : "text-gray-400"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center py-3 px-2 text-gray-400"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50">
          <div className={`w-64 h-full bg-[#0f0f0f] sidebar-slide-in`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-white font-semibold">
                  Cine<span className="text-red-600">Vault</span>
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>

            <div className="p-4">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
