import React, { useEffect, useState } from "react";
import "../styles/News.css";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/all")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="news-container">
      {news.map((item) => (
        <div key={item._id} className="news-item">
          <div className="news-header">
            <h1>{item.title}</h1>
            <span className="news-date">
              {item.date}, {item.time}
            </span>
          </div>
          <div className="news-image-container">
            <img
              src={`http://localhost:5000/api/news/image/${item._id}`}
              alt="News"
              className="news-image"
            />
          </div>
          <div className="news-footer">
            <p className="news-description">{item.description}</p>
            {/* <button className="apply-button">Apply now</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
