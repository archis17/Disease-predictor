"use client"

import { useEffect } from "react"
import crossIcon from "../img/cross icon.svg"
import { Button, FormControl, Select, MenuItem, Grid, InputLabel } from "@mui/material"
import { useGlobalContext } from "./context"

const ConsumptionModal = ({ consumptionModal, setConsumptionModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } = useGlobalContext()

  const closeConsumptionModal = () => {
    setConsumptionModal(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeConsumptionModal()
      }
    }

    if (consumptionModal) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [consumptionModal])

  if (!consumptionModal) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 modal">
      <div className="flex flex-col justify-center items-center w-96 sm:w-2/5 h-auto bg-white rounded-lg p-5">
        <div className="w-full flex justify-end">
          <button onClick={closeConsumptionModal} className="z-50 hover:scale-105">
            <img src={crossIcon || "/placeholder.svg"} alt="cross-icon" loading="lazy" />
          </button>
        </div>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault()
            closeConsumptionModal()
            handleDashboardSubmit(e)
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h1 className="text-2xl p-1 font-semibold text-gray-700">Consumption Data</h1>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">Smoking Consumption</InputLabel>
                <Select
                  labelId="dropdown-label"
                  value={data.smoke_cons}
                  onChange={handleDashboardChange}
                  name="smoke_cons"
                  label="Smoke Consumption"
                >
                  <MenuItem value={"No Consumption"}>Non Smoker</MenuItem>
                  <MenuItem value={"Mild Smoking"}>Mild Smoking</MenuItem>
                  <MenuItem value={"Oftenly Smokes/ Addiction"}>Addiction</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Alcohol Consumption</InputLabel>
                <Select
                  labelId="dropdown-label"
                  value={data.alcohol_cons}
                  onChange={handleDashboardChange}
                  name="alcohol_cons"
                  label="Alcohol Consumption"
                >
                  <MenuItem value={"No Consumption"}>No Consumption</MenuItem>
                  <MenuItem value={"Mild Consumption"}>Mild</MenuItem>
                  <MenuItem value={"High Consumption"}>High Consumption</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ConsumptionModal
