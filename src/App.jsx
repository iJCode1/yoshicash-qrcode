import { useState } from "react"
import Qr from "./components/Qr"
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Button from "./components/Button";

function App() {
  const [tick, setTick] = useState("");
  const setTickValue = (e) => {
    setTick(e.target.value)
  }

  const downloadCode = () => {
    const canvas = document.getElementById("qr-canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${tick || 'generico'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("No se encontró el elemento canvas.");
    }
  }
  
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <h2>Genera tú código QR</h2>
        <div>
          <label htmlFor="tick">Ingresa el código <span>*</span></label>
          <input name="tick" placeholder="tick-e0127..." value={tick} onChange={setTickValue} required></input>
        </div>
        <Qr tick={tick}></Qr>
        <Button Accion={downloadCode} Text={"Descargar"}></Button>
      </Container>
    </>
  )
}

export default App
