import { z } from "zod";
import { eventTypes } from "@/lib/content";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number."),
  eventType: z.enum(eventTypes, {
    error: "Please select an event type.",
  }),
  eventDate: z.string().min(1, "Please choose an event date."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters."),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
