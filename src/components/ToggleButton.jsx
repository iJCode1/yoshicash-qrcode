import styled from "styled-components"

const StyledToggleButton = styled.button`
  inline-size: 3.5rem;
  block-size: 1.6rem;
  background-color: #919191;
  background-color: ${props => props.$withFormat ? '#d7015a' : '#919191' };
  border-radius: 1rem;
  border: 0;
  cursor: pointer;
  position: relative;

  > span{
    inline-size: 1.2rem;
    block-size: 1.2rem;
    background-color: white;
    display: inline-block;
    border-radius: 100%;
    position: absolute;
    top: 0.1875rem;
    left: ${props => props.$withFormat ? '1.9rem' : '0.3125rem' };
    transition: left .4s;
  }
`

const ToggleButton = ({withFormat, setFormatValue}) => {
  return (
    <StyledToggleButton onClick={setFormatValue} $withFormat={withFormat}>
      <span></span>
    </StyledToggleButton>
  )
}

export default ToggleButton