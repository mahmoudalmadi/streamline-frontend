import ImageUploader from "../ImageUploader";
import ProfileEntryEditor from "../ProfileEntryEditor";

export default function TeamInfoWrapper({newTeamName,setNewTeamName,teamDescription,setTeamDescription,logoImg,setLogoImg}){

    return(
        <>
            <ProfileEntryEditor
              prompt={"Team Name"}
              response={newTeamName}
              setResponse={setNewTeamName}
              placeholder={"Team Name"}
              isLong={false}
              />
              <ProfileEntryEditor
              prompt={"Swim Team Description"}
              response={teamDescription}
              setResponse={setTeamDescription}
              placeholder={"Talk about your swim team's culture, offerings, history, staff etc..."}
              isLong={true}
              />
              <ImageUploader allowMultiple={false} images={logoImg} setImages={setLogoImg} prompt={"Logo Image"}
              buttonMessage={
                  logoImg.length!=0?"Replace Team Logo Image":"Upload Team Logo Image"}/>

              <div
              className="h-[3px]"
              />
        </>
    )
}