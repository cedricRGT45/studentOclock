import fetchData from "./fetchData";
import wrapPromise from "./wrapPromise";

type Endpoint = `/${string}`;

export default function fetchDataWithDelay<T>(endpoint: Endpoint) {
    const delayedPromise = new Promise((resolve) => setTimeout(resolve, 5000))
        .then(async () => {
            return await fetchData<T>(endpoint);
        });

    return wrapPromise<T>(delayedPromise);
}