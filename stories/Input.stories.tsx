import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/components/ui/Input"
import { fn } from "@storybook/test"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Placeholder",
    defaultValue: "Texto de exemplo",
    disabled: false,
    onChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { type: "text" } }
export const WithText: Story = {
  args: { type: "text" },
  render: ({ ...props }) => (
    <div className="">
      <label htmlFor="username">Nome do usuário</label>
      <Input {...props} id="username" />
    </div>
  )
}
export const Disabled: Story = {
  args: { type: "text", disabled: true },
  render: ({ ...props }) => (
    <div className="">
      <label htmlFor="username" className="opacity-70">Nome do usuário</label>
      <Input {...props} id="username" />
    </div>
  )
}
