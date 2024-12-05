import React from "react";
import {MouseEventHandler} from "react";

interface CustomButton {
    label: string,
    handleFunc: MouseEventHandler<HTMLButtonElement>,
}

export const CustomButton: React.FC<CustomButton> = ({label,handleFunc}) => {
    return (
        <button className='p-3 w-auto h-fit self-center flex-shrink-0 border bg-blue-400 hover:bg-blue-600 rounded-lg text-white transition duration-1000' onClick={handleFunc}>{label}</button>
    )
}