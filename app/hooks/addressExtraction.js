

async function resolveShortLink(shortUrl) {
    try {
      const response = await fetch(shortUrl, { method: "HEAD", redirect: "manual" });
      if (response.status === 302) {
        return response.headers.get("location"); // Get the redirect URL
      } else {
        throw new Error("Failed to resolve short link");
      }
    } catch (error) {
      console.error("Error resolving short link:", error.message);
      throw error;
    }
  }

  async function getAddressFromCoords(lat, lng, apiKey) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.results && data.results[0]) {
        return data.results[0].formatted_address; // Return the first address result
      } else {
        throw new Error("No address found for the given coordinates");
      }
    } catch (error) {
      console.error("Error fetching address:", error.message);
      throw error;
    }
  }


export default async function extractAddressFromGoogleLink({addressLink}){

    let fullUrl;

    if (addressLink.includes("@")){
        fullUrl = addressLink;
    }else{
        fullUrl = await resolveShortLink(addressLink)
    }

    const match = fullUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    
    let lat;
    let lng;
    if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
        console.log({ lat, lng });
    }else{
        throw("Short link resolved, but coordinates not found")
    }

    const address = await getAddressFromCoords(lat, lng, process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);


    if (address) {
        console.log("Full Address:", address);
      } else {
        console.error("Failed to fetch address.");
      }

    return address;
}
