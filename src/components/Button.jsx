import styled from "styled-components"

const StyledButton = styled.button`
  background-color: #d7015a;
  color: white;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem 4.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: transform .2s;

  &:hover{
    opacity: .8;
  }

  &:active{
    transform: scale(.9);
  }
`
const Button = ({Text, Accion}) => {

  return (
    <StyledButton onClick={Accion}>{Text}</StyledButton>
  )
}

export default Button