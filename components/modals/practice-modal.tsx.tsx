'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePracticeModal } from "@/store/use-practice-modal.ts"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PracticeModal = () => {

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close} = usePracticeModal();

    useEffect(()=> setIsClient(true), []);

    if(!isClient){
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md text-white font-creato">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image 
                            src={'/heart.svg'}
                            alt="exitimage"
                            height={100}
                            width={100}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Practice lesson
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Use Practice lessons to regain hearts and points.
                        you cannot loose hearts or points in practice lessons.
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button
                                variant={"super"}
                                className="w-full"
                                size={"lg"}
                                onClick={close}
                            >
                                I understand
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}