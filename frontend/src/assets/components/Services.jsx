"use client"

import { Button } from "@mui/material"
import servicesImg from "../img/services-img.svg"
import diseasePredImg from "../img/diseasepredictor.svg"
import { useGlobalContext } from "./context"

const Services = () => {
  const { setLoginButtonClicked } = useGlobalContext()

  return (
    <>
      <div id="services" className="w-full flex flex-col items-center">
        <div className="services-container pt-20 mf:pt-0 flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10 w-4/5">
          <div className="img-wrapper w-96 lg:w-1/2 flex pt-2">
            <img src={servicesImg || "/placeholder.svg"} alt="hero-image" className="block w-full" />
          </div>
          <div className="hero flex flex-col justify-center w-5/6 md:w-1/2">
            <div className="hero-text px-1.5 sm:px-10 md:px-0 text-3xl lg:text-5xl mb-4 md:mb-8">
              Access Quality Healthcare Assistance Anytime, Anywhere
            </div>
            <div className="hero-stanza lg:text-lg flex items-center text-center md:text-left">
              Medware provides you with your go to Healthcare Services at the ease of your device from any location!
            </div>
          </div>
        </div>
        <div className="disease-predictor flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 w-4/5 mt-10">
          <div className="img-wrapper-predicto w-screen sm:w-4/5 md:w-1/2">
            <img src={diseasePredImg || "/placeholder.svg"} alt="hero-image" className="block w-full" />
          </div>
          <div className="w-4/5 md:w-1/2">
            <div className="flex flex-col justify-center md:pl-10">
              <div className="hero-text text-3xl lg:text-6xl mb-4 md:mb-8">Feeling low?</div>
              <div className="hero-stanza lg:text-xl flex items-center text-center md:text-left">
                Use our built in Disease Predictor and get recommended medical assistance based on that
              </div>
              <div className="hero-btn-container flex gap-3 items-center justify-center md:justify-start mt-5">
                <Button
                  variant="outlined"
                  color="secondary"
                  className="hover:scale-105 md:w-60 md:h-16 hover:transition-all duration-300"
                  onClick={() => {
                    setLoginButtonClicked(true)
                  }}
                >
                  Disease Predictor
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className="hover:scale-105 md:w-60 md:h-16 hover:transition-all duration-300"
                  onClick={() => {
                    setLoginButtonClicked(true)
                  }}
                >
                  Contact Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
