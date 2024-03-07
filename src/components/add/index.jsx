import React, { useState } from "react";
import "./index.scss";
import Cancel from "../../assets/images/close.svg";
import Save from "../../assets/images/save.svg";

function Add({ active, Close }) {
  const [isActive, setIsActive] = useState(active);
  let data = JSON.parse(localStorage.getItem("user")) || [];
  const [user, setUser] = useState({
    id: data?.length + 1,
    name: "",
    last: "",
    phone: "",
    gender: "",
  });
  const handleClose = () => {
    setIsActive(false);
    Close(false);
  };

  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const save = () => {
    let data = JSON.parse(localStorage.getItem("user")) || [];
    localStorage.setItem("user", JSON.stringify([...data, user]));
    setIsActive(false);
    Close(false);
    toast.success("Add Contact");
  };

  return (
    <>
      <div className={`showModal ${isActive ? "active" : ""}`}>
        <div className="modal">
          <h2>Add your information</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="name"
              id="name"
              placeholder="FirstName"
              value={user.name}
              onChange={handelChange}
            />
            <input
              type="user"
              id="last"
              placeholder="LastName"
              value={user.last}
              onChange={handelChange}
            />
            <input
              type="tel"
              id="phone"
              placeholder="Enter the your phone number"
              value={user.phone}
              onChange={handelChange}
            />
            <select id="gender" value={user.gender} onChange={handelChange}>
              <option value="all">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="btns">
              <button
                className="save"
                type="submit"
                onClick={save}
                disabled={
                  !user.name || !user.gender || !user.last || !user.phone
                }
              >
                <img src={Save} alt="Save" />
              </button>
              <button className="close" onClick={handleClose}>
                <img src={Cancel} alt="Close" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
