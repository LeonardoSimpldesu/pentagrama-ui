import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "@/components/ui/Textarea"
import { fn } from "@storybook/test"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    defaultValue: "Texto de exemplo",
    disabled: false,
    onChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {},
  render: ({ ...props }) => (
    <Textarea {...props} id="resume" />
  )
}

export const WithText: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="">
      <label htmlFor="resume" className="">Resumo das qualificações</label>
      <Textarea {...props} id="resume" />
    </div>
  )
}

export const Disabled: Story = {
  args: { disabled: true },
  render: ({ ...props }) => (
    <div className="">
      <label htmlFor="resume" className="opacity-70">Resumo das qualificações</label>
      <Textarea {...props} id="resume" />
    </div>
  )
}
