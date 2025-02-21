"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const departments = [
  { label: "All Departments", value: "all" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
]

const statuses = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
]

interface EmployeeFiltersProps {
  onFilterChange: (filters: { department: string; status: string }) => void
}

export function EmployeeFilters({ onFilterChange }: EmployeeFiltersProps) {
  const [openDepartment, setOpenDepartment] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [department, setDepartment] = useState("all")
  const [status, setStatus] = useState("all")

  const handleDepartmentChange = (value: string) => {
    setDepartment(value)
    onFilterChange({ department: value, status })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onFilterChange({ department, status: value })
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openDepartment}
            className="w-[200px] justify-between"
          >
            {department === "all" ? "All Departments" : departments.find((dep) => dep.value === department)?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search department..." />
            <CommandList>
              <CommandEmpty>No department found.</CommandEmpty>
              <CommandGroup>
                {departments.map((dep) => (
                  <CommandItem key={dep.value} value={dep.value} onSelect={handleDepartmentChange}>
                    <Check className={cn("mr-2 h-4 w-4", department === dep.value ? "opacity-100" : "opacity-0")} />
                    {dep.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openStatus} onOpenChange={setOpenStatus}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={openStatus} className="w-[200px] justify-between">
            {status === "all" ? "All Status" : statuses.find((s) => s.value === status)?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((s) => (
                  <CommandItem key={s.value} value={s.value} onSelect={handleStatusChange}>
                    <Check className={cn("mr-2 h-4 w-4", status === s.value ? "opacity-100" : "opacity-0")} />
                    {s.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

