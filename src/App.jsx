import {useRef, useState } from "react"
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Button from "./components/Button";
import Vector from "./components/Vector";
import WaitingTextVector from './assets/waiting-text-vector.svg';
import ToggleButton from "./components/ToggleButton";
import PreviewQr from "./components/PreviewQr";
import { toPng } from "html-to-image";
import iconDownload from './assets/icons/icon-download.svg';
import iconCopy from './assets/icons/icon-copy.svg';
import { Toaster, toast } from 'sonner';

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

    const generateDownload = async () =>{
      let url;

      if(!format){
        const qrCanvas = document.querySelector("#qr-canvas");
        if(!qrCanvas) throw new Error("No se encontro el QR");
        url = qrCanvas.toDataURL();
      }else{
        url = await toPng(previewRef.current, {
          cacheBust: true,
          pixelRatio: 3,
          backgroundColor: "#FFFFFF"
        });
      }

      const link = document.createElement('a');
      link.download = `qr-${tick}.png`;
      link.href = url;
      link.click();

      return {name: tick};
    }

    toast.promise(generateDownload(), {
      loading: "Generando QR de descarga...",
      success: (data) => {
        return `QR ${data.name} descargado!`;
      },
      error: 'No se pudo descargar el QR',
      duration: 3000,
    })
  }

  const copyCode = async () => {
    if (!previewRef.current) return;

    const promise = async () => {
      let blob;
      if(!format){
        const qrCanvas = document.querySelector("#qr-canvas");
        if(qrCanvas){
          blob = await new Promise((resolve) => qrCanvas.toBlob(resolve, 'image/png'));
        }
      }else{
        const dataUrl = await toPng(previewRef.current, {cacheBust: true, pixelRatio: 3});
        blob = await (await fetch(dataUrl)).blob();
      }

      if(blob){
        const image = new ClipboardItem({"image/png": blob});
        await navigator.clipboard.write([image]);
        return {name: tick};
      }
    }
    toast.promise(promise, {
      loading: 'Generando imagen...',
      success: (data) => `QR ${data.name} copiado al portapapeles!`,
      error: 'Error al copiar el QR',
    });
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={3000} pauseWhenPageIsHidden={false} />
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
        
        <section className="actions">
          <Button Accion={downloadCode} Text={"Descargar"} isDisabled={disabledButton} icon={iconDownload} iconText="Icono de Descarga" type="download"></Button>
          <Button Accion={copyCode} isDisabled={disabledButton} Text="Copiar" icon={iconCopy} iconText="Icono de copiar al portapapeles" type="copy"></Button>
        </section>
      </Container>
    </>
  )
}

export default App
