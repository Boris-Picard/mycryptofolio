import { Github } from "lucide-react";

export default function Footer() {
    return (
        <div className="sticky bottom-0 h-[40px] bg-slate-500 bg-opacity-10 backdrop-blur">
            <footer className="flex justify-center items-center h-full space-x-3 text-black dark:text-white">
                <span>©2024 Boris Picard | All Rights Reserved</span> <a href="https://github.com/Boris-Picard" target="_blank"><Github /></a>
            </footer>
        </div>
    );

}