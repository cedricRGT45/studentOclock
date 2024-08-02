import '../home/navbar/navbar.scss'

interface AccountNavbarProps {
    displayedData: "wizards" | "subjects" | "rooms";
    setDisplayedData: (data: "wizards" | "subjects" | "rooms") => void;
}

export function AccountNavbar({ displayedData, setDisplayedData }: AccountNavbarProps) {
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
                    className={`navbar_menu-item ${displayedData === 'subjects' ? 'is_active' : ''}`}
                    onClick={() => setDisplayedData('subjects')}
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
