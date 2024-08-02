'use client'

import { refillHearts } from "@/actions/user-progress";
import { createStripeURL } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button"
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image"
import { useTransition } from "react"
import { toast } from "sonner";

type Props = {
    hearts: number,
    points: number,
    hasActiveSubscription: boolean,
}

export const Items = ({
    hearts,
    hasActiveSubscription,
    points,
} : Props) => {

    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;
    
        startTransition(() => {
          refillHearts().catch(() => toast.error("Failed to refill hearts"));
        });
    };

    const onUpgrade = () => {
        if (pending || hasActiveSubscription) return;
    
        startTransition(() => {
          createStripeURL()
            .then((res) => {
              if (res.data) {
                window.location.href = res.data;
              }
            })
            .catch(() => toast.error("Failed to upgrade"));
        });
    };

    return ( 
        <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image 
            src={"/heart.svg"} 
            alt={"Heart"} 
            width={60} 
            height={60} 
        />
        <div className="flex-1">
          <p className="text-neutral-300 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
            variant={"default"}
            onClick={onRefillHearts}
            disabled={hearts === 5 || points < POINTS_TO_REFILL || pending}
        >
          {hearts === 5 ? (
            <span className="">Already full</span>
          ) : (
            <div className="flex items-center">
              <Image
                src={"/points.svg"}
                alt={"Points"}
                height={20}
                width={20}
              />
              <p className="text-white">{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src={"/unlimited.svg"}
          alt={"Unlimited"}
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-300 text-base lg:text-xl font-bold">
            Unlimited Hearts
          </p>
        </div>
        <Button 
            disabled={pending}
            className="px-6" 
            onClick={onUpgrade}
        >
          {hasActiveSubscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </ul>
    )
}