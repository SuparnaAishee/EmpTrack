"use client";

import { useState, useEffect } from "react";
import EmployeeTable from "../../components/employee-table";
import EmployeeForm from "../../components/employee-form";
import { Button } from "../../components/ui/button";
import Navbar from "../../components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEmployees } from "../../contexts/EmployeeContext";
import { useToast } from "../../components/ui/use-toast";
import type { Employee } from "../../types/employee";

export default function TableView() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } =
    useEmployees();
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || employee.status === statusFilter) &&
        (departmentFilter === "all" || employee.department === departmentFilter)
    );
    setFilteredEmployees(filtered);
  }, [employees, searchTerm, statusFilter, departmentFilter]);

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    addEmployee(newEmployee);
    setIsFormOpen(false);
    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been successfully added.`,
    });
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    updateEmployee(updatedEmployee.id, updatedEmployee);
    setEditingEmployee(null);
    setIsFormOpen(false);
    toast({
      title: "Employee Updated",
      description: `${updatedEmployee.name}'s information has been updated.`,
    });
  };

  const handleDeleteEmployee = (id: string) => {
    const employeeName = employees.find((e) => e.id === id)?.name;
    deleteEmployee(id);
    toast({
      title: "Employee Deleted",
      description: `${employeeName} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white mb-2 sm:mb-0">
            Employees Table
          </h1>
          <div className="flex flex-wrap gap-2">
            <Select onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
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
            setEditingEmployee(employee);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteEmployee}
        />
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEmployee(null);
          }}
          isOpen={isFormOpen}
        />
      </div>
    </div>
  );
}


