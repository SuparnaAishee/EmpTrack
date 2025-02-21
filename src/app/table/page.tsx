"use client"

import { useState, useEffect } from "react"
import EmployeeTable from "@/components/employee-table"
import EmployeeForm from "@/components/employee-form"
import { Button } from "@/components/ui/button"
import type { Employee } from "@/types/employee"
import Navbar from "@/components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    department: "Engineering",
    status: "active",
    photo: "/default-avatar.png",
  },
  // Add more initial employees as needed
]

export default function TableView() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || employee.status === statusFilter) &&
        (departmentFilter === "all" || employee.department === departmentFilter),
    )
    setFilteredEmployees(filtered)
  }, [employees, searchTerm, statusFilter, departmentFilter])

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    const employee = { ...newEmployee, id: Date.now().toString() }
    setEmployees([...employees, employee])
    setIsFormOpen(false)
  }

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
    setEditingEmployee(null)
    setIsFormOpen(false)
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const departments = [...new Set(employees.map((e) => e.department))]

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white mb-2 sm:mb-0">Employees</h1>
          <div className="flex flex-wrap gap-2">
            <Select onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setIsFormOpen(true)}>Add Employee</Button>
          </div>
        </div>
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={(employee) => {
            setEditingEmployee(employee)
            setIsFormOpen(true)
          }}
          onDelete={handleDeleteEmployee}
        />
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
          onClose={() => {
            setIsFormOpen(false)
            setEditingEmployee(null)
          }}
          isOpen={isFormOpen}
        />
      </div>
    </div>
  )
}
