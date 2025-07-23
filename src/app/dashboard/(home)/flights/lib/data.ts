"use server";

import prisma from "../../../../../../lib/prisma";

export async function getFlights() {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        plane: true,
        seats: true,
      },
    });
    return flights;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFlightById(id: string) {
  try {
    const data = await prisma.flight.findFirst({
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
