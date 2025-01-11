"use client";

import { useState, useEffect } from "react";
import ClockIcon  from "../../../../public/ClockIcon.svg"
import CalendarIcon  from "../../../../public/CalendarIcon.svg"
import NotifIcon  from "../../../../public/NotifIcon.svg"
//Create availability modal imoprts
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { PickersActionBar } from '@mui/x-date-pickers/PickersActionBar';
import dayjs from 'dayjs';
import WeekdayPicker from "@/app/components/TeamDashboard/CalendarComps/DayPicker";
import { DayPicker } from "react-day-picker";
import PeopleIcon  from "../../../../public/PeopleIcon.svg"
import PersonEntry from "./PersonEntry";
import ProfileEntryEditor from "../../TeamProfileEditorComponents/ProfileEntryEditor";
import MultiFieldPhoneEntry from "../../AuthModalComps/MultiFieldPhoneEntry";

export default function AddAvailibilityModal(){

        
    // Create availibility stuffs
    const [startTime, setStartTime] = useState({ hrs: null, mins: null, xm: null });
    const [endTime, setEndTime] = useState({ hrs: null, mins: null, xm: null });
    const [isPickingTime,setIsPickingTime]=useState(false)
    const [isPickingStart,setIsPickingStart]=useState(null)

    // Handler for time change
    const handleTimeChange = (newValue) => {
        if(isPickingStart){
        if (newValue) {
        let hr = newValue.hour()==0 ? 12:newValue.hour()
        setStartTime({
            hrs: hr, // Extract hours from the Day.js object
            mins: newValue.minute(), // Extract minutes from the Day.js object
            xm: newValue.format('A'), // Extract "AM" or "PM"
        });
        }
        }else{
        let hr = newValue.hour()==0 ? 12:newValue.hour()
        setEndTime({
            hrs: hr, // Extract hours from the Day.js object
            mins: newValue.minute(), // Extract minutes from the Day.js object
            xm: newValue.format('A'), // Extract "AM" or "PM"
        }); 
        }
    };

    const CustomActionBar = (props) => {
        const { onAccept } = props;
        return (
          <PickersActionBar
            {...props}
            actions={['accept']} // Only show the OK button
          />
        );
      };
    const [time,setTime]=useState(null)

    const daysOWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [daysPicked, setDaysPicked] = useState(
        daysOWeek.map((day) => ({ day: day.toLowerCase(), isPicked: false }))
    );
    const [isWeeklyOccurrence,setWeeklyOccurrence]=useState(null)
    const [isPickingDays,setPickingDays]=useState(null)
    const [selectedDates, setSelectedDates] = useState([]);
    const currentDate = new Date();
    const xDaysLater = new Date(currentDate);
    xDaysLater.setDate(currentDate.getDate() + 3);

    const [startDate,setStartDate]=useState(null)
    const [endDate,setEndDate]=useState(null)
    const [selectingStartEndDates,setSelectingStartEndDates]=useState(false)
    const [selectingStartDate,setSelectStartDate]=useState(false)

    const [isDaySelected,setIsDaySelected]=useState(false)

    useEffect(()=>{
        const isSelected = daysPicked.some((day) => day.isPicked === true);
        setIsDaySelected(isSelected);
    },[daysPicked])

    const [numberOfSpots,setNumberOfSpots]=useState(1)
    const [addAnotherCoach, setAddAnotherCoach]=useState(false)

    const [newCoachName,setNewCoachName]=useState("")
    const [newCoachEmail,setNewCoachEmail]=useState("")
    const [newCoachNumber,setNewCoachNumber]=useState({phoneNumber:"",isValid:false})


    const [coaches,setCoaches]=useState([
        {fullName:"J Z asdsadss",email:"asdas",phoneNumber:"1231232"},{fullName:"J Z asdsadss",email:"asdas",phoneNumber:"1231232"}
    ])
    const [selectedCoachId,setSelectedCoachId] = useState(null)

    return(
        <div className="flex flex-col p-[6px] items-center justify-center " style={{overflow:'hidden'}}>

                    <div className="mt-[4px] font-bold text-center">
                        Add trial lesson availability
                    </div>

                    <div className="w-full h-[1px] bg-gray-200 mt-[8px] mb-[4px]"/>

                    <div className="flex flex-col overflow-y-auto justify-center items-center">

                    <div className="flex space-x-[8px] items-center mt-[12px] mb-[8px]">
                    <ClockIcon/>
                    <div className="text-[14px] font-bold">
                        Lesson Time
                    </div>
                    </div>
                    <div>
                    <div className="flex items-center justify-center space-x-[4px]">
                    <div className="text-[14px] mr-[4px]">
                        Start
                    </div>
                    <div className={`border rounded-[12px] p-[2px] px-[6px] cursor-pointer ${isPickingTime&&isPickingStart?"border-streamlineBlue border-[2px]":""}`} onClick={()=>{setIsPickingStart(true);setIsPickingTime(true);setTime(null)}}>
                        {(startTime.hrs || startTime.hrs==0) && (startTime.mins || startTime.mins==0) && startTime.xm ? 
                        <div>
                            {startTime.hrs}:{startTime.mins<10?'0'+startTime.mins:startTime.mins} {startTime.xm}
                        </div> : 
                        <div className="text-gray-500">
                            Select time
                        </div>
                        }
                    </div>
                    <div className="text-[14px] pl-[8px] pr-[3px]">
                        End
                    </div>

                    <div className={`border rounded-[12px] p-[2px] px-[6px] cursor-pointer ${isPickingTime&&!isPickingStart?"border-streamlineBlue border-[2px]":""}`}onClick={()=>{setIsPickingStart(false);setIsPickingTime(true);setTime(null)}}>
                        {endTime.hrs && endTime.mins && endTime.xm ? 
                        <div>
                            {endTime.hrs}:{endTime.mins<10?'0'+endTime.mins:endTime.mins} {endTime.xm}
                        </div> : 
                        <div className="text-gray-500">
                            Select time
                        </div>
                        }
                    </div>
                    </div>
                    {isPickingTime &&
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticTimePicker orientation="portrait"
                      onChange={handleTimeChange} 
                      onAccept={()=>{setIsPickingTime(false)}}
                      slots={{ actionBar: CustomActionBar }} // Use the custom action bar
                      value={time}
                      />
                    </LocalizationProvider>}
                    </div>


                    {/* COACHES AND SPOTS */}
                    <div className="flex flex-col mt-[12px] w-full items-center">
                        <div className="flex space-x-[10px] items-center">
                        <PeopleIcon/>
                        <div className="font-bold text-[14px]">
                            Coach & Spots
                        </div>
                        </div>

                        <div className="flex mt-[4px] items-center">
                            <div className="text-[14px]">
                                Number of spots
                            </div>

                            <div className="flex space-x-[14px] ml-[20px] items-center select-none">
                            <div className={`font-bold select-none text-gray-500 mb-[2px] text-[24px] p-[5px] ${numberOfSpots==1 ? "opacity-50":"cursor-pointer"}`} onClick={()=>{if(numberOfSpots>1){setNumberOfSpots(numberOfSpots-1)}}}>-</div>
                            <div className="flex border rounded-[12px] p-[6px] text-center">
                            {numberOfSpots}
                            </div>
                            <div className={`font-bold select-none text-[24px] text-gray-500 p-[5px] cursor-pointer`} onClick={()=>{setNumberOfSpots(numberOfSpots+1)}}>+</div>
                            </div>


                        </div>
                        
                        <div className="flex items-center text-[14px] py-[4px]">
                            <div className="flex flex-col w-[145px]">
                            <div className="text-[14px] leading-[14px] text-center">
                                Coach (optional)
                            </div>
                            <div className="leading-[14px] mt-[6px] text-gray-500 text-center">
                                Select coach or 
                            </div>
                            <div className="bg-streamlineBlue px-[8px] py-[4px] rounded-[16px] font-bold mt-[6px] text-white cursor-pointer" onClick={()=>{setAddAnotherCoach(true)}}>
                                Add another coach
                            </div>
                            </div>

                            <div>
                                <div className=" ">
                                {coaches.map((item,index)=>(
                                    <div key={index} className={`py-[3px] cursor-pointer hover:opacity-100 ${selectedCoachId==index ? "": "opacity-50"}`} onClick={()=>{setSelectedCoachId(index)}}>
                                        <PersonEntry personInfo={{fullName:item.fullName,email:item.email,phoneNumber:item.phoneNumber}}/>
                                    </div>
                                )
                                )}
                                </div>
                            </div>

                        </div>

                        {addAnotherCoach &&<>
                             <div className="space-y-[4px] mt-[8px]">
                                <ProfileEntryEditor prompt={"Full name"} 
                                placeholder={'Coach name'}
                                response={newCoachName}
                                setResponse={setNewCoachName}
                                />
                                <ProfileEntryEditor prompt={"Contact email (optional)"} 
                                placeholder={'Email address'}
                                response={newCoachEmail}
                                setResponse={setNewCoachEmail}
                                />

                                <MultiFieldPhoneEntry
                                prompt={'Phone number'}
                                placeholder={'Phone number'}
                                setFieldResponse={setNewCoachNumber}
                                fieldResponse={newCoachNumber}
                                field={'phoneNumber'} customLength={"w-[180px]"}/>
                        </div>
                        <div className={`font-bold bg-streamlineBlue text-white px-[12px] py-[6px] rounded-full mt-[12px] text-[14px] ${newCoachName.length>0 && newCoachNumber.isValid ? "cursor-pointer" : "opacity-50"}`} onClick={()=>{
                            if(newCoachName.length>0 && newCoachNumber.isValid)
                            {
                            setAddAnotherCoach(false); 
                            setCoaches([...coaches,
                                {fullName:newCoachName,email:newCoachEmail,phoneNumber:newCoachNumber.phoneNumber}
                            ])
                            }else{

                                }
                                
                            }}>
                            Add coach
                        </div>
                        </>
                        }
                    </div>


                    {/* REMINDER BEFORE LESSON */}
                    <div className="flex flex-col w-full items-center">
                        <div className="flex items-center mt-[6px]">
                        <NotifIcon/>
                        <div className="ml-[8px] font-bold text-[14px]">
                            Reminder
                        </div>
                        </div>
                        <div className="text-gray-500 text-[12px]">
                            Sent to both coach and swimmer(s)
                        </div>    
                    </div>

                    {/* AVAILABLE DAYS */}
                    <div className="flex space-x-[8px] justify-center mt-[16px] mb-[8px] items-center">
                    <CalendarIcon/>
                    <div className="text-[14px] font-bold">
                        Available days
                    </div>
                    </div>

                    {/* //picking between two options */}
                    <div className="flex justify-center mt-[7px] mb-[10px]">
                    <div className="flex space-x-[6px] items-center px-[30px] cursor-pointer"
                    onClick={()=>{setWeeklyOccurrence(false);setPickingDays(true)}}>
                        <div className={
                            isPickingDays&& !isWeeklyOccurrence?
                            `bg-streamlineBlue w-[15px] h-[15px] `
                            :
                            `bg-white w-[15px] h-[15px] border border-gray-400`}
                            style={{
                                borderRadius:"5px"
                            }}/>
                        <div className={isPickingDays&& !isWeeklyOccurrence?'font-bold text-[14px]':'text-[14px]'}>
                            Pick specific dates
                        </div>
                    </div>
                    <div className="flex space-x-[6px] items-center px-[30px] cursor-pointer"
                    onClick={()=>{setWeeklyOccurrence(true);setPickingDays(true)}}>
                        <div className={
                            isPickingDays&& isWeeklyOccurrence?
                            `bg-streamlineBlue w-[15px] h-[15px] `:
                            `bg-white w-[15px] h-[15px] border border-gray-400`}
                            style={{
                                borderRadius:"5px"
                            }}/>
                        <div className={isPickingDays&& isWeeklyOccurrence?'font-bold text-[14px]':'text-[14px]'}>
                            Weekly occurrence
                        </div>
                    </div>

                    </div>


                    {
                        isPickingDays&&
                        <>
                            {isWeeklyOccurrence?
                            <>
                            <WeekdayPicker daysPicked={daysPicked} setDaysPicked={setDaysPicked}/>
                            
                            <div className="flex items-center justify-center space-x-[4px] mt-[14px]">
                                <div className="text-[14px]">
                                    Starts on
                                </div>
                                <div className={`border rounded-[12px] p-[2px] px-[6px] cursor-pointer ${selectingStartEndDates&&selectingStartDate?"border-streamlineBlue border-[2px]":""}`} onClick={()=>{setSelectStartDate(true);setSelectingStartEndDates(true);setTime(null)}}>
                                    {startDate ? 
                                    <div className="text-[14px]">
                                        {startDate.toDateString().slice(0,startDate.toDateString().length-5)}
                                    </div> : 
                                    <div className="text-gray-500 text-[14px]">
                                        Select date
                                    </div>
                                    }
                                </div>
                                <div className="text-[14px] pl-[8px]">
                                    Ends on
                                </div>
                                <div className={`border rounded-[12px] p-[2px] px-[6px] cursor-pointer ${selectingStartEndDates&&!selectingStartDate?"border-streamlineBlue border-[2px]":""}`}onClick={()=>{setSelectStartDate(false);setSelectingStartEndDates(true);setTime(null)}}>
                                    {endDate ? 
                                    <div className="text-[14px]">
                                        {endDate.toDateString().slice(0,endDate.toDateString().length-5)}
                                    </div> : 
                                    <div className="text-gray-500 text-[14px]">
                                        Select date
                                    </div>
                                    }
                                </div>
                            </div>
                            {
                             selectingStartEndDates &&
                             <div className="border p-[14px] rounded-[20px] border-[1px] border mt-[12px] shadow-[0_0_11px_rgba(0,0,0,0.1)] mb-[12px]">
                                 <DayPicker
                                 mode="single"
                                 selected={selectingStartDate?startDate:endDate}
                                 onSelect={(day) => {
                                    if (selectingStartDate) {
                                      setStartDate(day);
                                    } else {
                                      setEndDate(day);
                                    }
                                  }}
                                 disabled={{before:xDaysLater}}
                                 />
                             </div>
                            }

                            </>                            
                            :
                            <>
                            <div className="border p-[16px] rounded-[20px] border-[1px] border-streamlineBlue">
                                <DayPicker
                                mode="multiple"
                                selected={selectedDates}
                                onSelect={setSelectedDates}
                                disabled={{before:xDaysLater}}
                                />
                            </div>
                            
                            </>              }
                        </>

                    }
                    </div>

                    <div className={`mt-[12px] bg-streamlineBlue text-white px-[16px] py-[8px] rounded-full font-bold ${startDate&&endDate&&startTime.xm&&startTime.hrs&&endTime.xm&&endTime.hrs&&isDaySelected || startTime.xm&&startTime.hrs&&endTime.xm&&endTime.hrs&&(daysPicked.length>0) ? "cursor-pointer" :"opacity-50" }`} onClick={()=>{
                        if(startDate&&endDate&&startTime.xm&&startTime.hrs&&endTime.xm&&endTime.hrs&&isDaySelected || startTime.xm&&startTime.hrs&&startTime.hrs&&endTime.hrs&&endTime.xm&&(daysPicked.length>0)){
                            console.log("HIIII")
                        }
                    }}>
                        Add availability
                    </div>

                </div>
    )
}