"use client"

import { Drawer, Button, Label, TextInput } from "flowbite-react";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

export default function ProjectConfigDrawer({ drawerIsOpen, close }) {
    return (
      <Drawer
        open={drawerIsOpen}
        onClose={close}
        position="right"
        className="space-y-4 w-80"
      >
        <Drawer.Header title="Project Config" titleIcon={HiOutlineCog8Tooth} />

        <Drawer.Items>
          <h2 className="mt-4 mb-2 font-semibold">Match Making Rating Point</h2>
          <div className="flex gap-2">
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Min MMR Point" />
              </div>
              <TextInput id="" placeholder="ex: 1000" type="number" />
            </div>
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Maks MMR Point" />
              </div>
              <TextInput id="" placeholder="ex: 1000" type="number" />
            </div>
          </div>
        </Drawer.Items>

        <Drawer.Items>
          <h2 className="mt-4 mb-2 font-semibold">Available MMR Gap</h2>
          <div>
            <div className="block mb-2">
              <Label htmlFor="" value="MMR Gap" />
            </div>
            <TextInput id="" placeholder="ex: 1000" type="number" />
          </div>
        </Drawer.Items>

        <Drawer.Items>
          <h2 className="mb-2 font-semibold">Rank Point</h2>
          <div className="gap-x-2 gap-y-3 grid grid-cols-2">
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Grand Master Point" />
              </div>
              <TextInput id="" placeholder="ex: 1000" type="number" />
            </div>
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Epic Point" />
              </div>
              <TextInput id="" placeholder="ex: 1000" type="number" />
            </div>
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Legend Point" />
              </div>
              <TextInput id="" placeholder="ex: 1000" type="number" />
            </div>
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Mythic Point" />
              </div>
              <TextInput id="" placeholder="ex: 1000" type="number" />
            </div>
          </div>
        </Drawer.Items>
        <Drawer.Items>
          <Button size="sm" className="w-full" onClick={close}>
            Update Config
          </Button>
        </Drawer.Items>
      </Drawer>
    );
}