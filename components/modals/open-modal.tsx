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
import { useOpenModal } from "@/store/use-open-modal"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const OpenModal = () => {

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close} = useOpenModal();

    useEffect(()=> setIsClient(true), []);

    if(!isClient){
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md  text-white font-creato">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image 
                            src={'/mascot.svg'}
                            alt="exitimage"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-creato text-2xl">
                        Content for different languages are coming soon....
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        For now, Spanish has amazing content. Other courses have dummy data.
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button
                                className="w-full mt-2"
                                size={"lg"}
                                onClick={close}
                            >
                                Keep learning
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}