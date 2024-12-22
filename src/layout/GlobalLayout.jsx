"use client"

import React from 'react';
import Navbar from '../components/DashboardNavbar';
import CommandDrawer from '../components/CommandSidebar';
import DashboardNavbar from '../components/DashboardNavbar';

export default function GlobalLayout({ children }) {
  return (
    <>
      <DashboardNavbar/>
      <div className="flex h-screen">
        <CommandDrawer/>
        <div className="flex flex-col flex-1 dark:bg-gray-800">
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
