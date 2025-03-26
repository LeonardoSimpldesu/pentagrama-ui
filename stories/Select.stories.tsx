import { Select } from "@/components/ui/Select";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    value: {
      control: "text",
    },
    onValueChange: {
      action: "valueChanged",
    },
    options: {
      control: "object",
    }
  },
  args: {
    options: [
      { value: "apple", label: "Maçã" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Laranja" }
    ],
    placeholder: "Selecione frutas",
    searchable: false,
    cleanable: false,
    onValueChange: fn()
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Multiple: Story = { args: { multiple: true } };

export const WithText: Story = {
  render: (args) => (
    <div className="">
      <label htmlFor="fruits">Qual sua fruta favorita?</label>
      <Select {...args} name="fruits" />
    </div>
  ),
};

export const Disabled: Story = {args: {disabled: true}};

export const Searchable: Story = {args: {searchable: true}};

export const Cleanable: Story = {args: {cleanable: true}};

