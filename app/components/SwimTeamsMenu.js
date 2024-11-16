import SwimTeamThumbnail from "./SwimTeamThumbnail";


export default function SwimTeamsMenu() {

    return(

        <div className="grid gap-[25px] 
         sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

        </div>
    )
}