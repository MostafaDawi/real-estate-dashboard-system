import React, { useEffect, useState } from "react";
import "./Page_Layout.css";
import { usePredict } from "../../Functions/apiLogic";

export const Ask_AI = ({ isElectron = false }) => {
  const initialTransState = {
    Year: "",
    Month: "",
    City: "Beirut",
    Transaction_Number: "",
  };

  const initialPropState = {
    City: "",
    District: "",
    Province: "",
    Type: "",
    Size_m2: "",
    Bedrooms: "",
    Bathrooms: "",
  };
  const [formData, setFormData] = useState(initialPropState);
  const [formDataTran, setFormDataTran] = useState(initialTransState);
  const [prediction, setPrediction] = useState(null);
  const [predictionTran, setPredictionTran] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [predPropMsg, setPredPropMsg] = useState("");
  const [predTranMsg, setPredTranMsg] = useState("");

  const {
    mutate: predict,
    data,
    isPending,
    error,
    isError,
    isSuccess,
  } = usePredict();

  const {
    mutate: predictTran,
    data: dataTran,
    isPending: isPendingTran,
    error: errorTran,
    isError: isErrorTran,
    isSuccess: isSuccessTran,
  } = usePredict();

  useEffect(() => {
    if (data) {
      console.log(data, formData);
      setPrediction(data.prediction.toFixed(1));
      setFormData(initialPropState);
    }
    // Wait for state to update
    setTimeout(() => {
      setPredPropMsg(
        (prev) => `Predicted property price: $${data?.prediction.toFixed(0)}`
      );
    }, 0); // This ensures it happens AFTER state updates

    const timer = setTimeout(() => {
      setPrediction(null);
      setPredPropMsg("");
    }, 8000);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (dataTran) {
      console.log(dataTran, formDataTran);
      setPredictionTran(dataTran.prediction.toFixed(1));
      setFormDataTran(initialTransState);
    }

    // Wait for state to update
    setTimeout(() => {
      setPredTranMsg(
        (prev) =>
          `Predicted average transaction value: ${dataTran?.prediction.toFixed(
            1
          )}`
      );
    }, 0); // This ensures it happens AFTER state updates

    const timer = setTimeout(() => {
      setPredictionTran(null);
      setPredTranMsg("");
    }, 8000);

    return () => clearTimeout(timer);
  }, [dataTran]);

  // Handle change in property data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle submit in property data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(formData).some((value) => value === "")) {
      predict({
        endpoint: "predict_property",
        data: formData,
      });
      setFormData(initialPropState);
      setErrorMsg("");
    } else {
      setErrorMsg("No field can be empty!");
    }
  };

  // Handle change in transaction data
  const handleChangeTran = (event) => {
    const { name, value } = event.target;
    setFormDataTran({
      ...formDataTran,
      [name]: value,
    });
  };

  // Handle submit in transaction data
  const handleSubmitTran = (e) => {
    e.preventDefault();
    if (!Object.values(formDataTran).some((value) => value === "")) {
      predictTran({
        endpoint: "predict_transaction",
        data: formDataTran,
      });
      setFormDataTran(initialTransState);
      setErrorMsg("");
    } else {
      setErrorMsg("No field can be empty!");
    }
  };
  return (
    <div
      className={`dashboard-layout ${isElectron ? "electron" : "no-electron"}`}
    >
      <div className="dashboard-content">
        <div className="title">
          <h1>Ask AI</h1>
        </div>
        <div className="section">
          <div className="dashboard-components">
            {/* PROPERTY MODEL : LGBMRegressor */}
            <div className="form-card">
              <form method="post" noValidate onSubmit={handleSubmit}>
                <h1>Property Price Prediction</h1>
                <hr />
                <div>
                  <h3>Enter City Name:</h3>
                  <input
                    type="text"
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter District Name:</h3>
                  <input
                    type="text"
                    name="District"
                    value={formData.District}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter Province Name:</h3>
                  <input
                    type="text"
                    name="Province"
                    value={formData.Province}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter Type:</h3>
                  <input
                    type="text"
                    name="Type"
                    value={formData.Type}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter Area in m2:</h3>
                  <input
                    type="number"
                    name="Size_m2"
                    value={formData.Size_m2}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter Bedrooms:</h3>
                  <input
                    type="number"
                    name="Bedrooms"
                    value={formData.Bedrooms}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter Bathrooms:</h3>
                  <input
                    type="number"
                    name="Bathrooms"
                    value={formData.Bathrooms}
                    onChange={handleChange}
                    style={{ height: "25px" }}
                  />
                </div>
                <button type="submit" value="Predict Price">
                  {isPending ? "Submitting.." : "Predict Price"}
                </button>
              </form>
              <div className="price-region">
                {isError && <p style={{ color: "red" }}>{error.message}</p>}
                {isSuccess && <h2 style={{ color: "green" }}>{predPropMsg}</h2>}
                {errorMsg && (
                  <h2 style={{ color: "red" }}>
                    Error: <h3>{errorMsg}</h3>
                  </h2>
                )}
              </div>
            </div>

            {/* TRANSACTION MODEL : LGBMRegressor */}
            <div className="form-card">
              <form method="post" noValidate onSubmit={handleSubmitTran}>
                <h1>Transaction Prediction</h1>
                <hr />

                <div>
                  <h3>Enter Year:</h3>
                  <input
                    type="number"
                    name="Year"
                    value={formDataTran.Year}
                    onChange={handleChangeTran}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter Month:</h3>
                  <input
                    type="number"
                    name="Month"
                    value={formDataTran.Month}
                    onChange={handleChangeTran}
                    style={{ height: "25px" }}
                  />
                </div>
                <div>
                  <h3>Enter City Name:</h3>
                  {/* <input
                    type="text"
                    name="City"
                    value={formDataTran.City}
                    onChange={handleChangeTran}
                    style={{ height: "25px" }}
                  /> */}
                  <select
                    name="City"
                    id="City"
                    onChange={handleChangeTran}
                    value={formDataTran.City}
                    style={{ height: "25px" }}
                  >
                    <option value="Beirut">Beirut</option>
                    <option value="Baabda, Aley, Chouf">
                      Baabda, Aley, Chouf
                    </option>
                    <option value="Bekaa">Bekaa</option>
                    <option value="Tripoli, Akkar">Tripoli, Akkar</option>
                    <option value="Kesrouan, Jbeil">Kesrouan, Jbeil</option>
                  </select>
                </div>
                <div>
                  <h3>Enter Transaction Number:</h3>
                  <input
                    type="number"
                    name="Transaction_Number"
                    value={formDataTran.Transaction_Number}
                    onChange={handleChangeTran}
                    style={{ height: "25px" }}
                  />
                </div>
                {/* <p>
                  {formDataTran.Year}, {formDataTran.Month}, {formDataTran.City}
                  , {formDataTran.Transaction_Number}
                </p> */}
                <button type="submit" value="Predict Price">
                  {isPendingTran ? "Submitting.." : "Predict Price"}
                </button>
              </form>
              <div className="price-region">
                {isErrorTran && (
                  <p style={{ color: "red" }}>{errorTran.message}</p>
                )}
                {isSuccessTran && (
                  <h2 style={{ color: "green" }}>{predTranMsg}</h2>
                )}
                {errorMsg && (
                  <h2 style={{ color: "red" }}>
                    Error: <h3>{errorMsg}</h3>
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask_AI;
