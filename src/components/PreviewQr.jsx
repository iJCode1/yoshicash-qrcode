import styled from "styled-components";
import logoYoshiCash from '../assets/logo-yoshicash.png';
import Qr from "./Qr";
import { forwardRef, useImperativeHandle, useRef } from "react";

const QrWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
`

const StyledPreviewQrWrapper = styled.div`
  max-inline-size: 18.75rem!important;
  margin-block-start: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 1);
  margin: 0 auto;
`

const StyledPreviewQr = styled.section`
  background-color: white;
  padding-block: 2.5rem!important;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  inline-size: 100%!important;

  &::before,
  &::after{
    content: '';
    display: block;
    block-size: 1.5rem;
    background-color: #D7015A;
    position: absolute;
  }

  &::before{
    left: 0;
    top: 0;
    right: 0;
  }

  &::after{
    left: 0;
    bottom: 0;
    right: 0;
  }

  p{
    margin: 0;
    font-weight: 700;
  }

  section{
    display: inherit;
    flex-direction: column;
    align-items: center;
    margin-block-end: 1rem;
  }

  .qr-title{
    font-size: 1.5rem;
  }

  .qr-section{
    block-size: 15.625rem;
    inline-size: 15.625rem;
    background-color: #D7015A;
    border-radius: 2rem;
    margin-block-end: 0.4rem;
    display: flex;
    justify-content: center;

    canvas{
      border-radius: 1rem;
    }
  }
  
  .qr-note{
    font-size: 0.625rem;
    margin-block-end: .4rem;
  }

  .qr-venue{
    font-size: 1.3rem;
  }

  .qr-amount-wrapper{
    background-color: #D7015A;
    inline-size: 15.625rem;
    block-size: 2.5rem;
    border-radius: 1rem;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    box-sizing: border-box;
    margin-block-end: .75rem;
    justify-content: center;

    > p > span{
      padding-inline-start: .2rem;
    }
  }
`

const PreviewQr = forwardRef(({format = false, tick, venue = "Sin ingresar", amount = 0}, ref) => {
  const previewRef = useRef(null);

  useImperativeHandle(ref, () => previewRef.current);

  if (!format) {
    return (
      <QrWrapper>
        <Qr tick={tick} />
      </QrWrapper>
    );
  }

  return (
    <StyledPreviewQrWrapper>
      <StyledPreviewQr ref={previewRef}>
        <p className="qr-title">ESCANEA PARA <br />REALIZAR TU PAGO</p>
        <section>
          <div className="qr-section">
            <Qr tick={tick} />
          </div>
          <p className="qr-note">*ESTE CÓDIGO QR ES VALIDO UNICAMENTE EN:</p>
          <p className="qr-venue">{venue}</p>
        </section>
        <div className="qr-amount-wrapper">
          <p>Qr válido por: <span>${amount}</span> </p>
        </div>
        <img src={logoYoshiCash} alt="Logo de YoshiCash" tittle="Logo de YoshiCash" width={124} height={41} />
      </StyledPreviewQr>
    </StyledPreviewQrWrapper>
  )
});

export default PreviewQr;