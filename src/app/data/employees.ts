export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  address: string
  image: string
  department: string
  status: "active" | "inactive" | "terminated" | "on leave"
  position?: string
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1728742220/portrait-young-investor-banker-workplace-260nw-2364566447_pl4b4z.jpg",
    department: "Engineering",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Park Ave, Boston, MA 02108",
    image: "/placeholder.svg?height=400&width=400",
    department: "Marketing",
    status: "on leave",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Oak Rd, San Francisco, CA 94105",
    image: "/placeholder.svg?height=400&width=400",
    department: "Sales",
    status: "terminated",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Maple St, Seattle, WA 98101",
    image: "/placeholder.svg?height=400&width=400",
    department: "HR",
    status: "active",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 567-8901",
    address: "654 Elm St, Chicago, IL 60601",
    image: "/placeholder.svg?height=400&width=400",
    department: "Finance",
    status: "on leave",
  },
  {
    id: "6",
    name: "Jessica Martinez",
    email: "jessica.m@example.com",
    phone: "+1 (555) 678-9012",
    address: "987 Pine St, Austin, TX 73301",
    image: "/placeholder.svg?height=400&width=400",
    department: "Engineering",
    status: "terminated",
  },
  {
    id: "7",
    name: "Daniel Garcia",
    email: "daniel.g@example.com",
    phone: "+1 (555) 789-0123",
    address: "123 Birch St, Denver, CO 80201",
    image: "/placeholder.svg?height=400&width=400",
    department: "Marketing",
    status: "active",
  },
  {
    id: "8",
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    phone: "+1 (555) 890-1234",
    address: "456 Cedar St, Miami, FL 33101",
    image: "/placeholder.svg?height=400&width=400",
    department: "Sales",
    status: "on leave",
  },
  {
    id: "9",
    name: "Matthew Hernandez",
    email: "matthew.h@example.com",
    phone: "+1 (555) 901-2345",
    address: "789 Spruce St, Phoenix, AZ 85001",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1739988142/expressive-bearded-man-wearing-shirt_273609-5894_kp03dx.jpg",
    department: "HR",
    status: "terminated",
  },
  {
    id: "10",
    name: "Olivia Lopez",
    email: "olivia.l@example.com",
    phone: "+1 (555) 012-3456",
    address: "321 Willow St, Portland, OR 97201",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161859/positive-mindset-positive-life-portrait-happy-young-woman-home_590464-22422_pxuwht.avif",
    department: "Finance",
    status: "active",
  },
  {
    id: "11",
    name: "Linda White",
    email: "linda.w@example.com",
    phone: "+1 (555) 234-7890",
    address: "202 Maplewood Ln, Atlanta, GA 30301",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161761/portrait-young-indian-woman-happy-with-internship-human-resources-opportunity-mission-vision-company-values-goals-face-headshot-gen-z-pe_lsoixl.avif",
    department: "Operations",
    position: "Operations Manager",
    status: "active",
  },
  {
    id: "12",
    name: "James Anderson",
    email: "james.a@example.com",
    phone: "+1 (555) 345-8901",
    address: "333 Aspen Dr, Nashville, TN 37201",
    image:
      "https://img.freepik.com/free-photo/expressive-bearded-man-wearing-shirt_273609-5894.jpg",
    department: "Engineering",
    position: "Backend Developer",
    status: "active",
  },
] as const;

