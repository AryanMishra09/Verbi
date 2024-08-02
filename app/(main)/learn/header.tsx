import { Button } from "@/components/ui/button"
import { courses } from "@/db/schema"
import { ArrowLeft, InfinityIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
    title: string,
    activeCourse: typeof courses.$inferSelect; 
    hearts: number;
    points: number;
    hasActiveSubscription: boolean
}

export const Header = ({
    title,
    activeCourse,
    hearts,
    points,
    hasActiveSubscription
} : Props) => {
    return (
        <div className="sticky top-0 pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 border-muted-foreground mb-5 text-neutral-400 backdrop-blur-lg lg:z-50">
            <Link href={'/courses'}>
                <Button
                    variant={"ghost"}
                    size={'sm'}
                >
                    <ArrowLeft className="h-5 w-5 stroke-2 text-white"/>
                </Button>
            </Link>
            <h1 className="font-bold text-lg text-white">
                {title}
            </h1>
            <div className="hidden lg:block"/>
            <div className="block lg:hidden">
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
        </div>
    )
}