import styled from "styled-components";
import Qr from "./Qr";
import QRCodeTemplate from '../assets/qr-code-template.png';

const TicketWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
`;

const TicketCanvas = styled.div`
  width: 300px;
  height: 555px;
  position: relative;
  background-image: url(${QRCodeTemplate});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;
`;

const QRPositioner = styled.div`
  position: absolute;
  top: 145px; 
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;

  canvas, img {
    width: 200px !important;
    height: 200px !important;
    border-radius: 20px;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  width: 100%;
  top: 395px;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  pointer-events: none;

  .venue-name {
    font-size: 13px;
    font-weight: bold;
    color: #000;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .amount-value {
    position: absolute;
    top: 36px;
    left: ${props => props.$xPos}px;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    margin: 0;
  }
`;

const Preview = ({ tick, venue, amount, format }) => {
  const dynamicX = 270;

  if (!format) {
    return (
      <TicketWrapper>
        <Qr tick={tick} />
      </TicketWrapper>
    );
  }

  return (
    <TicketWrapper>
      <TicketCanvas>
        {tick && (
          <QRPositioner>
            <Qr tick={tick} />
          </QRPositioner>
        )}

        {format && (
          <TextOverlay $xPos={dynamicX}>
            <p className="venue-name">{venue}</p>
            <p className="amount-value">${amount}</p>
          </TextOverlay>
        )}
      </TicketCanvas>
    </TicketWrapper>
  );
};

export default Preview;