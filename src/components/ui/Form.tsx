"use client"

import type React from "react"

import { useRef, useState, useTransition } from "react"
import { useFormStatus } from "react-dom"
import { BiCheckCircle, BiErrorCircle, BiLoaderAlt } from "react-icons/bi"
import { cn } from "@/lib/utils"
import { Button } from "./Button"

type ServerActionType = (formData: FormData) => Promise<{ success?: boolean; error?: string } | void>
type ClientSubmitType = (
  formData: FormData,
  event: React.FormEvent<HTMLFormElement>,
) => Promise<{ success?: boolean; error?: string } | void> | void

interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "action" | "onSubmit"> {
  // Pode ser uma server action, uma função client-side, ou uma URL de action
  action?: ServerActionType | string
  onSubmit?: ClientSubmitType
  children: React.ReactNode
  className?: string
  successMessage?: string
  resetOnSuccess?: boolean
  traditionalSubmit?: boolean
}

function SubmitButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending || props.disabled}
      className={cn("flex items-center justify-center gap-2", pending && "opacity-70 cursor-not-allowed", className)}
      {...props}
    >
      {pending && <BiLoaderAlt className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

export function Form({
  action,
  onSubmit,
  children,
  className,
  successMessage = "Formulário enviado com sucesso!",
  resetOnSuccess = false,
  traditionalSubmit = false,
  ...props
}: FormProps) {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<{
    success?: boolean
    error?: string
    isSubmitting: boolean
  }>({
    isSubmitting: false,
  })
  const formRef = useRef<HTMLFormElement>(null)

  const isServerAction = action && typeof action === "function"

  const isActionUrl = action && typeof action === "string" && traditionalSubmit

  const isClientSubmit = onSubmit && typeof onSubmit === "function"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isActionUrl) {
      return
    }

    e.preventDefault()

    setState({ isSubmitting: true })

    const formData = new FormData(e.currentTarget)

    const processResult = (result: { success?: boolean; error?: string } | void | undefined) => {
      if (result && "error" in result && result.error) {
        setState({
          success: false,
          error: result.error,
          isSubmitting: false,
        })
      } else {
        setState({
          success: true,
          error: undefined,
          isSubmitting: false,
        })

        if (resetOnSuccess && formRef.current) {
          formRef.current.reset()
        }
      }
    }

    const handleError = (error: unknown) => {
      setState({
        success: false,
        error: error instanceof Error ? error.message : "Ocorreu um erro ao enviar o formulário",
        isSubmitting: false,
      })
    }

    if (isServerAction) {
      startTransition(async () => {
        try {
          const result = await (action as ServerActionType)(formData)
          processResult(result)
        } catch (error) {
          handleError(error)
        }
      })
    } else if (isClientSubmit) {
      try {
        const result = await onSubmit(formData, e)
        processResult(result)
      } catch (error) {
        handleError(error)
      }
    }
  }

  return (
    <div className="space-y-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        action={isActionUrl ? (action as string) : undefined}
        method={isActionUrl ? props.method || "post" : undefined}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </form>

      {state.success && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2.5 rounded-md">
          <BiCheckCircle className="h-4 w-4" />
          <p>{successMessage}</p>
        </div>
      )}

      {state.error && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-2.5 rounded-md">
          <BiErrorCircle className="h-4 w-4" />
          <p>{state.error}</p>
        </div>
      )}
    </div>
  )
}

export { SubmitButton }

