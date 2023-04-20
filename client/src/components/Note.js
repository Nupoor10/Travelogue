import React from "react";
import { Link } from "react-router-dom";
import './css/note.css'
import { BsFillPenFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

function Note(props) { 
  const { id, title, places, color} = props

  if(!id || !title || !places) {
    return(
      <div>Loading....</div>
    )
  }

  else {
    return (
      <div className="note" style={{ backgroundColor: color }}>
        <div className="note_text">
          <h2>{title.toUpperCase()}</h2>
          <h2>{places.toUpperCase()}</h2>
        </div>
        <div className="note_footer">
          <Link className="link" to={`/single/${id}`}><FaRegEye /></Link>
          <Link className="link" to={`/edit/${id}`}><BsFillPenFill /></Link>
        </div>
      </div>
    );
  }

}

export default Note;
