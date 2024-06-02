import Enfant from "./Enfant"

function Parent() {
    console.log("% PARENT");
    
    return (
        <div>
            <h1>PARENT</h1>
            <Enfant />
        </div>
    )
}

export default Parent