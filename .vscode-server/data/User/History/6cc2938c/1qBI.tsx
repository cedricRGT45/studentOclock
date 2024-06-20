import fetchDataWithDelay from "../../../api/fetchDataWithDelay";

const resource = fetchDataWithDelay('/fake-route'); 

const FakeContent = () => {
    const data = resource.read();

    return (
        <div className="fake-content">
            { JSON.stringify(data) }
        </div>
    )
}

export default FakeContent;