import React from "react";

export type ButtonPropsType = {
    name: string
    onClick: () => void
    activeStyle?: string
}


export const Button = React.memo(({
                           name,
                           onClick,
                           activeStyle, ...props
                       }: ButtonPropsType) => {

    const onButtonClick = () => {
        onClick()
    };

    return (
        <button className={activeStyle} onClick={onButtonClick}>{name}</button>
    )
});