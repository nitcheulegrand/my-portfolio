import "./Layout.css";

import Modal from "./Modal";
import LoginForm from "./LoginForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { faBars, faBrush, faPrint, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../context/theme";

function Layout({children}) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
        getBgColor,
        getTextColor,
        isDarkTheme, 
        changeTheme
    } = useThemeContext();

    const handlePrint = () => {
        window.print();
        if (isMenuOpen) setIsMenuOpen(false);
    }

    const handleOpenLoginModal = () => {
        setIsLoginModalOpen(true);
        document.getElementById("login").focus();
        if (isMenuOpen) setIsMenuOpen(false);
    }

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    const handleChangeTheme = (theme) => {
        changeTheme(theme);
        if (isMenuOpen) setIsMenuOpen(false);
    }

    return (
        <div className={isDarkTheme ? "layout dark": "layout"}>
            <nav className={`print:hidden bg-${getBgColor(100)}`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-0 sm:px-7">
                    <div className={`flex justify-between items-center px-7 sm:px-0 border-b sm:border-b-0 border-${getBgColor(500)}`}>
                        <Link className="font-semibold" to="/">My Portfolio</Link>
                        <div className="block sm:hidden">
                            <button type="button" className={`mr-3 my-1 p-4 rounded-full bg-${getBgColor(200)} hover:bg-${getBgColor(300)}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                                <span className="sr-only">{isMenuOpen ? "Open menu" : "Close menu" }</span>
                            </button>
                            <button type="button" className={`p-4 rounded-full bg-${getBgColor(200)} hover:bg-${getBgColor(300)}`} onClick={() => handlePrint()}>
                                <FontAwesomeIcon icon={faPrint} />
                                <span className="sr-only">Print</span>
                            </button>
                        </div>
                    </div>
                    <div className={`flex flex-col items-start sm:flex-row sm:justify-end sm:items-center sm:max-h-none ${isMenuOpen ? "max-h-[500px]" : "max-h-0"}`} id="menu-collapse">
                        <Link className={`w-full sm:w-auto px-7 sm:px-4 py-4 hover:bg-${getBgColor(200)} border-r border-${getBgColor(200)}`} to="/">Home</Link>
                        <button type="button" className={`w-full sm:w-auto text-left px-7 sm:px-4 py-4 hover:bg-${getBgColor(200)} border-r border-${getBgColor(200)}`} onClick={handleOpenLoginModal}>Make some changes</button>
                        <Menu>
                            <MenuButton className={`w-full sm:w-auto text-left px-7 sm:px-4 py-4 hover:bg-${getBgColor(200)} data-active:bg-${getBgColor(200)} border-r border-${getBgColor(200)}`}>Theme</MenuButton>
                            <MenuItems anchor="bottom end" className={`bg-${getBgColor(100)} flex flex-col`}>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("white")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-white mr-3" />
                                        <span className="mr-7">Light theme</span>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("black")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-black-500 mr-3" />
                                        <span className="mr-7">Dark theme</span>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("green")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-green-500 mr-3" />
                                        <span className="mr-7">Green theme</span>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("sky")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-sky-500 mr-3" />
                                        <span className="mr-7">Bleu theme</span>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("red")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-red-500 mr-3" />
                                        <span className="mr-7">Red theme</span>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("yellow")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-yellow-500 mr-3" />
                                        <span className="mr-7">Yellow theme</span>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span tabIndex={0} className={`cursor-pointer text-${getTextColor(800)} hover:bg-${getBgColor(200)} py-3 px-7 sm:px-5`} onClick={() => handleChangeTheme("gray")}>
                                        <FontAwesomeIcon icon={faBrush} className="text-gray-500 mr-3" />
                                        <span className="mr-7">Gray theme</span>
                                    </span>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                        <button className={`w-full sm:w-auto text-left px-7 sm:px-4 py-4 hover:bg-${getBgColor(200)}`} onClick={() => handlePrint()}>
                            <FontAwesomeIcon icon={faPrint} className="hidden sm:inline" />
                            <span className="sr-only">Print</span>
                            <span className="inline sm:hidden">Imprimer sur PDF ou Imprimante</span>
                        </button>
                    </div>
                </div>
            </nav>
            <main className={`${isDarkTheme?'bg-'+getBgColor(100):''} opacity-99`}>
                {children}
            </main>
            <footer className={`bg-${getBgColor(isDarkTheme ? 50 : 100)} p-3 text-center`}>
                <div className="my-3">
                    <p>Design with <FontAwesomeIcon icon={faHeart} />, By Augustin Legrand Nitcheu Nouwendui</p>
                </div>
            </footer>
            <Modal title="Sign in to make changes" show={isLoginModalOpen} onClose={() => handleCloseLoginModal()}>
                <LoginForm onCancel={() => handleCloseLoginModal()} />
            </Modal>
        </div>
    );
}

export default Layout;