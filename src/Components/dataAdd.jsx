
import React, { useState ,useEffect, use,useRef} from "react";
import image from '../images.png';
import { useNavigate } from "react-router-dom";
import './listData.css'

function AdminSession() {

  const navigate = useNavigate();

  const goToList = () => {
    navigate('/list');
  }

  const qtDateRef = React.useRef();
  const regDateRef = React.useRef();
  const seatingRef = React.useRef();
  // State variables
  const [year, setYear] = useState("");  
  const [dueDate, setDueDate] = useState("");
  const [idv, setIdv] = useState("");
  const [regno, setRegNo] = useState("");
  const [rate, setRate] = useState("");
  const [sAdd, setSAdd] = useState("");
  const [ncb, setNcb] = useState("");
  const [discount, setDiscount] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [legalLiability, setLegalLiability] = useState("");
  const [po, setPo] = useState("");  // add this state for poAmoun
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [odPremium,setOdPremium] = useState(null);
  const [regYear,setRegYear] = useState(null);
  const [company,setCompany] = useState(null);
  const [policyType,setPolicyType] = useState(null);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [vehicleAge,setVehicleAge] = useState("")

  const [yearOnly,setYearOnly] = useState("")

//   const [regno,setRegNo]= useState('');

  const fetchCalculatedValues = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/calculationnew/");
      const data = await response.json();
      console.log("Fetched calculated values:", data.results);
      setCalculatedValues(data.results || []);

      console.log('Is Array',Array.isArray (calculatedValues));
    } catch (err) {
      console.error("Error fetching calculated values:", err);
    }
}


// need to place this inside seatingcapacity onclick
const calculateRateandSAdd=()=>{


    const qtDateValue = qtDateRef.current.value;
    const regDate = regDateRef.current.value;
    const seating = seatingRef.current.value;

    console.log("val1",qtDateValue)
    console.log("val2",regDate)
    console.log("val3",seating)

    // commented for later check

    const extractYear = qtDateValue ? new Date(qtDateValue).getFullYear():null
    setYearOnly(extractYear)
    const age = extractYear-regYear
    setVehicleAge(age)
    console.log("ageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",age)
    console.log("extract year",extractYear)
    let localRate = 0;
    let localsAdd = 0;
    if(age<=5){
        console.log("age less than 5",age)
        console.log("seating cap",seating)
        localRate = 1.656
        if(seating<=18){
            localsAdd = 350
        }
        else if(seating>18 && seating<=36){
            console.log("seatig b/w 18 & 36",age)
            localsAdd = 450
        }
        else if(seating>36 && seating<=60){
            localsAdd = 550
        }
        else{
            localsAdd = 680
        }
    }
    else if(age>5 && age <=7){
        localRate = 1.697
        if(seatingCapacity<=18){
            localsAdd = 350
        }
        else if(seatingCapacity>18 && seatingCapacity<=36){
            localsAdd = 450
        }
        else if(seatingCapacity>36 && seatingCapacity<=60){
            localsAdd = 550
        }
        else{
            localsAdd = 680
        }
    }
    else{
        console.log("age greater")
        localRate = 1.739
        if(seatingCapacity<=18){
            localsAdd = 350
        }
        else if(seatingCapacity>18 && seatingCapacity<=36){
            localsAdd = 450
        }
        else if(seatingCapacity>36 && seatingCapacity<=60){
            localsAdd = 550
        }
        else{
            localsAdd = 680
        }
    }
    CalculatePremium(localRate,localsAdd)    /* COMMENT THIS */
    console.log("rate "+localRate+localsAdd)

}

  const CalculatePremium = async (rate,sAdd) => {

    const requestData = {
      year: year || null,               // send as string or null
      dueDate: dueDate || null,         // send as string or null
      idv: parseFloat(idv) || 0,
      regno: regno || "",
      rate: parseFloat(rate) || 0,
      sAdd: parseFloat(sAdd) || 0,
      ncb: parseFloat(ncb) || 0,
      discount: parseFloat(discount) || 0,
      seatingCapacity: parseInt(seatingCapacity, 10) || 0,
      legalLiability: parseFloat(legalLiability) || 0,
      po: parseFloat(po) || 0,
      odPremium: parseFloat(odPremium) || 0,
      regYear: regYear || null,
      company:company || null,
      policyType:policyType || null

    };

    try {
        console.log("reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",requestData);
      const response = await fetch("http://127.0.0.1:8000/api/v1/calculationnew/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("resultttttttttttttttttttttttt",data)
      if (response.ok) {
        setResult(data);
        setError("");
        console.log("Calculation Result:", data);
      } else {
        setError("Validation failed: " + JSON.stringify(data));
        setResult(null);
      }
    } catch (err) {
      setError("Network error: " + err.message);
      setResult(null);
    }
  };

  return (
    <div>
        {/* <p>age {yearOnly}</p>
        <p>age {regYear}</p> */}
      {/* ... your existing inputs ... */}

      {/* CSS HERE ONLY */}
      <input  value={regno} onChange={e => setRegNo(e.target.value)} placeholder="regno" />
      <label htmlFor="year">QT Date</label>
      <input type="date" value={year} onChange={e => setYear(e.target.value)} ref={qtDateRef} placeholder="year" />
      <label htmlFor="dueDate">Due Date</label>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="due date" />
      <input className="testnew" value={idv} onChange={e => setIdv(e.target.value)} placeholder="IDV" />
      <input value={ncb} onChange={e => setNcb(e.target.value)} placeholder="ncb" />
      <input value={discount} onChange={e => setDiscount(e.target.value)} placeholder="discount" />
      <input value={seatingCapacity} onChange={e => setSeatingCapacity(e.target.value)} ref={seatingRef} placeholder="seatingCapacity" />
      <input value={legalLiability} onChange={e => setLegalLiability(e.target.value)} placeholder="legalLiability" />
      <input value={po} onChange={e => setPo(e.target.value)} placeholder="po" />
      <input value={company} onChange={e => setCompany(e.target.value)} placeholder="company" />
      <input value={regYear} onChange={e => setRegYear(e.target.value)} ref={regDateRef} placeholder="regYear" />
      <input value={policyType} onChange={e => setPolicyType(e.target.value)} placeholder="policyType: TP or Full cover" />

      <button onClick={()=>calculateRateandSAdd()}>Calculate</button><br />   


      <button style={{marginTop:'20px'}} onClick={()=>navigate("/list")}>list</button>



{/*CSS TO HERE  */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {result && (
        <div>
          <h3>Premium Calculation Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

 
    </div>
  );
}

export default AdminSession;
