import { useAppSelector } from '../hooks/redux';
import { RootState } from '../store';

function Parent() {
    console.log("% PARENT");

    // lire le state

    // ! Le sélecteur abonne le composant à la partie du state qu'il retourne
    // => la bonne pratique consiste à ne retourner qu'une valeur par sélecteur pour gérer de manière préciser les parties du state auxquelle son abonne le composant
    const isDark = useAppSelector((state: RootState) => state.theme.isDark)
    const color = useAppSelector((state: RootState) => state.theme.mainColor)


    return (
        <div>
            <h1>COMP1</h1>
            { isDark && <h1>DARK !</h1> }

            { color }
        </div>
    )
}

export default Parent