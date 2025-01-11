


const CONFIG = Object.freeze({
    amenitiesIcons:{
        1:{"name":"Swimming Pool", iconName:"PoolIcon.png"},
        2:{"name":"Changing Rooms", iconName:"ChangingRoomsIcon.png"},
        3:{"name":"Showers", iconName:"ShowersIcon.png"},
        4:{"name":"Wifi", iconName:"WifiIcon.png"},
        5:{"name":"Spectator Area", iconName:"SpectatorAreaIcon.png"},
        6:{"name":"Free On-site Parking", iconName:"ParkingIcon.png"},
        7:{"name":"Paid On-site Parking", iconName:"PaidParking.jpg"},
    },
    backendRoute:"https://api.experiencestreamline.com/",
    lessonTypes:{
        "Private":"One on one with an instructor",
        "Semi-Private":"I don't remember",
        "Group":"Group lesson with other swimmers"
    },
    skillLevels:{
        "Beginner":"Learning swimming for the first time",
        "Intermediate":"Has some swimming exprience",
        "Advanced":"Already a proficient swimmer"
    },
    daysOfWeek:[
        {id:1, day: 'Monday', checked:false, hoursOfOps:[] },
        {id:2, day: 'Tuesday', checked:false, hoursOfOps:[] },
        {id:3, day: 'Wednesday', checked:false, hoursOfOps:[]},
        {id:4, day: 'Thursday', checked:false, hoursOfOps:[]},
        {id:5, day: 'Friday', checked:false, hoursOfOps:[] },
        {id:6, day: 'Saturday', checked:false, hoursOfOps:[] },
        {id:7, day: 'Sunday', checked:false, hoursOfOps:[]},
      ],
    hoursOfOps:
    [
        { id: 0, hours: "12 AM - 1 AM" },
        { id: 1, hours: "1 AM - 2 AM" },
        { id: 2, hours: "2 AM - 3 AM" },
        { id: 3, hours: "3 AM - 4 AM" },
        { id: 4, hours: "4 AM - 5 AM" },
        { id: 5, hours: "5 AM - 6 AM" },
        { id: 6, hours: "6 AM - 7 AM" },
        { id: 7, hours: "7 AM - 8 AM" },
        { id: 8, hours: "8 AM - 9 AM" },
        { id: 9, hours: "9 AM - 10 AM" },
        { id: 10, hours: "10 AM - 11 AM" },
        { id: 11, hours: "11 AM - 12 PM" },
        { id: 12, hours: "12 PM - 1 PM" },
        { id: 13, hours: "1 PM - 2 PM" },
        { id: 14, hours: "2 PM - 3 PM" },
        { id: 15, hours: "3 PM - 4 PM" },
        { id: 16, hours: "4 PM - 5 PM" },
        { id: 17, hours: "5 PM - 6 PM" },
        { id: 18, hours: "6 PM - 7 PM" },
        { id: 19, hours: "7 PM - 8 PM" },
        { id: 20, hours: "8 PM - 9 PM" },
        { id: 21, hours: "9 PM - 10 PM" },
        { id: 22, hours: "10 PM - 11 PM" },
        { id: 23, hours: "11 PM - 12 AM" },
    ]    
    ,
    timesOfDay:[
        {id:1, timeOfDay: '9 AM - 12 PM',checked:false},
        {id:2, timeOfDay: '3 PM - 6 PM',checked:false},
        {id:3, timeOfDay: '6 PM - 9 PM',checked:false}
    ],
    contactInfoDisclaimer:"* Your contact information will be used only to communicate where necessary once you have booked a lesson with a swim team"
})

export default CONFIG;