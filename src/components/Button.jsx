import styled from "styled-components"

const StyledButton = styled.button`
  background-color: ${props => props.disabled ? '#313131' : '#d7015a' } ;
  color: white;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem 4.5rem;
  border: none;
  outline: none;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  transition: transform .2s;

  &:hover{
    opacity: .8;
  }

  &:active{
    transform: ${props => props.disabled ? '' : 'scale(.9)'};
  }
`
const Button = ({ Text, Accion, isDisabled = true }) => {

  return (
    <StyledButton onClick={Accion} disabled={isDisabled}>{Text}</StyledButton>
  )
}

export default Button