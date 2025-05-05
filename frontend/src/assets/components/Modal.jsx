import { useGlobalContext } from "./context"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import ModalImg from "../img/modal.svg"

const Modal = () => {
  const { registrationToggle, loginButtonClicked, responseCall } = useGlobalContext()

  if (loginButtonClicked) {
    return (
      <>
        {responseCall && (
          <div className="fixed responseCall top-0 flex flex-col items-center justify-center w-screen h-screen z-50">
            <div>
              <div className="rounded-full h-20 w-24 animate-bounce bg-teal-500"></div>
            </div>
            <div className="w-28 h-2 bg-teal-700 rounded-lg"></div>
          </div>
        )}
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-40">
          <div className="flex justify-center items-center w-80 sm:w-96 xl:w-3/5 h-auto bg-white rounded-lg p-5">
            <figure className="hidden xl:block w-80 z-20">
              <img src={ModalImg || "/placeholder.svg"} alt="Modal" className="w-full h-full" />
            </figure>
            {registrationToggle ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </>
    )
  }
  return null
}

export default Modal
