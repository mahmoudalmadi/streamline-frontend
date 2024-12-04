"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DynamicScreen from "../components/DynamicScreen";
import StreamlineLogo from "../../public/streamlineLogo.svg";

export default function ClientTeamsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stateValue = searchParams.get("state");

  const redirectHome = () => {
    router.push("/");
  };

  return (
    <div
      className="bg-custom-radial"
      style={{
        "--tw-gradient-from": "#28C8ED",
        "--tw-gradient-to": "#FFFFFF",
        "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
        width: "100vw",
        height: "110vh",
      }}
    >
      <DynamicScreen>
        <div>
          <button onClick={redirectHome}>
            <StreamlineLogo className="w-[130px] h-[50px]" />
          </button>
        </div>

        <div className="flex flex-col w-screen h-screen items-center justify-center">
          <div className="font-bold text-white text-[24px] px-[90px] text-center">
            Welcome to the Experience Streamline Teams Portal
          </div>

          {stateValue ? (
            <div className="flex bg-white rounded-[10px] py-[10px] w-[50%] justify-center mt-[20px]">
              {stateValue}
            </div>
          ) : (
            <div className="flex flex-col space-y-[10px] py-[20px]">
              <div className="flex w-full font-bold bg-white px-[30px] py-[10px] rounded-full justify-center cursor-pointer">
                Log In Existing Team Account
              </div>

              <div className="flex w-full font-bold bg-white px-[20px] py-[10px] rounded-full justify-center cursor-pointer">
                Create New Team Account
              </div>
            </div>
          )}
        </div>
      </DynamicScreen>
    </div>
  );
}
