const setLocal = (favList) => {
    localStorage.setItem(
        "countries",
        JSON.stringify(
          favList
        )
      );
}

const getLocal = () => JSON.parse(localStorage.getItem("countries"));

export {setLocal, getLocal}