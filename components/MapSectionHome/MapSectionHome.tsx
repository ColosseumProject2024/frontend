import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { KeyRound } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

export default function MapSectionHome() {
  8;

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="px-10 mb-20">
      <Card className=" flex-wrap max-w-screen-2xl jusri p-4 flex shadow-xl shadow-[#162916] mx-auto">
        <div className="w-96 mx-auto  p-4 content-around flex flex-wrap flex-row text-center min-w-16">
          <h2 className="font-bold text-5xl">Find a station near you</h2>
          <p className="py-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor, Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor{" "}
          </p>
          <Button className="mx-auto">
            Navigate to nearest station
          </Button>
        </div>
        <div className="w-full rounded-2xl mx-auto max-w-[770px]">
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
            roundedBottomCorners
            roundedTopCorners
            userLocation={[-23.572448, -46.706937]}
          />
        </div>
    </Card>
      </div>
  );
}
