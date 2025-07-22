import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_FILE_SIZE = 2000000; // 2MB

export const airplaneFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" }),

  code: z
    .string({ required_error: "Kode pesawat tidak boleh kosong" })
    .regex(/^[A-Z]{3}-[0-9]{3}$/, {
      message: "Format kode pesawat harus [XXX-111]",
    }),

  image: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Image harus jpg, jpeg, atau png"
    )
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      "Image harus kurang dari 2MB"
    ),
});
