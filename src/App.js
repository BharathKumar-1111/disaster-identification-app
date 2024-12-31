import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [tweet, setTweet] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle tweet input change
  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  // Function to send data to the Flask backend hosted on Render
  const handleSubmit = async () => {
    if (!image || !tweet) {
      alert('Please upload an image and enter a tweet.');
      return;
    }

    setLoading(true);

    // Prepare the form data
    const formData = new FormData();
    formData.append('image', image);
    formData.append('tweet', tweet);

    try {
      // Replace with your backend URL on Render
      const response = await fetch('https://your-app-name.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert('Error during prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Disaster Image and Tweet Prediction</h1>

      <div>
        <input type="file" onChange={handleImageChange} />
      </div>

      <div>
        <textarea
          placeholder="Enter tweet here..."
          value={tweet}
          onChange={handleTweetChange}
        />
      </div>

      <div className="button-container">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Predicting...' : 'Submit'}
        </button>
        {loading && <div className="loading-line"></div>}
      </div>

      {prediction && (
        <div>
          <h2>Prediction Result:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
