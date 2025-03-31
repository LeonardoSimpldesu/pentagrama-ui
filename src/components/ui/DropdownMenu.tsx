"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { BiChevronRight } from "react-icons/bi"

export interface DropdownMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  divider?: boolean
  items?: DropdownMenuItem[]
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  align?: "left" | "right"
  className?: string
  menuClassName?: string
  triggerClassName?: string
  width?: number | string
}

export function DropdownMenu({
  trigger,
  items,
  align = "left",
  className,
  menuClassName,
  triggerClassName,
  width = 220,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          setIsOpen(false)
          setActiveSubmenu(null)
          break
        case "ArrowDown":
          e.preventDefault()
          break
        case "ArrowUp":
          e.preventDefault()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const toggleSubmenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveSubmenu(activeSubmenu === id ? null : id)
  }

  const handleItemClick = (item: DropdownMenuItem, e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault()
      return
    }

    if (item.onClick) {
      item.onClick()
    }

    if (!item.items) {
      setIsOpen(false)
      setActiveSubmenu(null)
    }
  }

  const renderMenuItems = (menuItems: DropdownMenuItem[], isSubmenu = false) => {
    return menuItems.map((item, index) => {
      const skipDivider = item.divider && (index === 0 || menuItems[index - 1]?.divider)

      if (item.divider && !skipDivider) {
        return <div key={`divider-${index}`} className="h-px my-1 bg-border" />
      }

      if (item.divider) return null

      const hasSubmenu = item.items && item.items.length > 0
      const isSubmenuActive = activeSubmenu === item.id

      const MenuItem = () => (
        <div
          key={item.id}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md",
            "transition-colors duration-200",
            item.disabled
              ? "opacity-50 cursor-not-allowed text-muted-foreground"
              : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
            isSubmenuActive && "bg-accent text-accent-foreground",
          )}
          onClick={(e) => (hasSubmenu ? toggleSubmenu(item.id, e) : handleItemClick(item, e))}
          role="menuitem"
          tabIndex={item.disabled ? -1 : 0}
          aria-disabled={item.disabled}
          aria-haspopup={hasSubmenu}
          aria-expanded={hasSubmenu ? isSubmenuActive : undefined}
        >
          <div className="flex items-center gap-2 flex-1">
            {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
            {item.href && !item.disabled ? (
              <a href={item.href} className="flex-1" onClick={(e) => e.stopPropagation()}>
                {item.label}
              </a>
            ) : (
              <span className="flex-1">{item.label}</span>
            )}
          </div>

          {hasSubmenu && <BiChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
      )

      return (
        <React.Fragment key={item.id}>
          <MenuItem />

          {(hasSubmenu && isSubmenuActive  && item.items) && (
            <div className={cn("pl-2 ml-4 mt-1 mb-1 border-l border-border", "animate-in fade-in-0 zoom-in-95")}>
              {renderMenuItems(item.items, true)}
            </div>
          )}
        </React.Fragment>
      )
    })
  }

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <div
        className={cn("cursor-pointer", triggerClassName)}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 py-1 bg-background border border-border rounded-md shadow-md",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
            align === "right" ? "right-0" : "left-0",
            menuClassName,
          )}
          style={{ width: typeof width === "number" ? `${width}px` : width }}
          role="menu"
        >
          {renderMenuItems(items)}
        </div>
      )}
    </div>
  )
}

