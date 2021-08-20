import React from 'react';

const PageTwo =(props) => {
const data = props.data
// console.log(data)

    return (

        <div className={"note-list"}>
            {data.map( (item,index) => (
                <div className={'note'} key={index}>

                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                </div>


                )




            )}

                </div>

        )
}
export default PageTwo
