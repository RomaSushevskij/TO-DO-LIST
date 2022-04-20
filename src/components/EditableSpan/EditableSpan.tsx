import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    title: string
    updateTitle: (newTitle: string) => void
    labelInput: string
}

export const EditableSpan = React.memo(({
                                            title,
                                            updateTitle,
                                            labelInput,
                                        }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [spanTitle, setSpanTitle] = useState(title);
    const [error, setError] = useState<boolean>(false);
    const onDoubleClickHandler = () => {
        setEditMode(true);
    };

    const onBlurHandler = useCallback(() => {
        if (spanTitle.trim()) {
            setEditMode(false);
            updateTitle(spanTitle)
        } else {
            setError(true)
        }
    }, [updateTitle, spanTitle]);

    const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlurHandler()
        }
    }, [onBlurHandler]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(e.currentTarget.value);
        if (error) {
            setError(false);
        }

    }, [error]);
    return (
        <>
            {editMode ?
                <div>
                    {/*<input className={error ? style.error : style.addTaskInput} onKeyPress={onKeyPressHandler} autoFocus
                           onBlur={onBlurHandler} value={title}
                           onChange={onChangeHandler}/>
                    {error && <div className={style.errorMessage}>Field is required</div>}*/}
                    <TextField onKeyPress={onKeyPressHandler}
                               autoFocus
                               onBlur={onBlurHandler} value={spanTitle}
                               onChange={onChangeHandler} id="standard-basic"
                               label={labelInput}
                               variant="standard"
                               size={"small"}
                               error={error}
                               helperText={error ? "Field is required" : null}/>
                </div>
                : <span onDoubleClick={onDoubleClickHandler}>{title}</span>}
        </>
    );
});