import type { Meta, StoryObj } from "@storybook/react"
import Avatar from "@/components/ui/Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      description: "Size of the button",
    },
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {},
  render: ({ ...props }) => (
    <Avatar {...props} id="resume">
      <Avatar.Image src="https://avatars.githubusercontent.com/u/12345678" alt="Profile Picture" fill>
        <Avatar.Fallback>
          PM
        </Avatar.Fallback>
      </Avatar.Image>
    </Avatar>
  )
}

export const WithoutImage: Story = {
  args: {},
  render: ({ ...props }) => (
    <Avatar {...props} id="resume">
      <Avatar.Image src="" alt="Profile Picture" fill>
        <Avatar.Fallback className="bg-teal-500 text-white font-bold">
          PM
        </Avatar.Fallback>
      </Avatar.Image>
    </Avatar>
  )
}