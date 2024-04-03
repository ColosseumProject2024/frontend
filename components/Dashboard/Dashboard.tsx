import "../../app/globals.css";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import energy from "./assets/energy.svg";
import chargingstation from "./assets/chargingstation.svg";

const Dashboard = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="m-3  bg-zinc-800 rounded-[25px]">
        <div className="m-6 grid grid-cols-1 grid-rows-3 gap-4">
          <div className="flex items-center">
            <Image
              src={energy}
              alt="Dashboard icon"
              width={32}
              height={32}
              className="text-zinc-400"
            />
            <h1 className="ml-4 font-bold text-[30px] text-zinc-400">
              Nearest Charging Point
            </h1>
          </div>
          <div>
            <h1 className="text-lg  font-medium">Avenida rebouças, 3004</h1>
            <h1 className="text-lg">Price 0,88/kWh</h1>
          </div>
          <div>3</div>
        </div>
      </div>
      <div className="m-3  bg-zinc-800 rounded-[25px]">
        <div className="m-6 grid grid-cols-1 grid-rows-3 gap-4">
          <div className="flex items-center">
            <Image
              src={chargingstation}
              alt="charging station icon"
              width={32}
              height={32}
              className="text-zinc-400"
            />
            <h1 className="ml-4 font-bold text-[30px] text-zinc-400">
            Average energy price
            </h1>
          </div>
          {/* <div>
            <h1 className="text-lg  font-medium">Avenida rebouças, 3004</h1>
            <h1 className="text-lg">Price 0,88/kWh</h1>
          </div>
          <div>3</div> */}
        </div>
      </div>
      <div className="m-3 col-span-2">
        <Map
          center={[-23.572448, -46.706937]}
          stations={[
            {
              address: "Rua dos Pinheiros, 220",
              batteryLevel: 50,
              id: 1,
              latitude: -23.572448,
              longitude: -46.06937,
              maxCapacity: 100,
              meanPrice: 2.5,
              availablePlugs: "asdgadf",
              maxVoltage: 220,
            },
          ]}
          height="430px"
          roundedBottomCorners
          roundedTopCorners
          userLocation={[-23.572448, -46.706937]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
