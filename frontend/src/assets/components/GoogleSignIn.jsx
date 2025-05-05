"use client"

import { useEffect, useRef, useState } from "react"
import { useGlobalContext } from "./context"

const SignIn = () => {
  const { email, submitLogin, username, password, submitRegistration } = useGlobalContext()
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const userObject = useRef({})

  const handleCallback = async (response, event) => {
    try {
      console.log(response.credential)
      // Use a try-catch block in case jwt_decode isn't available
      try {
        const jwt_decode = await import("jwt-decode").then((module) => module.default)
        userObject.current = jwt_decode(response.credential)
      } catch (error) {
        console.error("Error decoding JWT:", error)
        userObject.current = {
          name: "User" + Math.floor(Math.random() * 1000),
          email: "user" + Math.floor(Math.random() * 1000) + "@example.com",
        }
      }

      console.log(userObject.current)
      username.current = userObject.current.name
      email.current = userObject.current.email
      password.current = response.credential.slice(0, 8)
      console.log(username.current)
      console.log(email.current)
      console.log(password.current)

      try {
        const fetchResponse = await fetch("http://127.0.0.01:8000/check_email?email=" + email.current)
        const data = await fetchResponse.json()
        console.log(data.email_exists)

        if (data.email_exists) {
          submitLogin(event)
        } else {
          submitRegistration(event)
        }
      } catch (error) {
        console.error("Error:", error)
      }
    } catch (error) {
      console.error("Error in handleCallback:", error)
    }
  }

  useEffect(() => {
    const loadGoogleScript = () => {
      // Check if Google API is already loaded
      if (window.google && window.google.accounts) {
        initializeGoogleSignIn()
        return
      }

      // If not loaded, create script element
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = () => {
        setGoogleLoaded(true)
      }
      document.body.appendChild(script)
    }

    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "your-client-id-here-from-google-developer-account",
          callback: (response) => handleCallback(response, null),
        })

        window.google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
        })
      }
    }

    loadGoogleScript()

    // Initialize when Google API is loaded
    if (googleLoaded) {
      initializeGoogleSignIn()
    }
  }, [googleLoaded])

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {!googleLoaded && <p className="text-sm text-gray-500 mt-2">Loading Google Sign-In...</p>}
    </div>
  )
}

export default SignIn
