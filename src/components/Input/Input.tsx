import React, {ChangeEvent, KeyboardEvent} from "react";

export type InputPropsType = {
    inputTitleValue: string
    setInputTitleValue: (inputTitleValue: string) => void
    callback: () => void
    setError: (error: boolean) => void
    styles: string

}

export const Input = React.memo(({
                                     setInputTitleValue,
                                     inputTitleValue,
                                     callback, styles,
                                     setError,
                                 }: InputPropsType) => {

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitleValue(event.currentTarget.value);
        setError(false);
    };

    const onInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (inputTitleValue.trim()) {
                callback();
                setInputTitleValue('')
            } else {
                setError(true)
            }
        }
    };

    return (
        <input className={styles}
               onChange={onInputChange}
               value={inputTitleValue}
               onKeyPress={onInputKeyPress}/>
    )
});