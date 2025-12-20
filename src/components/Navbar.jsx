import logo from '../assets/logo-yoshicash.png';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 
              0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  figure{
    margin: 0;
    box-sizing: border-box;
    max-inline-size: 80rem;
    margin: 0 auto;

    img{
      display: block;
    }
  }
`

const Navbar = () => {
  return (
    <Nav>
      <figure>
        <img src={logo} alt="Logo de YoshiCash" width={110} title='Logo de YoshiCash' />
      </figure>
    </Nav>
  )
}

export default Navbar