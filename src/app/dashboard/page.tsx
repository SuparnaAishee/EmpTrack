"use client"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import { useEmployees } from "@/contexts/EmployeeContext"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function Dashboard() {
  const { employees } = useEmployees()

  const departmentCounts = employees.reduce(
    (acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const statusCounts = employees.reduce(
    (acc, employee) => {
      acc[employee.status] = (acc[employee.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const departmentData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        data: Object.values(departmentCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  }

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Number of Employees",
        data: Object.values(statusCounts),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Employees by Department</h2>
          <Pie data={departmentData} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Employees by Status</h2>
          <Bar data={statusData} />
        </div>
      </div>
    </div>
  )
}

