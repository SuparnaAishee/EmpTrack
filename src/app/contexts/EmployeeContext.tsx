"use client"

import type React from "react"
import { createContext, useState, useContext, useCallback } from "react"
import { employees as initialEmployees } from "@/data/employees"
import type { Employee } from "@/types/employee"

interface EmployeeContextType {
  employees: Employee[]
  addEmployee: (employee: Omit<Employee, "id">) => void
  updateEmployee: (id: string, employee: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

  const addEmployee = useCallback((employee: Omit<Employee, "id">) => {
    setEmployees((prevEmployees) => [...prevEmployees, { ...employee, id: String(prevEmployees.length + 1) }])
  }, [])

  const updateEmployee = useCallback((id: string, updatedEmployee: Partial<Employee>) => {
    setEmployees((prevEmployees) => prevEmployees.map((emp) => (emp.id === id ? { ...emp, ...updatedEmployee } : emp)))
  }, [])

  const deleteEmployee = useCallback((id: string) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id))
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployees() {
  const context = useContext(EmployeeContext)
  if (context === undefined) {
    throw new Error("useEmployees must be used within an EmployeeProvider")
  }
  return context
}

