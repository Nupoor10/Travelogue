import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import './css/note.css'
import { MdDelete } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

function Note(props) { 
  const [color, setColor] = useState('palegreen')
  const id = props.id 

  if(!id) {
    return(
      <div>Loading....</div>
    )
  }

  else {
    return (
      <div className="note" style={{ backgroundColor: color }}>
        <div className="note_text">
          <h2>{props.title.toUpperCase()}</h2>
          <h2>{props.places.toUpperCase()}</h2>
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
