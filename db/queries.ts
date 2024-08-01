import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, challenges, courses, lessons, units, userProgress } from "./schema";
import { progress } from "framer-motion";

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
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId){
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges:{
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId), 
                            },
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lessons) => {
            if(lessons.challenges.length === 0){
                return {...lessons, completed:false}
            }
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
});

export const getCourseProgress = cache(async() => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId){
        return null;
    }

    const unitsActiveCourse = await db.query.units.findMany({
        orderBy: (units, {asc})=> [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons: {
                orderBy: (lessons, {asc}) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    });
    const firstUncompleteLesson = unitsActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
        return lesson.challenges.some((challenge) => {
            return (
                !challenge.challengeProgress 
                || challenge.challengeProgress.length === 0
                || challenge.challengeProgress.some((progress) => progress.completed === false)
            )
        });
    });
    return {
        activeLesson: firstUncompleteLesson,
        activeLessonId: firstUncompleteLesson?.id
    }
});

export const getLesson = cache(async(id?: number) => {
    const {userId} = await auth();
    
    if(!userId){
        return null;
    }
    const coureseProgress = await getCourseProgress();

    const lessonId = id || coureseProgress?.activeLessonId;
    
    if(!lessonId){
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeOptions: true,
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      });
    
    console.log("data: ", data)

    if(!data || !data.challenges){
        return null;
    }

    // const normalizedChallenges = data.challenges.map((challenge) => {
    //     const completed = challenge.challengeProgress 
    //         && challenge.challengeProgress.length > 0
    //         && challenge.challengeProgress.every((progress) => progress.completed);

    //     return {...challenge, completed};
    // });
    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed =
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed);
    
        return { ...challenge, completed };
      });

    return {...data, challenges: normalizedChallenges};
});

export const getLessonPercentage = cache(async() => {
    const coureseProgress = await getCourseProgress();
    if(!coureseProgress?.activeLessonId){
        return 0;
    }
    const lesson = await getLesson(coureseProgress.activeLessonId);
    if(!lesson){
        return 0;
    }
    const completedChallenges = lesson.challenges
        .filter((challenge) => challenge.completed);
    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100,
    );
    return percentage;
});
