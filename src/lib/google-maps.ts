import { appConfig } from "@/constants/config";

export function getGoogleMapsUrl() {
  return `https://maps.googleapis.com/maps/api/js?key=${appConfig.googleMapsApiKey}&libraries=places`;
}
