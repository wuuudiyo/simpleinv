import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
  type Column,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import type { ArticleWithCalculations } from '../../../shared/types/article';
import { StatusBadge, EmptyState, PackageIcon } from '../ui';
import { formatCurrency, formatProfit } from '../../utils/formatters';

interface ArticleTableProps {
  articles: ArticleWithCalculations[];
  categories: Map<number, string>;
  onRowClick: (article: ArticleWithCalculations) => void;
  isLoading?: boolean;
}

interface SortableHeaderProps {
  column: Column<ArticleWithCalculations, unknown>;
  children: React.ReactNode;
}

function SortableHeader({ column, children }: SortableHeaderProps) {
  const sortDirection = column.getIsSorted();
  return (
    <div className="flex items-center gap-1">
      {children}
      <span className="text-gray-400">
        {sortDirection === 'asc' && '�'}
        {sortDirection === 'desc' && '�'}
        {!sortDirection && '�'}
      </span>
    </div>
  );
}

export function ArticleTable({
  articles,
  categories,
  onRowClick,
  isLoading,
}: ArticleTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ArticleWithCalculations>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <SortableHeader column={column}>Titel</SortableHeader>
        ),
      },
      {
        accessorKey: 'categoryId',
        header: ({ column }) => (
          <SortableHeader column={column}>Kategorie</SortableHeader>
        ),
        cell: ({ row }) => {
          const categoryId = row.original.categoryId;
          return categoryId ? categories.get(categoryId) ?? '' : '';
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <SortableHeader column={column}>Status</SortableHeader>
        ),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: 'purchasePrice',
        header: ({ column }) => (
          <SortableHeader column={column}>Kaufpreis</SortableHeader>
        ),
        cell: ({ row }) => formatCurrency(row.original.purchasePrice),
      },
      {
        accessorKey: 'salePrice',
        header: ({ column }) => (
          <SortableHeader column={column}>Verkaufspreis</SortableHeader>
        ),
        cell: ({ row }) => formatCurrency(row.original.salePrice),
      },
      {
        accessorKey: 'profit',
        header: ({ column }) => (
          <SortableHeader column={column}>Profit</SortableHeader>
        ),
        cell: ({ row }) => {
          const { text, className } = formatProfit(row.original.profit);
          return <span className={className}>{text}</span>;
        },
      },
    ],
    [categories]
  );

  const table = useReactTable({
    data: articles,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Empty State
  if (articles.length === 0 && !isLoading) {
    return (
      <EmptyState
        icon={<PackageIcon />}
        title="Keine Artikel vorhanden"
        description="Fügen Sie Ihren ersten Artikel hinzu, um loszulegen."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick(row.original)}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
