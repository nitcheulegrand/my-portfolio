import moment from "moment";
import { useServerAPIContext } from "../context/server-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../context/theme";

export default function EducationItem({education, index, editable = false}) {
    const {
        getBgColor,
        getTextColor
    } = useThemeContext();

    const {
        isProcessing,
        deleteEducation
    } = useServerAPIContext();

    return (
        <section className={`p-5 border-b border-${getBgColor(100)}`}>
            <h3 className="flex justify-between text-xl font-medium hover:font-semibold">
                <span>{education.degree} in {education.field_of_study}</span>
                {editable && (
                    <button type="button" className="print:hidden mr-3" disabled={isProcessing} onClick={() => deleteEducation(education._id)}>
                        <FontAwesomeIcon icon={faTrash} className="text-lg text-red-500 hover:text-red-700" />
                        <span className="sr-only">Delete Education</span>
                    </button>
                )}
            </h3>
            <div>
                <h4 className="font-medium">{education.school} &ndash; {education.location}</h4>
                <small className="font-medium">From {moment(education.from).format("MMMM YYYY")} to {education.to ? moment(education.to).format("MMMM YYYY") : "Present"}</small>
                <p>{education.description}</p>
            </div>
        </section>
    );
}