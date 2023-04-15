import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { BsPatchPlusFill } from "react-icons/bs";
import Note from "../components/Note";
import Search from '../components/Search'
import './css/home.css'
import { UserContext } from '../context/userContext'

function Home() {
	const [searchText, setSearchText] = useState('');
	const [notes, setNotes] = useState([])
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const id = user ? user.id : null;
	
	useEffect(() => {
		async function fetchData() {
			try{
				if(id) {
					const response = await axios.get(`http://localhost:6060/api/notes/${id}`)
					const data = await response.data
					setNotes(data.notes)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchData()
	}, [id])

	if(!user || !notes) {
		return(
			<div>Loading...</div>
		)
	}
  
	else {

		function handleNavigate() {
			navigate("/new")
		}
		
		return (
			<div className="Home-top">
				<div className="Home">
					<h1>TRAVEL<MdTravelExplore />GUE</h1>
					<div className="Home-header">
						<Search classname="search-bar" handleSearchNote={setSearchText} />
					</div>
					<div className="add-note">
						<h1>ENTRIES</h1>
						<h1 className="icon" onClick={handleNavigate}><BsPatchPlusFill/></h1>
					</div>
					<div className="Home-container">
						{notes.map(
							(n) => {
								return <Note key={n._id} id={n._id} title={n.title} places={n.places} content={n.content}/>
							}
						)}
						
					</div>
				</div>
			</div>
		);
	}
	
  }
  
//   notes={notes.filter((note) =>
// 	note.text.toLowerCase().includes(searchText)
// )}
// {notes?.length > 0 ? (
//   notes.map((item) => (
//     <Note
//       key={item.id}
//       note={item}
//       deleteNote={props.deleteNote}
//       updateText={props.updateText}
//     />
//   ))
// ) : (
//   <h3>No Notes present</h3>
// )}

  export default Home;
  
