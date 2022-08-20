import React from "react";
import { Link } from "react-router-dom";
import classes from "./CountryCard.module.css";

const numberFormatter = (num) => {
  if(num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + ' G'
  }
  if(num >= 1000000) {
    return (num / 1000000).toFixed(2) + ' M'
  }
  if(num >= 10000) {
    return (num / 10000).toFixed(2) + ' K'
  }
}

const CountryCard = ({ country, countries }) => {
  const { languages, name, currencies, flags, capital, population } = country;
  const urlName = name.common.replaceAll(" ", "-");

  return (
    <div className={`${classes.card}`}>
      <Link
        to={`${urlName}`}
        state={{
          country: country,
          countries: countries,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1604549944235-3e5579b15cc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          className={`${classes.image}`}
          alt={`${name.common}`}
        />
      </Link>

      <h1>{name.common}</h1>
      <div className={`${classes.context}`}>
        <div>
          LANGUAGES
          <ul>
            {languages &&
              Object.values(languages).map((language, i) => (
                <li key={i}>{language}</li>
                ))}
          </ul>
        </div>
        <div>
          CURRENCIES
          <ul>
            {currencies &&
              Object.values(currencies).map((currency, i) => (
                <li key={i}>{`${currency.name}`}</li>
              ))}
          </ul>
        </div>
        <img
          src={flags.png}
          className={`${classes.flag}`}
          alt={`${name.common}`}
        />
        <div>
          POPULATION 
          <p>{numberFormatter(population)}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
