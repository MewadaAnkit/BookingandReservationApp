import "./newrooms.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios'
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
const NewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [info, setInfo] = useState({});
  const [hotelid, setHotelid] = useState()

  const { data, loading, error } = useFetch("http://localhost:8000/api/hotels")
  //console.log(data)
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map(room => ({ number: room }))
    try {
      await axios.post(`http://localhost:8000/api/addroom/${hotelid}`,{...info , roomNumbers})

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput">
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                </div>
              ))}
              <div className="formInput" >
                <label>Rooms</label>
                <textarea onChange={e => setRooms(e.target.value)} placeholder="Give comma between room numbers"></textarea>
              </div>

              <div className="formInput" >
                <label>choose a hotel</label>
                <select name="" id="hotelid" onChange={(e) => setHotelid(e.target.value)}>
                  {loading ? "loading " : data && data.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRooms;
