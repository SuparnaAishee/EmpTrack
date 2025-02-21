import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { employees as initialEmployees } from "@/data/employees";
import type { Employee } from "@/data/employees";

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: get()?.employees || initialEmployees, // Use stored employees if available
      addEmployee: (employee) =>
        set((state) => ({
          employees: [
            ...state.employees,
            { ...employee, id: String(state.employees.length + 1) },
          ],
        })),
      updateEmployee: (id, updatedEmployee) =>
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
          ),
        })),
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        })),
    }),
    {
      name: "employee-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Ensuring localStorage is used
    }
  )
);
