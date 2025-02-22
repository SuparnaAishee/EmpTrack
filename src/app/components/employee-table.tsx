import type React from "react";
import Image from "next/image";
import type { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[600px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
            <th className="py-3 px-4 text-left">Photo</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Email</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Phone</th>
            <th className="py-3 px-4 text-left hidden md:table-cell">
              Department
            </th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-200 text-sm">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="py-3 px-4">
                <Image
                  src={employee.photo || "/default-avatar.png"}
                  alt={employee.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="py-3 px-4">{employee.name}</td>
              <td className="py-3 px-4 hidden sm:table-cell">
                {employee.email}
              </td>
              <td className="py-3 px-4 hidden sm:table-cell">
                {employee.phone}
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                {employee.department}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    employee.status === "active"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

