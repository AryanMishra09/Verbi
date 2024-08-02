'use client'
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/store/use-open-modal";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";


export default function Home() {
  const {open} = useOpenModal();
  useEffect(()=>{
    setTimeout(() => {
      open();
    }, 3000);
  },[])
  return (
    <div
      className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-4 md:gap-20"
    >
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image 
          src='/hero.svg'
          alt="Hero"
          fill
        />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-creato text-neutral-400 max-w-[480px] text-center">
          Learn, practice, and master new languages with Verbi.
        </h1>
        <div className=" flex flex-col items-center gap-y-4 max-w-[330px] w-full">
          <ClerkLoading>
          <Loader2 className="h-5 w-5 text-muted-foreground animate-spin"/>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
              >
                <Button
                  size={'lg'}
                  variant={'default'}
                  className="w-full"
                >
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
              >
                <Button
                  size={'lg'}
                  variant={'outline'}
                  className="w-full"
                >
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size={'lg'} variant={'default'} className="w-full" asChild>
                <Link href={'/learn'}>
                  Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
