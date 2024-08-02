import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
    title: string
}

export const Header = ({title} : Props) => {
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
            <div />
        </div>
    )
}