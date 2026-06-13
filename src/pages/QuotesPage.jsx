import React, { useState, useEffect } from "react";
import "../styles/MotivationPage.css";
import BackFeature from '../components/BackFeature'

const MotivationPage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchQuote() {
    try {
      setLoading(true);

      
      const response = await fetch("https://dummyjson.com/quotes/random");

      const data = await response.json();

    
      setQuote(data.quote);
      setAuthor(data.author);

    } catch (error) {
      console.log(error);
      setQuote("Failed to load motivation.");
      setAuthor("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="motivationPage">
      <div className="backContainer">
    <BackFeature />
  </div>

      <div className="overlay"></div>

      <div className="quoteCard glass">

        <h1 className="pageTitle">
          Daily Motivation
        </h1>

        {loading ? (

          <div className="loading">
            Loading...
          </div>

        ) : (

          <>
            <p className="quoteText">
              "{quote}"
            </p>

            <p className="quoteAuthor">
              — {author}
            </p>
          </>

        )}

        <button
          className="changeQuoteBtn"
          onClick={fetchQuote}
        >
          Change Quote
        </button>

      </div>

    </div>
  );
};

export default MotivationPage;