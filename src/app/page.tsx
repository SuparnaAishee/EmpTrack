"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import EmployeeCard from "../components/employee-card";
import EmployeeForm from "../components/employee-form";
import EmployeeStats from "../components/employee-stats";
import { Button } from "../components/ui/button";
import type { Employee } from "../types/employee";
import Navbar from "../components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEmployees } from "../contexts/EmployeeContext";
import { useToast } from "../components/ui/use-toast";

export default function Home() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } =
    useEmployees();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Current employees:", employees); // Debug log
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || employee.status === statusFilter) &&
        (departmentFilter === "all" ||
          employee.department === departmentFilter) &&
        (roleFilter === "all" || employee.role === roleFilter)
    );
    setFilteredEmployees(filtered);
  }, [employees, searchTerm, statusFilter, departmentFilter, roleFilter]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setRoleFilter("all");
  };

  const departments = [...new Set(employees.map((e) => e.department))];
  const roles = [...new Set(employees.map((e) => e.role))];

  const categorizedEmployees = {
    active: filteredEmployees.filter((e) => e.status === "active"),
    onLeave: filteredEmployees.filter((e) => e.status === "on leave"),
    terminated: filteredEmployees.filter((e) => e.status === "terminated"),
  };

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <div className="container mx-auto px-4 py-8 bg-blue-100 dark:bg-gray-900">
        <EmployeeStats employees={employees} />
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white mb-2 sm:mb-0">
            Employees
          </h1>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
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
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="bg-blue-400 dark:bg-blue-500"
            >
              Clear Filters
            </Button>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-sky-500 dark:bg-blue-300"
            >
              <Plus className="mr-2 h-4 w-4 " />
              Add Employee
            </Button>
          </div>
        </div>
        {Object.entries(categorizedEmployees).map(([category, employees]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {category} Employees
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onEdit={() => {
                    setEditingEmployee(employee);
                    setIsFormOpen(true);
                  }}
                  onDelete={() => handleDeleteEmployee(employee.id)}
                />
              ))}
            </div>
          </div>
        ))}
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


