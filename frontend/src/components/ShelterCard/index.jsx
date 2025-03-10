import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import placeholderProfile from "../../assets/images/placeholderprofile.png"


const ShelterCard = ({ name, profileLink, stars, reviewCount, joinDate, profilePicUrl, bannerPicUrl}) => {
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateStr = joinDate.toLocaleDateString("en-US", dateOptions)
  let bannerStyle;
  if (bannerPicUrl) {
      bannerStyle = {
          backgroundImage: `url(${bannerPicUrl})`,
          backgroundSize: "cover"
      }
  } else {
      bannerStyle = {
          backgroundColor: `lightblue`,
          backgroundSize: "cover"
      }
  }


  return (
    // <div className="col-lg-6" style={{ width: '500px' }}>
      <div className="card text-center" id="profile-card">
        <div className="mb-4 banner" style={bannerStyle}>
          <img
            className="mt-3 mx-auto rounded-circle border text-center d-flex flex-column justify-content-center"
            src={profilePicUrl ? profilePicUrl : placeholderProfile}
            alt="Shelter Portrait"
            style={{ width: '80px', height: '80px', transform: 'translate(0, 50%)' }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-center mt-2">
          <h5 className="card-title">{name}</h5>
          <a href={profileLink} className="card-link link-underline link-underline-opacity-0">
            <b>View Profile</b>
          </a>
          <div className="d-flex my-4 m-auto">
            <div style={{ width: '30%', justifyContent: 'center' }} className="d-flex my-auto">
              {[...Array(5)].map((item, index) => {
                if (index < Math.floor(stars)){
                  return <i key={index} className="bi bi-star-fill"></i>
                } else if (index === Math.floor(stars) && stars % 1 !== 0) {
                  return <i key={index} className="bi bi-star-half"></i>
                }else {
                  return <i key={index} className="bi bi-star"></i>
                }
              })}

              {/* Add the half star if needed */}
            </div>
            <div className="vr mx-2"></div>
            <div className="my-auto text-muted" style={{ width: '30%' }}>{reviewCount} reviews</div>
            <div className="vr mx-2"></div>
            <div className="text-muted my-auto" style={{ width: '30%' }}>Joined {dateStr}</div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default ShelterCard;
