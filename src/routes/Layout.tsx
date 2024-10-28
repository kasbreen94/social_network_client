import styled from "styled-components";
import {observer} from "mobx-react-lite";
import {useStore} from "../store";
import {useEffect, useState} from "react";
import {Link, Navigate, Outlet, redirect, useMatch, useNavigate} from "react-router-dom";
import {Users} from "./users";
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper";
import {Button} from "../components/UIComponents/Button/Button";
import {useAuth} from "../hooks/useAuth";
import {Sidebar} from "../components/sidebar";
import {Profile} from "./profile";
import {useConnectSocket} from "../hooks/useConnectSocket";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  grid-gap: 10px;
  margin: 0 auto;
  justify-content: center;
  padding: 10px;
`
const SidebarWrapper = styled.div`
  position: relative;
  //flex-direction: row;
  gap: 10px;
  //align-items: flex-start;
  //box-shadow: 0 0 5px 1px black;
  //border-radius: 5px;
  padding: 10px;
`


const ProfileWrapper = styled.div`
  
`

export const Layout = observer(() => {

    const {isAuth, authId, userId} = useAuth()

    const {authStore} = useStore();
    const {getAuthMe, logout} = authStore
    const navigate = useNavigate()

    const [appInitialized, setAppInitialized] = useState(false)

    useEffect(() => {
        // Promise.all([getAuthMe()]).then(() => setAppInitialized(true))
        const token = getTokenFromLocalStorage()
        if (token) {
            Promise.all([getAuthMe()]).then(() => setAppInitialized(true))
            console.log('me')
        } else {
            logout()
            redirect('/login')
        }
    }, []);

    useConnectSocket(userId, authId)

    if (!appInitialized) {
        return;
    }
    return (
        <Wrapper>
            <Profile />
            <div style={{display: 'grid', gridTemplateColumns: 'auto 250px', gap: '15px'}}>
                <Outlet/>
                <Sidebar/>
            </div>
        </Wrapper>
    )
});