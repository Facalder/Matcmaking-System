"use client"
import { useState } from "react";
import { Button, Navbar } from "flowbite-react";
import { HiBars3BottomRight } from "react-icons/hi2";
import ProjectConfigDrawer from "./ProjectConfigDrawer";

export default function DashboardNavbar() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerClose = () => setDrawerIsOpen(false)

  return (
    <>
      <div className="flex justify-center bg-gray-800 py-1.5 w-full">
        <span className="font-semibold text-sm text-white">Built with love by Fa Ainama Caldera & Timotius Darrel</span>
      </div>
      <Navbar fluid className="top-0 sticky py-3 border-b-2 border-b-gray-100">
        <Navbar.Brand>
          <span className="font-bold text-teal-600 text-xl whitespace-nowrap">
            Dashboard Matchmaking
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button size="sm" onClick={() => setDrawerIsOpen(true)}>
            Project Config
            <HiBars3BottomRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Navbar>
      <ProjectConfigDrawer
        drawerIsOpen={drawerIsOpen}
        close={handleDrawerClose}
      />
    </>
  );
}