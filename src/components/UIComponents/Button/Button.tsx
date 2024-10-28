import React, {ButtonHTMLAttributes, FC, TextareaHTMLAttributes, useState} from "react";
import "./Button.scss"

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
    // onClick?: () => void
    fullWidth?: boolean
    active?: boolean
    color?: 'red' | 'blue' | 'green' | ''
    clickEffect?: boolean

}

export const Button: FC<ButtonProps> = ({children, color, active, fullWidth = false, clickEffect, ...attrs}) => {

    const classesButton = `
        button
        ${fullWidth && 'button-fullWidth'}
        ${active && 'button-active'}
        ${color && `button-color_${color}`}
        
    `

    return (
        <button
            className={classesButton}
            // onClick={onClick}
            {...attrs}
            >
            {children}
        </button>
    )
}