import { useState } from "react";
import "./index.scss";
import { toast } from "react-toastify";
function EditCom({ active, Close, id }) {
  const [isActive, setIsActive] = useState(active);
  let data = JSON.parse(localStorage.getItem("user")) || [];
  let value = data?.find((el) => el?.id == id);
  const [user, setUser] = useState({
    id: value?.id,
    name: value?.name,
    last: value?.last,
    phone: value?.phone,
    gender: value?.gender,
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
    let updateData = data?.map((el) => (el?.id == value?.id ? user : el));
    localStorage.setItem("user", JSON.stringify(updateData));
    setIsActive(false);
    Close(false);
    toast.success("Edit Contact");
  };
  return (
    <>
      <div className={`EditModal ${isActive ? "active" : ""}`}>
        <div className="modal">
          <h2>Edit Contact</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="name"
              id="name"
              placeholder="First Name"
              value={user.name}
              onChange={handelChange}
            />
            <input
              type="user"
              id="last"
              placeholder="Last Name"
              value={user.last}
              onChange={handelChange}
            />
            <input
              type="tel"
              id="phone"
              placeholder="+998-99-058-07-14"
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
                  !user.name ||
                  !user.gender ||
                  user.gender === "all" ||
                  !user.last ||
                  !user.phone
                }
              >
                Save
              </button>
              <button className="close" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditCom;
