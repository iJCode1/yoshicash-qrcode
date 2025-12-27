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

        span{
          font-size: 1rem;
          color: #d7015a;
          ;
        }
      }

      input{
        display: block;
        padding: .75rem 0;
        border: 1px solid gray;
        border: none;
        outline: none;
        border-bottom: 1px solid #d7015a;
        inline-size: inherit;
        box-sizing: border-box;
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

`

const Container = ({children}) => {
  return (
    <Cont>
      {children}
    </Cont>
  )
}

export default Container