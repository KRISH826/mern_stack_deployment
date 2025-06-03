import { Bill } from "@/types/statType";
import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./TableActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "billNo",
    header: "Bill No",
  },
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
  },
  {
    accessorKey: "billingDate",
    header: "Billing Date",
  },
  {
    accessorKey: "lotNo",
    header: "Lot No",
  },
  {
    accessorKey: "receivedDate",
    header: "Received Date",
  },
  {
    accessorKey: "contactNo",
    header: "Contact No",
  },
  {
    accessorKey: "panId",
    header: "PAN ID",
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const bill = row.original;
      return (
        <TableActions bill={bill} />
      );
    }
  }
];
