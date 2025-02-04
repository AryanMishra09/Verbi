'use server'

import { POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if(!course){
        throw new Error("Course not found");
    }

    // todo: enable once units and lessons are available
    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error("Course is empty");
    // }


    const existingUserProgress = await getUserProgress();

    if(existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || '/mascot.svg',
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || '/mascot.svg',
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();
  
    if (!currentUserProgress) throw new Error("User progress not found");
  
    if (currentUserProgress.hearts === 5) {
      throw new Error("Hearts are full");
    }
  
    if (currentUserProgress.points < POINTS_TO_REFILL) {
      throw new Error("Not enough points");
    }
  
    await db
      .update(userProgress)
      .set({
        hearts: 5,
        points: currentUserProgress.points - POINTS_TO_REFILL,
      })
      .where(eq(userProgress.userId, currentUserProgress.userId));
  
    revalidatePath("/shop");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath("/learn");
  };