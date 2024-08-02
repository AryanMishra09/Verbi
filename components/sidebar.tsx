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
            <Link href={'/'} className="pl-4 pt-8 pb-7 flex flex-col items-center justify-start gap-x-3">
                <div className="flex">
                    <Image 
                        src='/mascot.svg'
                        alt="logo"
                        width={30}
                        height={30}
                        className="mr-4"
                    />
                    <h1
                        className="text-3xl font-bold text-green-400 tracking-normal"
                    >
                        Verbi
                    </h1>
                </div>
                <span className="text-muted-foreground text-xs mt-4"> - By Aryan Mishra❤️</span>
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
                <div className="p-4 h-fit w-fit flex flex-row items-center justify-center">
                    <ClerkLoading>
                        <Loader2 className="h-5 w-5 text-muted-foreground animate-spin"/>
                    </ClerkLoading>
                    <ClerkLoaded>
                        <UserButton />
                        <h1 className="ml-6 font-bold">Your Account</h1>
                    </ClerkLoaded>
                </div>
                <span className="text-xs text-center relative bottom-4 left-4 text-muted-foreground">(Click on you profile)</span>
            </div>
            
        </div>
    )
}