import styled from "styled-components"

const StyledIcon = styled.img`
  display: inline-block;
  block-size: 1.1rem;
  inline-size: 1.1rem;
`

const Icon = ({icon, iconText = 'Icono'}) => {
  return (
    <StyledIcon src={icon} alt={iconText}></StyledIcon>
  )
}

export default Icon