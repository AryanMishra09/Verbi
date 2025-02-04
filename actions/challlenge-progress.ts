// 'use server'

// import db from "@/db/drizzle";
// import { getUserProgress } from "@/db/queries";
// import { challengeProgress, challenges, userProgress } from "@/db/schema";
// import { auth } from "@clerk/nextjs/server"
// import { and, eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";

// export const upsertChallengeProgress = async(challengeId: number) => {
//     const {userId} = await auth();

//     if(!userId) {
//         throw new Error("Unauthorized");
//     }

//     const currentUserProgress = await getUserProgress();

//     if(!currentUserProgress){
//         throw new Error("User Progress not found");
//     }

//     const challenge = await db.query.challenges.findFirst({
//         where: eq(challenges.id, challengeId),
//     })

//     if(!challenge){
//         throw new Error("Challenge bnot found");
//     }

//     const lessonId = challenge.lessonId;

//     const existingChallengeProgress = await db.query.challengeProgress.findFirst({
//         where: and(
//             eq(challengeProgress.userId, userId),
//             eq(challengeProgress.challengeId, challengeId),
//         )
//     });

//     const isPractice = !!existingChallengeProgress;

//     if(currentUserProgress.hearts === 0 && !isPractice){
//         return { error: "hearts"};
//     }

//     if(isPractice){
//         await db.update(challengeProgress).set({
//             completed: true,
//         }).where(
//             eq(challengeProgress.id, existingChallengeProgress.id)
//         );

//         await db.update(userProgress).set({
//             hearts: Math.min(currentUserProgress.hearts + 1, 5),
//             points: currentUserProgress.points + 10,
//         }).where(eq(userProgress.userId, userId));

//         revalidatePath('/learn');
//         revalidatePath('/lessons');
//         revalidatePath('/quests');
//         revalidatePath('/leaderboard');
//         revalidatePath(`/learn/${lessonId}`);
//         return;
//     }
    
//     await db.insert(challengeProgress).values({
//         userId,
//         challengeId,
//         completed: true,
//     });

//     await db.update(userProgress).set({
//         points: currentUserProgress.points + 10,
//     }).where(eq(userProgress.userId, userId));
//     revalidatePath('/learn');
//     revalidatePath('/lessons');
//     revalidatePath('/quests');
//     revalidatePath('/leaderboard');
//     revalidatePath(`/learn/${lessonId}`);
// }

// export const reduceHearts = async(challengeId: number) => {
//     const {userId} = await auth();
//     if(!userId){
//         throw new Error("Unauthorized");
//     }

//     const currentUserProgress = await getUserProgress();

//     const challenge = await db.query.challenges.findFirst({
//         where: eq(challenges.id, challengeId),
//     })

//     if(!challenge){
//         throw new Error("Challenge not found");
//     }

//     const lessonId = challenge.lessonId;

//     const existingChallnegeProgress = await db.query.challengeProgress.findFirst({
//         where: and(
//             eq(challengeProgress.userId, userId),
//             eq(challengeProgress.challengeId, challengeId),
//         ),
//     });

//     const isPractice = !!existingChallnegeProgress;

//     if(isPractice){
//         return {error: "practice"}
//     }
//     if(!currentUserProgress){
//         throw new Error("User progress not found");
//     }

//     if(currentUserProgress.hearts === 0){
//         return{ error: 'hearts'}
//     }

//     await db.update(userProgress).set({
//         hearts: Math.max(currentUserProgress.hearts - 1, 0),
//     }).where(eq(userProgress.userId, userId));

//     revalidatePath('/shop');
//     revalidatePath('/learn');
//     revalidatePath('/quests');
//     revalidatePath('/leaderboard');
//     revalidatePath(`/lesson/${lessonId}`);

// }


"use server";

import db from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// export const upsertChallengeProgress = async (challengeID: number) => {
//   const { userId } = await auth();

//   if (!userId) throw new Error("User not found");

//   const currentUserProgress = await getUserProgress();
// //   const userSubscription = await getUserSubscription();

//   if (!currentUserProgress) throw new Error("User progress not found");

//   const challenge = await db.query.challenges.findFirst({
//     where: eq(challenges.id, challengeID),
//   });

//   if (!challenge) throw new Error("Challenge not found");

//   const lessonId = challenge.lessonId;

//   const existingChallengeProgress = await db.query.challengeProgress.findFirst({
//     where: and(
//       eq(challengeProgress.userId, userId),
//       eq(challengeProgress.challengeId, challengeID)
//     ),
//   });

//   const isPractice = !!existingChallengeProgress;

//   if (currentUserProgress.hearts == 0 && !isPractice) {
//     return { error: "hearts" };
//   }

//   if (isPractice) {
//     await db
//       .update(challengeProgress)
//       .set({
//         completed: true,
//       })
//       .where(eq(challengeProgress.id, existingChallengeProgress.id));

//     await db
//       .update(userProgress)
//       .set({
//         hearts: Math.min(currentUserProgress.hearts + 1, 5),
//         points: currentUserProgress.points + 10,
//       })
//       .where(eq(userProgress.userId, userId));

//     revalidatePath("/learn");
//     revalidatePath("/lesson");
//     revalidatePath("/quests");
//     revalidatePath("/leaderboard");
//     revalidatePath(`/lesson/${lessonId}`);
//     return;
//   }

//   await db.insert(challengeProgress).values({
//     challengeId: challengeID,
//     userId: userId,
//     completed: true,
//   });

//   await db
//     .update(userProgress)
//     .set({
//       points: currentUserProgress.points + 10,
//     })
//     .where(eq(userProgress.userId, userId));

//   revalidatePath("/learn");
//   revalidatePath("/lesson");
//   revalidatePath("/quests");
//   revalidatePath("/leaderboard");
//   revalidatePath(`/lesson/${lessonId}`);
// };

export const upsertChallengeProgress = async (challengeID: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!currentUserProgress) throw new Error("User progress not found");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeID),
  });

  if (!challenge) throw new Error("Challenge not found");

  const lessonID = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeID)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (currentUserProgress.hearts == 0 && !isPractice && !userSubscription?.isActive) {
    return { error: "hearts" };
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonID}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId: challengeID,
    userId: userId,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonID}`);
};

// export const reduceHearts = async(challengeId: number) => {
//     const {userId} = await auth();
//     if(!userId){
//         throw new Error("Unauthorized");
//     }

//     const currentUserProgress = await getUserProgress();

//     const challenge = await db.query.challenges.findFirst({
//         where: eq(challenges.id, challengeId),
//     })

//     if(!challenge){
//         throw new Error("Challenge not found");
//     }

//     const lessonId = challenge.lessonId;

//     const existingChallnegeProgress = await db.query.challengeProgress.findFirst({
//         where: and(
//             eq(challengeProgress.userId, userId),
//             eq(challengeProgress.challengeId, challengeId),
//         ),
//     });

//     const isPractice = !!existingChallnegeProgress;

//     if(isPractice){
//         return {error: "practice"}
//     }
//     if(!currentUserProgress){
//         throw new Error("User progress not found");
//     }

//     if(currentUserProgress.hearts === 0){
//         return{ error: 'hearts'}
//     }

//     await db.update(userProgress).set({
//         hearts: Math.max(currentUserProgress.hearts - 1, 0),
//     }).where(eq(userProgress.userId, userId));

//     revalidatePath('/shop');
//     revalidatePath('/learn');
//     revalidatePath('/quests');
//     revalidatePath('/leaderboard');
//     revalidatePath(`/lesson/${lessonId}`);
// }

export const reduceHearts = async (challengeID: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeID),
  });

  if (!challenge) throw new Error("Challenge not found");

  const lessonID = challenge.lessonId;

  if (!currentUserProgress) throw new Error("User progress not found");

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeID)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  if (userSubscription?.isActive) return { error: "subscription" };

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/shop");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonID}`);
};