import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {Fab, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";


export type InputWithButtonPropsType = {
    buttonName: string
    addItem: (inputTitleValue: string) => void
    inputLabel: string

}

export const InputWithButton = React.memo(({
                                               addItem,
                                               inputLabel,
                                               ...props
                                           }: InputWithButtonPropsType) => {

    //local state for input
    const [inputTitleValue, setInputTitleValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputTitleValue(event.currentTarget.value);
        if (error) {
            setError(false);
        }

    }, [error]);

    //functionality for button
    const onButtonClick = useCallback(() => {
        if (inputTitleValue.trim()) {
            addItem(inputTitleValue.trim());
            setInputTitleValue('')
        } else {
            setError(true)
        }
    }, [addItem, inputTitleValue]);
    const onKeyPressAddTaskHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }, [onButtonClick]);
    return (
        <div>
            {/*<input className={error ? style.error : style.addTaskInput}
            onChange={onChangeInput} value={inputTitleValue}
                   onKeyPress={onKeyPressAddTaskHandler}/>*/}
            <TextField error={error}
                       onChange={onChangeInput} value={inputTitleValue}
                       onKeyPress={onKeyPressAddTaskHandler}
                       helperText={error ? 'Field is required' : null}
                       size={"small"} id="outlined-basic"
                       label={inputLabel}
                       variant="outlined"/>
            {/*<button onClick={onButtonClick}>{buttonName}</button>*/}
            <Fab style={{marginLeft: "15px"}}
                 onClick={onButtonClick} color="primary"
                 aria-label="add" size={"small"}>
                <Add/>
            </Fab>
        </div>
    );
})