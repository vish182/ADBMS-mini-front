import React, {useEffect, useState} from 'react';
import grid_big from '../assets/home-grid-big.jpg';
import { getPrediction } from '../api';
import GaugeChart from 'react-gauge-chart'
import ReactSpeedometer from "react-d3-speedometer"

import { ContactMethod } from '../components/Footer';



// import '../styles/home.css';
import '../styles/contactform.css';
import '../styles/about.css';

export const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const chartStyle = {
      height: 250,
    }
    

    return(
        <div>
            <ContactImage/>
            <ContactMiddle/>
            
        </div>
    );
}
const gaugeDiv = ({score}) => {

//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     //window.scrollTo(0,document.body.scrollHeight);
//     document.getElementById("anchor").scrollIntoView();
// }, [visible]);

  return(
    <>
      {/* <button id="anchor" onClick={()=>{setVisible(!visible)}}>toggle</button> */}
      <div id="gauge-chart">
          <div id="gauge-chart" className="gauge-parent">
                  <h1>Your Results: </h1>
                  {/* <GaugeChart id="gauge-chart1" /> */}
                  <ReactSpeedometer maxValue={100}
                    width={1000}
                    height={700}
                    forceRender={true}
                    value={score}
                    />
          <div>
            <h1>You have a {score}% chance to get in!!!</h1>
          </div>
            </div>
            
      </div>
      
      
    </>
  );
}

const ContactImage = () => {
    return(
        <div className="about-header" style={{backgroundImage: `url(${grid_big})` }}>
            <p className="about-text-big"> Make a Prediction! </p>
        </div>
    );
}
// style={{transform: 'translateY(50%)'}}
const ContactMiddle = () => {
    return(
        <div className="contact-middle">
            <ContactForm/>
            {/* <ContactMethod styling="contact-div"/> */}
        </div>
    );
}




 const ContactForm = () => {

  const [filters, setFilters] = useState({
    gre: 0,
    toefl: 0,
    uniRating: 0,
    sop: 0,
    lor: 0,
    research: false,
    cgpa: 0,

  });

  const [visible, setVisible] = useState(false);

  const [result, setResult] = useState(0);

  useEffect(() => {
      //window.scrollTo(0,document.body.scrollHeight);
      document.getElementById("anchor").scrollIntoView();
  }, [visible]);


  const handleChange = (fieldName) => {
    // higher order function
    return (event) => {
      let value;
      value = event.target.value;
  
      setFilters({ ...filters, [fieldName]: value });
    };
  };

  const handleResearchDrop = (e) => {
    setFilters({ ...filters, research: e.target.value });
  };

  const researchDrop = () => {
    return (
      <div>
        <select className="input-field" style={{marginTop:"5px"}} onChange={handleResearchDrop}>
          <option value={0}>Select</option>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>
      </div>
    );
  };

  function submitForm(e) {
    e.preventDefault();

    getPrediction({filters: filters})
    .then((data)=>{
      console.log("response: ", data);
      setResult(data);
      setVisible(true);
    });

    //e.target.reset();
  }

  return (
      <div style={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
      {/* {JSON.stringify(filters)}
      {JSON.stringify(research)} */}
    <form className="contact-form" onSubmit={submitForm}>
      <div className="form-header"> <p>Scores and Details</p> </div>
      <div className="form-field-smalls">
        <div className="form-field">
            <label>GRE Score</label>
            <input className="input-field" type="text" name="from_name" onChange={handleChange("gre")}/>
        </div>
        <div className="form-field">
            <label>TOEFL Score</label>
            <input className="input-field" type="text" name="phone" onChange={handleChange("toefl")}/>
        </div>
      </div>
      <div className="form-field-smalls">
        <div className="form-field">
          <label>SOP</label>
          <input className="input-field" type="text" name="from_email" onChange={handleChange("sop")}/>
        </div>
        <div className="form-field">
          <label>LOR</label>
          <input className="input-field" type="text" name="from_email" onChange={handleChange("lor")}/>
        </div>
      </div>
      <div className="form-field-smalls">
        <div className="form-field">
          <label>CGPA</label>
          <input className="input-field" type="text" name="from_email" onChange={handleChange("cgpa")}/>
        </div>
        <div className="form-field">
          <label>University Rating</label>
          <input className="input-field" type="text" name="from_email" onChange={handleChange("uniRating")}/>
        </div>
      </div>
      <div className="form-field">
          <label>Research</label>
          {researchDrop()}
        </div>
      <div className="form-button">
        <input type="submit" value="Submit" />
      </div>
      <div id="anchor"></div>
    </form>
    {visible && gaugeDiv({score: result})}
    </div>
  );
}


