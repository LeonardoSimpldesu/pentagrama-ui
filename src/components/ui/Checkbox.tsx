"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FaCheck } from "react-icons/fa"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
    // Estado interno para controlar o checkbox
    const [internalChecked, setInternalChecked] = React.useState<boolean>(
      checked !== undefined ? checked : defaultChecked || false,
    )

    // Referência para o input real
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Combinar a ref passada com nossa ref interna
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    // Atualizar o estado interno quando a prop checked mudar
    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked)
      }
    }, [checked])

    // Função para lidar com mudanças no checkbox
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked

      // Se for um componente controlado, não atualizamos o estado interno
      if (checked === undefined) {
        setInternalChecked(newChecked)
      }

      // Chamar o callback onCheckedChange se existir
      onCheckedChange?.(newChecked)

      // Chamar o onChange original se existir
      props.onChange?.(event)
    }

    // Função para lidar com cliques no wrapper do checkbox
    const handleClick = () => {
      if (!disabled) {
        // Simular um clique no input real
        inputRef.current?.click()
      }
    }

    // Função para lidar com teclas de espaço e enter
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if ((event.key === " " || event.key === "Enter") && !disabled) {
        event.preventDefault()
        inputRef.current?.click()
      }
    }

    // Determinar se o checkbox está marcado (para renderização)
    const isChecked = checked !== undefined ? checked : internalChecked

    // Determinar se é um componente controlado ou não
    const isControlled = checked !== undefined

    return (
      <div
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background flex justify-center items-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          isChecked && "bg-primary text-primary-foreground",
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        data-state={isChecked ? "checked" : "unchecked"}
      >
        {isChecked && <FaCheck stroke-width="0.5" className="h-2 w-2 text-current" />}

        {/* Input real escondido para acessibilidade */}
        {/* Verificação para caso do componente ser controlado(Value) ou não(defaultValue) */}
        {isControlled ? (
          <input
            type="checkbox"
            ref={inputRef}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
            {...props}
          />
        ) : (
          <input
            type="checkbox"
            ref={inputRef}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
            {...props}
          />
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }

