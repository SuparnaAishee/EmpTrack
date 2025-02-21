import type React from "react"
import Image from "next/image"
import type { Employee } from "@/types/employee"
import { Button } from "@/components/ui/button"

interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (id: string) => void
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Photo</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Department</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Image
                  src={employee.photo || "/default-avatar.png"}
                  alt={employee.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">{employee.name}</td>
              <td className="py-3 px-6 text-left">{employee.email}</td>
              <td className="py-3 px-6 text-left">{employee.phone}</td>
              <td className="py-3 px-6 text-left">{employee.department}</td>
              <td className="py-3 px-6 text-left">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    employee.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <Button variant="outline" className="mr-2" onClick={() => onEdit(employee)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => onDelete(employee.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable

