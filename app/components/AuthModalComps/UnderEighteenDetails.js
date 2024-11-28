"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ProfileEntryEditor from "../TeamProfileEditorComponents/ProfileEntryEditor";
import { useSignUpContext } from "./SignUpProvider";
import MultiFieldEntryEditor from "./MultiFieldEntryEditor";


export default function UnderEighteenDetails() {


    const {guardianInfo, setGuardianInfo, kids, setKids, hasEmail, hasNumber} = useSignUpContext()
    const [guardianFullName, setGuardianFullName] = useState("")

    const handleInputChange = (id, field, value) => {
        setKids((prevKids) =>
        prevKids.map((kid) =>
            kid.id === id ? { ...kid, [field]: value } : kid
        )
        );
        console.log(kids)
    };

    useEffect(()=>{
        setGuardianInfo(prevState => ({
            ...prevState,
            fullName: guardianFullName,
          }));
          console.log(guardianInfo)
    },[guardianFullName])

    const handleGuardianInfoChange = (e, field) => {
        setGuardianInfo(prevState => ({
          ...prevState,
          field: e.target.value
        }));
      };

    const addKid = () => {
        setKids((prevKids) => [
        ...prevKids,
        { id: prevKids.length + 1, fullName: "", dateOfBirth: null },
        ]);
    };

    const removeKid = (id) => {
        setKids((prevKids) => prevKids.filter((kid) => kid.id !== id));
    };

    const handleSubmit = () => {
        console.log("Kids Information:", kids);
        alert("Kids Information Saved! Check the console for details.");
    };

    return (
        <div className="w-full mx-auto">
        
        <ProfileEntryEditor 
        prompt={"Gaurdian Full Name"} 
        placeholder={"Full name"}
        response={guardianFullName}
        setResponse={setGuardianFullName}
        />

        {
            !hasEmail&&
            <MultiFieldEntryEditor
            prompt={"Guardian Email"}
            placeholder={"Email Address"}
            field={"emailAddress"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            />
        }

        <h2 className="text-xl font-semibold mb-4">Enter Kid(s) Information</h2>
        {kids.map((kid, index) => (
            <div
            key={kid.id}
            className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm"
            >
            <h4 className="text-lg font-medium mb-3">Kid {index + 1}</h4>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name:
                </label>
                <input
                type="text"
                value={kid.fullName}
                onChange={(e) =>
                    handleInputChange(kid.id, "fullName", e.target.value)
                }
                placeholder="Enter full name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth:
                </label>
                <DatePicker
                selected={kid.dateOfBirth}
                onChange={(date) =>
                    handleInputChange(kid.id, "dateOfBirth", date)
                }
                placeholderText="Select date"
                dateFormat="yyyy-MM-dd"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {kids.length > 1 && (
                <button
                onClick={() => removeKid(kid.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                Remove Kid
                </button>
            )}
            </div>
        ))}
        <button
            onClick={addKid}
            className="mb-4 bg-blue-500 text-white py-2 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            Add Another Kid
        </button>
        <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-6 rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
            Submit
        </button>
        </div>
    );
}