import { useRef, useState, useEffect } from "react"
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Button from "./components/Button";
import Vector from "./components/Vector";
import ToggleButton from "./components/ToggleButton";
import PreviewQr from "./components/PreviewQr";
import { toPng } from "html-to-image";
import { Html5Qrcode } from "html5-qrcode";
import { Toaster, toast } from 'sonner';
import VENUES from "./venues";
import styled from "styled-components";
import Icon from "./components/Icon";
import './styles.css';
import WaitingTextVector from './assets/waiting-text-vector.svg';
import iconDownload from './assets/icons/icon-download.svg';
import iconDownloadWhite from './assets/icons/icon-download-white.svg';
import iconCopy from './assets/icons/icon-copy.svg';
import iconQR from './assets/icons/qr-icon.svg'
import iconLocation from './assets/icons/icon-location.svg';
import iconMoney from './assets/icons/icon-money.svg';
import iconTicket from './assets/icons/icon-ticket.svg';
import iconCamera from './assets/icons/icon-camera.svg';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-block-end: 2rem;
  margin-block-start: 1rem;

  img{
    display: block;
  }
  h2, p{
    margin: 0;
  }
`;

function App() {
  const [tick, setTick] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [format, setFormat] = useState(false);
  const [venue, setVenue] = useState("");
  const [amount, setAmount] = useState("");
  const previewRef = useRef(null); 
  const scannerRef = useRef(null);
  const isClosingScannerRef = useRef(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);

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
    setVenue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
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

  const qrScanner = async () => {
    isClosingScannerRef.current = false;
    setIsScanning(true);
  };

  const closeScanner = async () => {
    isClosingScannerRef.current = true;

    try {
      const video = document.querySelector("#qr-reader video");

      if (video?.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
      }

      if (!scannerRef.current && isStartingCamera) {
        return;
      }

      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
        } catch (e) {
          console.error(e);
        }

        try {
          await scannerRef.current.clear();
        } catch (e) {
          console.error(e);
        }

        scannerRef.current = null;
      }
    } finally {
      if (!isStartingCamera) {
        setIsScanning(false);
      }

      setIsStartingCamera(false);
    }
  };

  useEffect(() => {
    if (!isScanning) return;

    const startScanner = async () => {
      try {
        setIsStartingCamera(true);

        await new Promise((resolve) => setTimeout(resolve, 150));

        if (isClosingScannerRef.current) return;

        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            if (isClosingScannerRef.current) return;

            const value = decodedText.trim();

            setTick(value);
            setDisabledButton(false);

            await closeScanner();

            toast.success("Código QR escaneado exitosamente");
          },
          () => {}
        );

        if (isClosingScannerRef.current) {
          setIsStartingCamera(false);

          try {
            await scanner.stop();
          } catch (e) {console.error(e)}

          try {
            await scanner.clear();
          } catch (e) {console.error(e)}

          scannerRef.current = null;
          setIsScanning(false);
          return;
        }

        setIsStartingCamera(false);
      } catch (e) {
        if (!isClosingScannerRef.current) {
          console.log("Error cámara:", e);
          toast.error("No se puede abrir la cámara");
        }

        await closeScanner();
      }
    };

    startScanner();
  }, [isScanning]);

  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={3000} pauseWhenPageIsHidden={false} />
      <Navbar></Navbar>
      <Container>
        <Header>
          <img src={iconQR} alt="Icono de QR" width="80"/>
          <h2>Digitaliza Tu Código QR</h2>
          <p>Ingresa el código o escanea el QR para digitalizar tu ticket</p>
        </Header>
        <div>
          <label htmlFor="tick">Ingresa el código (tick) <span>*</span></label>
          <div className="input-container">
            <span>
              <Icon icon={iconTicket} iconText="Icono de Ticket" ancho="24px" alto="24px" />
            </span>
            <input className="input-tick" id="tick" name="tick" placeholder="tick-e0127..." value={tick} onChange={setTickValue} required />
            <i className="bar-tick"></i>
            <button type="button" onClick={qrScanner} className="scanner-code">
              <span>
                <Icon icon={iconCamera} iconText="Icono de Camara" ancho="26px" alto="26px" />
              </span>
              Escanear
            </button>
          </div>
        </div>
        <section>
          <label htmlFor="format">¿QR con formato? <span>*</span></label>
          <ToggleButton withFormat={format} setFormatValue={setFormatValue}></ToggleButton>
        </section>
        { format && ( 
          <>
            <div>
              <label className="label-wrong" htmlFor="venue">Ingresa el recinto <span>*</span></label>
              {/* <input name="venue" placeholder="Navidalia ..." value={venue} onChange={setVenueValue} required></input> */}
              <div className="input-container">
                <span>
                  <Icon icon={iconLocation} iconText="Icono de Evento" ancho="22px" alto="22px" />
                </span>
                <input
                  id="venue"
                  name="venue"
                  list="venues-list"
                  placeholder="Navidalia ..."
                  value={venue}
                  onChange={setVenueValue}
                  required
                  autoComplete="off"
                />
              </div>

              <datalist id="venues-list">
                {VENUES.map((v) => (
                  <option key={v.value} value={v.label} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="label-wrong" htmlFor="amount">Ingresa el monto <span>*</span></label>
              <div className="input-container">
                <span>
                  <Icon icon={iconMoney} iconText="Icono de Cantidad" ancho="24px" alto="24px" />
                </span>
                <input id="amount" type="number" name="amount" placeholder="500" value={amount} onChange={setAmountValue} onWheel={(e) => e.target.blur()} required></input>
              </div>
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
          <Button Accion={downloadCode} Text={"Descargar"} isDisabled={disabledButton} icon={disabledButton ? iconDownloadWhite : iconDownload} iconText="Icono de Descarga" type="download"></Button>
          <Button Accion={copyCode} isDisabled={disabledButton} Text="Copiar" icon={iconCopy} iconText="Icono de copiar al portapapeles" type="copy"></Button>
        </section>
      </Container>
      {isScanning && (
        <div className="scanner-modal">
          <div className="scanner-box">
            <button
              type="button"
              className="scanner-close"
              onClick={closeScanner}
            >
              ×
            </button>

            {isStartingCamera && (
              <p className="scanner-loading">Abriendo cámara...</p>
            )}

            <h3>Escanea tu código QR</h3>

            <div id="qr-reader"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
