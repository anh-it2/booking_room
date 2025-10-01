'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Location } from '@/constants/apiLocation';
import { Room } from '@/constants/apiRoom';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import UserAction from './user-action';



export const userRoomColumns= (setRooms: React.Dispatch<React.SetStateAction<Room[]>>): ColumnDef<Room>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    id: "room's name",
    accessorKey: 'name',
    header: ({ column }: { column: Column<Room, unknown> }) => (
      <DataTableColumnHeader column={column} title="Room's Name" />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Room['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search locations...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: "location's name",
    accessorKey: 'location.name',
    header: ({ column }: { column: Column<Room, unknown> }) => (
      <DataTableColumnHeader column={column} title="Location's Name" />
    ),
    cell: ({row}) => <div>{row.original.location.name}</div>,
    enableColumnFilter: true
  },
  {
    id: 'city',
    accessorKey: 'location.city',
    header: ({ column }: { column: Column<Room, unknown> }) => (
      <DataTableColumnHeader column={column} title='City' />
    ),
    cell: ({row}) => <div>{row.original.location.city}</div>,
    enableColumnFilter: true
  },
  {
    id: 'country',
    accessorKey: 'location.country',
    header: ({ column }: { column: Column<Room, unknown> }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({row}) => <div>{row.original.location.country}</div>,
    enableColumnFilter: true
  },
  {
    id: 'active',
    accessorKey: 'active',
    header: ({ column }: { column: Column<Room, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Location['active']>();
      const Icon = status ? CheckCircle2 : XCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ]
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserAction data={row.original}/>
  }
];
