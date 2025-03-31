import type { Meta, StoryObj } from "@storybook/react"
import { DropdownMenu } from "@/components/ui/DropdownMenu"
import { BiChevronDown, BiCog, BiHelpCircle, BiLogOut, BiUser } from "react-icons/bi"
import { Button } from "@/components/ui/Button"

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    items: [
      {
        id: "profile",
        label: "Perfil",
        icon: <BiUser className="h-4 w-4" />,
        href: "#profile",
      },
      {
        id: "settings",
        label: "Configurações",
        icon: <BiCog className="h-4 w-4" />,
        href: "#settings",
      },
      {
        id: "divider-1",
        label: "",
        divider: true,
      },
      {
        id: "help",
        label: "Ajuda e Suporte",
        icon: <BiHelpCircle className="h-4 w-4" />,
        items: [
          {
            id: "docs",
            label: "Documentação",
            href: "#docs",
          },
          {
            id: "faq",
            label: "Perguntas Frequentes",
            href: "#faq",
          },
          {
            id: "contact",
            label: "Contato",
            href: "#contact",
          },
        ],
      },
      {
        id: "divider-2",
        label: "",
        divider: true,
      },
      {
        id: "logout",
        label: "Sair",
        icon: <BiLogOut className="h-4 w-4" />,
        onClick: () => alert("Logout clicked"),
      },
    ]

  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  args: {
    trigger:
      <Button variant="outline" className="flex items-center gap-2">
        <BiUser className="h-4 w-4" />
        <span>Minha Conta</span>
        <BiChevronDown className="h-4 w-4 ml-1" />
      </Button>
  }
}
