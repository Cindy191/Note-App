import { useReducer } from "react";
import styles from "./Nav.module.css";
import {Link, useMatch, useResolvedPath } from "react-router-dom";

function Nav(){
    return(
        // pages
        <nav> 
            <ul id={styles.nav}>
                <CustomLink to="/">Login page</CustomLink>
                <CustomLink to="/notes/register">Register</CustomLink>
                <CustomLink to="/notes/displayNotes">My Notes</CustomLink>
                <CustomLink to="/notes/newNote">New Note Here</CustomLink>
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