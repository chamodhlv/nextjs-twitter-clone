import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar({ unreadCount = 0 }: { unreadCount?: number }) {
  const user = await currentUser();
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button
        variant="ghost"
        className="flex items-center gap-2"
        nativeButton={false}
        render={
          <Link href="/">
            <HomeIcon className="w-4 h-4" />
            <span className="hidden lg:inline">Home</span>
          </Link>
        }
      />

      {user ? (
        <>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            nativeButton={false}
            render={
              <Link href="/notifications">
                <div className="relative flex items-center justify-center">
                  <BellIcon className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full ring-2 ring-background animate-pulse" />
                  )}
                </div>
                <span className="hidden lg:inline">Notifications</span>
              </Link>
            }
          />

          <Button
            variant="ghost"
            className="flex items-center gap-2"
            nativeButton={false}
            render={
              <Link
                href={`/profile/${
                  user.username ??
                  user.emailAddresses[0].emailAddress.split("@")[0]
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Profile</span>
              </Link>
            }
          />

          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
