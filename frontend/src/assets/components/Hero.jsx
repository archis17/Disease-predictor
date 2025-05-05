"use client"

import hero_img from "../img/hero-img.svg"
import Button from "@mui/material/Button"
import { useGlobalContext } from "./context"

const Hero = () => {
  const { setLoginButtonClicked, setRegistrationToggle } = useGlobalContext()

  return (
    <div className="w-4/5 hero-container pt-10 lg:pt-0 flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10">
      <div className="hero flex flex-col text-center md:text-left md:w-1/2">
        <div className="hero-text text-4xl lg:text-5xl mb-4 md:mb-8">Your Healthcare, Simplified</div>
        <div className="hero-stanza text-lg lg:text-lg flex text-center md:text-left">
          Experience optimal health with simplified solutions, just a click away!
        </div>
        <div className="hero-btn-container flex justify-center md:justify-start gap-3 mt-5">
          <Button
            variant="outlined"
            color="primary"
            className="hover:scale-105 w-28 h-12 hover:transition-all duration-300"
            onClick={() => {
              setRegistrationToggle(true)
              setLoginButtonClicked(true)
            }}
          >
            Join Us!
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="hover:scale-105 h-12 hover:transition-all duration-300"
            onClick={() => {
              setLoginButtonClicked(true)
              setRegistrationToggle(false)
            }}
          >
            Already a member?
          </Button>
        </div>
      </div>
      <div className="img-wrapper w-80 sm:w-96 lg:w-1/2 flex">
        <img src={hero_img || "/placeholder.svg"} alt="hero-image" className="block w-full" />
      </div>
    </div>
  )
}

export default Hero
