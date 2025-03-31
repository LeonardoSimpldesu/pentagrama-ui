import type { Meta, StoryObj } from "@storybook/react"
import { FileInput } from "@/components/ui/FileInput"

const meta: Meta<typeof FileInput> = {
  title: "Components/FileInput",
  component: FileInput,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FileInput>

export const FileDefault: Story = {
  args: {
    accept: ".pdf,.doc,.docx",
    maxSize: 5 * 1024 * 1024,
    helperText: "Upload a document in PDF or Word format (max 5MB)",
  }
}

export const FileDisabled: Story = {
  args: {
    accept: ".jpg,.jpeg,.png,.gif",
    multiple: true,
    maxSize: 10 * 1024 * 1024,
    helperText: "Upload one or more images (max 10MB each)"
  }
}

