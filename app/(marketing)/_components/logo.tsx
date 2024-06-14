import {Poppins} from "next/font/google";
import Image from "next/image";
import {cn} from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image src="/logo.svg" height="18" width="60" alt="Logo" className="block dark:hidden"/>
            <Image src="/logo-dark.svg" height="18" width="60" alt="Logo" className="hidden dark:block"/>
            <p className={cn("font-semibold", font.className)}>Jotion</p>
        </div>
    );
}
