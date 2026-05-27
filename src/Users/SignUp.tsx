import { useState } from "react"

export default function SignUp()
{

    const[info,setInfo] = useState({
        email:"",
        password:""
    })



    return (

        <>
            <h1>Sign Up</h1>
            <input type="email" placeholder="Username" required  value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})}/>
            <input type="password" placeholder="Password" required value={info.password} onChange={(e) => setInfo({...info, password: e.target.value})}/>
            <button onClick={() => console.log(info)}>Sign Up</button>
        </>
    )

}

