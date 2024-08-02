import { auth } from "@clerk/nextjs/server";


const adminIDs = ["user_2joQIEuSuOCewWgdNlZI3HAAzx1", "user_2k5WLEFGAssW5othy8OYQWMrtcX"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) return false;

  return adminIDs.indexOf(userId) !== -1;
};
