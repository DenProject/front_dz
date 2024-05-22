import { NavLink } from "react-router-dom";
import "./Header.css"
const Header = () =>{
    return(
      <header className="header-main">
        <div className="logoDiv"><img src="/Images/logo.png" alt="cant" width="100px"></img>
        <h1>BOOKS SEARCH</h1>
        </div>
        
        <nav>
          <ul className="links-header">
            <li><NavLink to="/" activeclassname='activeA' end>HOME</NavLink></li>
            <li><NavLink to="/books" activeclassname='activeA'>LIST</NavLink></li>
            <li><NavLink to="/search" activeclassname='activeA'>SEARCH</NavLink></li>
          </ul>
        </nav>
      </header>
    )
  }
  
  export default Header;