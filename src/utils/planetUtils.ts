export const getHomePlanetName = async (planetUrl: string): Promise<string> => {
  try {
    const response = await fetch(planetUrl);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error fetching planet:", error);
    return "Unknown";
  }
};
