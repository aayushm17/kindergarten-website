import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/NewsAdmin.css'; // Importing the CSS file

const NewsAdmin = () => {
  const [newsList, setNewsList] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news/all");
        console.log(response.data); // Log the response data
        setNewsList(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Handle form submission to add news
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !date || !time || !description) {
      alert("All fields are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("description", description);
  
    try {
      await axios.post("http://localhost:5000/api/news/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Reset the form after successful submission
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      setImage(null);

      // Fetch updated list after adding news
      const response = await axios.get("http://localhost:5000/api/news/all");
      setNewsList(response.data);
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };
  

  // Handle news removal
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/remove/${id}`);
      const response = await axios.get("http://localhost:5000/api/news/all");
      setNewsList(response.data);
    } catch (error) {
      console.error("Error removing news:", error);
    }
  };

  return (
    <div className="news-manager">
      <h1>News Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter news title"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter news date"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter news time"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter news description"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit">Add News</button>
      </form>

      <div className="news-list">
        {newsList.map((news) => (
          <div key={news._id} className="news-item">
            <h2>{news.title}</h2>
            <p>{news.date} at {news.time}</p>
            <p>{news.description}</p>
            <img
              src={`http://localhost:5000/api/news/image/${news._id}`} 
              alt={news.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <button onClick={() => handleRemove(news._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAdmin;
