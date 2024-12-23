import { Flowbite } from "flowbite-react";
import GlobalLayout from "./layout/GlobalLayout";
import DataPlayerTable from "./components/DataPlayerTable";
import PlayerRoom from "./components/PlayerRoom";
import LogicChart from "./components/LogicChart";

export default function App() {
  return (
    <>
      <Flowbite>
        <GlobalLayout>
          <div className="border-2 border-gray-100 bg-white rounded-2xl w-3/5 max-h-full overflow-y-auto">
            <div className="top-0 sticky flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
              <p className="font-semibold text-lg">Player Data</p>
            </div>

            <div className="px-4 py-1">
              <DataPlayerTable />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-4/5 max-h-full">
            <div className="border-2 border-gray-100 rounded-2xl h-2/5 overflow-y-auto">
              <div className="top-0 sticky flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
                <p className="font-semibold text-lg">Information</p>

                <div className="inline-flex gap-x-2.5">
                  <span className="inline-flex justify-center items-center gap-x-1 text-gray-600 text-sm">
                    Balance Team
                    <div className="bg-teal-600 mt-1 rounded-full w-2 h-2"></div>
                  </span>

                  <span className="inline-flex justify-center items-center gap-x-1 text-gray-600 text-sm">
                    Not Balance Team
                    <div className="bg-red-600 mt-1 rounded-full w-2 h-2"></div>
                  </span>
                </div>
              </div>

              <div className="gap-4 grid grid-cols-2 px-4 py-1">
                <PlayerRoom />
              </div>
            </div>
            <div className="border-2 border-gray-100 rounded-2xl h-3/5">
              <div className="top-0 sticky flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
                <p className="font-semibold text-lg">Graph Logic Calculation</p>
              </div>

              <div className="p-4">
                <LogicChart />
              </div>
            </div>
          </div>
        </GlobalLayout>
      </Flowbite>
    </>
  );
}
