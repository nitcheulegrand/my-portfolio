
export const API_BASE_URL = "http://localhost:3001/api";


export default class APIService {
    static async getExperiences() {
        const response = await fetch(`${API_BASE_URL}/experience/all`);
        return await response.json();
    }

    static async saveExperience(experience) {
        if (experience._id==null) delete experience._id;
        const response = await fetch(`${API_BASE_URL}/experience/`, {
            method: experience._id ? "PUT" : "POST",
            body: JSON.stringify(experience),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }

    static async deleteExperience(experienceId) {
        const response = await fetch(`${API_BASE_URL}/experience/${experienceId}`, {
            method: "DELETE"
        });
        return await response.json();
    }

    static async getEducations() {
        const response = await fetch(`${API_BASE_URL}/education/all`);
        return await response.json();
    }

    static async saveEducation(education) {
        if (education._id==null) delete education._id;
        const response = await fetch(`${API_BASE_URL}/education/`, {
            method: education._id ? "PUT" : "POST",
            body: JSON.stringify(education),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }
    
    static async deleteEducation(educationId) {
        const response = await fetch(`${API_BASE_URL}/education/${educationId}`, {
            method: "DELETE"
        });
        return await response.json();
    }
}