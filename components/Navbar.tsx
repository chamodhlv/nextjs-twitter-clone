import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";
import { getUnreadNotificationCount } from "@/actions/notification.action";

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser();

  const unreadCount = user ? await getUnreadNotificationCount() : 0;

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-4xl font-bold text-primary ">
              twitter
            </Link>
          </div>

          <DesktopNavbar unreadCount={unreadCount} />
          <MobileNavbar unreadCount={unreadCount} />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

