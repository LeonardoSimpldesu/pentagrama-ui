"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { BiAlarmExclamation, BiFile, BiUpload, BiX } from "react-icons/bi"

interface FileInputProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  onChange?: (files: File[]) => void
  className?: string
  disabled?: boolean
  helperText?: string
}

export function FileInput({
  accept,
  multiple = false,
  maxSize,
  onChange,
  className,
  disabled = false,
  helperText,
}: FileInputProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
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
          setError(`File size exceeds the limit (${sizeMB} MB)`)
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

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    },
    [disabled],
  )

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (!disabled) {
        const droppedFiles = e.dataTransfer.files
        handleFileChange(droppedFiles)
      }
    },
    [disabled, handleFileChange],
  )

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

  const triggerFileInput = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          "focus-within:border-primary hover:border-primary",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          className="sr-only"
          disabled={disabled}
          aria-describedby={helperText ? "file-input-help" : undefined}
        />

        <div className="flex flex-col items-center justify-center py-4 text-center">
          <BiUpload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Drag and drop {multiple ? "files" : "a file"} here, or click to browse</p>
          {accept && (
            <p className="text-xs text-muted-foreground mt-1">
              Accepted formats: {accept.replace(/\./g, "").replace(/,/g, ", ")}
            </p>
          )}
          {maxSize && <p className="text-xs text-muted-foreground">Max size: {formatFileSize(maxSize)}</p>}
        </div>
      </div>

      {helperText && (
        <p id="file-input-help" className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm mt-1">
          <BiAlarmExclamation className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
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
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                aria-label={`Remove ${file.name}`}
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

