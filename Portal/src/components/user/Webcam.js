import React, { useCallback } from 'react'

import Webcam from "react-webcam";

// const WebcamComponent = () => <Webcam />;

export default function WebcamComponent(props) {

    const videoConstraints = {
        width: 800,
        height: 700,
        facingMode: "user"
      };
  return (
    <Webcam
      audio={false}
      height={720}
      screenshotFormat="image/jpeg"
      width={1280}
      videoConstraints={videoConstraints}
    >
      {({ getScreenshot }) => (
        <button
          onClick={async () => {
            const imageSrc = getScreenshot()
            console.log(imageSrc)
            const blob = await fetch(imageSrc).then((res) => res.blob());
            props.setImage(blob)
          }}
        >
          Capture photo
        </button>
      )}
    </Webcam>
  )
}



  
  