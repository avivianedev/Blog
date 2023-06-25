/* eslint-disable react/prop-types */
import "./style.css";

export const Button = ({onClick, disabled}) => {
    return(
        <div className="btn-container">
            <button disabled={disabled} 
                className="btn-loadMorePost"                
                onClick={onClick}>
                <span>Load more posts</span>            
            </button>
        </div>
    )
}