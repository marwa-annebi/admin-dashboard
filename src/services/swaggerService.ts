import { OpenAPI } from "../Api/core/OpenAPI";

export const swaggerService = {
  async validateApiEndpoints(): Promise<{ valid: boolean; errors: string[] }> {
    try {
      // This would typically validate against the actual API
      // For now, we'll do basic checks
      const errors: string[] = [];

      if (!OpenAPI.BASE) {
        errors.push("API base URL not configured");
      }

      // You could add more validation logic here
      // Check if endpoints are reachable, validate schemas, etc.

      return {
        valid: errors.length === 0,
        errors,
      };
    } catch (error) {
      return {
        valid: false,
        errors: ["Failed to validate API endpoints"],
      };
    }
  },

  getSwaggerDocsUrl(): string {
    // Return the Swagger UI URL
    const baseUrl = OpenAPI.BASE || "http://localhost:5000";
    return `${baseUrl}/api-docs`;
  },

  getApiBaseUrl(): string {
    return OpenAPI.BASE || "http://localhost:5000";
  },
};
