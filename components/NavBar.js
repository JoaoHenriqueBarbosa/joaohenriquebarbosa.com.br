import React, { useEffect, useRef } from 'react';
import NavLink from '../components/NavLink';

const sun = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8Zz4NCiAgICA8cGF0aCBkPSJNNjQsMzAuMzRjLTE4LjU5LDAtMzMuNjYsMTUuMDctMzMuNjYsMzMuNjVjMCwxOC41OSwxNS4wNywzMy42NiwzMy42NiwzMy42NiBjMTguNTksMCwzMy42Ni0xNS4wNywzMy42Ni0zMy42NkM5Ny42Niw0NS40MSw4Mi41OSwzMC4zNCw2NCwzMC4zNHoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogICAgPHBhdGggZD0iTTU2Ljc2LDI0LjIxTDU2Ljc2LDI0LjIxaDE0LjQ5YzAuNjcsMCwxLjI5LTAuMzMsMS42OC0wLjg4YzAuMzgtMC41NCwwLjQ3LTEuMjUsMC4yNC0xLjg4IEw2NS45MiwxLjgzYy0wLjMtMC44MS0xLjA2LTEuMzQtMS45Mi0xLjM0cy0xLjYyLDAuNTQtMS45MiwxLjM0bC03LjI1LDE5LjYzYy0wLjIzLDAuNjMtMC4xNCwxLjMzLDAuMjQsMS44OCBDNTUuNDYsMjMuODksNTYuMDksMjQuMjEsNTYuNzYsMjQuMjF6IiBzdHlsZT0iZmlsbDojRkNDMjFCOyIvPg0KICAgIDxwYXRoIGQ9Ik05Ny4yNiw0MC45OWMwLjM4LDAuMzksMC45MSwwLjYsMS40NCwwLjZjMC4xMiwwLDAuMjQtMC4wMSwwLjM2LTAuMDNjMC42Ni0wLjEyLDEuMjEtMC41NSwxLjUtMS4xNiBsOC43Ni0xOS4wMWMwLjM2LTAuNzgsMC4xOS0xLjY5LTAuNDEtMi4zYy0wLjYxLTAuNjEtMS41My0wLjc3LTIuMzEtMC40Mkw4Ny42LDI3LjQ0Yy0wLjYxLDAuMjgtMS4wNCwwLjg0LTEuMTYsMS41IGMtMC4xMiwwLjY2LDAuMSwxLjMzLDAuNTYsMS44MUw5Ny4yNiw0MC45OXoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogICAgPHBhdGggZD0iTTEyNi4xOCw2Mi4wOGwtMTkuNjQtNy4yNGMtMC42My0wLjIzLTEuMzMtMC4xNC0xLjg4LDAuMjRjLTAuNTUsMC4zOC0wLjg3LDEtMC44NywxLjY3bDAuMDEsMTQuNDkgYzAsMC42NywwLjMzLDEuMywwLjg4LDEuNjhjMC4zNSwwLjIzLDAuNzYsMC4zNiwxLjE3LDAuMzZjMC4yNCwwLDAuNDgtMC4wNCwwLjcxLTAuMTNsMTkuNjQtNy4yNGMwLjgtMC4yOSwxLjM0LTEuMDYsMS4zNC0xLjkzIEMxMjcuNTIsNjMuMTQsMTI2Ljk5LDYyLjM4LDEyNi4xOCw2Mi4wOHoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogICAgPHBhdGggZD0iTTEwMC41Niw4Ny42Yy0wLjI4LTAuNjEtMC44NC0xLjA0LTEuNS0xLjE2Yy0wLjY2LTAuMTEtMS4zNCwwLjEtMS44LDAuNTdMODcuMDEsOTcuMjYgYy0wLjQ3LDAuNDctMC42OSwxLjE1LTAuNTcsMS44MWMwLjEyLDAuNjUsMC41NSwxLjIyLDEuMTYsMS41bDE5LjAxLDguNzZjMC4yNywwLjEzLDAuNTYsMC4xOCwwLjg2LDAuMTggYzAuNTMsMCwxLjA1LTAuMjEsMS40NC0wLjZjMC42MS0wLjYxLDAuNzctMS41MiwwLjQxLTIuM0wxMDAuNTYsODcuNnoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogICAgPHBhdGggZD0iTTcxLjI0LDEwMy43OEw3MS4yNCwxMDMuNzhsLTE0LjQ5LDAuMDFjLTAuNjcsMC0xLjI5LDAuMzMtMS42NywwLjg4IGMtMC4zOCwwLjU1LTAuNDcsMS4yNS0wLjI1LDEuODdsNy4yNSwxOS42NGMwLjMsMC44LDEuMDYsMS4zNCwxLjkyLDEuMzRzMS42Mi0wLjU0LDEuOTItMS4zNGw3LjI1LTE5LjY0IGMwLjIzLTAuNjMsMC4xNC0xLjMzLTAuMjQtMS44OEM3Mi41NCwxMDQuMTEsNzEuOTIsMTAzLjc4LDcxLjI0LDEwMy43OHoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogICAgPHBhdGggZD0iTTMwLjc0LDg3LjAxYy0wLjQ3LTAuNDctMS4xNC0wLjY4LTEuOC0wLjU3Yy0wLjY2LDAuMTItMS4yMiwwLjU1LTEuNSwxLjE2bC04Ljc2LDE5LjAxIGMtMC4zNiwwLjc4LTAuMTksMS43LDAuNDIsMi4zYzAuMzksMC4zOSwwLjkxLDAuNiwxLjQ0LDAuNmMwLjI5LDAsMC41OC0wLjA2LDAuODYtMC4xOWwxOS4wMS04Ljc3YzAuNjEtMC4yOCwxLjA0LTAuODQsMS4xNi0xLjUgYzAuMTItMC42Ni0wLjEtMS4zMy0wLjU3LTEuOEwzMC43NCw4Ny4wMXoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogICAgPHBhdGggZD0iTTIyLjE3LDczLjI5YzAuNDEsMCwwLjgyLTAuMTMsMS4xNy0wLjM3YzAuNTUtMC4zOCwwLjg4LTEuMDEsMC44OC0xLjY4bC0wLjAxLTE0LjQ5IGMwLTAuNjctMC4zMy0xLjI5LTAuODgtMS42OGMtMC41NS0wLjM4LTEuMjUtMC40Ny0xLjg3LTAuMjRMMS44Miw2Mi4wOGMtMC44LDAuMjktMS4zNCwxLjA2LTEuMzQsMS45MmMwLDAuODUsMC41MywxLjYyLDEuMzQsMS45MiBsMTkuNjUsNy4yNEMyMS43LDczLjI1LDIxLjkzLDczLjI5LDIyLjE3LDczLjI5eiIgc3R5bGU9ImZpbGw6I0ZDQzIxQjsiLz4NCiAgICA8cGF0aCBkPSJNMjcuNDUsNDAuNGMwLjI4LDAuNjEsMC44NCwxLjA0LDEuNSwxLjE2YzAuMTIsMC4wMiwwLjI0LDAuMDMsMC4zNiwwLjAzYzAuNTQsMCwxLjA2LTAuMjEsMS40NS0wLjYgTDQxLDMwLjc0YzAuNDctMC40OCwwLjY4LTEuMTUsMC41Ni0xLjgxYy0wLjEyLTAuNjUtMC41NS0xLjIxLTEuMTYtMS40OWwtMTkuMDItOC43NmMtMC43OC0wLjM2LTEuNjktMC4xOS0yLjMsMC40MiBjLTAuNjEsMC42MS0wLjc3LDEuNTItMC40MSwyLjNMMjcuNDUsNDAuNHoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQogIDwvZz4NCjwvc3ZnPg==';
const moon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8cGF0aCBkPSJNMTA1Ljg3LDE0Ljk5Yy0zLjc0LTMuMzktNy45MS02LjM4LTEyLjQyLTguODljLTAuODctMC40OS0yLTAuMzUtMi43MSwwLjMzIGMtMC43MSwwLjY4LTAuODMsMS43My0wLjI5LDIuNTNjMTUuNjMsMjIuOTMsMTIuMjksNTIuNTItOC4xMSw3MS45N2MtMTEuOSwxMS4zNS0yNy44NSwxNy42LTQ0LjkxLDE3LjYgYy0xMS4zOSwwLTIyLjU0LTIuODYtMzIuMjQtOC4yN2MtMC44Ny0wLjQ5LTItMC4zNi0yLjcxLDAuMzNjLTAuNzEsMC42OC0wLjgzLDEuNzItMC4yOCwyLjUzYzIuODEsNC4xMiw2LjEyLDcuOTMsOS44NiwxMS4zMiBjMTIuNjEsMTEuNDUsMjkuMjcsMTcuNzYsNDYuOSwxNy43NmMxOC4yNywwLDM1LjM0LTYuNyw0OC4wOS0xOC44NmMxMi41My0xMS45NCwxOS4zMS0yNy43MSwxOS4wOS00NC40IEMxMjUuOTIsNDIuMjUsMTE4LjcyLDI2LjY0LDEwNS44NywxNC45OXoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQo8L3N2Zz4=';

const NavBar = ({ title }) => {

  const imgToggle = useRef();
  const nav = useRef();

  useEffect(() => {
    if (localStorage.getItem('dark') === 'true') {
      document.body.classList.add('dark');
      imgToggle.current.src = sun;
    } else {
      document.body.classList.remove('dark');
    }

    collapseNav();

    //fazer o highlight da pagina ativa

  }, []);

  useEffect(() => {
    window.addEventListener('scroll', collapseNav);

    return () => {
      window.removeEventListener('scroll', collapseNav);
    }
  }, []);

  const collapseNav = () => {
    if (nav.current) {
      if (window.scrollY >= 15) {
        nav.current.classList.add('scroll');
      } else {
        nav.current.classList.remove('scroll');
      }
    }
  }

  const toggleDarkTheme = () => {
    if (localStorage.getItem('dark') === 'true') {
      localStorage.setItem('dark', 'false');
      document.body.classList.remove('dark');
      imgToggle.current.src = moon;
    } else {
      localStorage.setItem('dark', 'true');
      document.body.classList.add('dark');
      imgToggle.current.src = sun;
    }
  }

  return (
    <div>
      <nav ref={nav} className="nav">
        <div className="nav-container">
          <div className="brand">
            <NavLink href="/">
              <img src="/images/rocket.png" className="favicon" />
              <span className="text">
                {title}
              </span>
            </NavLink>
          </div>
          <div className="links">
            <NavLink href="/me" >
              Sobre mim
            </NavLink>
            <NavLink href="/blog" >
              Artigos
            </NavLink>
            <NavLink href="/contact" >
              Contato
            </NavLink>
            {/* <a href="https://github.com/JoaoHenriqueBarbosa" target="_blank" rel="noopener noreferrer">
              GitHub
            </a> */}
            <div className="cta">
              <button onClick={toggleDarkTheme} className="dark-switcher cta">
                <img ref={imgToggle} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8cGF0aCBkPSJNMTA1Ljg3LDE0Ljk5Yy0zLjc0LTMuMzktNy45MS02LjM4LTEyLjQyLTguODljLTAuODctMC40OS0yLTAuMzUtMi43MSwwLjMzIGMtMC43MSwwLjY4LTAuODMsMS43My0wLjI5LDIuNTNjMTUuNjMsMjIuOTMsMTIuMjksNTIuNTItOC4xMSw3MS45N2MtMTEuOSwxMS4zNS0yNy44NSwxNy42LTQ0LjkxLDE3LjYgYy0xMS4zOSwwLTIyLjU0LTIuODYtMzIuMjQtOC4yN2MtMC44Ny0wLjQ5LTItMC4zNi0yLjcxLDAuMzNjLTAuNzEsMC42OC0wLjgzLDEuNzItMC4yOCwyLjUzYzIuODEsNC4xMiw2LjEyLDcuOTMsOS44NiwxMS4zMiBjMTIuNjEsMTEuNDUsMjkuMjcsMTcuNzYsNDYuOSwxNy43NmMxOC4yNywwLDM1LjM0LTYuNyw0OC4wOS0xOC44NmMxMi41My0xMS45NCwxOS4zMS0yNy43MSwxOS4wOS00NC40IEMxMjUuOTIsNDIuMjUsMTE4LjcyLDI2LjY0LDEwNS44NywxNC45OXoiIHN0eWxlPSJmaWxsOiNGQ0MyMUI7Ii8+DQo8L3N2Zz4=" className="theme-icon" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;

