"use client"

import { Navbar } from "flowbite-react";

export default function DashboardNavbar() {
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
        </Navbar>
    </>
  );
}