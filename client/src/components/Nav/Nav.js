import React from 'react'
import './Nav.css'
//import { useHistory, useLocation } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">Oshane's Reminders Dashboard</a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" id="navBarItems">
                <li className="nav-item" id="home-link">
                <a className="nav-link" href="/">Home </a>
                </li>
                <li className="nav-item" id="set-reminder-link">
                <a className="nav-link" href="/set-reminder">Set Reminder</a>
                </li>
            </ul>
            <button className="sign-out-btn" >Sign out</button>
            </div>
        </nav>
    )
}
