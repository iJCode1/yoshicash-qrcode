import { QRCodeCanvas } from 'qrcode.react'
import styled from 'styled-components'

const StyledQR = styled(QRCodeCanvas)`
`

const Qr = ({tick}) => {
  return (
    <>
      <StyledQR 
        value={tick || " "}
        id='qr-canvas'
        marginSize={2}
        size={200}
      />
    </>
  )
}

export default Qr;