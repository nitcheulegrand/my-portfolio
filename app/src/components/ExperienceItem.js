import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordeon from "./Accordeon";
import "./ExperienceItem.css";
import moment from "moment/moment";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useServerAPIContext } from "../context/server-api";
import { useThemeContext } from "../context/theme";

export default function ExperienceItem({experience, index, editable = false}) {
    const {
        getBgColor,
        getTextColor
    } = useThemeContext();
    
    const {
        isProcessing,
        deleteExperience
    } = useServerAPIContext();

    return (
    <section className={`p-5 border-b border-${getBgColor(100)}`}>
            <h3 className="text-xl font-medium hover:font-semibold flex justify-between">
                <span>{experience.job_title}</span>
                {editable && (
                    <button type="button" className="print:hidden mr-3" disabled={isProcessing} onClick={() => deleteExperience(experience._id)}>
                        <FontAwesomeIcon icon={faTrash} className="text-lg text-red-500 hover:text-red-700" />
                        <span className="sr-only">Delete Experience</span>
                    </button>
                )}
            </h3>
            <div>
                <h4>{experience.company} &ndash; {experience.location}</h4>
                <small className="font-medium">From {moment(experience.from).format("MMMM YYYY")} to {moment(experience.to).format("MMMM YYYY")}</small>
                <p>{experience.description}</p>
            </div>
            <div>
                <h4 className="text-lg mt-3 font-medium">Projects</h4>
                <div className="mt-2 p_projects">
                    {experience.projects.map((project, projectIndex) =>
                    <Accordeon key={"project-item-"+projectIndex} title={project.name}>
                        <p className="mb-2">{project.description}</p>
                        {project.tools.length > 0 && 
                        <div>
                            <h5 className="font-medium">Tools:</h5>
                            <p className="mb-2 flex flex-wrap gap-2">
                                {project.tools.map((tool, indx) => <small className={`border border-${getBgColor(200)} rounded-lg p-1`} key={`project-${projectIndex}-tool-${indx}`}>{tool}</small>)}
                            </p>
                        </div>
                        }
                        {project.technologies.length > 0 && 
                        <div>
                            <h5 className="font-medium">Technologies:</h5>
                            <p className="mb-2 flex flex-wrap gap-2">
                                {project.technologies.map((tech, indx) => <small className={`border border-${getBgColor(200)} rounded-lg p-1`} key={`project-${projectIndex}-technologie-${indx}`}>{tech}</small>)}
                            </p>
                        </div>
                        }
                        {project.links.length > 0 && 
                        <div>
                            <h5 className="font-medium">Links:</h5>
                            <p className="mb-0 flex flex-col gap-2">
                                {project.links.map((link, indx) => <small key={`project-${projectIndex}-link-${indx}`}><a className={`border border-${getBgColor(200)} rounded-lg p-1`} href={link} target="new">{link}</a></small>)}
                            </p>
                        </div>
                        }
                    </Accordeon>
                    )}
                </div>
            </div>
        </section>
    );
}