import { Prisma } from "@/generated/prisma/client";
import { Category } from "@/generated/prisma/enums";

export type ItemProps = {
  dataItem: Prisma.ItemGetPayload<{ include: { photos: true } }>[];
  searchQuery?: string;
  selectedCategory?: string;
};
export type DataRecentItemsProps = {
  dataRecentItems: Prisma.ItemGetPayload<{ include: { photos: true } }>[];
  totalItemsCount?: number;
};

export type EditFormProps = {
  item: {
    id: string;
    name: string;
    category: Category;
    brand: string | null;
    serialNumber: string | null;
    purchaseDate: Date | string | null;
    purchasePrice: number | null;
    location: string | null;
    notes: string | null;
    photos: { url: string }[];
    documents: { url: string; name: string }[];
  };
};
