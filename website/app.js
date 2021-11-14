/* Global Variables */
const apiKey = "fc0f782315ff772a2de2430631ad57c8";


const feelingsCodeE = document.getElementById('feelings');
const zipCodeE = document.getElementById('zip');
const dateE = document.getElementById('date');
const tempE = document.getElementById('temp');
const contentE = document.getElementById('content');
const cityE = document.getElementById('city');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', theGenerate);

/* Function called by event listener */
function theGenerate() {

/** Post Data To API */
    let theData = {
        zipCode: zipCodeE.value,
        content: feelingsCodeE.value,
        date: new Date()
    };

//Post Data To Api For Get Zip Code Information    
    getZipCodeInformation(theData.zipCode).then(zipInfo => {

        if (zipInfo.cod != 200) {
            return alert(zipInfo.message)
        }
//Now Post Data To Server For Saving And Display In Holder Section
        theData.temp = zipInfo.list[0].main.temp ,zipInfo.city.name;
        const cityName =zipInfo.city.name;
        postData(theData);
        cityE.innerHTML = `City is : ${cityName}`;
    }).catch((err) => { console.log(err); });
};

/** Get Zip Code Information From Api */
async function getZipCodeInformation(zipCode) {

return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()

}

/* Function to POST data */
    async function postData(theData) {
         let saveRes = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(theData),
    });
    try {
        if (!saveRes.ok) {
            alert('NOT Success');
            return;
        }

        saveRes.json().then(theData => {
            if (saveRes.ok) {
                
                upDateUi();
            } else {
                alert('NOT Success')
            }

        }).catch((e) => { console.log(e); });
    } catch (error) {
        console.log(error);
    }
}

/** Update UI */
    async function upDateUi() {
        let saveRes = await fetch(`${apiUrl}all`);
    
          try {    
        // Update UI dynamically
            saveRes.json().then(theData => {
            dateE.innerHTML = `Date is: ${newDate}`;
            tempE.innerHTML = `Temp is: ${theData.temp}°F`;
            contentE.innerHTML = `Feelings is: ${theData.content}`;
            
            }).catch((e) => { console.log(e); });
         } catch (error) {
        console.log(error);
    }
}