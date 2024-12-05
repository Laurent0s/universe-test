import React from "react";

interface CustomInput {
    placeholder: string,
    inputText: string,
    setInputText: React.Dispatch<React.SetStateAction<string>>,
}

export const CustomInput: React.FC<CustomInput> = ({placeholder, inputText, setInputText}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };
    return (
        <input className="border w-full px-2.5 rounded-lg border-blue-400 hover:border-blue-600" placeholder={placeholder} value={inputText} onChange={handleChange} />
    )
}