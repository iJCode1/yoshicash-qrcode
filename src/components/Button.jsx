import styled from "styled-components"
import Icon from "./Icon"

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: .5rem;
  background-color: ${props => props.disabled ? '#313131' : '#d7015a' } ;
  color: white;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1.2rem 4rem;
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
const Button = ({ Text, Accion, isDisabled = true, icon, iconText }) => {

  return (
    <StyledButton onClick={Accion} disabled={isDisabled}>
      {icon && <Icon icon={icon} iconText={iconText} />}
      {Text}
    </StyledButton>
  )
}

export default Button