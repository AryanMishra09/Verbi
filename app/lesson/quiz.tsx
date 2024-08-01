'use client'

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";

type Props = {
    initialPercentage: number, 
    initialHearts: number,
    initialLessonId: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean,
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any,
}

export const Quiz = ({
    initialHearts,
    initialLessonChallenges, 
    initialLessonId,
    initialPercentage,
    userSubscription,
} : Props) => {

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges, setChallenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const unCompletedChallenge = challenges.findIndex((challenge )=> !challenge.completed);
        return unCompletedChallenge === -1 ? 0 : unCompletedChallenge;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

    const onSelect = (id: number) => {
        if(status !== "none") return;
        setSelectedOption(id);
    }

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions || [];
    const title = challenge.type === "ASSIST" 
        ? "Select the correct meaning"
        : challenge.question

    return (
        <>
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasactiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center mt-20">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start text-white font-bold">
                            {title}
                        </h1>
                        <div className="">
                            {challenge.type === "ASSIST" &&
                                <QuestionBubble question={challenge.question} />
                            }
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={!selectedOption}
                status={status}
                onCheck={()=>{}}
            />
        </>
    )
}