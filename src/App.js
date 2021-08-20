import React,{useState} from "react";
import './App.css';
import Page from "./Page"
import PageTwo from "./pagetwo"
// import axios from "axios";
// import Data from "./data"





function App() {

    const [data,setDate] = useState([])


    const generateData = (input) => {
         const newData = {
             title:input.title,   /// add here
             body:input.body,
             //////////
             email:input.email,
             password:input.password,
             terms:input.terms,
             ///////
         }
         setDate([...data,newData])

    }


  return (
     <div className="App">
         <h1>Post your comment </h1>
         <Page generateData={ generateData} />
         <PageTwo data ={data}/>

     </div>

  );
}

export default App;
