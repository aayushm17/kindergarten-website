import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FaqAdmin.css";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editId, setEditId] = useState(null); // To track the FAQ being edited

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/faqs/all");
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleAddOrUpdateFaq = async () => {
    try {
      if (editId) {
        // Update existing FAQ
        await axios.put(`http://localhost:5000/api/faqs/update/${editId}`, {
          question: newQuestion,
          answer: newAnswer,
        });
        alert("FAQ updated successfully!");
        setEditId(null); // Reset edit mode
      } else {
        // Add new FAQ
        await axios.post("http://localhost:5000/api/faqs/add", {
          question: newQuestion,
          answer: newAnswer,
        });
        alert("FAQ added successfully!");
      }
      setNewQuestion("");
      setNewAnswer("");
      fetchFaqs(); // Refresh the FAQ list
    } catch (error) {
      console.error("Error adding/updating FAQ:", error);
    }
  };

  const handleEdit = (faq) => {
    setEditId(faq._id); // Set the ID of the FAQ being edited
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faqs/delete/${id}`);
      alert("FAQ deleted successfully!");
      fetchFaqs(); // Refresh the FAQ list
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  return (
    <div className="faq-admin">
      <h1>FAQ Admin</h1>

      <div className="add-faq">
        <h2>{editId ? "Edit FAQ" : "Add New FAQ"}</h2>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <textarea
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></textarea>
        <button onClick={handleAddOrUpdateFaq}>
          {editId ? "Update FAQ" : "Add FAQ"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setNewQuestion("");
              setNewAnswer("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="existing-faqs">
        <h2>Existing FAQs</h2>
        {faqs.length === 0 ? (
          <p>No FAQs available.</p>
        ) : (
          faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
              <button onClick={() => handleEdit(faq)}>Edit</button>
              <button onClick={() => handleDelete(faq._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FaqAdmin;
