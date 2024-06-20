import { useState } from "react";

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
                <Erro
            ) }
        </div>
    )
}

export default FakeRoute;