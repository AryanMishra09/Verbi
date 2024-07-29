import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, lessons, units, userProgress } from "./schema";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
})

export const getUserProgress = cache(async() => {
    const { userId } = await auth();

    if(!userId){
        return null;
    }

    const data = db.query.userProgress.findFirst({
        where:eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    }) 

    return data;
});

export const getUnits = cache(async() => {
    const userProgress = await getUserProgress();

    if(!userProgress?.activeCourseId){
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges:{
                        with: {
                            challengeProgress: true,
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lessons) => {
            const allCompletedChallenges = lessons.challenges.every((challenge) => {
                return challenge.challengeProgress 
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed);
            })
            return {...lessons, completed: allCompletedChallenges};
        })
        return {...unit, lessons: lessonsWithCompletedStatus}
    })

    return normalizedData;
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        //todo populate units and lessons
    });
    return data;
})