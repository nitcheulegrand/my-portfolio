import ExperienceForm from "../components/ExperienceForm";

export default function ExperiencePage() {
    return (
        <div className="p-5">
            <h1 className="text-4xl font-medium px-7">Create and edit experiences</h1>
            <ExperienceForm />
        </div>
    );
}