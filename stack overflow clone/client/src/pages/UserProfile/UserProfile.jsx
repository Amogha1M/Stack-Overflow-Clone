import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import "./UserProfile.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import Location from "./Location";

const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const [location, setLocation] = useState(false);
  const showLocation = () => {
    setLocation(!location);
  };

  return (
    <div className="home-container-1">
      <LeftSidebar></LeftSidebar>
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="30px"
                py="40px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faBirthdayCake} />
                  Joined {moment(currentProfile?.JoinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                className="edit-profile-btn"
                type="button"
                onClick={() => {
                  setSwitch(true);
                }}
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>

          <>
            {Switch ? (
              // <EditProfileForm currentUser={currentUser} setSwitch = {setSwitch} />

              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
        <button className="show-location" onClick={showLocation}>
          Show location
        </button>
        {/* <Location/> */}
        {location ? <Location /> : null}
      </div>
    </div>
  );
};

export default UserProfile;
