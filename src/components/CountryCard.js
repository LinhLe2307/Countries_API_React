import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./CountryCard.module.css";
const CountryCard = ({ country }) => {
  const { languages, name, currencies, flags } = country;
  const languagesList = languages && Object.values(languages);
  const currenciesList = currencies && Object.values(currencies);

  return (
    <div className={`${classes.card}`}>
      <Link
        to={`${name.common}`}
        state={{
          languages: languages,
          name: name,
          currencies: currencies,
          flags: flags,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1604549944235-3e5579b15cc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          className={`${classes.image}`}
        />
      </Link>

      <h1>{name.common}</h1>
      <ul>
        Languages
        {languages &&
          Object.values(languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        {/* {languages &&
          languagesList.map((language, i) => <li key={i}>{language}</li>)} */}
      </ul>
      <ul>
        Currencies
        {/* {currencies &&
          currenciesList.map((currency, i) => (
            <li key={i}>{`${currency.name}`}</li>
          ))} */}
        {currencies &&
          Object.values(currencies).map((currency, i) => (
            <li key={i}>{`${currency.name}`}</li>
          ))}
      </ul>

      <img src={flags.png} className={`${classes.flag}`} />
    </div>
  );
};

export default CountryCard;
