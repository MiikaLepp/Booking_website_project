import { useState } from "react";

function DirPage() {
    return(
        <>
        <div className="temporary">
            <p>THIS IS TEMPORARILY ON THE SAME PAGE AS EVERYTHING ELSE FOR DEVELOPMENT.</p>
            <p>ONCE ROUTING IS COMEPLTE, REMOVE 'TEMPORARY' CLASS DIV AND IT'S CONTENTS AWAY, AND MAKE THIS INTO ITS OWN PAGE.</p>
            <p>THANKS -Remi</p>
        </div>

        <div className="directory">
            <div className="searchBar">
                <div className="sidepanelFilter"></div>
                <div className="searchResults"></div>
            </div>
        </div>
        </>
    )
}

export default DirPage;