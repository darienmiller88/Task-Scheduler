import React, { useEffect } from 'react'
import './SigninPage.css'
import PostForm from '../../components/PostForm/PostForm'
//import { useHistory } from "react-router-dom";


export default function SigninPage() {
    //let history = useHistory()
    useEffect(() => {
        document.title = "Sign in"
    }, [])

    return (
        <div>
            <PostForm header={"Signing in!"}/>
        </div>
    )
}