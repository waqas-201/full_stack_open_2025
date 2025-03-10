import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesName, setCountriesName] = useState([]);
  const [oneCountryName, setOneCountryName] = useState("");
  const [oneCountryDetails, setOneCountryDetails] = useState("");

  const getALlCountriesName = async () => {
    const responce = await axios.get(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );

    const { data } = responce;

    const names = data?.map((d) => {
      return d.name.common;
    });

    setCountriesName(names);
  };

  const getOneCountryName = async (value) => {
    if (!value) {
      return;
    }

    const responce = await axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${value}`
    );
    console.log(responce.data);
    setOneCountryDetails(responce.data);
  };

  // Filter results dynamically during rendering
  const filteredCountries = countriesName.filter((countryName) =>
    countryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getALlCountriesName();
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setOneCountryName(filteredCountries[0]);
    }
  }, [filteredCountries]);

  useEffect(() => {
    getOneCountryName(oneCountryName);
  }, [oneCountryName]);

  return (
    <>
      find Countries:
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many countries</p>
        ) : filteredCountries.length > 1 ? (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
        ) : filteredCountries.length === 1 ? (
          <>
            {oneCountryDetails && (
              <>
                <h2>{oneCountryDetails?.capital[0]}</h2>
                <p>capital {oneCountryDetails?.capital[0]}</p>
                <p>Area {oneCountryDetails?.area}</p>
                <h2>languages</h2>
                <div>
                  <ul>
                    {Object.entries(oneCountryDetails.languages).map(
                      ([code, language]) => (
                        <li key={code}>
                          {code}: {language}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <img src={oneCountryDetails.flags.png} alt="" />
              </>
            )}
          </>
        ) : (
          <p> no countries found </p>
        )}
      </div>
    </>
  );
}

export default App;
