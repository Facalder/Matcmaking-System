"use client";

import {
  HiOutlinePlay,
  HiOutlinePlus,
  HiInformationCircle,
  HiOutlineExclamationTriangle,
  HiMiniArrowPath,
  HiOutlinePause,
} from "react-icons/hi2";
import { Alert, Button, Label, Sidebar, TextInput } from "flowbite-react";

import { useEffect, useState } from "react";
import { randomizePlayer } from "../../server/controller/PlayerController";


export default function CommandSidebar() {
  const [playersData, setPlayersData] = useState([])
  const [playersCountTextField, setPlayersCountTextField] = useState(0);

  return (
    <Sidebar className="border-r-2 border-r-gray-100 w-80">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Alert color="failure" icon={HiOutlineExclamationTriangle}>
            <span className="font-bold">DANGER AREA!</span> Semua perhitungan
            akan terhapus
          </Alert>

          <div className="space-y-2">
            <Button
              className="w-full font-bold uppercase"
              size="sm"
              color="failure"
            >
              Reset Input
              <HiMiniArrowPath className="ml-2 w-5 h-5" />
            </Button>
            <Button
              className="w-full font-bold uppercase"
              size="sm"
              color="failure"
            >
              Reset Graph
              <HiMiniArrowPath className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Alert color="info" icon={HiInformationCircle}>
            <span className="font-bold">INFORMASI!</span> Semua data player
            sudah teracak
          </Alert>

          <div className="space-y-4">
            <div>
              <div className="block mb-2">
                <Label htmlFor="playersCount" value="Masukan jumlah player" />
              </div>
              <TextInput
                id="playersCount"
                name="playersCount"
                placeholder="ex: 1000"
                type="number"
                value={playersCountTextField}
                onChange={(e) => setPlayersCountTextField(e.target.value)}
                helperText={<>Masukan jumlah player lebih dari 2</>}
              />
            </div>

            <div className="space-y-2">
              <Button
                color="light"
                className="w-full"
                size="sm"
              >
                Add Player
                <HiOutlinePlus className="ml-2 w-5 h-5" />
              </Button>
              <Button className="w-full" size="sm" color="success">
                Run Program
                <HiOutlinePlay className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <div className="space-y-4">
            <div>
              <div className="block mb-2">
                <Label htmlFor="" value="Program tereksekusi" />
              </div>
              <TextInput
                id=""
                placeholder="ex: 1000"
                helperText={
                  <>Berapa kali program akan tereksekusi secara otomatis</>
                }
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 w-full" size="sm" color="dark">
                Pause
                <HiOutlinePause className="ml-2 w-5 h-5" />
              </Button>
              <Button className="w-full" size="sm" color="dark">
                Automatic Run
                <HiOutlinePlay className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
