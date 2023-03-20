import { createContext ,useState} from "react";
import axios from "axios";


const BooksContext =createContext();

function Provider({children}){
    const[books,Setbooks]=useState([]);

    const fetchBooks=async () =>{
     const response=await axios.get('http://localhost:3001/books')
 Setbooks(response.data);   
    };

    const editBookById=async(id,newTitle)=>{
        const response=await axios.put(`http://localhost:3001/books/${id}`,{
    title:newTitle
});


const updatedBooks=books.map((book) =>{
if(book.id===id){
    return {...book ,...response.data}
}
return book;
        });
        Setbooks(updatedBooks);
    };
   
   
    const deleteBookById=async(id)=>{
        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks=books.filter((book)=>{
            return book.id!==id;
        });
Setbooks(updatedBooks);
    };
    
    
    const createBook= async (title)=>{
    const response=await axios.post('http://localhost:3001/books',{
        title,
    });
        const updatedBooks=[
        ...books,
      response.data
    ];
    Setbooks(updatedBooks);
    };
    
const valueToShare ={
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
};

    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    );
}

export { Provider }; 
export default BooksContext;
