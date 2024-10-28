import {createRoot} from 'react-dom/client'
import App from './App.js'
import './index.css'
import {rootStore, StoreProvider} from "./store";
import {router} from "./router";
import {RouterProvider} from "react-router-dom";
import {StyleSheetManager} from "styled-components";
import isValidProp from "@emotion/is-prop-valid";

createRoot(document.getElementById('root')).render(
    <StoreProvider value={rootStore}>
        <StyleSheetManager shouldForwardProp={isValidProp} >
            <RouterProvider router={router}/>
        </StyleSheetManager>
    </StoreProvider>
)
