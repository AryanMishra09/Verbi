'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
    lessonId: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

export const LessonButton = ({
    lessonId,
    index,
    totalCount,
    locked,
    current,
    percentage,
}: Props) => {

    const cycleLength = 8;
    const cycleIndex = index%cycleLength;

    let indentationLevel;
    if(cycleIndex <= 2){
        indentationLevel = cycleIndex;
    } else if(cycleIndex <= 4){
        indentationLevel = 4 - cycleIndex;
    } else if(cycleIndex <= 6){
        indentationLevel = 4 - cycleIndex;
    }else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40;

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : isLast ? Crown : Star;
    const href = isCompleted ? `/lesson/${lessonId}` : '/lesson';

    return (
        <Link 
            href={href} 
            aria-disabled={locked}
            style={{pointerEvents: locked? "none" : "auto"}}    
        >
            <div 
                className="relative " 
                style={{
                    right: `${rightPosition}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 30
                }}
            >
                {current ? (
                    <div className="h-[102px] w-[102px] relative">
                        <div className="absolute -top-5 left-4 px-3 py-2 text-lg border-2 font-bold text-green-500 bg-white rounded-xl animate-bounce z-10">
                            Start
                            <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"/>
                        </div>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0: percentage}
                            styles={{
                                path:{
                                    stroke: "#4ade80",
                                },
                                trail:{
                                    stroke: "#e5e7eb"
                                }
                            }}
                        >
                            <Button
                                size={"rounded"}
                                variant={locked ? "locked" : "success"}
                                className="h-[70px] w-[70px] border-b-8"
                            >
                                <Icon 
                                    className={cn(
                                        "h-10 w-10",
                                        locked 
                                        ? "fill-gray-700 text-gray-700 stroke-neutral-700"
                                        : "fill-muted text-muted",
                                        isCompleted && "fill-non stroke-[4]"
                                    )}
                                />
                            </Button>
                        </CircularProgressbarWithChildren>
                    </div>
                ) : (
                    <Button
                                size={"rounded"}
                                variant={locked ? "locked" : "success"}
                                className="h-[70px] w-[70px] border-b-8"
                            >
                                <Icon 
                                    className={cn(
                                        "h-10 w-10",
                                        locked 
                                        ? "fill-gray-700 text-gray-700 stroke-neutral-700"
                                        : "fill-muted text-muted",
                                        isCompleted && "fill-non stroke-[4]"
                                    )}
                                />
                            </Button>
                )}
            </div>
        </Link>
    )
}