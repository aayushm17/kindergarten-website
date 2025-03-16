import React, { useState, useEffect } from "react";
import "../styles/Faq.css"; 
import axios from "axios";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  return (
    <div className="faq-container">
      <h1>FAQ !!</h1>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
        >
          <div className="faq-question" onClick={() => toggleFaq(index)}>
            {faq.question}
            <span className="faq-icon">
              {activeIndex === index ? "−" : "+"}
            </span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
