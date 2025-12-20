import {useState } from "react"
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Button from "./components/Button";
import Vector from "./components/Vector";
import WaitingTextVector from './assets/waiting-text-vector.svg';
import QRCodeTemplate from './assets/qr-code-template.png';
import ToggleButton from "./components/ToggleButton";
import PreviewQr from "./components/PreviewQr";

function App() {
  const [tick, setTick] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [format, setFormat] = useState(false);
  const [venue, setVenue] = useState("");
  const [amount, setAmount] = useState("");
  const setTickValue = (e) => {
    const val = e.target.value.trim();

    if(val.length > 0){
      const firstLetter = val.charAt(0).toLowerCase()+val.slice(1);
      setTick(firstLetter);
      setDisabledButton(false);
    }else{
      setTick("");
      setDisabledButton(true);
    }
  }

  const setFormatValue = () => {    
    setFormat(!format);
  }

  const setVenueValue = (e) => {
    setVenue(e.target.value)
  }

  const setAmountValue = (e) => {
    setAmount(e.target.value)
  }

  const downloadCode = () => {
    const qrCanvas = document.getElementById("qr-canvas");
    if (!qrCanvas) return;
    
    if (!format) {
      const pngUrl = qrCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${tick || 'generico'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      return;
    }

    const templateImg = new Image();
    templateImg.src = QRCodeTemplate;
    templateImg.crossOrigin = "anonymous";
  
    templateImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      canvas.width = 300;
      canvas.height = 555;

      ctx.drawImage(templateImg, 0, 0, 300, 555);

      const qrSize = 200; 
      const qrX = (canvas.width / 2) - (qrSize / 2);
      const qrY = 145; 
      const borderRadius = 20;
      ctx.save();
      
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(qrX, qrY, qrSize, qrSize, borderRadius);
        ctx.clip();
      } else {
        ctx.beginPath();
        ctx.moveTo(qrX + borderRadius, qrY);
        ctx.arcTo(qrX + qrSize, qrY, qrX + qrSize, qrY + qrSize, borderRadius);
        ctx.arcTo(qrX + qrSize, qrY + qrSize, qrX, qrY + qrSize, borderRadius);
        ctx.arcTo(qrX, qrY + qrSize, qrX, qrY, borderRadius);
        ctx.arcTo(qrX, qrY, qrX + qrSize, qrY, borderRadius);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
      ctx.restore()

      if (format) {
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.font = "bold 13px Raleway";
        ctx.fillText(venue.toUpperCase(), canvas.width / 2, 405);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px Raleway";
        const dynamicX = Number(amount) < 100 ? 190 : 205;
        ctx.fillText(`$${amount}`, dynamicX, 448);
      }

      const finalImage = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qr-${tick}.png`;
      link.href = finalImage;
      link.click();
  };
};
  
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <h2>Genera tú código QR</h2>
        <div>
          <label htmlFor="tick">Ingresa el código <span>*</span></label>
          <input name="tick" placeholder="tick-e0127..." value={tick} onChange={setTickValue} required></input>
        </div>
        <section>
          <label htmlFor="format">¿QR con formato? <span>*</span></label>
          <ToggleButton withFormat={format} setFormatValue={setFormatValue}></ToggleButton>
        </section>
        { format && ( 
          <>
            <div>
              <label htmlFor="venue">Ingresa el recinto <span>*</span></label>
              <input name="venue" placeholder="Navidalia ..." value={venue} onChange={setVenueValue} required></input>
            </div>
            <div>
              <label htmlFor="amount">Ingresa el monto <span>*</span></label>
              <input type="number" name="amount" placeholder="500" value={amount} onChange={setAmountValue} required></input>
            </div>
          </>
          )}
        {tick ? (
          <PreviewQr 
            tick={tick}
            format={format} 
            venue={venue}
            amount={amount}
          />
        ) : (
          <Vector img={WaitingTextVector} />
        )}
        
        <Button Accion={downloadCode} Text={"Descargar"} isDisabled={disabledButton}></Button>
      </Container>
    </>
  )
}

export default App
