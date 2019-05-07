const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    if (isValidElement(element)) {
        data[element.name] = element.value;
    }
    return data;
}, {});

const isValidElement = element => {
    return element.name && element.value;
}

const handleFormSubmit = event => {
    // opreste formularul din a submite datele atata timp cat le prelucram prin ajax
    event.preventDefault();

    //ia datele din formular
    const data = formToJSON(form.elements);
    //console.log(data);
    // transmitele datele ca un obiect JSON
    const dataContainer = document.getElementsByClassName('addSensor-form')[0];

    // sa faca outputul valid
    dataContainer.textContent = JSON.stringify(data, null, " ");
    sendPost(dataContainer.textContent)
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => {
            console.error(error)
        });
    //console.log(dataContainer);
    //seeStatus();
};
const form = document.getElementsByClassName('addSensor-form')[0];
form.addEventListener('submit', handleFormSubmit);
function sendPost(data) {
    return fetch('/adaugareSenzor', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrer: "no-refferer",
        body: data
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                if(response.status == 200)
                    if(response.statusText === "addSensor") {
                        window.location.pathname = '/adaugareSenzor';
                    }
                    else {
                        response.json();
                    }
            }
            else {
                if (response.status == 401) {
                    if (response.statusText === "kidExist") {
                        alert("Copilul exista deja in sistemul de supraveghere!");
                        location.reload();
                    }
                    else if (response.statusText === "distance") {
                        alert("Distanta introdusa nu este corecta!")
                        location.reload();
                    }
                    else if (response.statusText === "age") {
                        alert("Varsta copilului nu corespunde cu cerintele de monitorizare!");
                        location.reload();
                    }
                }
                else console.log(response);
            }
        }
        );
}