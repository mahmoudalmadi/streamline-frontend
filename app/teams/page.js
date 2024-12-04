"use client";

import { Suspense } from "react";
import ClientTeamsPage from "../components/TeamPortalComps/ClientTeamsPage";
import { TeamSignUpProvider } from "../contexts/TeamSignUpProvider";
import LoadingScreen from "../components/loadingScreen";

export default function TeamsLandingPage() {
  return (
    <TeamSignUpProvider>
    <Suspense fallback={<LoadingScreen loadingMessage={"Loading Team Portal"}/>}>
      <ClientTeamsPage />
    </Suspense>
    </TeamSignUpProvider>
  );
}
