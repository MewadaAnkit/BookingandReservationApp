import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { user , loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    console.log("handleClick function called")
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8000/api/login", credentials);
      console.log("API response data:", res.data);
     
      if(res.data.isAdmin){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/")
      }else{
        dispatch({ type: "LOGIN_FAILURE", payload: {message:"You are not authorized"} });
      }
     
    } catch (err) {
       // console.log(err.response.data)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
 

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default Login;