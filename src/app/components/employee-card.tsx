import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Employee } from "@/types/employee";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <Image
          src={employee.photo || "/default-avatar.png"}
          alt={employee.name}
          width={64}
          height={64}
          className="rounded-full mb-4 sm:mb-0 sm:mr-4"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold dark:text-white">
            {employee.name}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
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

      <div className="mb-4 dark:text-gray-300 text-sm sm:text-base">
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

      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => console.log("View Profile")}
        >
          View Profile
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onEdit}
            className="w-full sm:w-auto"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="w-full sm:w-auto"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
