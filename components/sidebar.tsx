import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { SidebarItem } from "./sidebar-item"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

type Props = {
    className?: string,
}

export const Sidebar = ({className} : Props) => {
    return (
        <div 
            className={cn(
                "flex h-screen lg:fixed lg:w-[256px] left-0 top-0 px-4 border-r-2 flex-col",
                className,
            )}
        >
            <Link href={'/'}>
                <div className="pl-4 pt-8 pb-7 flex items-center gap-x-3">
                    <Image 
                        src='/mascot.svg'
                        alt="logo"
                        width={30}
                        height={30}
                    />
                    <h1
                        className="text-3xl font-bold text-green-400 tracking-normal"
                    >
                        Verbi
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem 
                    label="Learn" 
                    href="/learn" 
                    iconSrc="/learn.svg"
                />
                <SidebarItem 
                    label="Leaderboard" 
                    href="/leaderboard" 
                    iconSrc="/leaderboard.svg"
                />
                <SidebarItem 
                    label="Quests" 
                    href="/quests" 
                    iconSrc="/quests.svg"
                />
                <SidebarItem 
                    label="Shop" 
                    href="/shop" 
                    iconSrc="/shop.svg"
                />
            </div>
            <div className="p-4 h-fit w-fit">
                <ClerkLoading>
                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
            </div>
        </div>
    )
}