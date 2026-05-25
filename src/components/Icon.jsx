import styled from "styled-components"

const StyledIcon = styled.img`
  display: inline-block;
  block-size: ${props => props.alto};
  inline-size: ${props => props.ancho};
`

const Icon = ({icon, iconText = 'Icono', ancho = "18px", alto = "18px"}) => {
  return (
    <StyledIcon src={icon} alt={iconText} ancho={ancho} alto={alto} />
  )
}

export default Icon