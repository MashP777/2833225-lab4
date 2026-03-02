
document.getElementById("search-btn").addEventListener("click", () =>{
    const countryName=document.getElementById("country-input").Value;
    searchCountry(countryName);
});

async function searchCountry(countryName) {
    const countryInfo=document.getElementById("country-info");
    const borderCountries=document.getElementById("bordering-countries");
    const errorDiv=document.getElementById("error-message");
    const spinner=document.getElementById("loading-spinner");

    countryInfo.innerHTML=" ";
    borderCountries.innerHTML=" ";
    errorDiv.innerHTML=" ";

    try {
        // Show loading spinner
        spinner.classList.remove("hidden");
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json()
        const country=data[0];
        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        // Show error message
    } finally {
        // Hide loading spinner
    }
}