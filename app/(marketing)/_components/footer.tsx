import {Logo} from "@/app/(marketing)/_components/logo";
import {Button} from "@/components/ui/button";

const Footer = () => (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
        <Logo/>
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Terms & Conditions</Button>
        </div>
    </div>
)

export default Footer;