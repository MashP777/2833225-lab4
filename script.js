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
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json()
        const country=data[0];
        console.log(country)
        // Update DOM
        countryInfo.innerHTML=`<h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag"></img>`;
        
        // Fetch bordering countries
        if (country.borders && country.borders.length>0) {
            const code=country.borders.join(",");
            const borderRespond=await fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`);
            const borderDataRaw=await borderRespond.json();
            const borderData=Array.isArray(borderDataRaw) ? borderDataRaw: [borderDataRaw];

            
        // Update bordering countries section
        borderCountries.innerHTML=`<h3>Bordering Countries:</h3>`;
        borderData.forEach(neighbor => {
            const neighborDiv = document.createElement('div');
            neighborDiv.innerHTML +=`<p>${neighbor.name.common}</p>
            <img src="${neighbor.flags.svg}" alt="${neighbor.name.common} flag" width="80">`;
            borderCountries.appendChild(neighborDiv);
        });
    }
    else {
        borderCountries.innerHTML = `<p>This country has no bordering countries.</p>`;
    }
    } catch (error) {
        // Show error message
        errorDiv.textContent=error.message;
    } finally {
        spinner.classList.add("hidden");

    }
}

document.getElementById("search-btn").addEventListener("click", () =>{
    const country=document.getElementById("country-input").value;
    searchCountry(country);
});
