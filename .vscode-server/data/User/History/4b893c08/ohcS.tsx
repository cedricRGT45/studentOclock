import React, { useState, useEffect } from "react";

//function that will allow to fetch the data in the json file with no need to repeat the same code in the components
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);

  //to execute a http request
  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      });
  }, [url]);

  //Allowing the data fecth to be displayed in the components if data is not null
  return <>{data && children(data)}</>;
}

export default DataFetcher;