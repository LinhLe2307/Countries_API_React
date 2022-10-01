import React from "react";

const text = () => {
  return (
    <div>
      <h1>{name.common}</h1>

      <img
        src={flags.png}
        alt={`${name.common}`}
        style={{ margin: "1.5rem 0" }}
      />

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: "1.5rem" }}
      >
        {/* ----------------LANGUAGES ------------------ */}
        <Grid item xs={2} sm={4} md={4}>
          <h3 className="center">Languages</h3>
          {languages &&
            Object.values(languages).map((language, i) => (
              <p key={i} className="center">
                {language}
              </p>
            ))}
          {/* </ul> */}
        </Grid>

        {/* ----------------CURRENCIES ------------------ */}
        <Grid item xs={2} sm={4} md={4}>
          <ul>
            <h3 className="center">Currencies</h3>
            {currencies &&
              Object.values(currencies).map((currency, i) => (
                <p key={i} className="center">{`${currency.name}`}</p>
              ))}
          </ul>
        </Grid>
        {/* ----------------BORDERS ------------------ */}
        <Grid item xs={2} sm={4} md={4}>
          <h3 className="center">Borders</h3>
          {bordersList(borderCountries)}
        </Grid>
      </Grid>

      {/* ----------------WEATHER ------------------ */}
      <h2>Weather</h2>
      {weathers.map((weather, i) => (
        <div key={i}>
          <h3 className="center">
            {weather.data.name === name.common ? "Country" : "Capital"} :{" "}
            {weather.data.name}
          </h3>
          <div>
            {weather.data.weather.map((obj, index) => (
              <li key={index} className="flex-box">
                {obj.main}
                <img
                  src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}
                />
              </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default text;
