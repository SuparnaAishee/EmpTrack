"use client";
import { useParams } from "next/navigation";
import { useEmployees } from "@/contexts/EmployeeContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function EmployeeProfile() {
  const { id } = useParams();
  const { employees } = useEmployees();

  if (!employees) {
    return <div>Loading...</div>;
  }

  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text("Employee Profile", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${employee.name}`, 20, 40);
    doc.text(`Email: ${employee.email}`, 20, 50);
    doc.text(`Phone: ${employee.phone}`, 20, 60);
    doc.text(`Address: ${employee.address}`, 20, 70);
    doc.text(`Department: ${employee.department}`, 20, 80);
    doc.text(`Role: ${employee.role}`, 20, 90);
    doc.text(`Status: ${employee.status}`, 20, 100);
    doc.text(`Start Date: ${employee.startDate}`, 20, 110);
    doc.text(`Performance Rating: ${employee.performanceRating}/5`, 20, 120);
    doc.text(`Last Review Date: ${employee.lastReviewDate}`, 20, 130);

    // Projects
    doc.text("Projects:", 20, 150);
    employee.projects.forEach((project, index) => {
      doc.text(`- ${project}`, 30, 160 + index * 10);
    });

    // Attendance
    doc.text(`Check-in Time: ${employee.checkInTime}`, 20, 200);
    doc.text(`Check-out Time: ${employee.checkOutTime}`, 20, 210);

    // Save the PDF
    doc.save(`${employee.name}_profile.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Image
            src={employee.image || "/default-avatar.png"}
            alt={employee.name}
            width={128}
            height={128}
            className="rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              {employee.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {employee.role}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Personal Information
            </h2>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p>
              <strong>Address:</strong> {employee.address}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Work Information
            </h2>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Status:</strong> {employee.status}
            </p>
            <p>
              <strong>Start Date:</strong> {employee.startDate}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Performance
          </h2>
          <p>
            <strong>Rating:</strong> {employee.performanceRating}/5
          </p>
          <p>
            <strong>Last Review Date:</strong> {employee.lastReviewDate}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Projects
          </h2>
          <ul className="list-disc pl-5">
            {employee.projects &&
              employee.projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Attendance
          </h2>
          <p>
            <strong>Check-in Time:</strong> {employee.checkInTime}
          </p>
          <p>
            <strong>Check-out Time:</strong> {employee.checkOutTime}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="mr-2">
            Edit Profile
          </Button>
          <Button onClick={downloadPDF}>Download PDF</Button>
        </div>
      </div>
    </div>
  );
}
