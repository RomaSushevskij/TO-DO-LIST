import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import style from './InputWithButton.module.css'


export type InputWithButtonPropsType = {
    buttonName: string
    addItem: (inputTitleValue: string) => void
    inputLabel: string
    disabled?: boolean
}

export const InputWithButton = React.memo(({
                                               addItem,
                                               inputLabel,
                                               disabled,
                                           }: InputWithButtonPropsType) => {

    //local state for input
    const [inputTitleValue, setInputTitleValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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

    const onFieldKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }, [onButtonClick]);

    return (
        <div>
            <TextField error={error}
                       onChange={onInputChange}
                       value={inputTitleValue}
                       onKeyPress={onFieldKeyPress}
                       helperText={error ? 'Field is required' : null}
                       size={"small"} id="outlined-basic"
                       label={inputLabel}
                       variant="outlined"
                       disabled={disabled}
                       style={{borderColor: '#6D88B8'}}
                       className={style.textField}/>
            <Fab style={{marginLeft: "15px", backgroundColor: '#6D88B8', color: '#ffffff'}}
                 onClick={onButtonClick}
                 aria-label="add" size={"small"}
                 disabled={disabled}>
                <Add/>
            </Fab>
        </div>
    );
})