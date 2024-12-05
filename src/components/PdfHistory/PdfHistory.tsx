import {useEffect, useState} from "react";
import React from 'react';
import {useAppSelector} from "@store/store.ts";

interface PdfHistoryProps {
    onSelectPdf: (pdfUrl: string) => void;
    localClear: boolean;
}

export const PdfHistory: React.FC<PdfHistoryProps> = ({onSelectPdf, localClear}) => {
    const [pdfArr, setPdfArr] = useState<string[]>([]);
    const pdfUrl = useAppSelector((state) => state.pdfReq.text).split(',')[1];

    useEffect(() => {
        const pdfArray: string[] = [];
        if(!localClear) {
            for (let i = 0; i < localStorage.length + 1; i++) {
                const key = localStorage.key(i);
                if (key) {
                    const item = localStorage.getItem(key);
                    if (item) {
                        pdfArray.push(item);
                    }
                }
            }
        } else {
            return setPdfArr([]);
        }
        setPdfArr(pdfArray);

        if (pdfUrl && !pdfArray.includes(pdfUrl)) {
            pdfArray.push(pdfUrl);
            setPdfArr([...pdfArray]);
        }
    }, [pdfUrl,localClear]);

    return (
        <ul className='w-40 h-auto overflow-auto'>
            {pdfArr.map((pdf, index) => (
                <li
                    key={index}
                    className="text-blue-400 cursor-pointer pl-4"
                    onClick={() => onSelectPdf(pdf)}
                >
                    PDF document {index + 1}
                </li>
            ))}
        </ul>
    );
};

