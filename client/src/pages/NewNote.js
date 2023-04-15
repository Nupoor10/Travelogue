import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/newnote.css'
import { UserContext } from '../context/userContext'

function NewNote() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [places, setPlaces] = useState('')
    const [color, setColor] = useState('peachpuff')
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const id = user ? user.id : null;
    const userid = id.toString()

    function handleNoteSubmit(e) {
        e.preventDefault()
        if(userid) {
            axios.post("http://localhost:6060/api/notes/create", {
			title,
			places,
            content,
            user : userid
		}).then(
			res => {
				if(!res) {
                    alert("Note was not created")
                }
                else{
                    alert("Note Added Successfully")
                    navigate("/home")
                }
			}
		).catch(
            err => {
                console.log(err)
            }
        )
        }      
    }

  return (
    <div className='note-form-container'>
        <div className='note-form-color'>   
            <h1>Select your note color : </h1>
            <select name='color-opt' id='color-opt' onChange={(e) => setColor(e.target.value)}>
                <option value="peachpuff" name="peachpuff" selected>peachpuff</option>
                <option value="palegreen" name="palegreen">palegreen</option>
                <option value="paleturquoise" name="paleturquoise">paleturquoise</option>
                <option value="lavender" name="lavender">lavender</option>
                <option value="mistyrose" name="mistyrose">mistyrose</option>
            </select>  
        </div>
        <form className="note-form" style={{backgroundColor : color}}>
            <input onChange={(e) => setTitle(e.target.value)} type='text' name='title' placeholder='Enter a title'></input>
            <input onChange={(e) => setPlaces(e.target.value)} type='text' name='places' placeholder='Enter all destinations'></input>
            <textarea onChange={(e) => setContent(e.target.value)} type='text' name='content' placeholder='Enter your content'>
            </textarea>   
            <button className='add-note-btn' onClick={handleNoteSubmit} type='button'>ADD</button>
        </form>
    </div>
  )
}

export default NewNote