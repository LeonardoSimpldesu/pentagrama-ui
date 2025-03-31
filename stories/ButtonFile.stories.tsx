import type { Meta, StoryObj } from "@storybook/react"
import { ButtonFileInput } from "@/components/ui/ButtonFileInput"

const meta: Meta<typeof ButtonFileInput> = {
  title: "Components/ButtonFileInput",
  component: ButtonFileInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ButtonFileInput>

export const Default: Story = {
  args: {
    buttonText: "Escolher arquivo",
    accept: ".pdf,.doc,.docx",
    maxSize: 5 * 1024 * 1024
  }
}

export const ButtonFileOutline: Story = {
  args: {
    variant: "outline",
    buttonText: "Escolher arquivo",
    accept: ".pdf,.doc,.docx",
    maxSize: 5 * 1024 * 1024
  }
}

export const ButtonFileSecondary: Story = {
  args: {
    variant: "secondary",
    buttonText: "Escolher arquivo",
    accept: ".pdf,.doc,.docx",
    maxSize: 5 * 1024 * 1024
  }
}

export const ButtonFileGhost: Story = {
  args: {
    variant: "ghost",
    buttonText: "Escolher arquivo",
    accept: ".pdf,.doc,.docx",
    maxSize: 5 * 1024 * 1024
  }
}

export const ButtonFileDisabled: Story = {
  args: {
    disabled: true,
    buttonText: "Escolher arquivo",
    accept: ".pdf,.doc,.docx",
    maxSize: 5 * 1024 * 1024
  }
}

