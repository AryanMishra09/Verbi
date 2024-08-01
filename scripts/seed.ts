import "dotenv/config";

import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);    
const db = drizzle(sql, {schema});

const main = async() => {
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 3,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                title: "Nouns",
                order: 1
            },
            {
                id: 2,
                unitId: 1,
                title: "Verbs",
                order: 2
            },
            {
                id: 3,
                unitId: 1,
                title: "Verbs",
                order: 3
            },
            {
                id: 4,
                unitId: 1,
                title: "Verbs",
                order: 4
            },
            {
                id: 5,
                unitId: 1,
                title: "Verbs",
                order: 5
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"The man"',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Which one of this is "the robot"?',
            },
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: '"The man"',
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Which one of this is "the robot"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "es_man.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "es_woman.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "es_robot.mp3",
            },
            {
                id: 4,
                challengeId: 2,
                correct: true,
                text: "el hombre",
                audioSrc: "es_man.mp3",
            },
            {
                id: 5,
                challengeId: 2,
                correct: false,
                text: "la mujer",
                audioSrc: "es_woman.mp3",
            },
            {
                id: 6,
                challengeId: 2,
                correct: false,
                text: "el robot",
                audioSrc: "es_robot.mp3",
            },
            {
                id: 7,
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "el hombre",
                audioSrc: "es_man.mp3",
            },
            {
                id: 8,
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "es_woman.mp3",
            },
            {
                id: 9,
                challengeId: 3,
                imageSrc: "/robot.svg",
                correct: true,
                text: "el robot",
                audioSrc: "es_robot.mp3",
            },
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                id: 10,
                challengeId: 4,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "es_man.mp3",
            },
            {
                id: 11,
                challengeId: 4,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "es_woman.mp3",
            },
            {
                id: 12,
                challengeId: 4,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "es_robot.mp3",
            },
            {
                id: 13,
                challengeId: 5,
                correct: true,
                text: "el hombre",
                audioSrc: "es_man.mp3",
            },
            {
                id: 14,
                challengeId: 5,
                correct: false,
                text: "la mujer",
                audioSrc: "es_woman.mp3",
            },
            {
                id: 15,
                challengeId: 5,
                correct: false,
                text: "el robot",
                audioSrc: "es_robot.mp3",
            },
            {
                id: 16,
                challengeId: 6,
                imageSrc: "/man.svg",
                correct: false,
                text: "el hombre",
                audioSrc: "es_man.mp3",
            },
            {
                id: 17,
                challengeId: 6,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "es_woman.mp3",
            },
            {
                id: 18,
                challengeId: 6,
                imageSrc: "/robot.svg",
                correct: true,
                text: "el robot",
                audioSrc: "es_robot.mp3",
            },
        ]);

        console.log("Seeding Finished");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to seed database");
    }
}

main();