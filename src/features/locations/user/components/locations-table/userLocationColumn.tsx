'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Location } from '@/constants/apiLocation';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import UserAction from './user-action';



export const userLocationColumns= (setLocations: React.Dispatch<React.SetStateAction<Location[]>>): ColumnDef<Location>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Location, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Location['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search locations...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'city',
    accessorKey: 'city',
    header: ({ column }: { column: Column<Location, unknown> }) => (
      <DataTableColumnHeader column={column} title='City' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Location['city']>()}</div>,
    enableColumnFilter: true
  },
  {
    id: 'country',
    accessorKey: 'country',
    header: ({ column }: { column: Column<Location, unknown> }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Location['country']>()}</div>,
    enableColumnFilter: true
  },
  {
    id: 'active',
    accessorKey: 'active',
    header: ({ column }: { column: Column<Location, unknown> }) => (
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
