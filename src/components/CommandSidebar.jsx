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
import { useState } from "react";

export default function CommandSidebar({
  handleFetchAllPlayers,
  handleResetFetchAllPlayers,
  handleRunProgramMatchmakingIterative,
  handleRunProgramMatchmakingRecursive,
  playersData,
}) {
  const [playersCount, setPlayersCount] = useState("");
  const [automaticRun, setAutomaticRun] = useState("");

  const submitToFetchPlayer = () => {
    if (playersCount) {
      handleFetchAllPlayers(playersCount);
      setPlayersCount("");
    } else {
      alert("Tolong masukan jumlah pemain!");
    }
  };

  const submitToCreateRoomByRecursive = () => {
    if (playersData) {
      handleRunProgramMatchmakingRecursive(playersData)
    }else {
      return;
    }
  }

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
              onClick={handleResetFetchAllPlayers}
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
                value={playersCount}
                onChange={(e) => setPlayersCount(e.target.value)}
                helperText={<>Madsukan jumlah player lebih dari 2</>}
              />
            </div>

            <div className="space-y-2">
              <Button
                color="light"
                className="w-full"
                size="sm"
                onClick={submitToFetchPlayer}
              >
                Add Player
                <HiOutlinePlus className="ml-2 w-5 h-5" />
              </Button>
              <Button
                className="w-full"
                size="sm"
                color="success"
                onClick={handleRunProgramMatchmakingIterative}
              >
                Create Room by Iterative
                <HiOutlinePlay className="ml-2 w-5 h-5" />
              </Button>

              <Button
                className="w-full"
                size="sm"
                color="success"
                onClick={submitToCreateRoomByRecursive}
              >
                Create Room by Recursive
                <HiOutlinePlay className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
