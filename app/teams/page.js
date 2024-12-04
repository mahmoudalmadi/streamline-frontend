import { Suspense } from "react";
import ClientTeamsPage from "../components/ClientTeamsPage";

export default function TeamsLandingPage() {
  return (
    <Suspense fallback={<p>Loading team page...</p>}>
      <ClientTeamsPage />
    </Suspense>
  );
}
