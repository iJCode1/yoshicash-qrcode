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
        <Button Text={"Descargar"}></Button>
      </Container>
    </>
  )
}

export default App
