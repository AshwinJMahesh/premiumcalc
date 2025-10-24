import React, { useState } from "react";
import image from '../images.png';
function AdminSession() {

      const [year, setYear] = useState("");
      const [type, setType] = useState("");
      const [model, setModel] = useState("");
    
      const CalculatePremium = () => {
        // Add your calculation logic here using year, type, model states
        alert(`Year: ${year}, Type: ${type}, Model: ${model}`);
      };
  const [touchCount, setTouchCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleImageClick = () => {
    const newCount = touchCount + 1;
    setTouchCount(newCount);
    if (newCount === 10) {
      setIsVisible(true);
    }
  };

  return (
    <div>
      <img
        src={image}
        // alt="Special"
        style={{ width: "50px", cursor: "pointer" }}
        onClick={handleImageClick}
      />
      {isVisible && (
        <div>
          <input type="tel" name="" id="" placeholder="email"/>
          <input type="tel" name="" id="" placeholder="pswrd" />
          {/* <p>This content appears after 10 touches.</p> */}
        </div>
      )}

      {/* normal page for non admin */}

      {!isVisible && <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        marginLeft: "100px",
        marginRight: "100px",
        border: "2px solid red",
        padding: "20px",
      }}
    >
      <input
        style={{ marginTop: "10px" }}
        value={year}
        type="number"
        placeholder="Select vehicle year"
        onChange={(e) => setYear(e.target.value)}
      />
      <br />
      <input
        style={{ marginTop: "10px" }}
        value={type}
        type="text"
        placeholder="Select vehicle type"
        onChange={(e) => setType(e.target.value)}
      />
      <br />
      <input
        style={{ marginTop: "10px" }}
        value={model}
        type="text"
        placeholder="Select vehicle model"
        onChange={(e) => setModel(e.target.value)}
      />
      <br />
      <button type="button" onClick={CalculatePremium}>
        Calculate
      </button>
      <br />
      Main File
    </div>}
      
    </div>
  );
}

export default AdminSession;
