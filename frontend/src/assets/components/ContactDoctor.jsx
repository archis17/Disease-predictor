"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import DoctorProfile from "./DoctorProfile"
import SkeletonLoader from "./SkeletonLoader"
import { Autocomplete, TextField } from "@mui/material"

const docOptions = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
  "Oncologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Infectious disease",
  "Nephrologist",
  "Endocrinologist",
  "Ophthalmologist",
  "Otolaryngologist",
  "Dermatologist",
  "Psychiatrist",
  "Neurologist",
  "Radiologist",
  "Anesthesiologist",
  "Surgeon",
  "Physician executive",
]

const ContactDoctor = () => {
  const [doctors, setDoctors] = useState([])
  const [speciality, setSpeciality] = useState(null)
  const doctorType = useRef("All")

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/doctor/${doctorType.current}`)
      console.log(response.data)
      setDoctors(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/doctor/${doctorType.current}`)
        console.log(response.data)
        setDoctors(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleDocChange = () => {
    if (speciality === "" || !docOptions.includes(speciality)) {
      alert("Please select a valid option")
    } else {
      doctorType.current = speciality
      fetchData()
    }
  }

  return (
    <section className="w-screen flex flex-col items-center p-5 pt-24">
      <div className="flex w-80 md:w-3/5 justify-center gap-3 items-center">
        <Autocomplete
          options={docOptions}
          value={speciality}
          onChange={(e, newValue) => {
            setSpeciality(newValue)
          }}
          className="searchbox w-5/6 bg-white"
          renderInput={(params) => (
            <TextField variant="outlined" color="primary" {...params} label="Select a speciality.." />
          )}
        />
        <button
          onClick={handleDocChange}
          className="w-24 text-base font-semibold text-center hover:scale-105 hover:bg-teal-500 hover:text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      <div className="border-t border-gray-200 mb-8 w-4/5"></div>
      <div className="flex justify-center w-full mt-4">
        {doctors.length ? <DoctorProfile doctors={doctors} /> : <SkeletonLoader />}
      </div>
      <article id="info-contact doctor"></article>
    </section>
  )
}

export default ContactDoctor
