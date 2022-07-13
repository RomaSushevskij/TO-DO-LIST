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

    const onFieldDoubleClick = () => {
        setEditMode(true);
    };

    const onFieldBlur = useCallback(() => {
        if (spanTitle.trim()) {
            setEditMode(false);
            updateTitle(spanTitle)
        } else {
            setError(true)
        }
    }, [updateTitle, spanTitle]);

    const onFieldKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onFieldBlur()
        }
    }, [onFieldBlur]);

    const onFieldChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(e.currentTarget.value);
        if (error) {
            setError(false);
        }

    }, [error]);

    return (
        <>
            {editMode ?
                <div>
                    <TextField onKeyPress={onFieldKeyPress}
                               autoFocus
                               onBlur={onFieldBlur} value={spanTitle}
                               onChange={onFieldChange} id="standard-basic"
                               label={labelInput}
                               variant="standard"
                               size={"small"}
                               error={error}
                               helperText={error ? "Field is required" : null}/>
                </div>
                : <span onDoubleClick={onFieldDoubleClick}>{title}</span>}
        </>
    );
});