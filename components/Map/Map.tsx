// src/components/Map.tsx
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Progress } from "@/components/ui/progress";
import Station from "@/types/station";
import makePercentage from "@/utils/makePercentage";

const iAmHereIcon = L.icon({
  iconUrl: "/mapIcon.svg",
  iconRetinaUrl: "/mapIcon.svg",
  iconSize: [32, 32],
  popupAnchor: [-1, -16],
});
const stationIcon = L.icon({
  iconUrl: "/mapIcon2.svg",
  iconRetinaUrl: "/mapIcon2.svg",
  shadowUrl: "/shadow.svg",
  shadowRetinaUrl: "/shadow.svg",
  shadowSize: [80, 80],
  shadowAnchor: [30, 45],
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-1, -58],
});

const MapUpdater = ({ mapCenter }: any) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(mapCenter, 16, {
      animate: true,
      duration: 5.0, // Duração da animação em segundos
    });
  }, [mapCenter, map]);

  return null;
};

interface mapProps {
  stations: Station[];
  width?: string;
  height?: string;
  center: any;
  userLocation: any;
  buttonText?: string;
  roundedTopCorners: boolean;
  roundedBottomCorners: boolean;
  setSelectedStation?: (station: any) => void;
  hidden?: boolean;
}

const Map = ({
  stations,
  width,
  height,
  center,
  userLocation,
  buttonText,
  roundedTopCorners,
  roundedBottomCorners,
  setSelectedStation,
  hidden,
}: mapProps) => {
  const [containerStyle, setContainerStyle] = useState<
    MapContainerProps["style"]
  >({
    width: width || "100%",
    height: height || "550px",
    borderTopLeftRadius: roundedTopCorners ? "12px" : "0",
    borderTopRightRadius: roundedTopCorners ? "12px" : "0",
    borderBottomLeftRadius: roundedBottomCorners ? "12px" : "0",
    borderBottomRightRadius: roundedBottomCorners ? "12px" : "0",
    margin: "auto",
  });

  useEffect(() => {
    setContainerStyle({
      width: width || "100%",
      height: height || "550px",
      borderTopLeftRadius: roundedTopCorners ? "12px" : "0",
      borderTopRightRadius: roundedTopCorners ? "12px" : "0",
      borderBottomLeftRadius: roundedBottomCorners ? "12px" : "0",
      borderBottomRightRadius: roundedBottomCorners ? "12px" : "0",
      margin: "auto",
    });
  }, [width, height]);

  return (
    <>
      <style>
        {`
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background-color: #222;
          border-radius: 10px;
          text-color: white;
          width: 500px;
          height:400px
        }
        `}
      </style>
      <MapContainer
        center={center}
        zoom={1}
        scrollWheelZoom={true}
        style={containerStyle}
      >
        <MapUpdater mapCenter={center} />

        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          accessToken="3649afdf-ff6e-40b4-8d98-ef0deb099145"
        />
        <Marker icon={iAmHereIcon} position={userLocation}>
          <Popup>Você está aqui!</Popup>
        </Marker>

        {/* map the stations prop */}

        {stations.map((station: Station, index: number) => {
          console.log(station.longitude);
          return (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={stationIcon}
            >
              <Popup>
                <h1 className=" text-3xl text-white  font-bold">
                  Volt Botafogo
                </h1>
                <div className="leading-[1px] text-white">
                  <p className="">{station.address || "Unnamed station"} </p>
                  <a
                    href={`https://www.google.com/maps/search/${station.latitude},+${station.longitude}?entry=tts`}
                  >
                    Ver no Google Maps
                  </a>

                  <p className="font-bold pt-4">Compatibility:</p>
                  <p className=""> BYD, EC20 and Volvo Plugs</p>

                  <p className="font-bold pt-4">Price per Kw:</p>
                  <p className="">{station.meanPrice} Voltz</p>

                  <p className="font-bold ">Velocidade de carregamento:</p>
                  <Progress
                    className="bg-slate-300 w-full"
                    value={
                      parseInt(
                        makePercentage(
                          station.batteryLevel,
                          station.maxCapacity
                        ).toFixed(0)
                      ) || 50
                    }
                  ></Progress>
                  <p className="">
                    {makePercentage(
                      station.batteryLevel,
                      station.maxCapacity
                    ).toFixed(0) || 50}
                    % (12 KW/h)
                  </p>
                  {buttonText && (
                    <button
                      onClick={() => {
                        if (setSelectedStation) {
                          setSelectedStation(station);
                        }
                      }}
                      className="bg-primary p-4 px-6 rounded-full text-[#1e1e1e] font-bold hover:bg-green-400 transition"
                    >
                      {buttonText}
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default Map;
