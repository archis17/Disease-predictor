"use client"

import { useEffect } from "react"
import crossIcon from "../img/cross icon.svg"
import { TextField, Button } from "@mui/material"
import { useGlobalContext } from "./context"

const Record = ({ record, setRecord }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } = useGlobalContext()

  const closeRecord = () => {
    setRecord(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeRecord()
      }
    }

    if (record) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [record])

  if (!record) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 modal">
      <div className="flex flex-col justify-center items-center w-96 sm:w-2/5 h-auto bg-white rounded-lg p-5">
        <div className="w-full flex justify-end">
          <button onClick={closeRecord} className="hover:scale-105">
            <img src={crossIcon || "/placeholder.svg"} alt="cross-icon" loading="lazy" />
          </button>
        </div>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()
            closeRecord()
            handleDashboardSubmit(e)
          }}
        >
          <h1 className="text-2xl p-1 font-semibold text-gray-700">Update your Medical Info</h1>
          <TextField
            name="current_med"
            label="Current Medications"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={data.current_med}
          />
          <TextField
            name="medical_history"
            label="Medical History"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={data.medical_history}
          />
          <Button variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Record
