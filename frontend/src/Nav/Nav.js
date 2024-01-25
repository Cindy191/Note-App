import { useReducer } from "react";
import styles from "./Nav.module.css";
import {Link, useMatch, useResolvedPath } from "react-router-dom";

function Nav(){
    // const logout = async () => {
    //     const urlLogOut = "http://localhost:8000/notes/logout";
    //     await fetch(urlLogOut, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         credentials: 'include'
    //     });
    // }

    return(
        // pages
        <nav> 
            <ul id={styles.nav}>
                <CustomLink to="/">Login page</CustomLink>
                <CustomLink to="/notes/register">Register</CustomLink>
                <CustomLink to="/notes/displayNotes">My Notes</CustomLink>
                <CustomLink to="/notes/newNote">New Note Here</CustomLink>
                {/* <CustomLink to="/" onClick={logout}>Log Out</CustomLink> */}
            </ul>
        </nav>
    );
}

function CustomLink ({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className = {isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Nav;