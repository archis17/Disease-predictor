import patternImg from "../img/pattern.svg"

const About = () => {
  return (
    <div id="about" className="w-full flex justify-center mt-10">
      <div className="about-container flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10 w-4/5">
        <div className="hero flex flex-col justify-center md:w-1/2">
          <div className="hero-text text-3xl text-center md:text-left mb-4 md:mb-8">About Medware</div>
          <div className="hero-stanza lg:text-lg flex items-center text-center md:text-left">
            Your one-stop healthcare provider. Our innovative medical dashboard and disease predictor offer personalized
            insights into your health. Convenient doctor consultations and a range of health services are just a click
            away. Experience the difference in healthcare with our user-friendly platform and advanced technologies with
            Medware.
          </div>
        </div>
        <div className="img-wrapper w-80 mb-5 md:w-1/3">
          <img src={patternImg || "/placeholder.svg"} alt="hero-image" className="block w-full" />
        </div>
      </div>
    </div>
  )
}

export default About
