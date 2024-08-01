'use client'

import { challengeOptions, challenges } from "@/db/schema"
import { startTransition, useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { reduceHearts, upsertChallengeProgress } from "@/actions/challlenge-progress";
import { toast } from "sonner";

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

    const [isPending, startTransition] = useTransition();

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

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    }

    const onContinue = () => {
        console.log("Hii")
        if(!selectedOption) return;
        if(status == "wrong"){
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        if(status == "correct"){
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        const correctOption = options.find((option) => option.correct);

        if(!correctOption){
            return;
        }

        if(correctOption && correctOption.id === selectedOption){
            startTransition(()=>{
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if(response?.error === "hearts"){
                            console.log("Missing heart");
                            toast.error("Hearts not enough! Please buy more to continue");
                            return;
                        }
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        //this is practice
                        if(initialPercentage === 100){
                            setHearts((prev) =>  Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again"))
            })
        } else{
            startTransition(()=> {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if(response?.error === "hearts"){
                            console.log("Missing hearts")
                            toast.error("Hearts not enough! Please buy more to continue")
                            return;
                        }
                        setStatus("wrong");
                        if(!response?.error){
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again"))
            })
        }
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
                                disabled={isPending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={isPending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}