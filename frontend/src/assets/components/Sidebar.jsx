"use client"
import record from "../img/record.svg"
import profile from "../img/profile.svg"
import settings from "../img/settings.svg"
import consumption from "../img/cons.svg"

const Sidebar = ({ setRecord, setLogModal, setProfileModal, setConsumptionModal }) => {
  const handleRecord = () => {
    setRecord(true)
  }

  const handleLogModal = () => {
    setLogModal(true)
  }

  const handleProfileModal = () => {
    setProfileModal(true)
  }

  const handleConsumptionModal = () => {
    setConsumptionModal(true)
  }

  return (
    <div className="flex sm:flex-col justify-center items-center gap-5 p-2">
      <button
        onClick={handleProfileModal}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer transition-all duration-300"
      >
        <img src={profile || "/placeholder.svg"} alt="" className="w-full" />
      </button>
      <button
        onClick={handleRecord}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer transition-all duration-300"
      >
        <img src={record || "/placeholder.svg"} alt="" className="w-full" />
      </button>
      <button
        onClick={handleLogModal}
        className="w-10 h-10 p-1.5 hover:scale-90 hover:cursor-pointer transition-all duration-300"
      >
        <img src={settings || "/placeholder.svg"} alt="" className="w-full" />
      </button>
      <button
        onClick={handleConsumptionModal}
        className="w-9 h-9 p-1 hover:scale-90 hover:cursor-pointer transition-all duration-300"
      >
        <img src={consumption || "/placeholder.svg"} alt="" className="w-full" />
      </button>
    </div>
  )
}

export default Sidebar
