import React, {FC, useState} from "react";
import styles from "./Tabs.module.css"
import {NavLink, useMatch, useParams} from "react-router-dom";
import {Button} from "../Button/Button";

type tabTypes = {
    id: string | number
    label: string
    route?: string
}

type propTypes = {
    // id: string | number
    // label: string
    typeComponent?: 'Navlink'
    activeTab?: string | number
    tabs: tabTypes[]
    setActiveTab?: (id: string | number) => void
    column?: boolean
}

export const Tabs: FC<propTypes> = ({activeTab, tabs, setActiveTab, typeComponent, column}) => {

    const [animationTab, setAnimationTab] = useState(false)

    const startAnimationTab = () => {
        if (!animationTab) {
            setAnimationTab(true)
        }
    }

    const handleTabClick = (id: string | number) => {
        if (setActiveTab) {
            setActiveTab(id)
        }
        startAnimationTab()
    }

    const classesTab = `
            ${styles.tabs}
            ${column && styles.column}
        `


    return (
        <div className={classesTab}>
            {tabs && tabs.map(tab => (
                <div key={tab.id}>
                    {!typeComponent &&
                        <Button key={tab.id}
                                fullWidth={column}
                                color={activeTab === tab.id ? 'green' : ''}
                            // className={classesTab(tab.id)}
                                onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </Button>

                    }
                    {typeComponent === 'Navlink' &&
                        <NavLink
                            to={`/${tab.route}`}
                            key={tab.id}
                            className={classesTab}
                            onClick={() => startAnimationTab()}
                        >
                            {tab.label}
                        </NavLink>
                    }
                </div>
            ))}
        </div>
    )
}