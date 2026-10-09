import { Prisma } from "@/generated/prisma/client";

export type ItemProps = {
  dataItem: Prisma.ItemGetPayload<{ include: { photos: true } }>[];
};
export type DataRecentItemsProps = {
  dataRecentItems: Prisma.ItemGetPayload<{ include: { photos: true } }>[];
};
