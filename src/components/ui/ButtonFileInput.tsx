"use client"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./Button"
import { BiAlarmExclamation, BiFile, BiPaperclip, BiX } from "react-icons/bi"
import { FaPaperclip } from "react-icons/fa"

interface ButtonFileInputProps {
  buttonText?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  onChange?: (files: File[]) => void
  className?: string
  disabled?: boolean
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function ButtonFileInput({
  buttonText = "Selecionar arquivo",
  accept,
  multiple = false,
  maxSize,
  onChange,
  className,
  disabled = false,
  variant = "default",
}: ButtonFileInputProps) {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles || selectedFiles.length === 0) return

      setError(null)
      const newFiles: File[] = []

      Array.from(selectedFiles).forEach((file) => {
        // Check file size if maxSize is provided
        if (maxSize && file.size > maxSize) {
          const sizeMB = maxSize / (1024 * 1024)
          setError(`O arquivo excede o limite de tamanho (${sizeMB} MB)`)
          return
        }

        newFiles.push(file)
      })

      if (newFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
        setFiles(updatedFiles)
        onChange?.(updatedFiles)
      }
    },
    [files, maxSize, multiple, onChange],
  )

  const triggerFileInput = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }

  const removeFile = useCallback(
    (indexToRemove: number) => {
      setFiles((prevFiles) => {
        const newFiles = prevFiles.filter((_, index) => index !== indexToRemove)
        onChange?.(newFiles)
        return newFiles
      })
    },
    [onChange],
  )

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-3">
        <Button
          type="button"
          onClick={triggerFileInput}
          disabled={disabled}
          variant={variant}
          className="flex items-center gap-2"
        >
          <FaPaperclip className="h-4 w-4" />
          {buttonText}
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          className="sr-only"
          disabled={disabled}
        />

        {accept && (
          <p className="text-xs text-muted-foreground">
            Formatos aceitos: {accept.replace(/\./g, "").replace(/,/g, ", ")}
          </p>
        )}

        {maxSize && <p className="text-xs text-muted-foreground">Tamanho máximo: {formatFileSize(maxSize)}</p>}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <BiAlarmExclamation className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2 border rounded-md p-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm"
            >
              <div className="flex items-center gap-2 truncate">
                <BiFile className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                aria-label={`Remover ${file.name}`}
              >
                <BiX className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

