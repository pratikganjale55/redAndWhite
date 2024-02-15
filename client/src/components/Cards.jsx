import React, { useState } from "react";
import style from "../Styles/card.module.css";
import Modal from "./Modal";
import getApi from "../utils/api";
import { userBlogGet } from "../Redux/UserCardReducer/action";
import { useDispatch } from "react-redux";
import styleBlog from "../Styles/blog.module.css";
const colors = ["#D9EDBF", "#FFB996", "#FFCF81", "#FDFFAB"];
const Cards = ({ card, currentPage }) => {
  const [isModal, setIsModal] = useState(false);
  const [postId, setPostId] = useState();
  const [isDelete, setDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isBlog, setIsBlog] = useState(false);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("redWhiteToken"));

  const handleEdit = (id) => {
    setIsModal(!isModal);
    setPostId(id);
  };
  const handleDelete = async (id) => {
    try {
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await getApi.delete(`/blog/delete/${id}`, config);
      if (response.data == "") {
        dispatch(userBlogGet(userData?.userDetails?.id, token));
        setDelete(true);
      }
    } catch (error) {
      console.log("error while delete post", error);
    }
  };

  const handleCardClick = (clickedCard) => {
    setIsBlog(!isBlog);
    setSelectedCard(clickedCard);
  };
  return (
    <>
      <div key={card._id} className="col-lg-3 col-md-4 mt-4 col-sm-6 mb-4">
        <div className={style.cardBigShadow}>
          <div
            className={`${style.card} ${style.cardJustText}`}
            data-background="color"
            data-radius="none"
            style={{
              background: colors[Math.floor(Math.random() * colors.length)],
            }}
            onClick={() => handleCardClick(card)}
          >
            <div className={style.content}>
              <h6 className={style.category}>{card.category}</h6>
              <h4 className={style.title}>
                <a href="#">{card.title}</a>
              </h4>
              <p className={style.description}>{card.description}</p>
            </div>
            <p>{card.date}</p>
            {currentPage == "profile" && (
              <div className="d-flex justify-content-end">
                <div className="pt-1 mb-2">
                  <button
                    className="btn"
                    style={{ background: "#6C757D", color: "white" }}
                    onClick={() => handleDelete(card._id)}
                  >
                    {isDelete ? "Deleted" : "Delete"}
                  </button>
                </div>
                <div
                  className="pt-1 mb-2 ms-2"
                  onClick={() => handleEdit(card._id)}
                >
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                    className="btn btn-outline-secondary"
                    style={{ backgroundColor: "#9A616D", color: "white" }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
          {isBlog && selectedCard && selectedCard._id === card._id && (
            <div className={styleBlog.cardDetails}>
              <h6>Category: {selectedCard.category}</h6>
              <h4>Title: {selectedCard.title}</h4>
              <p>Description: {selectedCard.description}</p>
              <div className="d-flex justify-content-between">
                <p>Date: {selectedCard.date}</p>
                <button
                  style={{ background: "#9A616D" }}
                  onClick={() => setIsBlog(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        {isModal && <Modal postId={postId} />}
      </div>
    </>
  );
};

export default Cards;
