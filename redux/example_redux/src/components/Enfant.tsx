// redux
import { useAppDispatch } from '../hooks/redux';
import { changeColor, toggle } from '../store/features/theme/themeSlice';


function Enfant() {
    console.log("% ENFANT");

    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(toggle())
    }

    return (
        <div>
            <h2>COMP2</h2>
            <button onClick={ handleToggle }>TOOGLE</button>
            <button onClick={ () => dispatch(changeColor("blue")) }>BLUE</button>
            <button onClick={ () => dispatch(changeColor("yellow")) }>BLUE</button>
        </div>
    )
}

export default Enfant