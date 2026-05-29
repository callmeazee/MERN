import { useState } from "react";


const Ex59 = () => {
     const [student, setStudent] = useState({
       username: "AlexCoder",
       roll: 42,

       location: {
         country: "India",
         city: "Mumbai",

         contact: {
           mobile: "9876543210",
           email: "alex@mail.com",
         },
       },
     });

     const handleChange = (e) => {
          const input = e.target 
          const value = input.value

          setStudent({
               ...student,
               location: {
               ...student.location,
                    contact: {
                         ...student.location.contact,
                         email: value
                    }
               }


          })
      }
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Update a specific property inside a deeply nested object.
            </h1>
            <input type="text" placeholder="enter your email" onChange={handleChange}  className="border border-blue-500 p-2 rounded-lg w-6/12"/>
            {JSON.stringify(student)}
    </div>
  );
}

export default Ex59