'use client'

import { challengeOptions, challenges } from "@/db/schema"
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { reduceHearts, upsertChallengeProgress } from "@/actions/challlenge-progress";
import { toast } from "sonner";
import { useAudio, useMount, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti';
import { useHeartsModal } from "@/store/use-hearts-modal copy";
import { usePracticeModal } from "@/store/use-practice-modal.ts";

type Props = {
    initialPercentage: number, 
    initialHearts: number,
    initialLessonId: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean,
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any,
    titleHeading: string,
    unitId: number,
    order: number,
}

export const Quiz = ({
    initialHearts,
    initialLessonChallenges, 
    initialLessonId,
    initialPercentage,
    userSubscription,
    titleHeading,
    order,
    unitId,
} : Props) => {

    const {open: openPracticeModal } = usePracticeModal()
    const {open: openHeartsModal} = useHeartsModal();

    useMount(() => {
        if(initialPercentage === 100){
            openPracticeModal();
        }
    })
    const {width, height} = useWindowSize();
    const router = useRouter();
    const [finsihAudio, _, finishAudioControl] = useAudio({src: "/finish.mp3", autoPlay: true});

    const [
        correctAudio,
        _c,
        correctControls
    ] = useAudio({src: "/correct.wav"});
    const [
        incorrectAudio,
        _i,
        incorrectControls
    ] = useAudio({src: "/incorrect.wav"});

    const [isPending, startTransition] = useTransition();
    const [lessonId, setLessonId] = useState<number>(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges, setChallenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const unCompletedChallenge = challenges.findIndex((challenge )=> !challenge.completed);
        return unCompletedChallenge === -1 ? 0 : unCompletedChallenge;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions || [];

    const onSelect = (id: number) => {
        if(status !== "none") return;
        setSelectedOption(id);
    }

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    }

    const onContinue = () => {
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
                            openHeartsModal();
                            return;
                        }
                        setStatus("correct");
                        correctControls.play();
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
                            openHeartsModal();
                            return;
                        }
                        setStatus("wrong");
                        incorrectControls.play(); 
                        if(!response?.error){
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again"))
            })
        }
    }

    
    if(!challenge){
        return(
            <>
                {finsihAudio}
                <Confetti 
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={1000}
                    width={width}
                    height={height}
                />
                <div className="flex flex-col h-full mt-20 gap-y-4 lg:gap-y-8 max-w-lg mx-auto items-center justify-center text-center">
                    <Image 
                        src={'/finish.svg'}
                        alt="finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image 
                        src={'/finish.svg'}
                        alt="finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-white">
                        Great Job! <br /> 
                        you&apos;ve completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 px-10 w-full">
                        <ResultCard 
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard 
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer 
                    lessonId={lessonId}
                    status="completed"
                    onCheck={()=>{router.push('/learn')}}
                />
            </>
        )
    }
    
    
    const title = challenge.type === "ASSIST" 
        ? "Select the correct meaning"
        : challenge.question

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasactiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex flex-col items-center justify-center mt-8 gap-16">
                    <div className="">
                        <h1 className="text-lg text-center text-muted-foreground underline tracking-wide font-creato">
                            Lesson {order}:{" "}{titleHeading}
                        </h1>
                    </div>
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