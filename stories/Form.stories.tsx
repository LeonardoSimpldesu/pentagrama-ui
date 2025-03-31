import type { Meta, StoryObj } from "@storybook/react"
import { Form, SubmitButton } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Checkbox } from "@/components/ui/Checkbox"

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Form>

export const ServerAction: Story = {
  render: () => {
    async function subscribeToNewsletter(formData: FormData) {
      "use server"

      const email = formData.get("email") as string
      const acceptTerms = formData.get("accept-terms") === "on"

      // Validação
      if (!email || !email.includes("@")) {
        return { error: "Por favor, forneça um email válido" }
      }

      if (!acceptTerms) {
        return { error: "Você precisa aceitar os termos para continuar" }
      }

      // Simulando um atraso de processamento do servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sucesso
      return { success: true }
    }

    return (
      <div className="max-w-md mx-auto p-6 bg-muted/30 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Inscreva-se na nossa newsletter</h2>
        <p className="text-muted-foreground mb-4">
          Receba as últimas novidades e atualizações diretamente na sua caixa de entrada.
        </p>

        <Form action={subscribeToNewsletter} successMessage="Inscrição realizada com sucesso!" resetOnSuccess={true}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newsletter-email">Email</label>
              <Input id="newsletter-email" name="email" type="email" placeholder="seu@email.com" required />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="accept-terms" name="accept-terms" />
              <label htmlFor="accept-terms" className="text-sm leading-tight">
                Eu concordo em receber emails e aceito os{" "}
                <a href="#" className="text-primary underline underline-offset-2">
                  termos de uso
                </a>
                .
              </label>
            </div>

            <SubmitButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
              Inscrever-se
            </SubmitButton>
          </div>
        </Form>
      </div>
    )
  }
}

export const ClientSide: Story = {
  render: () => {
    async function handleSubmit(formData: FormData) {
      const email = formData.get("email") as string
      const acceptTerms = formData.get("accept-terms") === "on"

      // Validação
      if (!email || !email.includes("@")) {
        return { error: "Por favor, forneça um email válido" }
      }

      if (!acceptTerms) {
        return { error: "Você precisa aceitar os termos para continuar" }
      }

      // Simulando um atraso de processamento do servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sucesso
      return { success: true }
    }

    return (
      <div className="max-w-md mx-auto p-6 bg-muted/30 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Inscreva-se na nossa newsletter</h2>
        <p className="text-muted-foreground mb-4">
          Receba as últimas novidades e atualizações diretamente na sua caixa de entrada.
        </p>

        <Form onSubmit={handleSubmit} successMessage="Inscrição realizada com sucesso!" resetOnSuccess={true}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newsletter-email">Email</label>
              <Input id="newsletter-email" name="email" type="email" placeholder="seu@email.com" required />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="accept-terms" name="accept-terms" />
              <label htmlFor="accept-terms" className="text-sm leading-tight">
                Eu concordo em receber emails e aceito os{" "}
                <a href="#" className="text-primary underline underline-offset-2">
                  termos de uso
                </a>
                .
              </label>
            </div>

            <SubmitButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
              Inscrever-se
            </SubmitButton>
          </div>
        </Form>
      </div>
    )
  }
}
