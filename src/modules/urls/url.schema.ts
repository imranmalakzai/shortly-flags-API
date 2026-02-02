import { z } from "zod";

// validate the original_url
export const create = z.object({
  body: z.object({
    original_url: z
      .string("original url is required")
      .url("Invali URL Format")
      .refine(
        (url) => url.startsWith("http://") || url.startsWith("https://"),
        { message: "URL must start with https:// or https://" },
      ),
  }),
});
