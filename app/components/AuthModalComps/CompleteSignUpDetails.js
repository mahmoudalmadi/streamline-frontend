"use client";

import { useState } from "react"
import UnderEighteenDetails from "./UnderEighteenDetails";
import OverEighteenDetails from "./OverEighteenDetails";


export default function CompleteSignUpDetails(
    {underEighteen, setUnderEighteen}) {

    return(
        <>
            <div className="flex  font-bold text-streamlineBlue bg-white pb-[6px]">
                Complete Sign Up
            </div>            

            <div
            className={'absolute w-full h-[1px] bg-gray-300 top-[55px]'}
            />
            <div className="max-h-[800px] overflow-y-auto">
            <div className="px-[13px]">
            <div className="mt-[15px]">
                Are you looking for lessons for a swimmer under 18?
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-[6px] items-center px-[30px] cursor-pointer"
                onClick={()=>{setUnderEighteen(true)}}>
                    <div className={
                        underEighteen?
                        `bg-streamlineBlue w-[15px] h-[15px] `
                        :
                        `bg-white w-[15px] h-[15px] border border-gray-400`}
                        style={{
                            borderRadius:"5px"
                        }}/>
                    <div className={underEighteen?'font-bold':''}>
                        Yes
                    </div>
                </div>
                <div className="flex space-x-[6px] items-center px-[30px] cursor-pointer"
                onClick={()=>{setUnderEighteen(false)}}>
                    <div className={
                        underEighteen===false?
                        `bg-streamlineBlue w-[15px] h-[15px] `:
                        `bg-white w-[15px] h-[15px] border border-gray-400`}
                        style={{
                            borderRadius:"5px"
                        }}/>
                    <div className={underEighteen===false?'font-bold ':''}>
                        No
                    </div>
                </div>

            </div>
            
            {underEighteen===false?
            <OverEighteenDetails/>
            :
            <>
            {underEighteen &&
            <UnderEighteenDetails/>}
            </>
            }
            </div>
            </div>
        </>
    )
}