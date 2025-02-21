"use client"

import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchProps {
  value: string
  onChange: (value: string) => void
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search employees..."
        className="pl-8 pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

