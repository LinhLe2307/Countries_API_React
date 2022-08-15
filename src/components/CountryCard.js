import React from "react";
import { Link } from "react-router-dom";
import classes from "./CountryCard.module.css";
const CountryCard = ({ country }) => {
  const { languages, name, currencies, flags, capital, population } = country;
  return (
    <div className={`${classes.card}`}>
      <Link
        to={`${name.common}`}
        state={{
          country: country,
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
        <ul>
          LANGUAGES
          {languages &&
            Object.values(languages).map((language, i) => (
              <li key={i}>{language}</li>
            ))}
        </ul>
        <ul>
          CURRENCIES
          {currencies &&
            Object.values(currencies).map((currency, i) => (
              <li key={i}>{`${currency.name}`}</li>
            ))}
        </ul>

        <img
          src={flags.png}
          className={`${classes.flag}`}
          alt={`${name.common}`}
        />
        <p>POPULATION {population}</p>
      </div>
    </div>
  );
};

export default CountryCard;
