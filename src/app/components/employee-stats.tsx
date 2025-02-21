import type React from "react"
import type { Employee } from "@/types/employee"

interface EmployeeStatsProps {
  employees: Employee[]
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({ employees }) => {
  const totalEmployees = employees.length
  const activeEmployees = employees.filter((e) => e.status === "active").length
  const inactiveEmployees = totalEmployees - activeEmployees
  const departments = [...new Set(employees.map((e) => e.department))]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Employees</h3>
        <p className="text-3xl font-bold dark:text-gray-200">{totalEmployees}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Active Employees</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeEmployees}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Inactive Employees</h3>
        <p className="text-3xl font-bold text-red-600 dark:text-red-400">{inactiveEmployees}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Departments</h3>
        <p className="text-3xl font-bold dark:text-gray-200">{departments.length}</p>
      </div>
    </div>
  )
}

export default EmployeeStats

