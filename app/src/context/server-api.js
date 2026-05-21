import {createContext, useCallback, useContext, useMemo, useReducer, useState} from "react";
import APIService from "../services/api.service";

const initialState = {
    experience: {
        _id: null,
        company: "",
        job_title: "",
        location: "",
        from: "",
        to: "",
        description: "",
        projects: []

    },
    experiences: [],
    educations: [],
};

function reducer(state, action) {
    switch (action.type) {

        /**
         * Experience actions
         */
        case "setExperience":
            return {
                ...state,
                experience: action.payload
            }
        case "setExperiences":
            return {
                ...state,
                experiences: action.payload
            }
        case "setExperienceField":
            const e = state.experience;
            e[action.payload.name] = action.payload.value;
            return {
                ...state,
                experience: e
            }
        case "addEmptyProject":
            const experience = state.experience;
            experience.projects.push({
                name: "",
                description: "",
                tools: [],
                technologies: [],
                images: [],
                links: [],
                _isOpen: true
            });
            return {
                ...state,
                experience: experience
            }
        case "removeProject":
            const _projectsl = state.experience.projects;
            _projectsl.splice(action.payload.index, 1);
            return {
                ...state,
                experience: {
                    ...state.experience,
                    projects: _projectsl
                }
            }
        case "setProjectField":
            const _projects = state.experience.projects;
            _projects[action.payload.index][action.payload.name] = action.payload.value;
            return {
                ...state,
                experience: {
                    ...state.experience,
                    projects: _projects
                }
            }
        case "permutteProject":
            const projects = state.experience.projects;
            const project2 = projects[action.payload.index2];
            projects[action.payload.index2] = projects[action.payload.index1];
            projects[action.payload.index1] = project2;
            return {
                ...state,
                experience: {
                    ...state.experience,
                    projects: projects
                }
            }
        case "addProjectArrayField":
            const _projects_list = state.experience.projects;
            _projects_list[action.payload.index][action.payload.name].push(action.payload.value);
            return {
                ...state,
                experience: {
                    ...state.experience,
                    projects: _projects_list
                }
            }
        case "removeProjectArrayField":
            const _projectslist = state.experience.projects;
            _projectslist[action.payload.index][action.payload.name].splice(action.payload.subIndex, 1);
            return {
                ...state,
                experience: {
                    ...state.experience,
                    projects: _projectslist
                }
            }

        /**
         * Education actions
         */
        case "setEducations":
            return {
                ...state,
                educations: action.payload
            }
        default:
            return state;
    }
}

const ServerAPIContext = createContext();

const ServerAPIProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    /**
     * Experience dispatchers 
     */

    const setExperience = (experience) => dispatch({type: "setExperienceField", payload: experience});
    const setExperienceField = ({name, value}) => dispatch({type: "setExperienceField", payload: {name, value}});
    const addEmptyProject = () => dispatch({type: "addEmptyProject"});
    const removeProject = ({index}) => dispatch({type: "removeProject", payload: {index}});
    const setProjectField = ({index, name, value}) => dispatch({type: "setProjectField", payload: {index, name, value}});
    const permutteProject = ({index1, index2}) => dispatch({type: "permutteProject", payload: {index1, index2}});
    const addProjectArrayField = ({index, name, value}) => dispatch({type: "addProjectArrayField", payload: {index, name, value}});
    const removeProjectArrayField = ({index, name}) => dispatch({type: "removeProjectArrayField", payload: {index, name}});

    const loadExperienses = async () => {
        setIsLoading(true);
        try {
            const experiences = await APIService.getExperiences();
            dispatch({type: "setExperiences", payload: experiences});
            setIsDataLoaded(true);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const saveExperience = useCallback(async () => {
        return new Promise(async (resolve, reject) => {
            setIsProcessing(true);
            try {
                const _experience = await APIService.saveExperience(state.experience);
                setExperience({...state.experience, _id: _experience._id});
                resolve(_experience);
            } catch(error) {
                reject(error);
            } finally {
                setIsProcessing(false);
            }
        });
    }, [state.experience]);

    const deleteExperience = useCallback(async (experienceId) => {
        return new Promise(async (resolve, reject) => {
            setIsProcessing(true);
            try {
                const _experience = await APIService.deleteExperience(experienceId);
                if (!_experience.error) {
                    const removedIndex = state.experiences.findIndex(experience => experience._id === experienceId);
                    const experiences = state.experiences;
                    experiences.splice(removedIndex, 1);
                    dispatch({type: "setExperiences", payload: experiences});
                }
                resolve(_experience);
            } catch(error) {
                reject(error);
            } finally {
                setIsProcessing(false);
            }
        });
    }, [state.experiences]);

    /**
     * Education dispatchers
     */

    const loadEducations = async () => {
        setIsLoading(true);
        try {
            const educations = await APIService.getEducations();
            dispatch({type: "setEducations", payload: educations});
            setIsDataLoaded(true);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEducation = useCallback(async (educationId) => {
        return new Promise(async (resolve, reject) => {
            setIsProcessing(true);
            try {                
                const _education = await APIService.deleteEducation(educationId);
                if (!_education.error) {
                    const removedIndex = state.educations.findIndex(education => education._id === educationId);
                    const educations = state.educations;
                    educations.splice(removedIndex, 1);
                    dispatch({type: "setEducations", payload: educations});
                }
                resolve(_education);
            } catch(error) {
                reject(error);
            } finally {
                setIsProcessing(false);
            }
        });
    }, [state.educations]);

    const loadExperiensesAndEducations = async () => {
        setIsLoading(true);
        try {
            // loading experiences
            const experiences = await APIService.getExperiences();
            dispatch({type: "setExperiences", payload: experiences});
            // then loading educations
            const educations = await APIService.getEducations();
            dispatch({type: "setEducations", payload: educations});
            setIsDataLoaded(true);
        } catch(error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };


    /**
     * Unified context value
     */
    const contextValue = useMemo(() => {
        return {
            state,
            isLoading,
            isProcessing,
            isDataLoaded,
            
            setExperience,
            setExperienceField,
            addEmptyProject,
            removeProject,
            setProjectField,
            permutteProject,
            addProjectArrayField,
            removeProjectArrayField,
            loadExperienses,
            saveExperience,
            deleteExperience,

            loadEducations,
            deleteEducation,

            loadExperiensesAndEducations
        };
    }, [state, isLoading, isProcessing, isDataLoaded, saveExperience, deleteExperience, deleteEducation]);

    return (
        <ServerAPIContext.Provider value={contextValue}>
            {children}
        </ServerAPIContext.Provider>
    )
}

function useServerAPIContext() {
    return useContext(ServerAPIContext);
}

ServerAPIProvider.IsLoading = function IsLoading({ children }) {
    const { isLoading } = useContext(ServerAPIContext);
    return isLoading ? children : null;
}

ServerAPIProvider.IsLoaded = function IsLoaded({ children }) {
    const { isLoading } = useContext(ServerAPIContext);
    return !isLoading ? children : null;
}


export {
    ServerAPIProvider,
    useServerAPIContext
}