import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Stage2 = ({
  role, 
  formData,
  setFormData,
  setCompletedStage,
  setProgress
}) => {
  const firstInvalid = useRef()
  const navigate = useNavigate()
 
  const submit = ()=>{
      if(!(formData.school || formData.grade) && !(formData.subject || formData.exp) && !(formData.dept || formData.research)){
       firstInvalid.current.focus()
        return
      }
    
    setCompletedStage((p)=> ({...p , stage2: true}))
    setProgress(66)
    navigate('/register/stage-3')
  }

  return (
   <>
      <h2 className="font-semibold mb-4 capitalize">
        Stage 2 / 3: Role-Specific Details ({role})
      </h2>

      {role === "student" && (
        <>
          <input
            ref={firstInvalid}
            placeholder="School Name"
            className="w-full border px-3 py-2 rounded-md mb-2"
            onChange={(e) =>
              setFormData({ ...formData, school: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Grade"
            className="w-full border px-3 py-2 rounded-md mb-4"
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
          />
        </>
      )}

      {role === "teacher" && (
        <>
          <input
            ref={firstInvalid}
            placeholder="Subject"
            className="w-full border px-3 py-2 rounded-md mb-2"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Experience"
            className="w-full border px-3 py-2 rounded-md mb-4"
            onChange={(e) =>
              setFormData({ ...formData, exp: e.target.value })
            }
          />
        </>
      )}

      {role === "professor" && (
        <>
          <input
            ref={firstInvalid}
            placeholder="Department"
            className="w-full border px-3 py-2 rounded-md mb-2"
            onChange={(e) =>
              setFormData({ ...formData, dept: e.target.value })
            }
          />
          <input
            placeholder="Research Area"
            className="w-full border px-3 py-2 rounded-md mb-4"
            onChange={(e) =>
              setFormData({ ...formData, research: e.target.value })
            }
          />
        </>
      )}

      <button

        onClick={submit}
        className={`w-full bg-orange-500 text-white py-2 rounded-md delay-100`}
      >
        Next
      </button>
    </>
  )
}

export default Stage2
