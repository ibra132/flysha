import prisma from "../../../../../../lib/prisma";

export const getCustomers = async () => {
  try {
    const users = await prisma.user.findMany({ where: { role: "CUSTOMER" } });
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};
