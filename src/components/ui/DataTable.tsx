
'use client';
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

export interface DataTableColumn {
  key: string;
  label: string;
  className?: string;
}

const tableVariants = cva(
  "min-w-full",
  {
    variants: {
      variant: {
        default: "divide-y divide-gray-200",
        bordered: "border border-gray-200",
        striped: "divide-y divide-gray-200",
        minimal: "",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const headerVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "bg-gray-50",
        primary: "bg-blue-50",
        secondary: "bg-gray-100",
        dark: "bg-gray-800 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const headerCellVariants = cva(
  "px-6 py-3 text-left font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "text-gray-500",
        primary: "text-blue-600",
        secondary: "text-gray-700",
        dark: "text-gray-100",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "left",
    },
  }
);

const bodyRowVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "hover:bg-gray-50 transition-colors duration-150",
        striped: "odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors duration-150",
        bordered: "border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150",
        interactive: "cursor-pointer hover:bg-blue-50 transition-colors duration-150",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const bodyCellVariants = cva(
  "px-6 py-4 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-black",
        primary: "text-blue-600",
        secondary: "text-gray-700",
        success: "text-green-600",
        danger: "text-red-600",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "left",
    },
  }
);

export interface DataTableProps extends VariantProps<typeof tableVariants> {
  data: Record<string, any>[];
  columns: DataTableColumn[];
  headerVariant?: VariantProps<typeof headerVariants>["variant"];
  headerCellVariant?: VariantProps<typeof headerCellVariants>["variant"];
  headerCellAlign?: VariantProps<typeof headerCellVariants>["align"];
  bodyRowVariant?: VariantProps<typeof bodyRowVariants>["variant"];
  bodyCellVariant?: VariantProps<typeof bodyCellVariants>["variant"];
  bodyCellAlign?: VariantProps<typeof bodyCellVariants>["align"];
  className?: {
    container?: string;
    table?: string;
    header?: string;
    headerRow?: string;
    headerCell?: string;
    body?: string;
    bodyRow?: string;
    bodyCell?: string;
    emptyMessage?: string;
  };
}

export function DataTable({ 
  data, 
  columns, 
  variant,
  size,
  headerVariant,
  headerCellVariant,
  headerCellAlign,
  bodyRowVariant,
  bodyCellVariant,
  bodyCellAlign,
  className = {},
}: DataTableProps) {
  return (
    <div className={cn("w-full max-w-6xl mx-auto", className.container)}>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className={cn(tableVariants({ variant, size }), className.table)}>
          <thead className={cn(headerVariants({ variant: headerVariant }), className.header)}>
            <tr className={cn(className.headerRow)}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    headerCellVariants({ 
                      variant: headerCellVariant, 
                      align: headerCellAlign 
                    }),
                    column.className,
                    className.headerCell
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cn("bg-white divide-y divide-gray-200", className.body)}>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    bodyRowVariants({ variant: bodyRowVariant }),
                    className.bodyRow
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className={cn(
                        bodyCellVariants({ 
                          variant: bodyCellVariant, 
                          align: bodyCellAlign 
                        }),
                        column.className,
                        className.bodyCell
                      )}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className={cn("px-6 py-4 text-center text-sm text-gray-500", className.emptyMessage)}
                >
                  Nenhum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}