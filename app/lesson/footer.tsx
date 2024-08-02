import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle } from "lucide-react"
import { useKey, useMedia } from "react-use"

type Props = {
    disabled?: boolean,
    onCheck: () => void,
    status: "correct" | "wrong" | "none" | "completed",
    lessonId?: number
}

export const Footer = ({
    disabled,
    onCheck,
    status,
    lessonId
} : Props) => {
    const isMobile = useMedia("(max-w: 1024px)");
    useKey("Enter", onCheck, {}, [onCheck]);
    return (
        <footer className={cn(
            "lg:h-[140px] h-[100px] border-t-2 absolute bottom-0 w-full",
            status === "correct" && "bg-green-200",
            status === "wrong" &&  "bg-rose-200",
        )}>
            <div className="max-w-[1040px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
                {status === "correct" && (
                    <div className="text-green-700 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                        Nicely done
                    </div>
                )}
                {status === "wrong" && (
                        <div className="text-red-700 font-bold text-base lg:text-2xl flex items-center">
                            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                            Try Again
                        </div>
                )}
                {status === "completed" && (
                    <Button
                        variant={'secondary'}
                        size={isMobile ? 'sm' : 'lg'}
                        onClick={() => window.location.href = `/lesson/${lessonId}`}
                    >
                        Practice Again
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    className="ml-auto"
                    onClick={onCheck}
                    size={isMobile? "sm" : "lg"}
                    variant={status === 'wrong' ? "destructive" : "default"}
                >
                    {status == "none" && "Check"}
                    {status == "correct" && "Next"}
                    {status == "wrong" && "Retry"}
                    {status == "completed" && "Continue"}
                </Button>
            </div>
        </footer>
    )
}