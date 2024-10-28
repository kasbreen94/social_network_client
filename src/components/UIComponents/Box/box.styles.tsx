import styles from "./box.module.scss";
import styled from "styled-components";
import React, {FC, ReactElement, ReactNode} from "react";

interface IProp {
    column?: boolean
    fullWidth?: boolean
    width?: string
}

export const BoxStyles = styled.div<IProp>`
  display: flex;
  flex-direction: ${({column}) => column ? "column" : ''};
  width: ${({fullWidth, width = ''}) => fullWidth ? '100%' : width};
  background-color: #2a2a2a;
  box-shadow: 0 0 3px 0 #5e5e5e;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
`