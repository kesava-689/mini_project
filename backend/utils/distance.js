// utils/distance.js
const axios = require("axios");

const getDrivingDistance = async (startCoords, endCoords) => {
  if (
    !startCoords || !endCoords ||
    !startCoords.lat || !startCoords.lon ||
    !endCoords.lat || !endCoords.lon
  ) {
    throw new Error("Invalid coordinates provided");
  }

  const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=false`;

  const res = await axios.get(url);

  if (!res.data || !res.data.routes || res.data.routes.length === 0) {
    throw new Error("No routes found in OSRM response");
  }

  const distanceInKm = res.data.routes[0].distance / 1000; // distance in km
  return distanceInKm;
};

module.exports = getDrivingDistance;
