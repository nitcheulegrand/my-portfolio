import "./Home.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useServerAPIContext, ServerAPIProvider } from '../context/server-api';
import { useEffect } from 'react';
import ExperienceItem from '../components/ExperienceItem';
import EducationItem from "../components/EducationItem";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/theme";

export default function Home({ isEditable = false }) {
    const {
        getBgColor,
        getTextColor
    } = useThemeContext();

    const {
        state,
        loadExperiensesAndEducations,
        isDataLoaded
    } = useServerAPIContext();

    useEffect(() => {
        if (!isDataLoaded) 
            loadExperiensesAndEducations();
    });

    return (
        <div className="">
            <header className={`flex justify-center flex-col md:flex-row bg-${getBgColor(50)} p-8 gap-4 w-1/1`}>
                <div className={`bg-${getBgColor(200)} md:bg-${getBgColor(100)} md:rounded-r-none rounded-lg p-5 flex flex-col justify-center grow`}>
                    <h1 className="text-4xl">Augustin Legrand Nitcheu Nouwendui</h1>
                    <h2 className="text-lg">AI Engineer | Software Engineer | Fullstack Developer </h2>
                </div>
                <div className={`bg-${getBgColor(100)} md:rounded-l-none rounded-lg p-5 flex flex-col justify-center md:w-2/7`}>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span className="ms-1">Edmundston, New-Brunswick, Canada</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <a href="tel:+18193620171" className="ms-1">+1 819 362 0171</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            <a href="https://www.linkedin.com/in/augustin-legrand-nitcheu-nouwendui-434a18109/" target="new" className="ms-1">LinkedIn Profile</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faGithub} />
                            <a href="https://www.github.com/nitcheulegrand" target="new" className="ms-1">GitHub Profile</a>
                        </li>
                    </ul>
                </div>
            </header>
            <article className="flex flex-col justify-center w-1/1 p-8">
                <ServerAPIProvider.IsLoaded>
                    <div className={`flex justify-between flex-wrap gap-4 border-b-2 border-${getBgColor(100)} pb-5`}>
                        <h2 className="text-2xl font-bold px-5">Work Experiences and Projects</h2>
                        <div className="print:hidden w-full md:w-auto">
                            <Link to="/admin/experience" className={`bg-${getBgColor(500)} text-${getTextColor(900)} hover:bg-${getBgColor(700)} rounded-lg px-4 p-3 mx-5`}>Add Experience</Link>
                        </div>
                    </div>
                    
                    {state.experiences.map((experience, index) => <ExperienceItem experience={experience} index={index} key={"experience-" + index} editable={isEditable} />)}
                    <div className={`flex justify-between flex-wrap gap-4 border-b-2 border-${getBgColor(100)} py-5`}>
                        <h2 className="text-2xl font-bold px-5">Education and Certifications</h2>
                        <div className="print:hidden w-full md:w-auto">
                            <Link to="/admin/education" className={`bg-${getBgColor(500)} text-${getTextColor(900)} hover:bg-${getBgColor(700)} rounded-lg px-4 p-3 mx-5`}>Add Education</Link>
                        </div>
                    </div>
                    {state.educations.map((education, index) => <EducationItem education={education} index={index} key={"education-" + index} editable={isEditable} />)}
                </ServerAPIProvider.IsLoaded>
                <ServerAPIProvider.IsLoading>
                    <div className="min-h-[50vh] md:min-h-[55vh] flex flex-col justify-center items-center">
                        <p className='text-5xl'>Loading...</p>
                    </div>
                </ServerAPIProvider.IsLoading>
            </article>
        </div>
    );
}