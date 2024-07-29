import { FeedWrapper } from "@/components/feedwrapper";
import { StickyWrapper } from "@/components/stickywrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper >
                <UserProgress 
                    activeCourse={{title: "Spanish", imageSrc: "/es.svg"}}
                    hearts={5}
                    points={10}
                    hasActiveSubscription={true}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Spanish"/>
            </FeedWrapper>
        </div>
    )
}

export default LearnPage;