// import {BoxStyles} from "./box.styles";
import styled from "styled-components";

interface IProp {
    column?: boolean
    fullWidth?: boolean
    width?: string
    padding?: string
    gap?: string
}

export const BoxStyles = styled.div`
  display: flex;
  flex-direction: ${({column}) => column ? "column" : ''};
  width: ${({fullWidth, width = ''}) => fullWidth ? '100%' : width};
  background-color: #2a2a2a;
  box-shadow: 0 0 3px 0 #5e5e5e;
  gap: ${({gap}) => gap ?? '10px'};
  padding: ${({padding}) => padding ?? '10px'};
  border-radius: 5px;
  box-sizing: border-box;
`

export const Box = (props: IProp) => {
    return (
        <BoxStyles {...props}/>
    )
}