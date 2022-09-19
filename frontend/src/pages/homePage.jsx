import React, { useState, useEffect } from "react";
import axios from "axios";
import "currency-flags/dist/currency-flags.css";
import "./homePage.scss";
import image from "../assets/images/exchange-icon.png";

const HomePage = () => {
  const [amount, setAmount] = useState(""); // the amount the user wants to convert
  const [allCurrencies, setAllCurrencies] = useState({}); //all the currencies available for user to choose from
  const [currencySelected, setCurrencySelected] = useState("USD"); //currency user selected from the dropdown	
  const [converted, setConverted] = useState(""); //final fee after conversion

  useEffect(() => {
		// Get the list of currencies from the backend server
    axios({
      method: "get",
      url: "http://localhost:8080/currencies",
    })
      .then((res) => {
        setAllCurrencies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

	/**
	 * Convert currency from AUD to the selected currency
	 */
  const convert = () => {
		// Get the rates of the currency selected by the user and convert
    axios({
			method: "get",
			url: "http://localhost:8080/rates",
		})
		.then((res) => {
			Object.keys(res.data).map((key) => {
				if(key === currencySelected) {
					return setConverted((amount * res.data[key]).toFixed(2));
				}
			})
		})
		.catch((err) => {
			console.log(err)
		})
  };

  return (
    <div className="container d-flex justify-content-around">
      <div className="content left-text">
        <h1>
          A currency converter for quick view and comparison of live current
          exchange rates between all globally recognized currencies and the
          Australian Dollar.
        </h1>
      </div>

      <div className="shadow p-3 mb-5 bg-white rounded content">
        <h2>Currency Converter</h2>
        <div>
					<label className="" htmlFor="amount">Amount</label>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="amount"
              id="amount"
              onChange={(e) => {
                setAmount(e.target.value);
                setConverted("");
              }}
            />
          </div>
        </div>

        <div className="d-flex flex-column">
          <div>
            <div className="">From</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="initial">
                  <div className="currency-flag currency-flag-aud" />
                </label>
              </div>
              <select className="custom-select" id="initial" disabled>
                <option value="aud">AUD - Australian Dollar</option>
              </select>
            </div>
          </div>

          <img className="image" src={image} alt="to" />

          <div>
            <div className="">To</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  htmlFor="to"
                >
                  <div
                    className={`currency-flag currency-flag-${currencySelected.toLowerCase()}`}
                  />
                </label>
              </div>
              <select
                className="custom-select"
                id="to"
                onChange={(e) => {
                  setCurrencySelected(e.target.value);
                  setConverted("");
                }}
              >
                { //show all the currencies available for the user to selected except AUD								
									Object.keys(allCurrencies).map((key) => {
										if(key !== "AUD") {
											return (
												<option key={key} value={key} selected={key === "USD"}>
													{key} - {allCurrencies[key]}
												</option>
											);
										}                  
                	})
								}
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex justify convert">
          <button
            className="btn btn-primary"
            onClick={() => convert()}
            disabled={!amount}
          >
            Convert
          </button>

          {amount && converted ? (
            <div className="output">
              {amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AUD ={" "}
              {converted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              {currencySelected}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
