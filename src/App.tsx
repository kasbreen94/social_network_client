import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {RouterProvider, useMatch, useNavigate} from "react-router-dom";
import {router} from "./router";
import {useStore} from "./store";
import {observer} from "mobx-react-lite";
import {getTokenFromLocalStorage} from "./helpers/localstorage.helper";

const App = observer(() => {



    return <RouterProvider router={router}/>
});

export default App
