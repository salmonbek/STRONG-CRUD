import { useEffect, useState } from "react";
import Add from "../add";
import Header from "../header";
import "./index.scss";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import EditCom from "../edit";
function Tabel() {
  const [isAddActive, setIsAddActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [id, setid] = useState();
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user")) || [];
    setData(data);
  }, [isAddActive || isEditActive]);

  const handleAddToggle = () => {
    setIsAddActive(!isAddActive);
  };

  //   delte

  const deleteAdd = (id) => {
    if (window.confirm("Delete Contact")) {
      let data = JSON.parse(localStorage.getItem("user")) || [];
      const newData = data?.filter((el) => el?.id !== id);
      localStorage.setItem("user", JSON.stringify(newData));
      setData(newData);
    }
  };

  //   edit

  const editBtn = (id) => {
    setIsEditActive(!isEditActive);
    setid(id);
  };

  //   filter

  const filterChange = (e) => {
    let value = e.target.value;
    let data = JSON.parse(localStorage.getItem("user")) || [];
    let filter = data?.filter((el) =>
      value == "all" ? el : el?.gender == value
    );
    setData(filter);
  };

  //   search

  const search = (value) => {
    let v = value.target.value.toLowerCase();
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let search = user?.filter((el) => {
      return (
        el?.name?.toLowerCase().includes(v) ||
        el?.last?.toLowerCase().includes(v) ||
        el?.phone?.toLowerCase().includes(v)
      );
    });
    setData(search);
  };

  const all = () => {
    let user = JSON.parse(localStorage.getItem("user")) || [];
    setData(user);
  };

  const like = (id) => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let updatedData = person.map((item) => {
      if (item.id === id) {
        return { ...item, liked: true };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  const unlike = (id) => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let updatedData = person.map((item) => {
      if (item.id === id) {
        return { ...item, liked: false };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  const Favorite = () => {
    let person = JSON.parse(localStorage.getItem("user")) || [];

    let favorite = person?.filter((el) => {
      if (el?.liked == true) {
        return el;
      }
    });

    setData(favorite);
  };

  return (
    <>
      <Header AddContact={handleAddToggle} />
      {isAddActive && <Add active={isAddActive} Close={setIsAddActive} />}
      {isEditActive && (
        <EditCom active={isEditActive} Close={setIsEditActive} id={id} />
      )}

      <div>
        <div className="container">
          <div className="filter">
            <div className="input">
              <input
                type="text"
                placeholder="Searching...🔍"
                onChange={search}
              />
            </div>
            <div className="filter_item">
              <select value={filter} onChange={filterChange}>
                <option value="all">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="btns">
              <button onClick={Favorite}>Favourite</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="tabel">
            <div className="tr">
              <p>#</p>
              <p>FirstName</p>
              <p>LastName</p>
              <p>Gender</p>
              <p>PhoneNumber</p>
              <p>Favourite</p>
              <p>Action</p>
            </div>
            {data?.map((el, i) => (
              <div className="tr1" key={i}>
                <p>{i + 1}</p>
                <p>{el?.name}</p>
                <p>{el?.last}</p>
                <p> {el?.gender}</p>
                <p>{el?.phone} </p>
                <p
                  className="like"
                  onClick={() => (el?.liked ? unlike(el?.id) : like(el?.id))}
                >
                  {el?.liked ? <FcLike /> : <FcLikePlaceholder />}
                </p>
                <p>
                  <button className="delete" onClick={() => deleteAdd(el?.id)}>
                    Delete
                  </button>
                  <button className="edit" onClick={() => editBtn(el?.id)}>
                    Edit
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabel;
