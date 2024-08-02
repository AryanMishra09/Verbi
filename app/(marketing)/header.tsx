import { Button } from "@/components/ui/button"
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="fixed right-0 left-0 top-0 py-3 px-4 backdrop-blur-lg z-[100] flex items-center border-b-[1px] md:px-10 justify-between">
            <div className="max-w-screen mx-auto flex items-center justify-between h-full w-full">
                <Link href={'/'}>
                    <div className=" pl-4 flex items-center gap-x-3">
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
                        <span className="text-muted-foreground text-xs"> - By Aryan Mishra❤️</span>
                    </div>
                </Link>
                <ClerkLoading>
                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton
                            mode='modal'
                            //ToCheck in Docs  video timestamp: 51:53
                            // fallbackRedirectUrl={'/learn'}
                        >
                            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                    Sign in
                                </span>
                            </button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}