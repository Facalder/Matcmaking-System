"use client";

import { useState } from "react";
import ProjectConfigDrawer from "../components/ProjectConfigDrawer";
import DashboardNavbar from "../components/DashboardNavbar";
import { Button, Tooltip } from "flowbite-react";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

export default function GlobalLayout({ children }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerClose = () => setDrawerIsOpen(false);

  return (
    /*<>
      <DashboardNavbar />
      <div className="flex h-[calc(100vh-86px)]">
        <CommandSidebar />
        <div className="flex flex-col flex-1">
          <main className="flex gap-4 p-4 h-full">
            {children}

            <div className="right-4 bottom-4 fixed">
              <Tooltip content="Project Config">
                <Button pill size="sm" onClick={() => setDrawerIsOpen(true)}>
                  <HiOutlineCog8Tooth className="w-8 h-8" />
                </Button>
              </Tooltip>
            </div>
          </main>
        </div>
      </div>
      <ProjectConfigDrawer
        drawerIsOpen={drawerIsOpen}
        close={handleDrawerClose}
      />
    </>*/
    <>
      <div className="flex flex-col flex-1">
        <main className="flex gap-4 p-4 h-full">
          {children}

          <div className="right-4 bottom-4 fixed">
            <Tooltip content="Project Config">
              <Button pill size="sm" onClick={() => setDrawerIsOpen(true)}>
                <HiOutlineCog8Tooth className="w-8 h-8" />
              </Button>
            </Tooltip>
          </div>
        </main>
      </div>
    </>
  );
}
