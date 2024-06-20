import { useState } from "react";
import ErrorBoundary from "../Content/Products/ErrorBoundary";

const FakeRoute = () => {
    const [callApi, setCallApi] = useState(false);

    return (
        <div className="fake-route">
            <button
                type="button"
                onClick={() => setCallApi(true)}
            >
                S'abonner à la newsletter
            </button>

            { callApi && (
                <ErrorBoundary
            ) }
        </div>
    )
}

export default FakeRoute;