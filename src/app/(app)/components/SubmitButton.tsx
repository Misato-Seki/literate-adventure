import { ReactElement } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function SubmitButton({loading, text}: {loading: boolean, text: string}): ReactElement {
    return (
        <button type="submit" className="border border-solid py-2 px-4 rounded" disabled={loading}>
            {loading ? "Loading..." : text}
            {/* <AiOutlineLoading3Quarters className={`animate-spin ${loading ? "visible" : "hidden"}`} /> */}
        </button>
    );
}