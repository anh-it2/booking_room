'use client';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Booking } from '@/constants/apiUserBooking';
import { Column, ColumnDef } from '@tanstack/react-table';
import { format } from "date-fns";
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';
import UserAction from './user-action';

export const bookingColumns= (setBookings: React.Dispatch<React.SetStateAction<Booking[]>>): ColumnDef<Booking>[] => [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    id: 'room',
    accessorKey: 'meetingRoom.name',
    header: ({ column }: { column: Column<Booking, unknown> }) => (
      <DataTableColumnHeader column={column} title='Room Name' />
    ),
    cell: ({ row}) => <div>{row.original.meetingRoom?.name}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search Bookings...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
 {
  id: 'date',
  accessorFn: (row: Booking) => row.startTime,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Date" />
  ),
  cell: ({ row }) => {
    const start = new Date(row.original.startTime);
    return <div>{start.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}</div>;
  },
},

{
  id: 'time',
  accessorFn: (row: Booking) => `${row.startTime} - ${row.endTime}`,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Time" />
  ),
  cell: ({ row }) => {
   const start = new Date(row.original.startTime);
   const end = new Date(row.original.endTime);

  return (
    <div>
      {format(start, "hh:mm a")} - {format(end, "hh:mm a")}
    </div>
  );
}
}
,
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }: { column: Column<Booking, unknown> }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ cell }) => {
    const status = cell.getValue<Booking["status"]>();

    const statusIcons: Record<Booking["status"], React.ComponentType<any>> = {
      APPROVED: Icons.approved,
      PENDING: Icons.pending,
      REJECTED: Icons.rejected,
      CANCELLED: Icons.cancelled,
    };

    const Icon = statusIcons[status];

    return (
      <Badge
        variant="outline"
        className="capitalize flex items-center gap-1"
      >
        <Icon className="w-4 h-4" />
        {status.toLowerCase()}
      </Badge>
    );
  },
    enableColumnFilter: true,
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      options: [
        { value: 'PENDING', label: 'Pending' },
        { value: 'APPROVED', label: 'Approved' },
        { value: 'REJECTED', label: 'Rejected' },
        { value: 'CANCELLED', label: 'Cancelled' }
      ]
    }
  },
  {
    id: `user's actions`,
    cell:({row}) => <UserAction data={row.original} setBookings={setBookings}/>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} setBookings={setBookings}/>
  }
];
