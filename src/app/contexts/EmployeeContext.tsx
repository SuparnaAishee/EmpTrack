
"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { employees as initialEmployees } from "../data/employees";
import type { Employee } from "../types/employee";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data from localStorage or use default data
  useEffect(() => {
    const initializeData = () => {
      try {
        const storedData = localStorage.getItem("employees");
        console.log("Stored data:", storedData); // Debug log
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Parsed data:", parsedData); // Debug log
          setEmployees(parsedData);
        } else {
          console.log("No stored data, using initial data"); // Debug log
          setEmployees(initialEmployees);
          localStorage.setItem("employees", JSON.stringify(initialEmployees));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing data:", error);
        setEmployees(initialEmployees);
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeData();
    }
  }, [isInitialized]);

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("employees", JSON.stringify(employees));
        console.log("Data saved to localStorage:", employees); // Debug log
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    }
  }, [employees, isInitialized]);

  const addEmployee = useCallback((employee: Omit<Employee, "id">) => {
    const newEmployee = { ...employee, id: Date.now().toString() };
    setEmployees((prev) => {
      const updatedEmployees = [...prev, newEmployee];
      console.log("Employee added:", newEmployee); // Debug log
      return updatedEmployees;
    });
  }, []);

  const updateEmployee = useCallback(
    (id: string, updatedEmployee: Partial<Employee>) => {
      setEmployees((prev) => {
        const updatedEmployees = prev.map((emp) =>
          emp.id === id ? { ...emp, ...updatedEmployee } : emp
        );
        console.log("Employee updated:", id, updatedEmployee); // Debug log
        return updatedEmployees;
      });
    },
    []
  );

  const deleteEmployee = useCallback((id: string) => {
    setEmployees((prev) => {
      const updatedEmployees = prev.filter((emp) => emp.id !== id);
      console.log("Employee deleted:", id); // Debug log
      return updatedEmployees;
    });
  }, []);

  // Don't render children until data is initialized
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
}



