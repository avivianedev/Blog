import "./style.css"

import {AiOutlineReload} from "react-icons/ai" 

export const Loading = () => {
    return (
        <div className="loading-container">
            <AiOutlineReload className="loadingIcon"/>
        </div>
    )
}