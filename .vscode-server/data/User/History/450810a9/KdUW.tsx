// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeColor, toggle } from '../store/features/theme/themeSlice';


function Enfant() {
    console.log("% ENFANT");

    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(toggle())
    }

    return (
        <div>
            <h2>ENFANT</h2>
            <button onClick={handleToggle}>TOOGLE</button>
        </div>
    )
}

export default Enfant