import type { Language } from "../Api/models/Language";
import { AdminLanguageManagementService } from "../Api/services/AdminLanguageManagementService";

export type CreateLanguagePayload = {
  name: string;
  code: string;
};

export async function createLanguage(
  payload: CreateLanguagePayload
): Promise<Language> {
  const response = await AdminLanguageManagementService.postApiLanguages({
    requestBody: payload,
  });

  if (!response || !response.data) {
    throw new Error("Language creation failed: empty response from server");
  }

  return response.data as Language;
}
