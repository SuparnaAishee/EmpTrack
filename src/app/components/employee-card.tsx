import type React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Employee } from "@/types/employee"
import { Button } from "@/components/ui/button"

interface EmployeeCardProps {
  employee: Employee
  onEdit: () => void
  onDelete: () => void
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Image
          src={employee.image || "/default-avatar.png"}
          alt={employee.name}
          width={64}
          height={64}
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold dark:text-white">{employee.name}</h2>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              employee.status === "active"
                ? "bg-green-200 text-green-800"
                : employee.status === "on leave"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>
      <div className="mb-4 dark:text-gray-300">
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Role:</strong> {employee.role}
        </p>
      </div>
      <div className="flex justify-between">
        <Link href={`/employee/${employee.id}`}>
          <Button variant="outline">View Profile</Button>
        </Link>
        <div>
          <Button variant="outline" onClick={onEdit} className="mr-2">
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard

