import { Button, DarkThemeToggle, Flowbite } from "flowbite-react";
import GlobalLayout from "./layout/GlobalLayout";

export default function App() {
  return (
    <>
      <Flowbite>
        <GlobalLayout>
          <div className="w-2/5 max-h-full overflow-y-auto">
            Buat data
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
            <div className="bg-red-400 h-80">sd</div>
          </div>
          <div className="flex flex-col max-h-full">
            <div className="h-2/5">hasil pembuatan tim</div>
            <div>chart</div>
          </div>
        </GlobalLayout>
      </Flowbite>
    </>
  );
}
