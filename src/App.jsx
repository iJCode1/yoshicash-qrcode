import {useRef, useState } from "react"
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Button from "./components/Button";
import Vector from "./components/Vector";
import WaitingTextVector from './assets/waiting-text-vector.svg';
import ToggleButton from "./components/ToggleButton";
import PreviewQr from "./components/PreviewQr";
import { toPng } from "html-to-image";

function App() {
  const [tick, setTick] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [format, setFormat] = useState(false);
  const [venue, setVenue] = useState("");
  const [amount, setAmount] = useState("");
  const previewRef = useRef(null); 

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
  
  const downloadCode = async () => {
    if(!previewRef.current) return;

    if(!format){
      const qrCanvas = document.querySelector("#qr-canvas");
      if(qrCanvas){
        const link = document.createElement('a');
        link.download = `qr-${tick}.png`;
        link.href = qrCanvas.toDataURL();
        link.click();
      }
      return;
    }

    try{
      
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#FFFFFF"
      });

      const link = document.createElement("a");
      link.download = `qr-${tick}.png`;
      link.href = dataUrl;
      link.click();
    }catch(err){
      console.error("Error al generar la imagen: ", err)
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <h2>Digitaliza tu código QR</h2>
        <div>
          <label htmlFor="tick">Ingresa el código (tick) <span>*</span></label>
          <input name="tick" placeholder="tick-e0127..." value={tick} onChange={setTickValue} required></input>
        </div>
        <section>
          <label htmlFor="format">¿QR con formato? <span>*</span></label>
          <ToggleButton withFormat={format} setFormatValue={setFormatValue}></ToggleButton>
        </section>
        { format && ( 
          <>
            <div>
              <label className="label-wrong" htmlFor="venue">Ingresa el recinto <span>*</span></label>
              <input name="venue" placeholder="Navidalia ..." value={venue} onChange={setVenueValue} required></input>
            </div>
            <div>
              <label className="label-wrong" htmlFor="amount">Ingresa el monto <span>*</span></label>
              <input type="number" name="amount" placeholder="500" value={amount} onChange={setAmountValue} required></input>
            </div>
          </>
          )}
        {tick ? (
          <PreviewQr 
            ref={previewRef}
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
