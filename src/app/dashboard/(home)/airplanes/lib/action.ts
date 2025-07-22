"use server";

import { ActionResult } from "next/dist/server/app-render/types";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

import prisma from "../../../../../../lib/prisma";

export async function getAirplaneById(id: string) {
  try {
    const data = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function saveAirplane(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const values = airplaneFormSchema.safeParse(
    Object.fromEntries(
      Array.from(formData.keys()).map((key) => [key, formData.get(key)])
    )
  );

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const uploadedFile = await uploadFile(values.data.image);

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Upload Error",
      errorDesc: ["Gagal mengunggah gambar."],
    };
  }

  try {
    await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile as string,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      erortitle: "Failed to save data",
      errorDesc: ["Terjadi masalah pada koneksi. silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function updateAirplane(
  prevState: unknown,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const image = formData.get("image") as File;

  const airplaneFormSchemaUpdate =
    image.size === 0
      ? airplaneFormSchema.omit({ image: true })
      : airplaneFormSchema;

  const values = airplaneFormSchemaUpdate.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    code: formData.get("code"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  let filename;

  if (image.size > 0) {
    const uploadedFile = await uploadFile(image);

    if (uploadedFile instanceof Error) {
      return {
        errorTitle: "Upload Error",
        errorDesc: ["Gagal mengunggah gambar."],
      };
    }

    filename = uploadedFile;
  } else {
    const prevImage = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
      select: {
        image: true,
      },
    });

    filename = prevImage?.image;
  }

  try {
    await prisma.airplane.update({
      where: {
        id: id,
      },
      data: {
        name: values.data?.name,
        code: values.data?.code,
        image: filename as string | undefined,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      errorTitle: "Failed to update data",
      errorDesc: ["Terjadi masalah pada koneksi. silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function deleteAirplane(
  id: string
): Promise<ActionResult | undefined> {
  const data = await prisma.airplane.findFirst({
    where: {
      id: id,
    },
  });

  if (!data) {
    return {
      errorTitle: "Data not found",
      errorDesc: ["Data tidak ditemukan."],
    };
  }

  const deletedFile = await deleteFile(data.image as string);

  if (deletedFile instanceof Error) {
    return {
      errorTitle: "Failed to delete file",
      errorDesc: ["Terjadi masalah pada koneksi. silahkan coba lagi"],
    };
  }

  try {
    await prisma.airplane.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      errorTitle: "Failed to delete data",
      errorDesc: ["Terjadi masalah pada koneksi. silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes");
}
