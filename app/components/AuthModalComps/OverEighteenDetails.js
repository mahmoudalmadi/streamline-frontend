import { useSignUpContext } from "@/app/contexts/SignUpProvider"
import MultiFieldEntryEditor from "./MultiFieldEntryEditor"

export default function OverEighteenDetails() {

    const {guardianInfo, setGuardianInfo, hasEmail, hasNumber} = useSignUpContext()

    return(
        <div>

            <div>
            <MultiFieldEntryEditor
            prompt={"Your Full Name"}
            placeholder={"Full Name"}
            field={"fullName"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            />
            {
            !hasEmail&&
            <MultiFieldEntryEditor
            prompt={"Your Email"}
            placeholder={"Email Address"}
            field={"emailAddress"}
            fieldResponse={guardianInfo}
            setFieldResponse={setGuardianInfo}
            />
            }
            </div>
        </div>
    )
}