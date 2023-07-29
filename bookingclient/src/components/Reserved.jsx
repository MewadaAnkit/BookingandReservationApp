import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './reserved.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { _id: userId } = user;
        console.log(userId);
        const response = await axios.get(`http://localhost:8000/api/reserved/${userId}`);
        setProfileInfo(response.data);
      } catch (error) {
        console.error('Error fetching profile information:', error);
      }
    };

    fetchProfileInfo();
  }, []);

  const handleClick = () => {
    navigate('/');
  };

  if (!profileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Header />
      <div className="profile-container">
        <h2 className="profile-heading">Reserved Hotels</h2>
        <table className="hotel-table">
          <thead>
            <tr>
              <th className='theader'>Hotel Name</th>
            </tr>
          </thead>
          <tbody>
            {profileInfo.bookedHotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="profile-heading">Booked Rooms</h2>
        <table className="room-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Reserved Dates</th>
            </tr>
          </thead>
          <tbody>
            {profileInfo.bookedRooms.map((room) => (
              <tr key={room._id}>
                <td>{room.roomNumbers.map((roomNumber) => roomNumber.number).join(', ')}</td>
                <td>
                  <ul>
                    {room.roomNumbers.map((roomNumber) => (
                      <li key={roomNumber._id}>
                        {roomNumber.unavailableDates.map((date) => (
                          <div key={date} className="reserved-date">
                            {new Date(date).toLocaleDateString()}
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="Back" onClick={handleClick}>
          Go Back
        </button>
        <button className="cancel" onClick={handleClick}>
          Cancel Reservation
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
