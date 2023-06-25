/* eslint-disable react/prop-types */
import './style.css';

export const CardPost = ({posts}) => {
    return(
    <div className="post-content">                
            <img src={posts.cover} alt='Imagem referente ao post'/>          
                
                <div  className="post-text">            
                <h2>{posts.title}</h2>
                <p>{posts.body}</p>
                </div>
    </div>
    )
}