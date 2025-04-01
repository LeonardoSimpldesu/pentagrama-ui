import type { Meta, StoryObj } from "@storybook/react"
import { DataTable } from "@/components/ui/DataTable"

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    data: [
      { id: 1, nome: 'Maria Silva', email: 'maria@exemplo.com', cargo: 'Desenvolvedor' },
      { id: 2, nome: 'João Santos', email: 'joao@exemplo.com', cargo: 'Designer' },
      { id: 3, nome: 'Ana Oliveira', email: 'ana@exemplo.com', cargo: 'Gerente' },
      { id: 4, nome: 'Carlos Pereira', email: 'carlos@exemplo.com', cargo: 'Marketing' },
      { id: 5, nome: 'Mariana Costa', email: 'mariana@exemplo.com', cargo: 'Desenvolvedor' },
    ],
    columns: [
      { key: 'id', label: 'ID', className: 'font-bold' },
      { key: 'nome', label: 'Nome' },
      { key: 'email', label: 'Email', className: 'text-blue-600' },
      { key: 'cargo', label: 'Cargo' },
    ]
  },
  argTypes: {
    variant: {
      options: ["default", "bordered", "striped", "minimal"],
      control: { type: "select" },
      description: "Variant of the table",
    },
    size: {
      options: ["default", "sm", "lg"],
      control: { type: "select" },
      description: "Size of the table",
    },
    bodyCellAlign: {
      options: ["left", "center", "right"],
      control: { type: "select" },
      description: "Alignment of the body cells",
    },
    headerCellAlign: {
      options: ["left", "center", "right"],
      control: { type: "select" },
      description: "Alignment of the header cells",
    },
    bodyCellVariant: {
      options: ["default", "primary", "secondary", "success", "danger"],
      control: { type: "select" },
      description: "Variant of the body cells",
    },
    bodyRowVariant: {
      options: ["default", "striped", "bordered", "interactive"],
      control: { type: "select" },
      description: "Variant of the body rows",
    },
    headerCellVariant: {
      options: ["default", "primary", "secondary", "dark"],
      control: { type: "select" },
      description: "Variant of the header cells",
    },
    headerVariant: {
      options: ["default", "primary", "secondary", "dark"],
      control: { type: "select" },
      description: "Variant of the header cells",
    },
    className: {
      control: { type: "text" },
      description: "Additional class names for the table",
    },
    data: {
      control: { type: 'object' },
      description: 'Data to be displayed in the table',
    },
    columns: {
      control: { type: 'object' },
      description: 'Columns configuration for the table',
    },
  }
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Default: Story = {}
