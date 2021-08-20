import * as yup from "yup"

const schema = yup.object().shape({
    title: yup.string().required("it must be filled out").min(5,"need to be 5 words long"),
    body: yup.string().min(20,'it must be at least 20 characters long'),



    //////////
    email: yup
        .string()
        .email("must be a valid email address")
        .required(),

    password:yup.string().required("password is required").min(8,"password needs to be at least 8 characters long"),
    terms: yup.boolean().oneOf([true], "please agree with us"),
    ///////

});

export default schema


