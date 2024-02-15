import React, { useState } from "react";
import "../Styles/Modal.css";
import getApi from "../utils/api";
import { useDispatch } from "react-redux";
import { userBlogGet } from "../Redux/UserCardReducer/action";

const Modal = ({ postId }) => {
  const [isModal, setIsModal] = useState(true);
  const [editData, setEditData] = useState({});
  const [isEdit, setEdit] = useState();
  const dispatch = useDispatch() ;

  const userData = JSON.parse(localStorage.getItem("redWhiteToken"));
  const handleChange = (e) => {
    setEdit("");
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditPost = async (e) => {
    try {
      e.preventDefault();
      console.log(editData);
     
      const token = userData?.token;
      const userId = userData?.userDetails.id ;
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token, config, postId);
      const response = await getApi.patch(
        `/blog/edit/${postId}`,
        editData,
        config,
        
      );
      if (response.statusText == "OK") {
        setEdit("Successfully Edit data");
        dispatch(userBlogGet(userId,token))
      }
      console.log(response);
    } catch (error) {
      console.log("error while edit blog", error);
    }
  };

  return (
    <>
      <div className={isModal ? "modal-wrapper" : "modalClose"} style={{background : "#EAECCC"}} >
        <div className="modal-content" style={{background : "#EAECCC"}} >
          <div className="modal-header">
            <h5 className="modal-title">Edit Blogs</h5>
            <button
              type="button"
              className="modal-close"
              onClick={() => setIsModal(!isModal)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEditPost}>
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
                ></textarea>
              </div>
              {isEdit && (
                <p className="text-success text-opacity-75 mt-3">{isEdit}</p>
              )}
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
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
