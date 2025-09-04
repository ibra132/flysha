"use server";

import prisma from "../../../../../../lib/prisma";

export const getTickets = async () => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        flight: true,
        customer: true,
        seat: true,
      },
    });

    return tickets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
