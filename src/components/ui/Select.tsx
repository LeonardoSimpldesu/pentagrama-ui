"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { BiCheck, BiChevronDown, BiChevronUp, BiSearch } from "react-icons/bi"
import { Input } from "./Input"
import { Button } from "./Button"

interface SelectProps {
  options: Array<{ value: string; label: string }>
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  placeholder?: string
  disabled?: boolean
  name?: string
  className?: string
  multiple?: boolean
  searchable?: boolean
  cleanable?: boolean
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Selecione uma opção",
      disabled = false,
      name,
      className,
      multiple = false,
      searchable = false,
      cleanable = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [selectedOption, setSelectedOption] = React.useState<{
      label: string[]
      value: string[]
    }>()

    const rootRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (defaultValue) {
        const defaultValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
        const defaultLabels = defaultValues.map(val => {
          const option = options.find(opt => opt.value === val)
          return option ? option.label : ""
        })
        setSelectedOption({
          value: defaultValues,
          label: defaultLabels.filter(Boolean) as string[]
        })
      }
    }, [defaultValue, options])

    React.useEffect(() => {
      if (value !== undefined) {
        const currentValues = Array.isArray(value) ? value : [value]
        const currentLabels = currentValues.map(val => {
          const option = options.find(opt => opt.value === val)
          return option ? option.label : ""
        })
        setSelectedOption({
          value: currentValues,
          label: currentLabels.filter(Boolean) as string[]
        })
      }
    }, [value, options])

    const handleValueChange = (newValue: string, newLabel?: string) => {
      let newValues: string[]
      let newLabels: string[]

      if (multiple) {
        const currentValues = selectedOption?.value || []
        const currentLabels = selectedOption?.label || []

        if (currentValues.includes(newValue)) {
          newValues = currentValues.filter(v => v !== newValue)
          newLabels = currentLabels.filter(l => l !== newLabel)
        } else {
          newValues = [...currentValues, newValue]
          newLabels = newLabel ? [...currentLabels, newLabel] : currentLabels
        }
      } else {
        newValues = [newValue]
        newLabels = newLabel ? [newLabel] : []
        setOpen(false)
      }

      setSelectedOption({
        value: newValues,
        label: newLabels
      })

      if (onValueChange) {
        if (multiple) {
          onValueChange(newValues)
        } else {
          onValueChange(newValues[0])
        }
      }
    }

    // Fechar quando clicar fora
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open])

    // Fechar com Escape
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          setOpen(false)
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [open])

    // Filtrar opções baseado na pesquisa
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )

    const displayValue = selectedOption?.value
      ? multiple
        ? `${selectedOption.value.length} selecionados`
        : selectedOption.label[0] || selectedOption.value[0]
      : placeholder

    return (
      <div ref={rootRef} className={cn("relative", className)}>
        <button
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && setOpen(!open)}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
        >
          <span className="block truncate">{displayValue}</span>
          {open ? (
            <BiChevronUp className="ml-auto h-4 w-4 opacity-50" />
          ) : (
            <BiChevronDown className="ml-auto h-4 w-4 opacity-50" />
          )}
        </button>

        {open && (
          <div
            className="absolute z-50 w-full bg-white shadow-md rounded-md p-1 top-[140%] max-h-60 overflow-auto"
            role="listbox"
          >
            {searchable && (
              <div className="relative m-1 mb-2">
                <BiSearch className="absolute left-3 top-[0.65rem] text-muted-foreground" />
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                  placeholder="Pesquisar"
                  autoFocus
                />
              </div>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = selectedOption?.value.includes(option.value)
                return (
                  <div
                    key={option.value}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                      isSelected
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleValueChange(option.value, option.label)}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      {isSelected && <BiCheck className="h-4 w-4" />}
                    </span>
                    {option.label}
                  </div>
                )
              })
            ) : (
              <div className="py-1.5 px-2 text-sm text-muted-foreground">
                Nenhum resultado encontrado
              </div>
            )}

            {cleanable && (
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={() => setSelectedOption({ value: [], label: [] })}
                  className="py-2 px-0 h-fit cursor-pointer border-t border-muted text-center w-full"
                >
                  Limpar
                </Button>
            )}
          </div>
        )}

        {selectedOption?.value &&
          (multiple ? (
            selectedOption.value.map((val) => (
              <input type="hidden" key={val} name={name} value={val} />
            ))
          ) : (
            <input type="hidden" name={name} value={selectedOption.value[0]} />
          ))}
      </div>
    )
  }
)

Select.displayName = "Select"