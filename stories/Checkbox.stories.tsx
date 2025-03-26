import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "@/components/ui/Checkbox"
import { fn } from "@storybook/test"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    onCheckedChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { defaultChecked: false },
  render: ({...props}) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...props} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const WithText: Story = {
  args: { defaultChecked: true },
  render: ({...props}) => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" {...props}/>
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
}

export const WithTextDisabled: Story = {
  args: { defaultChecked: false, disabled: true },
  render: ({...props}) => (
    <div className="flex items-center space-x-2 opacity-70">
      <Checkbox id="terms" {...props} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none cursor-not-allowed"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}