import React, { useState, useEffect } from "react";
import "./App.css";
import Heading from "./components/Heading";
import Button from "./components/Button";
import axios from "axios";
function App() {
  const [inputFields, setInputFields] = useState([
    { link: "", st: "", et: "" },
  ]);
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);
  const handleClick = () => {
    let newField = { link: "", st: "", et: "" };
    setInputFields([...inputFields, newField]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    axios
      .post("https://csg-backend-8fx4.onrender.com/submitform", {
        inputFields,
        email,
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const isFormDataValid = () => {
    return (
      email !== "" &&
      inputFields.every(
        (item) => item.link !== "" && item.st !== "" && item.et !== ""
      )
    );
  };
  useEffect(() => {
    setFormValid(isFormDataValid());
  }, [inputFields, email]);

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  return (
    <div className="container">
      <Heading />

      <div>
        <form onSubmit={handleSubmit}>
          <label className="text">
            Email-ID (You'll receive your mp3 file on this email-ID)
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="abc@gmail.com"
            name="email"
            onChange={handleEmailChange}
          ></input>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <div className="mb-3 my-4">
                  <div className="row">
                    <div className="col-sm-1 my-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="text col-sm-2"
                      >
                        Link
                      </label>
                    </div>
                    <div className="col-sm-1 my-1">
                      <Button
                        title="???"
                        handleClick={() => removeFields(index)}
                        formValid={true}
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    name="link"
                    value={input.link}
                    onChange={(event) => handleFormChange(index, event)}
                    required
                    placeholder="Youtube Link"
                  />
                  <div className="row g-3">
                    <div className="col-sm-1">
                      <label className="text">Start Time</label>
                      <input
                        className="form-control"
                        type="text"
                        name="st"
                        value={input.st}
                        onChange={(event) => handleFormChange(index, event)}
                        required
                        placeholder="0"
                      />
                    </div>
                    <div className="col-sm-1">
                      <label className="text">End Time</label>
                      <input
                        className="form-control"
                        type="text"
                        name="et"
                        value={input.et}
                        onChange={(event) => handleFormChange(index, event)}
                        required
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Button handleClick={handleClick} title="Add" formValid={true} />
          <div className="App">
            <Button
              handleClick={handleSubmit}
              title="Submit"
              formValid={formValid}
            />
          </div>
        </form>
      </div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
  );
}

export default App;
