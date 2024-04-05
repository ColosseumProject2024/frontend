import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
import { useLocation } from "../../contexts/LocationContext";
import queryAllStations from "../../utils/queryAllStations";

interface MapSectionBuypageProps {
  roundedTopCorners: boolean;
  roundedBottomCorners: boolean;
  stations: any;
  setStations: any;
  width: string;
  setSelectedStation: any;
}

export const MapSectionBuypage = ({
  roundedTopCorners,
  roundedBottomCorners,
  stations,
  setStations,
  width,
  setSelectedStation,
}: MapSectionBuypageProps) => {
  const { location } = useLocation();

  useEffect(() => {
    queryAllStations().then(setStations);
  }, [setStations]);

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    []
  );

  if (!location || location.some(coord => coord === null)) {
    return <p>Location data is not available.</p>;
  }

  return (
    <Map
      buttonText="Select"
      userLocation={location}
      roundedTopCorners={roundedTopCorners}
      roundedBottomCorners={roundedBottomCorners}
      stations={stations}
      center={location}
      width={width}
      setSelectedStation={setSelectedStation}
      height="300px"
    />
  );
};
