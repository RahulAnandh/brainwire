import React from "react";
import "./styles.css";

import GoogleMapReact from "google-map-react";
import Marker from "./marker";

// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

const points = [
  { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
  { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
  { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 },
];

export default function MapView(props) {
  return (
    <div className="App">
      ;
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "",
          language: "en",
          region: "US",
        }}
        defaultCenter={{ lat: 51.506, lng: -0.169 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
        {console.log("1---6", props.user_list)}
        {props.user_list.map((obj) => {
          return (
            <Marker
              key={obj.id}
              lat={obj.lat}
              lng={obj.lng}
              text={obj.id}
              tooltip={obj.id}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
