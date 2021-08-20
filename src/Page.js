import React,{useState,useEffect} from 'react';
import schema from './comp/schema'
import axios from "axios";

import * as yup from "yup"

const Page =(props) => {


const  generateData = props.generateData

    // to keep track of your input

    const [comment,setComment] = useState({
      title: '',
        body:"",
        //////////
        email:"",
        password:'',
        terms:false,
        ///////

    })

    // to keep track of our errors

    const [errors,setErrors] = useState({
        title: '',
        body:"",
        //////////
        email:"",
        password:'',
        terms:"",
        ///////

    })

    const [disabled,setDisabled] = useState(true)


// we use use effect when ever there is an update to our state
    // so we want your yup to fire when we add comments
    // so wer first have to use our yup (schema) and then check it
        // comment is our useState value that keep track of our inputs
    useEffect(()=>{
        schema.isValid(comment).then(valid => {  /// it takes the objects inside of comment and compare it to what we have in yup itself
            // console.log(valid)               /// its valid is true only when all the reqirment  that we set in yup are meet

            setDisabled(!valid)   /// now  look at the disabled on button and the setState disabled
        })

    },[comment])


    /// first setp up above now i want to set up errors that tells the user how to fill the form correctly
    // in line validation using yup.reach   first make a function

    const  validation = (name,value) => {
        // const {value,name} = e.target // look at the event which is our name and look at the names
    yup.reach(schema,name).validate(value).then(valid =>  {
       setErrors({...errors,[name]: ''}) // clearing error if user did the right thing
    }).catch(err => {
        // console.log(err)   /// this tell our   schema set errors
        setErrors({
            ...errors, [name]: err.errors[0]
        })
    });
};

//////////////////////////// setting up axios //////////////////////////
const [post , setPost] = useState([])

  /*  1)   go to  submit function */

    const [postError, setPostError] =useState()


////////////////////////////////// End ////////////////////////////////

    const changeinput = (event)=> {
        event.persist()   /// add this after seting up the error validation
        const {value,name, type,checked} = event.target
        const newValue = type === "checkbox" ? checked : value
        validation(name,newValue)   // add this after persist is added
        setComment({...comment,[name]:newValue})
    }


    // get some updates when we are doing axios
    const submit =(event) => {
    event.preventDefault()

        axios.post('https://reqres.in/api/user',comment)   /// 2 step for requesting data
            .then(response => {
                generateData(comment)
                setComment({title: '', body:'',email:"",password:'',terms:''})                  // i move this and one under it so when post was sucessfull it get added to the page
                // console.log(response.data) //// our data was posted
                setPost(response.data)  ///
            }).catch(error => {setPostError("the post was unsuccessful. please try again later we are working to solve the issue")})
    }


    return (
      <form onSubmit={submit}>
        <label htmlFor={'title'}> Title
          <input data-cy={'title'}
                 id={'title'} name="title" onChange={changeinput} value={comment.title} placeholder={'write title'} />
            {errors.title.length > 0 ? <p className={"error"}>{errors.title}</p> :null}
        </label>
          <label htmlFor={"body"}> Body
          <textarea data-cy={"body"}
              name={'body'} onChange={changeinput} value={comment.body} placeholder={'In 20 words or more explain it to me'} />
          {errors.body.length > 0 ? <p className={"error"}>{errors.body}</p> :null}
          </label>

          {/*/////////////////////////////////////////////////// email password and checkbox   //////////////////////////*/}

          <label htmlFor={'email'}> Email
              <input data-cy={"email"}
                  id={'email'} name="email" onChange={changeinput} value={comment.email} placeholder={'Enter your email address'} type="email" />
              {errors.email.length > 0 ? <p className={"error"}>{errors.email}</p> :null}
          </label>

          <label htmlFor={'password'}> Password
              <input data-cy={"password"}
                  id={'password'} name="password" onChange={changeinput} value={comment.password}  type={"password"} placeholder={"Enter your password"}   />
              {errors.password.length > 0 ? <p className={"error"}>{errors.password}</p> :null}
          </label>

          <label htmlFor={'terms'}> Terms and Conditions

              <input
                  data-cy={"terms"}
                  type="checkbox"
                  name="terms"
                  checked={comment.terms}
                  value={comment.terms}
                  onChange={changeinput}
              />
              {errors.terms.length > 0 ? <p className={"error"}>{errors.terms}</p> :null}
          </label>




          {/*/////////////////////////////////////////////////// end  ///////////////////////////////////////////////////*/}

            <pre className={'error'}>{JSON.stringify(postError,null,2)}</pre>
          {/*// to show the error from error .catch i  axios*/}

          <button data-cy={"submit"} disabled={disabled}>submit</button>


      </form>
    )


}
export default  Page