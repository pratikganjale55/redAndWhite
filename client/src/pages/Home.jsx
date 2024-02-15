import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/Cards";
import { cardGet, searchBlog } from "../Redux/CardsReducer/action";
import Navbar from "./Navbar";

const Home = () => {
  const { cardData } = useSelector((state) => state.cardReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  // console.log(cardData);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchBlog(searchQuery, cardData));
  };
  useEffect(() => {
    dispatch(cardGet());
  }, []);
  return (
    <>
     
      <div className="d-flex justify-content-end mt-4 p-2">
        <form class="d-flex" style={{ width: "30%" }}>
          <input
            class="form-control me-2"
            type="text"
            placeholder="Search..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            class="btn"
            type="submit"
            style={{ background: "#9A616D", color: "white" }}
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>

      <div className="row">
        {cardData?.map((card, i) => {
          return <Cards card={card} currentPage="home" />;
        })}
      </div>
    </>
  );
};

export default Home;
