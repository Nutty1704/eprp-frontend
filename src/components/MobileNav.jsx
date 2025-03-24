import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-red-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
            <span> Welcome to TasteMonash.com!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
            <MobileNavLinks />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;