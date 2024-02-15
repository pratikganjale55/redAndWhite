import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userBlogGet } from "../Redux/UserCardReducer/action";
import Cards from "../components/Cards";
import getApi from "../utils/api";
import { getCurrentDateTime } from "../utils/dateTime";
import Navbar from "./Navbar";
const Profile = () => {
  const dispatch = useDispatch();
  const [openModal, setModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem("redWhiteToken"));
  const { userCardData } = useSelector((state) => state.userCardReducer);
  const handleCreatePost = () => {
    setModal(!openModal);
  };
  useEffect(() => {
    dispatch(userBlogGet(userData?.userDetails?.id, userData?.token));
  }, []);
  return (
    <>
      
      <div
        className="d-flex align-items-center justify-content-around border mt-3 p-2 border border-primary"
        style={{
          cursor: "pointer",
          background: "#9A616D",
          color: "white",
          width: "10%",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
        onClick={handleCreatePost}
      >
        <i
          className="bi bi-plus-circle-fill"
          style={{ fontSize: "20px", marginRight: "5px" }}
        ></i>
        <p className="mb-0">New Post</p>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {userCardData?.map((card, i) => {
          return <Cards card={card} currentPage="profile" />;
        })}
      </div>

      {openModal && <PostModal />}
    </>
  );
};

const PostModal = () => {
  const [isModal, setIsModal] = useState(true);
  const [addPost, setAddPost] = useState({});
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("redWhiteToken"));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost({
      ...addPost,
      [name]: value,
    });
  };

  const handleAddPost = async (e) => {
    try {
      e.preventDefault();
      const token = userData?.token;
      const userId = userData?.userDetails.id;
      const date = getCurrentDateTime();
      console.log(date);
      console.log(addPost);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await getApi.post(
        `/blog/post/${userId}`,
        { ...addPost, date: date },
        config
      );
      if (response.data.message == "successfully post blog") {
        dispatch(userBlogGet(userId, token));
      }
      if (response) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log("error while add blog", error);
    }
  };

  return (
    <>
      <div
        className={isModal ? "modal-wrapper" : "modalClose"}
        style={{ background: "#DBCC95" }}
      >
        <div className="modal-content" style={{ background: "#DBCC95" }}>
          <div className="modal-header">
            <h5 className="modal-title">New Blogs</h5>
            <button
              type="button"
              className="modal-close"
              onClick={() => setIsModal(!isModal)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddPost}>
              <div className="mb-3">
                <label for="title-name" className="col-form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title-name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="category-name" className="col-form-label">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  id="category-name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="message-text" className="col-form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="message-text"
                  name="description"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsModal(!isModal)}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn ms-2"
                style={{ background: "#9A616D", color: "white" }}
              >
                Add
              </button>
            </form>
            {message && (
              <p className="text-success text-opacity-75 mt-3">{message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
