import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  
   const handleLogin = async ()=>{
        navigate("/login")
   }
   const handleReserved = () => {
    navigate("/reserved");
  };

  const handleRegister = ()=>{

  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BookMe.in</span>
        </Link>
        {user? <div className="navItems">
            <button className="navButton" onClick={handleReserved}>
              Reserved
            </button>
            <span className="username">{user.username}</span>
          </div> : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>Register</button>
            <button className="navButton" onClick={handleLogin}> Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;