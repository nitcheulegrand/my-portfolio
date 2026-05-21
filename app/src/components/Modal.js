import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useThemeContext } from "../context/theme";

export default function Modal({ title, children, show=true, onClose=() => {} }) {
    const {
        getBgColor,
        getTextColor
    } = useThemeContext();
    
    const handleClose = (e) => {
        onClose(e);
    }

    return (
        <div className={"fixed bottom-0 left-0 overflow-hidden w-full bg-black bg-opacity-80 flex justify-center items-center " + (show ? "h-full" : "h-0")} style={{transition: "all 300ms ease"}}>
            <div className={`bg-${getBgColor(100)} rounded-4xl basis-1/2`}>
                <div className={`px-8 py-5 border-b border-${getBgColor(200)} flex justify-between items-center`}>
                    <h2 className="text-2xl font-medium text-one-line-ellipsis">{title}</h2>
                    <button type="button" className={`bg-transparent border-none hover:bg-${getBgColor(200)} hover:text-${getTextColor(700)} py-3 px-4 rounded`} onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} className="size-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}