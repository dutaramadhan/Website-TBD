import React from "react";
import {useNavigate} from 'react-router-dom';

export const HomePage =() =>{
    const navigate = useNavigate();
    return(
    <body> 
        <ul className="p-4">
            <li className="flex justify-between">
                <button onClick={()=> navigate('/book-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Page</button>
                <button onClick={()=> navigate('/author-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Author Page</button>
                <button onClick={()=> navigate('/publisher-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Publisher Page</button>
                <button onClick={()=> navigate('/category-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Category Page</button>
                <button onClick={()=> navigate('/language-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Language Page</button>
                <button onClick={()=> navigate('/address-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Address Page</button>
                <button onClick={()=> navigate('/store-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Store Page</button>
                <button onClick={()=> navigate('/staff-page')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Staff Page</button>
            </li>
        </ul>
    </body>    
        
    )
}