import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type LessonIDProps = {
    params: {
        lessonId: number;
    }
}

const LessonIDPage = async ({ params }: LessonIDProps) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();
  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) redirect("/learn");

  const initialPercentage =
    (lesson?.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={null}
        titleHeading={lesson.title}
        order={lesson.order}
        unitId={lesson.unitId}
    />
  );
};

export default LessonIDPage;