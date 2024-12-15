import { FullClasses } from "@/types/data";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<FullClasses>[] = [
  {
    accessorKey: "id",
    header: "#",
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Nom de la classe",
  },
  {
    accessorKey: "parent.name",
    id: "parent_name", 
    header: "Classe parente",
    cell: ({ row }) => {
      const parentName = row.original?.parent?.name;
      return parentName ? parentName : "-/-";
    },
  },
  {
    accessorKey: "updated_at",
    header: "Dernière mise à jour",
    cell: ({ row }) => {
      const updatedAt = row.original?.updated_at;
      return updatedAt ? moment(updatedAt).fromNow() : "Non spécifié";
    },
    sortingFn: (rowA, rowB) => {
      const d1 = new Date(rowA.original.updated_at || 0).getTime();
      const d2 = new Date(rowB.original.updated_at || 0).getTime();
      return d1 - d2;
    },
  },
];
