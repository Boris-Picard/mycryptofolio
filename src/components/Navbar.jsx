import { Link } from "react-router-dom";

import { CircleUser, Menu, Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { ModeToggle } from "./DarkMode";


export default function Navbar() {
    return (
        <div className="container sticky top-0 pt-8 z-50">
            <header className="bg-slate-500 dark:bg-zinc-900 flex h-16 items-center gap-4 bg-background px-4 md:px-6 rounded-md bg-opacity-10">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 dark:text-white text-black">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                    </Link>
                    <Link
                        to="/"
                        className="hover:text-gray-500 transition-colors hover:text-foreground"
                    >
                        AddCoin
                    </Link>
                    <Link
                        to="/seecoins"
                        className="hover:text-gray-500 transition-colors hover:text-foreground"
                    >
                        SeeCoins
                    </Link>
                    <Link
                        to="/signin"
                        className="hover:text-gray-500 transition-colors hover:text-foreground"
                    >
                        SignIn
                    </Link>
                    <Link
                        to="/signup"
                        className="hover:text-gray-500 transition-colors hover:text-foreground"
                    >
                        SignUp
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-lg font-semibold md:text-base"
                            >
                                <Package2 className="h-6 w-6" />
                            </Link>
                            <Link
                                to="/"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                AddCoin
                            </Link>
                            <Link
                                to="/seecoins"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                SeeCoins
                            </Link>
                            <Link
                                to="/signin"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                SignIn
                            </Link>
                            <Link
                                to="/signup"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                SignUp
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </header>
        </div>
    );
}
