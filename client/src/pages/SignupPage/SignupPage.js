import React, { useEffect } from 'react'
import './SignupPage.css'
import PostForm from '../../components/PostForm/PostForm'
//import { useHistory } from 'react-router-dom';
  

export default function SignupPage() {
    useEffect(() => {
        document.title = "Sign up"
    }, [])

    return (
        <div>
            <PostForm header={"Signing up!"}/>
        </div>
    )
}
