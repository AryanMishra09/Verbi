import { FeedWrapper } from "@/components/feedwrapper";
import { StickyWrapper } from "@/components/stickywrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";

type Props = {

}

const ShopPage = async () => {

    const userProgressData = getUserProgress();

    const [userProgress] = await Promise.all([
        userProgressData,
    ]) 
    if(!userProgress || !userProgress.activeCourse){
        redirect('/courses');
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex items-center flex-col">
                    <Image 
                        alt="shop"
                        src={'/shop.svg'}
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-white text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuffs.
                    </p>
                    <Items
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={false}
                    />
                </div>
            </FeedWrapper>
        </div>
    )
}

export default ShopPage;