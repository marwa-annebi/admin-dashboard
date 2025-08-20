import type { Lesson } from "../Api/models/Lesson";
import { AdminLessonManagementService } from "../Api/services/AdminLessonManagementService";

export type CreateLessonPayload = {
  title: string;
  description?: string;
  domainId: string;
  difficulty: "easy" | "medium" | "hard";
  type?: "word" | "paragraph" | "sentence";
  order?: number;
  isActive?: boolean;
};

export async function createLesson(
  payload: CreateLessonPayload
): Promise<Lesson> {
  const response = await AdminLessonManagementService.postApiLessonAdmin({
    requestBody: payload,
  });

  if (!response || !response.data) {
    throw new Error("Lesson creation failed: empty response from server");
  }

  return response.data as Lesson;
}
