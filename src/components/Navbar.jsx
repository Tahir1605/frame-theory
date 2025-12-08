import { useState } from "react";
import {
    Search,
    Menu,
    X,
    Bell,
    Settings,
    LogOut,
    Sun,
    Moon,
    Camera,
    User
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/" },
        { name: "Gallery", href: "/gallery" },
        { name: "Members", href: "/members" },
        { name: "Analytics", href: "/analytics" },
    ];

    // User Data
    const user = {
        name: "Clash",
        email: "clash@gmail.com",
        role: "Admin",
        avatarUrl: "https://personal-projects-djf.pages.dev/icon.svg",
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-(--c2) bg-(--c1) backdrop-blur supports-[backdrop-filter]:bg-(--c1)">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* LEFT: Logo */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span class="text-xl font-semibold bg-gradient-to-r from-(--c3) to-(--c4) bg-clip-text text-transparent">
                            STUDIO
                        </span>
                    </div>

                    {/* CENTER: Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-(--c3) hover:text-(--c4) transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-2 md:gap-4">

                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:flex relative w-64 items-center">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-(--c1)" />
                            <Input
                                type="search"
                                placeholder="Search photos..."
                                className="pl-9 h-9 bg-(--c3) border-none focus-visible:ring-1"
                            />
                        </div>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setIsDark(!isDark)}
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4 transition-all" />
                            ) : (
                                <Moon className="h-4 w-4 text-(--c3) transition-all" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                            <Bell className="h-4 w-4 text-(--c3)" />
                            {/* Notification Dot */}
                            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500" />
                            <span className="sr-only">Notifications</span>
                        </Button>

                        {/* User Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-border transition-all">
                                    <Avatar className="h-9 w-9 border border-(--c2) hover:border-(--c3)">
                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-(--c3)" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-(--c1) font-medium leading-none">{user.name}</p>
                                            {/* Role Badge */}
                                            <Badge variant="secondary" className="text-[10px] text-red-800 h-5 px-1.5 uppercase tracking-wider">
                                                {user.role}
                                            </Badge>
                                        </div>
                                        <p className="text-xs leading-none text-(--c2)">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="cursor-pointer text-(--c1)">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-(--c1)">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-800 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-8 w-8 text-(--c4)" /> : <Menu className="h-8 w-8 text-(--c4)" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="md:hidden border-t bg-(--c3) backdrop-blur animate-in slide-in-from-top-5 fade-in duration-200">
                    <div className="p-4 space-y-4">
                        {/* Mobile Search */}
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-(--c1)" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-9 bg-(--c3)"
                            />
                        </div>

                        {/* Mobile Links */}
                        <div className="grid gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center px-3 py-2 text-sm font-(--c1) rounded-md shadow-xs hover:text-(--c1) transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Mobile User Section */}
                        <div className="border-t pt-4">
                            <div className="flex items-center gap-3 px-3">
                                <Avatar className="bg-(--c1) h-8 w-8">
                                    <AvatarImage src={user.avatarUrl} />
                                    <AvatarFallback>CR</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-(--c1)">{user.name}</span>
                                    <span className="text-xs text-(--c2)">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}