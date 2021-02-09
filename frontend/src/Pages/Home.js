import React from 'react'

function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome, {props.firstName}</p>
            {console.log(props.firstName)}
        </div>
    )
}

export default Home