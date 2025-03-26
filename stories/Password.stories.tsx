import type { Meta, StoryObj } from "@storybook/react"
import { Password } from "@/components/ui/Password"
import { fn } from "@storybook/test"

const meta: Meta<typeof Password> = {
  title: "Components/Password",
  component: Password,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    defaultValue: "Texto de exemplo",
    disabled: false,
    onChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Password>

export const Default: Story = {
  args: {
    placeholder: "Password",
    defaultValue: "",
  },
  render: ({ ...props }) => (
    <div className="max-w-32">
      <Password {...props} />
    </div>
  )
}

export const WithText: Story = {
  args: { placeholder: "Password", defaultValue: "123456" },
  render: ({ ...props }) => (
    <div className="max-w-32">
      <label htmlFor="password" className="">Senha</label>
      <Password {...props} id="password"/>
    </div>
  )
}

export const Disabled: Story = {
  args: { disabled: true },
  render: ({ ...props }) => (
    <div className="max-w-32">
      <label htmlFor="password" className="opacity-70">Senha</label>
      <Password {...props} />
    </div>
  )
}
