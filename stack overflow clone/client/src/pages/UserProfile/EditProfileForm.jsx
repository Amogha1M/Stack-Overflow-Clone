import React, { useState } from "react";
import { updateProfile } from "../../actions/users";
import { useDispatch } from "react-redux";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  // console.log(currentUser, "currentUser...");
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState([]);
  console.log(tags, "these are tags");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tags[0] === "" || tags.length === 0) {
      alert("Update tags field");
    } else {
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }));
    }
    setSwitch(false);
  };
  return (
    <div>
      <h2 className="edit-profile-title">Edit Your Profile</h2>
      <h3 className="edit-profile-title-2">Public Information</h3>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
        </label>
        <input
          type="text"
          className="one-space"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="about">
          <h3>About Me</h3>
        </label>
        <textarea
          type="text"
          className="one-space"
          id="about"
          col="19"
          rows="6"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>

        <label htmlFor="tags">
          <h3> Watched tags</h3>
          <p>Add tags seperated by 1 space.</p>
        </label>

        <input
          type="text"
          id="tags"
          className="one-space"
          width="100%"
          // value={tags}
          onChange={(e) => setTags(e.target.value.split(" "))}
        />
        <br />

        <button type="submit" value="Save-Profile" className="user-btn-sumbit">
          Submit
        </button>

        <button
          type="text"
          className="user-btn-cancel"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
