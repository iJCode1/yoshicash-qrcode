import logo from '../assets/logo-yoshi.svg';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 
              0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 1.5rem;

  figure{
    margin: 0;
    box-sizing: border-box;

    img{
      display: block;
    }
  }
`

const Navbar = () => {
  return (
    <Nav>
      <figure>
        <img src={logo} alt="Logo de YoshiCash" width={100} title='Logo de YoshiCash' />
      </figure>
    </Nav>
  )
}

export default Navbar