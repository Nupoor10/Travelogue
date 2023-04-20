import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import './css/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

	async function LoginUser(e) {
		try {
			e.preventDefault()
			const response = await axios.post("http://localhost:6060/api/login", {
			email,
			password
			})
			const userData = await response.data.user
			setUser(userData)
			localStorage.setItem("userData", JSON.stringify(userData))
			alert("Successfully Logged In")
			navigate("/home")
		}
		catch(error) {
			console.log(error)
		}
	}

  return (
    <div className='login-wrapper'>
			<div className='login-body'>
				<h1>WELCOME TO TRAVELOGUE</h1>
				<h1>Login</h1>
				<div className='login-form'>
					<form>
						<input
							className='login__input'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
						/>
						<br />
						<input
							className='login__input'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
						/>
						<br />
						<button type="submit" className="login__btn" onClick={LoginUser}>Login</button>
						<h3>Not Registered Yet? <Link to='/register'>Click Here</Link> to Register</h3>
					</form>
				</div>
			</div>
		</div>
  )
}

export default Login