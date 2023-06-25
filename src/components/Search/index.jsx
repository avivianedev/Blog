/* eslint-disable react/prop-types */
import './style.css'

export const Search = ({SearchValue, handleChange}) => {   

    return(
        <form className="form-container container" action="">
            <input className='form-input' type='search'              
            placeholder="Encontre o seu post"
            onChange={handleChange}
            value={SearchValue}
        
            />
        </form>
    )
}