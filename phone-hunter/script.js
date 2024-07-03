// input and search part
const searchPhone = () => {
    document.getElementById("spinner").style.display = "block";
    const searchField = document.getElementById("search-field").value;
    if (searchField == "") {
        document.getElementById("blank-input").style.display = "block";
        document.getElementById("spinner").style.display = "none";
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => showPhones(data.data));
        document.getElementById("search-field").value = "";
        document.getElementById("blank-input").style.display = "none";
    }
};
//showing the search results (phones)
const showPhones = (phone) => {
const phones = phone.slice(0, 20);
if (phones.length == 0) {
        document.getElementById("input-error").style.display = "block";
        document.getElementById("spinner").style.display = "none";
    } else {
        document.getElementById("input-error").style.display = "none";
        const displayPhone = document.getElementById("phones");
        displayPhone.textContent = "";
        phones?.forEach((phone) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("col-12", "col-lg-4");
        createDiv.innerHTML = `
                <div class="card border-0 shadow p-4 rounded mx-auto" style="width:18rem">
                <img src="${phone.image}" class="card-img-top" alt="phone-image" />
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand} </p>
                        <button onclick="phoneId('${phone.slug}')" class="btn btn-dark">Details</button>
                    </div>
                </div>
                `;
        displayPhone.appendChild(createDiv);
        document.getElementById("spinner").style.display = "none";
        });
    }
}
// phone id part
    const phoneId = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showPhoneDetails(data.data));
        window.scrollTo(0, 0);
}
// phone details
const showPhoneDetails = (details) =>{
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    const createDivs = document.createElement('div');
    createDivs.classList.add('mb-5')
    createDivs.innerHTML = `
    <div class="card shadow p-3" style="width: 18rem;">
        <img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${details.name}</h5>
            <p>Brand: ${details.brand}</p>
            <h6>Released: ${details?.releaseDate ? details.releaseDate : 'Not Found'}</h6>
        </div>
        <h5 class="mt-2 text-success text-center">Main Features </h5>
            <li class="list-group-item">ChipSet: ${details?.mainFeatures?.chipSet? details.mainFeatures.chipSet:'Not Found'}</li>
            <li class="list-group-item">Display Size: ${details?.mainFeatures?.displaySize? details.mainFeatures.displaySize:'Not Found'}</li>
            <li class="list-group-item">Memory: ${details?.mainFeatures?.memory? details.mainFeatures.memory:'Not Found'}</li>
        <h5 class="mt-2 text-success text-center">Sensor Information </h5>
            <li class="list-group-item">${details?.mainFeatures?.sensors[0]? details.mainFeatures.sensors[0]:'Not Found'}</li>
            <li class="list-group-item">${details?.mainFeatures?.sensors[1]? details.mainFeatures.sensors[1]:'Not Found'}</li>
            <li class="list-group-item">${details?.mainFeatures?.sensors[2]? details.mainFeatures.sensors[2]:'Not Found'}</li>
            <li class="list-group-item">${details?.mainFeatures?.sensors[3]? details.mainFeatures.sensors[3]:'Not Found'}</li>
            <li class="list-group-item">${details?.mainFeatures?.sensors[4]? details.mainFeatures.sensors[4]:'Not Found'}</li>
            <li class="list-group-item">${details?.mainFeatures?.sensors[5]? details.mainFeatures.sensors[5]:'Not Found'}</li>
        <h5 class="mt-2 text-success text-center">Others Information</h5>
            <li class="list-group-item">Bluetooth: ${details.others?.Bluetooth? details.others?.Bluetooth:'Not Found'}</li>
            <li class="list-group-item">GPS: ${details?.others?.GPS? details.others.GPS:'Not found'}</li>
            <li class="list-group-item">NFC: ${details?.others?.NFC? details.others.NFC:'Not Found'}</li>
            <li class="list-group-item">Radio: ${details?.others?.Radio? details.others?.Radio:'Not Found'}</li>
            <li class="list-group-item">USB: ${details?.others?.USB? details.others.USB:'Not Found'}</li>
            <li class="list-group-item">WLAN: ${details?.others?.WLAN ? details.others.WLAN : 'Not Found'}</li>
    </div>
    `
    phoneDetails.appendChild(createDivs);
};

