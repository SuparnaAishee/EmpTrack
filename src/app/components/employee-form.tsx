"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Employee } from "@/types/employee"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EmployeeFormProps {
  employee: Employee | null
  onSubmit: (employee: Employee | Omit<Employee, "id">) => void
  onClose: () => void
  isOpen: boolean
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit, onClose, isOpen }) => {
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    role: "",
    status: "active",
    photo: "",
    startDate: "",
    performanceRating: 0,
    lastReviewDate: "",
    projects: [],
    checkInTime: "",
    checkOutTime: "",
  })

  useEffect(() => {
    if (employee) {
      setFormData(employee)
    }
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(employee ? { ...formData, id: employee.id } : formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="mt-2">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mb-2"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-2"
            required
          />
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="mb-2"
            required
          />
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="mb-2"
            required
          />
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="mb-2"
            required
          />
          <Input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="mb-2"
            required
          />
          <Input
            type="url"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="mb-2"
          />
          <Select name="status" onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}>
            <SelectTrigger className="mb-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on leave">On Leave</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            className="mb-2"
            required
          />
          <Input
            type="number"
            name="performanceRating"
            value={formData.performanceRating}
            onChange={handleChange}
            placeholder="Performance Rating (0-5)"
            min="0"
            max="5"
            className="mb-2"
            required
          />
          <Input
            type="date"
            name="lastReviewDate"
            value={formData.lastReviewDate}
            onChange={handleChange}
            placeholder="Last Review Date"
            className="mb-2"
            required
          />
          <Input
            type="text"
            name="projects"
            value={formData.projects.join(", ")}
            onChange={(e) => setFormData((prev) => ({ ...prev, projects: e.target.value.split(", ") }))}
            placeholder="Projects (comma-separated)"
            className="mb-2"
          />
          <Input
            type="time"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            placeholder="Check-in Time"
            className="mb-2"
          />
          <Input
            type="time"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            placeholder="Check-out Time"
            className="mb-2"
          />
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit">{employee ? "Update" : "Add"} Employee</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm

