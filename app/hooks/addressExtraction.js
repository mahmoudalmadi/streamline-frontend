import CONFIG from "@/config";


async function resolveShortLink(shortUrl) {
    try {
        const query = new URLSearchParams({ shortUrl });
      const response = await fetch(CONFIG.backendRoute+`resolve-short-link?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resolve short link");
      }
  
      const data = await response.json();
      console.log("Resolved URL:", data.resolvedUrl);
      return data.resolvedUrl;
    } catch (error) {
      console.error("Error resolving short link:", error.message);
      throw error;
    }
  }
  

  async function getAddressFromCoords(lat, lng, apiKey) {
    try {
      const query = new URLSearchParams({ lat, lng, apiKey });
      const response = await fetch(CONFIG.backendRoute+ `get-address-from-coords?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch address");
      }
  
      const data = await response.json();
      console.log("Fetched Address:", data.address);
      return data.address;
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

      console.log("package",lat,lng,address)
    return {lat,lng, address};
}
