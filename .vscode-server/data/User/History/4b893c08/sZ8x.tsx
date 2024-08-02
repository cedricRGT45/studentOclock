import React, { useState, useEffect, ReactNode } from "react";

interface DataFetcherProps {
  url: string;
  children: (data: any) => ReactNode;
}

function DataFetcher({ url, children }: DataFetcherProps) {
  const [data, setData] = useState<any>(null);

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

  return <>{data && children(data)}</>;
}

export default DataFetcher;

