import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./Accordeon.css";
import { useThemeContext } from "../context/theme";

export default function Accordeon({title, children, show=false, className=""}) {
    const [isOpen, setIsOpen] = useState(show);
    const {
        getBgColor,
        getTextColor
    } = useThemeContext();
    const themeClasses = {
        open: `bg-${getBgColor(50)} hover:bg-${getBgColor(100)} rounded-b-none pl-3 pt-3`,
        closed: `bg-transparent hover:bg-${getBgColor(50)} pl-0 pt-0`
    };
    const actionTagClass = isOpen ? themeClasses.open : themeClasses.closed;

    return (
        <div className={"p_accordeon " + (isOpen ? "mb-1 " : "") + className}>
            <div className={"flex justify-between items-center px-3 rounded-2xl cursor-pointer font-medium " + actionTagClass} onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
                <span className="text-one-line-ellipsis">{title}</span>
                <FontAwesomeIcon icon={faAngleDown} className={`text-${getTextColor(500)} ${(isOpen ? "rotate-180" : "")}`} style={{transition: "all 500ms ease"}} />
            </div>
            <div className={`rounded-b-2xl bg-${getBgColor(50)} ${isOpen ? "max-h-96" : "max-h-0"} overflow-hidden`}>
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    );
}