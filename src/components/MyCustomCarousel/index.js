import React, { useState, useEffect } from "react";
import "./index.css";

const MyCustomCarousel = ({ items }) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(1);
  const [filteredArray, setFilteredArray] = useState([...items]);
  const [slidesArray, setSlidesArray] = useState([...items.slice(0, 3)]);
  const [selectedCategory, setSelectedCatogory] = useState("All");
  const [categoryList, setCategoryList] = useState(["All"]);

  const makeCategoryList = () => {
    const catList = ["All"];
    slidesArray.map((v) => {
      if (catList.indexOf(v) === -1) {
        return catList.push(v.category);
      }
    });
    setCategoryList(catList);
  };

  useEffect(() => {
    makeCategoryList();
  }, []);

  const filterItemByCategory = (cat) => {
    setSelectedCatogory(cat);
    if (cat === "All") {
      setFilteredArray(items);
      setCurrentActiveIndex(1);
      setSlidesArray([...items.slice(0, 3)]);
    } else {
      const extract = items.filter((v) => {
        return v.category === cat;
      });
      setFilteredArray(extract);
      setCurrentActiveIndex(1);
      setSlidesArray([...extract.slice(0, 3)]);
    }
  };

  const getSlidesToShow = (currentActiveIndex) => {
    if (filteredArray.length > 2) {
      if (
        currentActiveIndex - 1 >= 0 &&
        currentActiveIndex + 1 < filteredArray.length
      ) {
        setSlidesArray([
          ...filteredArray.slice(
            currentActiveIndex - 1,
            currentActiveIndex + 2
          ),
        ]);
      } else if (currentActiveIndex - 1 <= 0 || currentActiveIndex === 0) {
        setSlidesArray([
          filteredArray[filteredArray.length - 1],
          filteredArray[currentActiveIndex],
          filteredArray[1],
        ]);
      } else if (currentActiveIndex + 1 > filteredArray.length) {
        setSlidesArray([
          filteredArray[currentActiveIndex - 1],
          filteredArray[filteredArray.length - 1],
          filteredArray[0],
        ]);
        return filteredArray.slice(0, currentActiveIndex + 1);
      } else if (currentActiveIndex === filteredArray.length - 1) {
        setSlidesArray([
          filteredArray[currentActiveIndex - 1],
          filteredArray[filteredArray.length - 1],
          filteredArray[0],
        ]);
      }
    }
  };

  const goToNextSlide = () => {
    let nextIndex = currentActiveIndex + 1;
    if (nextIndex >= filteredArray.length) {
      nextIndex = 0;
    }
    setCurrentActiveIndex(nextIndex);
    getSlidesToShow(nextIndex);
  };

  const goToPrevSlide = () => {
    let prevIndex = currentActiveIndex - 1;
    if (prevIndex < 0) {
      prevIndex = filteredArray.length - 1;
    }
    setCurrentActiveIndex(prevIndex);
    getSlidesToShow(prevIndex);
  };

  const goToSlide = (index) => {
    setCurrentActiveIndex(index);
    getSlidesToShow(index);
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {slidesArray.map((item, k) => {
          return (
            <div
              className={`carousel__item ${k === 1 ? "active" : ""}`}
              key={"item_" + item.name}
            >
              <img
                className={`carousel__photo ${k === 1 ? "active" : ""}`}
                src={item.src}
                alt={item.alt}
                key={"img_" + item.alt}
              />
              <div className="carousel__item--details" key={"details_" + k}>
                <div className="item__left">
                  <div className="item__name">{item.name}</div>
                  <div className="item__category">{item.category}</div>
                </div>
                <div className="item__right">
                  <span className="item__price">{item.price}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="carousel__button--next"
          onClick={() => goToNextSlide()}
        ></div>
        <div
          className="carousel__button--prev"
          onClick={() => goToPrevSlide()}
        ></div>
      </div>
      <ul>
        {filteredArray.map((i, j) => {
          return (
            <div key={"indic_" + j}>
              <li>
                <a
                  href="#"
                  className={
                    j === currentActiveIndex
                      ? "carousel__indicator carousel__indicator--active"
                      : "carousel__indicator"
                  }
                  onClick={() => goToSlide(j)}
                ></a>
              </li>
            </div>
          );
        })}
      </ul>
      <div className="select-wrapper">
        <div>Choose a category:</div>
        {categoryList.length > 0 ? (
          <div className="select">
            <select
              value={selectedCategory}
              onChange={(e) => filterItemByCategory(e.target.value)}
            >
              {categoryList.map((cat) => {
                return <option value={cat}>{cat}</option>;
              })}
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyCustomCarousel;
