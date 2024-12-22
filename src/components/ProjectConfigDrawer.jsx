"use client"

import { Drawer } from "flowbite-react";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

export default function ProjectConfigDrawer({ drawerIsOpen, close }) {
    return ( 
        <Drawer open={drawerIsOpen} onClose={close} position="right">
            <Drawer.Header 
                title="Project Config"
                titleIcon={HiOutlineCog8Tooth}
            />

            <Drawer.Items className="p-4">
                
            </Drawer.Items>
        </Drawer>
    )
}