import styled from 'styled-components'

const Cont = styled.div`
  max-inline-size: 80rem;
  margin: 0 auto;
  margin-block-start: 7rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  padding-inline: 1.5rem;
  margin-block-end: 2rem;
  h2{
    text-align: center;
    font-size: 3rem;
    margin: 0;
    margin-block-end: 1rem;
  }

  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    inline-size: 100%;
    max-inline-size: 37.5rem;

      label{
        text-align: start;
        display: block;
        inline-size: inherit;
        margin-block-end: .75rem;

        span{
          font-size: 1rem;
          color: #d7015a;
          ;
        }
      }

      input:-internal-autofill-selected{
        background-color: white !important;
      }

      .input-tick{
        border: 1px solid #a6a6a6;
        border-radius: .5rem;
        border: 1px solid #f1f1f1;
        border-radius: 16px;
        box-shadow:
          0 4px 12px rgba(0,0,0,.04),
          0 1px 3px rgba(0,0,0,.06);
        transition: all .2s ease;

        &:focus-within{
          border-color: #d7015a;
          box-shadow:
            0 0 0 4px rgba(215,1,90,.08),
        }
      }

      .input-container{
        display: flex;
        flex-direction: row;
        border: 1px solid #a6a6a6;
        border-radius: .5rem;
        overflow: hidden;
        border: 1px solid #f1f1f1;
        border-radius: 16px;

        box-shadow:
          0 4px 12px rgba(0,0,0,.04),
          0 1px 3px rgba(0,0,0,.06);

        transition: all .2s ease;

        &:focus-within{
          border-color: #d7015a;
          box-shadow:
            0 0 0 4px rgba(215,1,90,.08),
        }
   
        
        span{
          background-color: #f8d8e3;
          display: flex;
          align-items: center;
          block-size: stretch;
          inline-size: 3rem;
          justify-content: center;
        }
      }

      input{
        display: block;
        padding: 1rem;
        border: 1px solid gray;
        border: none;
        outline: none;
        inline-size: inherit;
        box-sizing: border-box;
        background: #fff;
        /*border: 1px solid #a6a6a6;*/
      }
  }

  section{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    inline-size: 90%;
    max-inline-size: 37.5rem;
    padding: 0 .75rem;

    label{
      font-weight: 600;
      span{
        font-size: 1rem;
        color: #d7015a;
        ;
      }
    }
  }

  .label-wrong{
    font-weight: 600;
  }

  .actions{
    flex-wrap: wrap;
  }

`

const Container = ({children}) => {
  return (
    <Cont>
      {children}
    </Cont>
  )
}

export default Container