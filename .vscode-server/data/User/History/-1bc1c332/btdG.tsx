import { useEffect, useState } from 'react'
import { useFetchAPI } from '../../utils/APIData/useFetchAPI'
import { useNavigate, Link } from 'react-router-dom'
import { usePostAPI } from '../../utils/APIData/usePostAPI'
// components
import Logo from '../../assets/logo.png'

// styles
import './role.scss'

interface Role{
    id: number;
    name:string;
    is_staff: boolean;
}

export function Role() {
    const [name] = useState<string>(localStorage.getItem('wizard') || '')
    const {firstname, lastname} = JSON.parse(name || '{}')

    const [token] = useState<string>(localStorage.getItem('wizardToken') || '')
    const { data, error } = useFetchAPI<Role[]>({route: 'wizard-roles', token: token})
    
    const { data: dataPost, error: errorPost, postdata } = usePostAPI<any>()

    const navigate = useNavigate();

    const handleRoleSelection = (roleID:  number) =>{
        const selectedRole = data?.find(role => role.id === roleID)
        console.log("roleID:", selectedRole)
        if (selectedRole) {
            
            postdata('login-role', {id: roleID}, token);

            console.log('POSTAPI', roleID, dataPost, errorPost)
        }
    }

    useEffect(() => {
        if(!dataPost) return;

        if (dataPost.message) {
            console.log('erreur', dataPost)
            return
        }

        localStorage.setItem('role', JSON.stringify(dataPost?.role))
        localStorage.setItem('roleToken', dataPost?.token)

        navigate('/compte')
    }, [dataPost])

    return(
        <div className="roles d-flex-column centered">
            <div className="roles_container_img">
                <img src={Logo} alt="logo de l'application" />
            </div>
            <h2 className="roles__title">Bienvenue {firstname + ' ' + lastname}</h2> 
            <p className="roles__subtitle">Continuer en tant que</p>
            <div className="roles__btn">
                {data?.map((role) => ( 
                    <button 
                        key={role.id}
                        onClick={() => handleRoleSelection(role.id)}
                        className="btn">
                            {role.name}
                    </button> 
                ))}
            </div>  
                <Link to={'/'}>Retour a l'accueil</Link>   
        </div>
    )
}