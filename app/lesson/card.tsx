import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCallback } from "react"
import {useAudio, useKey} from "react-use"

type Props = {
    id: number,
    text: string,
    imageSrc: string | null,
    shortcut: string,
    selected?:boolean,
    onClick: () => void,
    audioSrc: string | null,
    disabled?: boolean,
    status: "correct" | "wrong" | "none",
    type: typeof challenges.$inferSelect["type"],
}

export const Card = ({
    id,
    text,
    imageSrc,
    audioSrc,
    shortcut,
    selected,
    onClick,
    disabled,
    status,
    type,
} : Props) => {

    const [audio, _, controls] = useAudio({src: audioSrc || ""});

    const handleClick = useCallback(() => {
        if(disabled){
            return
        }

        controls.play();
        onClick();
    }, [disabled, onClick, controls]);

    useKey(shortcut, handleClick, {}, [handleClick]);

    return (
        <div
            onClick={handleClick}
            className={cn(
                "h-full border-2 rounded-xl hover:bg-black/90 p-4 lg:p-6 cursor-pointer border-mu hover:border-muted-foreground",
                selected && "border-indigo-600 bg-indigo-200 hover:bg-indigo-200",
                selected && status === "correct" && "border-green-700 bg-green-200 hover:bg-green-200",
                selected && status === "wrong" && "border-rose-500 bg-red-200 hover:bg-red-200",
                disabled && "pointer-events-none hover:bg-black",
                type === "ASSIST" && "lg:p-3 w-full"
            )}
        >
            {audio}
            {imageSrc && (
                <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
                    <Image 
                        src={imageSrc}
                        alt="text"
                        fill
                    />
                </div>
            )}
            <div className={cn(
                "flex items-center justify-between",
                type === "ASSIST" && "flex-row-reverse",
            )}>
                {type === "ASSIST" && <div />}
                <div className={cn(
                    "lg:w-[30px] h-[30px] w-[20px] border-2 flex items-center justify-center rounded-xl text-white lg:text-[15px] text-xs font-semibold",
                    selected && "border-indigo-700 text-indigo-700",
                    selected && status === "correct" && "text-green-500 border-green-500",
                    selected && status === "wrong" && "text-rose-500 border-rose-500",
                )}>
                    {shortcut}
                </div>
                <p className={cn(
                    "text-white text-sm lg:text-base",
                    selected && "text-indigo-600",
                    selected && status === "correct" && "text-green-700",
                    selected && status === "wrong" && "text-rose-700",
                )}>
                    {text}
                </p>
            </div>
        </div>
    )
}