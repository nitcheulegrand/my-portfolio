import { useThemeContext } from "../context/theme";

export default function LoginForm({ onCancel=()=>{} }) {
    const {
        getBgColor,
        getTextColor
    } = useThemeContext(); 

    const isProcessing = false;

    return (
        <form className="flex flex-col p-7 gap-3 w-full md:min-w-1/3">
            <div className="col-span-2">
                <label className="block mb-2 font-medium" htmlFor="login">Login</label>
                <input type="text" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. augustin.legrand" name="login" id="login" />
            </div>
            <div className="col-span-2">
                <label className="block mb-2 font-medium" htmlFor="password">Password</label>
                <input type="password" className={`w-full p-3 rounded border border-${getBgColor(300)} focus:border-${getBgColor(400)} rounded-md`} placeholder="e.g. ********" name="password" id="password" />
            </div>
            <div className="flex flex-row-reverse items-end gap-3 mt-3">
                <button type="submit" className={`bg-${getBgColor(300)} border-none hover:bg-${getBgColor(500)} hover:text-white p-4 rounded`} disabled={isProcessing}>{isProcessing? "Logging in..." : "Login"}</button>
                <button type="button" className={`bg-stone-300 border-none hover:bg-stone-500 hover:text-white p-4 rounded`} onClick={() => onCancel()}>Cancel</button>
            </div>
        </form>
    );
}