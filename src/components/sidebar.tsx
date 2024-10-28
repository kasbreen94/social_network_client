import {Button} from "./UIComponents/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../hooks/useAuth";
import {useStore} from "../store";

const SidebarWrapper = styled.div`
  display: flex;
  height: 500px;
  top: 20px;
  width: 100%;
  position: sticky;
  flex-direction: column;
  gap: 10px;
`

export const Sidebar = () => {

    const {userId, authId} = useAuth()
    const {authStore, profilePostsStore} = useStore();
    const {logout} = authStore
    const {notifications} = profilePostsStore
    const navigate = useNavigate()

    const logoutHandler = async (e) => {
        e.preventDefault();
        await logout();
        navigate('login')
    }

    const location = useLocation().pathname
    const pathName = location.split('/').filter(path => path !== `${userId}`).join('')
    console.log('path',pathName)


    return (
        <SidebarWrapper>
            <Button
                color={notifications.messages.length > 0 ? "green" : ''}
            >
                {notifications.messages.length > 0 ? `Новая публикация на странице ${notifications.messages.length}` : "Нет новых уведомлений"}
            </Button>
            <div style={{display: "flex", gap: '20px'}}>

                <div style={{width: '100%'}}>
                    <Button
                        color={'red'}
                        fullWidth
                        onClick={logoutHandler}>
                        Выйти
                    </Button>
                </div>

                <div style={{width: '100%'}}>
                    <Link to={`${pathName ?? ''}`}>
                        <Button
                            fullWidth
                            color={'blue'}
                        >
                            Профиль
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <Link to={`/${userId === authId ? '' : userId}`}>
                    <Button
                        fullWidth
                        color={pathName === '' ? 'green' : ''}
                    >
                        Посты
                    </Button>
                </Link>
            </div>
            <div>
                <Link to={`/users/${userId === authId ? '' : userId}`}>
                <Button
                    fullWidth
                    color={pathName === 'users' ? 'green' : ''}
                >
                    Пользователи
                </Button>
                </Link>
            </div>


            <div>
                <Link to={`/dialogs`}>
                    <Button fullWidth>
                        Диалоги
                    </Button>

                </Link>
            </div>
        </SidebarWrapper>
    )
}