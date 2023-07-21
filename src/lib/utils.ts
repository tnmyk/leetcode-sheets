import { type ClassValue, clsx } from "clsx"
import { RefObject } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const scrollToView = <T extends HTMLElement>(ref: RefObject<T>) => {
    console.log(ref.current)
    ref.current?.scrollIntoView({ behavior: "smooth" })
}
