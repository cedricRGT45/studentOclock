import '../home/navbar/navbar.scss'
import { useFetchAPI } from '../../utils/APIData/useFetchAPI'

interface AccountNavbarProps {
    displayedData: "wizards" | "classes" | "rooms";
    setDisplayedData: (data: "wizards" | "classes" | "rooms") => void;
}

export function AccountNavbar({ displayedData, setDisplayedData }: AccountNavbarProps) {
    const { data, error } = useFetchAPI<wizards[] | rooms[] | subjects[]>({ route: displayedData });

    return (
        <nav className="navbar">
            <ul className="navbar_menu">
                <li
                    className={`navbar_menu-item ${displayedData === 'wizards' ? 'is_active' : ''}`}
                    onClick={() => setDisplayedData('wizards')}
                >
                    Sorciers
                </li>
                <li
                    className={`navbar_menu-item ${displayedData === 'classes' ? 'is_active' : ''}`}
                    onClick={() => setDisplayedData('classes')}
                >
                    Matières
                </li>
                <li
                    className={`navbar_menu-item ${displayedData === 'rooms' ? 'is_active' : ''}`}
                    onClick={() => setDisplayedData('rooms')}
                >
                    Classes
                </li>
            </ul>
        </nav>
    )
}