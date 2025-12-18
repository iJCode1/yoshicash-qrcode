import React from 'react'
import QRCode from "react-qr-code";

const Qr = ({tick}) => {
  return (
    <>
      <QRCode value={tick} id='qr-canvas'/>
    </>
  )
}

export default Qr;