import SwimTeamThumbnail from "./SwimTeamThumbnail";


export default function SwimTeamsMenu() {

    return(

        <div className="grid gap-[25px] 
        grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

            <SwimTeamThumbnail/>

        </div>
    )
}