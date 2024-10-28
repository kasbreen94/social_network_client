import {createBrowserRouter} from "react-router-dom";
import {Profile} from "../routes/profile";
import {Dialog} from "../routes/dialog";
import {Login} from "../routes/login";
import {Layout} from "../routes/Layout";
import {Posts} from "../components/posts";
import {Users} from "../routes/users";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // {
            //     path: "/",
            //     element: <Profile />
            // },
            {
                path: "/:userId?",
                element: <Posts />
            },
            {
                path: "/users/:userId?",
                element: <Users />
},
            // {
            //     path: "/users/:userId",
            //     element: <Profile />
            // },
            {
                path: "/dialogs",
                element: <Dialog/>,
            },
            {
                path: "/dialogs:userId",
                element: <Dialog/>,
            },

        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])