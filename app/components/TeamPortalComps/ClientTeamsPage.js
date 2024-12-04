"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DynamicScreen from "../DynamicScreen";
import StreamlineLogo from "../../../public/streamlineLogo.svg";
import LoginSignUp from "./LoginSignUp";

export default function ClientTeamsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stateValue = searchParams.get("state");

  const [isLogin, setIsLogin]  = useState(stateValue=="login");
  const [isSignUp, setIsSignUp] = useState(stateValue=="signup");

  const switchModalType = () => {
    setIsLogin(!isLogin)
    setIsSignUp(!isSignUp)
  }
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

          {stateValue || isLogin || isSignUp ? (
            <div className="flex justify-center">
              <LoginSignUp isSignUp={isSignUp} isLogin={isLogin} setIsLogin={setIsLogin} setIsSignUp={setIsSignUp} switchModalType={switchModalType}/>
            </div>
          ) : (
            <div className="flex flex-col space-y-[10px] py-[20px]">
              <div className="flex w-full font-bold bg-white px-[30px] py-[10px] rounded-full justify-center cursor-pointer"
              onClick={()=>{setIsLogin(true);setIsSignUp(false)}}>
                Log In Existing Team Account
              </div>

              <div className="flex w-full font-bold bg-white px-[20px] py-[10px] rounded-full justify-center cursor-pointer"
              onClick={()=>{setIsLogin(false);setIsSignUp(true)}}>
                Create New Team Account
              </div>
            </div>
          )}
        </div>
      </DynamicScreen>
    </div>
  );
}
