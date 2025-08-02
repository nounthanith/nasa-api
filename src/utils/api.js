const API_KEY = "xAr3ZimXkZUQEB0vOhxFhhmDttWu6L7aAt14lavF";
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1";

// Helper function to fetch photos by Earth date
async function fetchPhotosByDate(rover, earthDate, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/rovers/${rover}/photos?earth_date=${earthDate}&page=${page}&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch photos for ${earthDate} (page ${page})`);
    }

    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error(`Error fetching Mars photos for ${earthDate}:`, error);
    throw error;
  }
}

// Helper function to get a random date within a year
function getRandomDateInYear(year) {
  const start = new Date(year, 0, 1); // Jan 1 of the year
  const end = new Date(year, 11, 31); // Dec 31 of the year
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

async function getMarsPhotos(rover = "curiosity", pagesPerDate = 1) {
  try {
    // Define years we want to get photos from (Curiosity landed in 2012)
    const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    
    // Get one random date from each year
    const dates = years.map(year => getRandomDateInYear(year));
    
    let allPhotos = [];
    
    // Fetch photos for each date
    for (const date of dates) {
      try {
        console.log(`Fetching photos for ${date}...`);
        const photos = await fetchPhotosByDate(rover, date, 1);
        
        // If we got photos, add them to our collection
        if (photos && photos.length > 0) {
          allPhotos = [...allPhotos, ...photos];
          console.log(`Found ${photos.length} photos for ${date}`);
          
          // If we have a full page (25 items), there might be more pages
          if (photos.length === 25 && pagesPerDate > 1) {
            const pagePromises = [];
            
            // Start from page 2 since we already have page 1
            for (let page = 2; page <= pagesPerDate; page++) {
              pagePromises.push(fetchPhotosByDate(rover, date, page));
            }
            
            // Wait for all pages to be fetched
            const additionalPages = await Promise.all(pagePromises);
            
            // Combine all photos
            additionalPages.forEach(pagePhotos => {
              if (pagePhotos && pagePhotos.length > 0) {
                allPhotos = [...allPhotos, ...pagePhotos];
              }
            });
          }
        }
      } catch (error) {
        console.error(`Error processing date ${date}:`, error);
        // Continue with next date even if one fails
      }
    }
    
    // Shuffle the array to mix up the years
    allPhotos = allPhotos.sort(() => Math.random() - 0.5);
    
    console.log(`Total photos fetched: ${allPhotos.length}`);
    return allPhotos;
  } catch (error) {
    console.error("Error in getMarsPhotos:", error);
    throw error;
  }
}

export default getMarsPhotos;
