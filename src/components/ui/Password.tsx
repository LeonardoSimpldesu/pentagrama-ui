'use client'
import * as React from "react"
import { BiShow, BiHide } from "react-icons/bi";
import { cn } from "@/lib/utils"
import { Input } from "./Input"

function Password({ className: inputClassName, type, ...props }: React.ComponentProps<"input">) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  return (
    <div className="relative">
      <Input type={isVisible ? 'text' : 'password'} className={cn(inputClassName, "pr-7")} {...props}/>
      <button onClick={() => setIsVisible(!isVisible)} disabled={props.disabled} className="absolute right-2 inset-y-0 cursor-pointer disabled:opacity-70 disabled:pointer-events-none">
        {isVisible ? <BiHide/> : <BiShow />}
      </button>
    </div>
  )
}

export { Password }
