import React from "react";
import {useNavigate} from 'react-router-dom';

export const HomePage =() =>{
    const navigate = useNavigate();
    return(
    <body> 
        <ul className="p-4">
            <li className="flex justify-between">
                <button onClick={()=> navigate('/book-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Page</button>
                <button onClick={()=> navigate('/staff-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Staff Page</button>
            </li>
        </ul>
    </body>    
        
    )
}