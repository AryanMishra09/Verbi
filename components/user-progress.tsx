import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    activeCourse: typeof courses.$inferSelect; 
    hearts: number;
    points: number;
    hasActiveSubscription: boolean
}

export const UserProgress = ({
    activeCourse,
    hearts,
    points,
    hasActiveSubscription,
}:Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href={'/courses'}>
                <Button
                    variant={"ghost"}
                >
                    <Image 
                        src={activeCourse.imageSrc}
                        alt='course'
                        className="rounded-md border"
                        height={32}
                        width={32}
                    />
                </Button>
            </Link>
            <Link href={'/shop'}>
                <Button
                    variant={"ghost"}
                    className="text-orange-500"
                >
                    <Image 
                        src='/points.svg'
                        alt='points'
                        className="mr-2"
                        height={28}
                        width={28}
                    />
                    {points}
                </Button>
            </Link>
            <Link href={'/shop'}>
                <Button
                    variant={"ghost"}
                    className="text-rose-500"
                >
                    <Image 
                        src='/heart.svg'
                        alt='hearts'
                        className="mr-2"
                        height={22}
                        width={22}
                    />
                    {hasActiveSubscription 
                        ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> 
                        : hearts
                    }
                </Button>
            </Link>
        </div>
    )
}