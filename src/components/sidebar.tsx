"use client";

import { navigationItems } from "@/constants/nav-item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMedia from "use-media";

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 768px)");

  if (isMobile) {
    return null; // Mobile navigation is handled by MobileNav component
  }

  return (
    <div className="hidden md:flex w-64 bg-background border-r border-zinc-700 flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-white font-semibold">
            Cine<span className="text-red-600">Vault</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
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
                    ? "bg-red-600 font-bold text-white"
                    : "text-gray-300 hover:text-white hover:bg-zinc-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Favorites Section */}
        <div className="mt-8">
          <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-4">
            Recent Favorites
          </h3>
          <div className="space-y-1 px-3 py-2 bg-zinc-700/50 rounded-lg">
            <p className="text-gray-500 text-xs">
              Your recently favorited movies will appear here
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}
