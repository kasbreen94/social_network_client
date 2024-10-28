import React, {FC, HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, useRef} from "react";
import styles from "./Textarea.module.css"

type InputElement = 'input' | 'textarea';
type InputChangeEvent = React.ChangeEvent<InputElement>

type FieldTypes = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

type propTypes = {
    multiline?: boolean
    value: string | number
    onChange: (e: FieldTypes) => void
    label?: string
    // rows?: number
    // maxLength?: number
    // placeholder?: string
}

export const Textarea:FC<propTypes> = (
    {
        multiline = false,
        label,
        // maxLength,
        // placeholder,
        ...attrs
    }) => {

    const InputElement = multiline ? 'textarea' : 'input'
    const stylesTextField = [
        multiline ? styles.textarea : styles.input,

    ].join('')

    return (
        <>
            <label>{label}</label>
            <InputElement
                className={stylesTextField}
                // placeholder={placeholder}
                // maxLength={maxLength}
                {...attrs}
            />
        </>
    )
}