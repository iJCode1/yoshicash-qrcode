import styled from "styled-components"

const Div = styled.div`
  min-block-size: 247px;
`;

const Vector = ( {img} ) => {
  return (
    <Div>
      <img src={img} alt="Vector" title="Vector" width={200} height={200}/>
    </Div>
  )
}

export default Vector