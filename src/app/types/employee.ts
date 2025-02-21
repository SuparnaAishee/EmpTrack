export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  address: string
  department: string
  role: string
  status: "active" | "on leave" | "terminated"
  image: string
  startDate: string
  performanceRating: number
  lastReviewDate: string
  projects: string[]
  checkInTime: string
  checkOutTime: string
}

