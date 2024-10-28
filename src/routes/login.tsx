import {observer} from "mobx-react-lite";
import {useStore} from "../store";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {Box} from "../components/UIComponents/Box/box";
import {Button} from "../components/UIComponents/Button/Button";


export const Login = observer(() => {

    const {authStore} = useStore();
    const {getAuthMe} = authStore

    const [email, setEmail] = useState('defaultend@gmail.com');
    const [password, setPassword] = useState('Chrome7896321');

    const {login, isAuth} = useAuth();
    const navigate = useNavigate()

    const loginHandler = (e) => {
        e.preventDefault()
        login({email, password})
    }

    useEffect(() => {
        if(!isAuth) {
            getAuthMe()
        }
        console.log(isAuth)
        if(isAuth) {
            navigate('/')
        }
    }, [isAuth]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Box>
            <form style={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px', width: '300px'}}>
                <Box>
                    <input
                        autoComplete={"on"}
                        placeholder={'email'}
                        // type={"email"}
                        // value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </Box>
                <Box>
                    <input
                        placeholder={'password'}
                        type={"password"}
                        // value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </Box>

                <Button color={'green'} onClick={loginHandler}>Log In</Button>
            </form>
        </Box>
        </div>
    )
})