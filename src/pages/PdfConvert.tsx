import {CustomInput} from "../components/Input/Input.tsx";
import {CustomButton} from "../components/Button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {postPdfText} from "../store/slices/pdfReqSlice.ts";
import {PdfHistory} from "../components/PdfHistory/PdfHistory.tsx";
import React, {useEffect, useState} from "react";
import PDFViewer from "pdf-viewer-reactjs";

export const PdfConvert: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [selectedPdfUrl, setSelectedPdfUrl] = useState<string>('');
    const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string>('');
    const [isLocalClear, setIsLocalClear] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const pdfUrl = useAppSelector((state) => state.pdfReq.text).split(',')[1];

    useEffect(() => {
        if (pdfUrl && pdfUrl.trim()) {
            localStorage.setItem(`${localStorage.length + 1}`, pdfUrl);
            setGeneratedPdfUrl(pdfUrl);
            setSelectedPdfUrl('');
        }
    }, [pdfUrl]);

    const handleSelectPdf = (pdfUrl: string) => {
        setSelectedPdfUrl(pdfUrl);
        setGeneratedPdfUrl('');
    };

    const handleLocalStorage = () => {
        localStorage.clear();
        setIsLocalClear(true);
    }

    const currentPdfUrl = selectedPdfUrl || generatedPdfUrl;

    return (
        <div className="flex flex-col justify-between w-full items-center">
            <div className="flex h-40 gap-20">
                <div className="flex flex-col gap-4 w-60 justify-center">
                    <CustomInput placeholder="Type your text here" inputText={inputText} setInputText={setInputText} />
                    <CustomButton label="Convert PDF" handleFunc={() => dispatch(postPdfText(inputText))} />
                </div>
                <div className='h-auto flex flex-row'>
                    <PdfHistory onSelectPdf={handleSelectPdf} localClear={isLocalClear} />
                    <CustomButton label="Clear History" handleFunc={handleLocalStorage} />
                </div>
            </div>
            {currentPdfUrl && currentPdfUrl.trim() && (
                <PDFViewer key={currentPdfUrl} document={{ base64: currentPdfUrl }} />
            )}
        </div>
    );
};
