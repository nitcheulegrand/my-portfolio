import { faPenSquare, faPenToSquare, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useServerAPIContext } from "../context/server-api";
import Modal from "./Modal";
import { useState } from "react";
import Accordeon from "./Accordeon";
import { useThemeContext } from "../context/theme";

export default function ExperienceForm() {
    const {
        getBgColor,
        getTextColor
    } = useThemeContext();
    
    const {
        state,
        isProcessing,
        setExperienceField,
        addEmptyProject,
        removeProject,
        setProjectField,
        permutteProject,
        addProjectArrayField,
        removeProjectArrayField,
        saveExperience
    } = useServerAPIContext();

    const handleExperienceFieldChange = (e) => {
        setExperienceField({name: e.target.name, value: e.target.value});
    }

    const handleSaveExperience = async (e) => {
        e.preventDefault();
        if (
            e.target.company.value.trim() === "" || 
            e.target.job_title.value.trim() === "" || 
            e.target.location.value.trim() === "" ||
            e.target.from.value.trim() === "" ||
            e.target.to.value.trim() === "" 
        ) {
            alert("Please fill in all required fields.");
            return;
        }
        const projectsValid = state.experience.projects.reduce((acc, project, index) => {
            const isValid = project.name.trim() !== "" && project.description.trim() !== "";
            if (!isValid) {
                alert("Please fill in the title and description fields for each project.\nProject " + (index + 1) + ": " + (project.name || "Unnamed Project"));
            }
            return acc && isValid;
        }, true);
        if (!projectsValid) {
            return;
        }
        try {
            const _experience = await saveExperience();
            if (_experience?._id) alert("Experience saved successfully!");
        } catch(error) {
            alert("An error occurred while saving the experience. Please try again later.");
            console.error(error);
        }
    }

    const handleAddEmptyProject = () => {
        addEmptyProject();
    }

    const handleProjectFieldChange = (index, e) => {
        e.preventDefault();
        setProjectField({index, name: e.target.name.split('-')[1], value: e.target.value});
    }

    const handleSetProjectArrayField = (index, e) => {
        const arrayValue = e.target.value.replaceAll(";", ",").split(",");
        setProjectField({index, name: e.target.name.split('-')[1], value: arrayValue.map(v => v.trim()).filter(v => v !== "")});
    }

    const handleAddProjectArrayField = (index, e) => {
        addProjectArrayField({index, name: e.target.name.split('-')[1], value: e.target.value});
        e.target.value = "";
    }

    const handleCloseProjectModal = (index) => {
        setProjectField({index, name: "_isOpen", value: false});
    }

    const handleConfirmProjectModal = (index) => {
        if (state.experience.projects[index].name.trim() === "") {
            alert("Please fill in the project name.");
            return;
        }
        if (state.experience.projects[index].description.trim() === "") {
            alert("Please fill in the project description.");
            return;
        }
        handleCloseProjectModal(index);
    }

    const handleOpenProjectModal = (index, e) => {
        e?.stopPropagation();
        setProjectField({index, name: "_isOpen", value: true});
    }

    const handleRemoveProject = (index, e) => {
        e?.stopPropagation();
        removeProject({index});
    }

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap place-content-start p-7 gap-3">
            <form className="grid grid-cols-2 gap-4 md:basis-2/5 md:grow place-content-start" onSubmit={handleSaveExperience}>
                <div className="col-span-2">
                    <label className="block mb-2 font-medium" htmlFor="job_title">Job Title</label>
                    <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. Software Engineer" name="job_title" id="job_title" onChange={handleExperienceFieldChange} />
                </div>
                <div className="">
                    <label className="block mb-2 font-medium" htmlFor="company">Company</label>
                    <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. Microsoft" name="company" id="company" onChange={handleExperienceFieldChange} />
                </div>
                <div className="">
                    <label className="block mb-2 font-medium" htmlFor="location">Location</label>
                    <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. Edmundston, NB" name="location" id="location" onChange={handleExperienceFieldChange} />
                </div>
                <div className="">
                    <label className="block mb-2 font-medium" htmlFor="from">From</label>
                    <input type="date" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} name="from" id="from" onChange={handleExperienceFieldChange} />
                </div>
                <div className="">
                    <label className="block mb-2 font-medium" htmlFor="to">To</label>
                    <input type="date" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} name="to" id="to" onChange={handleExperienceFieldChange} />
                </div>
                <div className="col-span-2">
                    <label className="block mb-2 font-medium" htmlFor="description">Job Description</label>
                    <textarea className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. Planning, define objectives and deliverables..." name="description" id="description" rows={5} onChange={handleExperienceFieldChange}></textarea>
                </div>
                <div className="hidden md:col-span-2 md:flex md:flex-row-reverse md:items-end md:gap-3">
                    <button type="submit" className={`bg-${getBgColor(300)} border-none hover:bg-${getBgColor(500)} hover:text-white p-4 rounded`} disabled={isProcessing}>{isProcessing? "Adding Experience..." : "Add Experience"}</button>
                    <button type="button" className="bg-stone-300 border-none hover:bg-stone-500 hover:text-white p-4 rounded">Cancel</button>
                </div>
            </form>
            <div className="flex flex-col gap-3 md:w-2/5">
                <div>
                    <h3 className="font-medium">Projects</h3>
                    <p>List of projects your worked on during this experience.</p>
                </div>
                {state.experience.projects.map((project, index) => (
                    <div key={"project-"+index}>
                        <Accordeon 
                            title={
                                <>
                                    <FontAwesomeIcon icon={faPenToSquare} className={`cursor-pointer text-${getTextColor(400)} hover:text-${getTextColor(500)}`} onClick={(e) => handleOpenProjectModal(index, e)} />
                                    <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-400 hover:text-red-500 mx-1" onClick={(e) => handleRemoveProject(index, e)} />
                                    <span className="font-medium">{project.name || "Unnamed Project"}</span>
                                </>
                            }
                        >
                            <p className="mb-2">{project.description || "No description provided."}</p>
                            {project.tools.length > 0 && 
                            <>
                                <h5 className="font-medium">Tools:</h5>
                                <p className="mb-2 flex flex-wrap gap-2">
                                    {project.tools.map((tool, indx) => <small className={`border border-${getBgColor(200)} rounded-lg p-1`} key={`project-${index}-tool-${indx}`}>{tool}</small>)}
                                </p>
                            </>
                            }
                            {project.technologies.length > 0 && 
                            <>
                                <h5 className="font-medium">Technologies:</h5>
                                <p className="mb-2 flex flex-wrap gap-2">
                                    {project.technologies.map((tech, indx) => <small className={`border border-${getBgColor(200)} rounded-lg p-1`} key={`project-${index}-technologie-${indx}`}>{tech}</small>)}
                                </p>
                            </>
                            }
                            {project.links.length > 0 && 
                            <>
                                <h5 className="font-medium">Links:</h5>
                                <p className="mb-0 flex flex-col gap-2">
                                    {project.links.map((link, indx) => <small><a className={`border border-${getBgColor(200)} rounded-lg p-1`} key={`project-${index}-link-${indx}`} href={link} target="new">{link}</a></small>)}
                                </p>
                            </>
                            }
                        </Accordeon>
                        <Modal key={"project-modal-"+index} title={`Project ${index + 1}: ${project.name || "Untitled"}`} show={project._isOpen} onClose={() => handleCloseProjectModal(index)}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col gap-3 p-7">
                                    <div className="">
                                        <label className="block mb-2 font-medium" htmlFor={`project-name-${index}`}>Project Title</label>
                                        <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. Website Redesign" name={`project-name-${index}`} id={`project-name-${index}`} onChange={(e) => handleProjectFieldChange(index, e)} />
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 font-medium" htmlFor={`project-description-${index}`}>Project Description</label>
                                        <textarea className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. Planned and executed the redesign of the company's website..." name={`project-description-${index}`} id={`project-description-${index}`} rows={3} onChange={(e) => handleProjectFieldChange(index, e)}></textarea>
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 font-medium" htmlFor={`project-tools-${index}`}>Tools</label>
                                        <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. React, Node.js, PostgreSQL..." name={`project-tools-${index}`} id={`project-tools-${index}`} onChange={(e) => handleSetProjectArrayField(index, e)} />
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 font-medium" htmlFor={`project-technologies-${index}`}>Technologies</label>
                                        <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. React, Node.js, PostgreSQL..." name={`project-technologies-${index}`} id={`project-technologies-${index}`} onChange={(e) => handleSetProjectArrayField(index, e)} />
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 font-medium" htmlFor={`project-links-${index}`}>Links</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.links.map((link, indx) => <small key={`project-link-${index}-${indx}`}><a className={`border border-${getBgColor(200)} rounded-lg p-1 text-one-line-ellipsis`} href={link} target="new">{link}</a></small>)}
                                        </div>
                                        <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. React, Node.js, PostgreSQL..." name={`project-links-${index}`} id={`project-links-${index}`} onChange={(e) => handleAddProjectArrayField(index, e)} />
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 font-medium" htmlFor={`project-images-${index}`}>Images</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.images.map((image, indx) => <img key={`project-image-${index}-${indx}`} src={image} alt="Project" className="w-16 h-16 object-cover rounded" />)}
                                        </div>
                                        <input type="file" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. React, Node.js, PostgreSQL..." name={`project-images-${index}`} id={`project-images-${index}`} onChange={(e) => handleAddProjectArrayField(index, e)} />
                                    </div>
                                </div>
                                <div className="flex flex-row-reverse gap-4 items-end px-7 pb-7">
                                    <button type="button" className={`bg-${getBgColor(300)} border-none hover:bg-${getBgColor(500)} hover:text-white p-3 rounded`} onClick={() => handleConfirmProjectModal(index)}>Save Changes</button>
                                    <button type="button" className="bg-stone-300 border-none hover:bg-stone-500 hover:text-white p-3 rounded" onClick={() => handleCloseProjectModal(index)}>Quit</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                ))}
                <div>
                    <button type="button" className={`border border-${getBgColor(500)} text-${getBgColor(500)} hover:bg-${getBgColor(500)} hover:text-white p-3 rounded w-max`} onClick={handleAddEmptyProject}>Add Project</button>
                </div>
            </div>
            <div className="flex flex-row-reverse items-end gap-3 md:hidden">
                <button type="button" className={`bg-${getBgColor(300)} border-none hover:bg-${getBgColor(500)} hover:text-white p-4 rounded`} disabled={isProcessing}>{isProcessing? "Adding Experience..." : "Add Experience"}</button>
                <button type="button" className="bg-stone-300 border-none hover:bg-stone-500 hover:text-white p-4 rounded">Cancel</button>
            </div>
        </div>
    );
}