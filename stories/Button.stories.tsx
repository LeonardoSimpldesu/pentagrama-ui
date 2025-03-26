import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/Button"
import { fn } from "@storybook/test"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "destructive", "ghost", "link", "secondary", "outline"],
      control: { type: "select" },
      description: "Variant of the button",
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
      description: "Size of the button",
    },
  },
  args: {
    onClick: fn(),
    children: "Click me",
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {args: { variant: "default", size: "default" }}
