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
                          ...props
                      }: InputPropsType) => {

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitleValue(event.currentTarget.value);
        setError(false);
    };

    const onKeyPressAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
        <input className={styles} onChange={onChangeInput} value={inputTitleValue}
               onKeyPress={onKeyPressAddTaskHandler}/>
    )
});