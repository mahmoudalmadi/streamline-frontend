


const CONFIG = {
    amenitiesIcons:{
        1:{"name":"Swimming Pool", iconName:"PoolIcon.png"},
        2:{"name":"Changing Rooms", iconName:"ChangingRoomsIcon.png"},
        3:{"name":"Showers", iconName:"ShowersIcon.png"},
        4:{"name":"Wifi", iconName:"WifiIcon.png"},
        5:{"name":"Spectator Area", iconName:"SpectatorAreaIcon.png"},
        6:{"name":"Free On-site Parking", iconName:"ParkingIcon.png"},
        7:{"name":"Paid On-site Parking", iconName:"PaidParking.jpg"},
    },
    backendRoute:"http://localhost:8080/",
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
        {id:1, day: 'Monday', checked:false },
        {id:2, day: 'Tuesday', checked:false },
        {id:3, day: 'Wednesday', checked:false},
        {id:4, day: 'Thursday', checked:false},
        {id:5, day: 'Friday', checked:false },
        {id:6, day: 'Saturday', checked:false },
        {id:7, day: 'Sunday', checked:false},
      ],
    timesOfDay:[
        {id:1, timeOfDay: '9 AM - 12 PM',checked:false},
        {id:2, timeOfDay: '3 PM - 6 PM',checked:false},
        {id:3, timeOfDay: '6 PM - 9 PM',checked:false}
    ]
}

export default CONFIG;