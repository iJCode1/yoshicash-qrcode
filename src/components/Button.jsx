import styled from "styled-components"
import Icon from "./Icon"

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  background-color: ${props => props.disabled ? '#313131' : props.type === 'download' ? '#FFFFFF' : '#d7015a' };
  border: 1px solid ${props => props.disabled ? '#313131' : '#d7015a' };
  color: ${props => props.disabled ? '#FFFFFF' :props.type === 'download' ? "#d7015a" : "#FFFFFF" };
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1.2rem 4rem;
  outline: none;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  transition: transform .2s;
  max-inline-size: 15rem;
  inline-size: 100%;

  &:hover{
    opacity: .8;
  }

  &:active{
    transform: ${props => props.disabled ? '' : 'scale(.9)'};
  }
`
const Button = ({ Text, Accion, isDisabled = true, icon, iconText, type = '' }) => {

  return (
    <StyledButton onClick={Accion} disabled={isDisabled} type={type}>
      {icon && <Icon icon={icon} iconText={iconText} />}
      {Text}
    </StyledButton>
  )
}

export default Button