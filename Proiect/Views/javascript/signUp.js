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
    const dataContainer = document.getElementsByClassName('signUpForm')[0];

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
const form = document.getElementsByClassName('signUpForm')[0];
form.addEventListener('submit', handleFormSubmit);
function sendPost(data) {
    return fetch('/signup', {
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
                    if(response.statusText === "map") {
                        window.location.pathname = '/map';
                    }
                    else {
                        response.json();
                    }
            }
            else {
                if (response.status == 401) {
                    if (response.statusText === "email") {
                        alert("Email deja existent! Va rugam sa introduceti altul!");
                        location.reload();
                    }
                    else if (response.statusText === "parola") {
                        alert("Parola trebuie sa aiba minim 6 caractere!")
                        location.reload();
                    }
                    else if (response.statusText === "numar") {
                        alert("Numarul de telefon nu are formatul dorit (10 caractere si sa inceapa cu 07)!");
                        location.reload();
                    }
                    else if (response.statusText === "email gresit") {
                        alert("Emailul nu are formatul dorit!");
                        location.reload();
                    }
                    // }
                    //console.log(response);

                }
                else console.log(response);
            }
        }
        );
}
// function seeStatus() {
//     fetch("/signup")
//         .then(function (response) {
//             if (response.status !== 200) {
//                 throw new Error(response.status)
//             }
//         })
//         .catch(function (error) {
//             if (response.status == 401) {
//                 alert("eroare");
//             }
//         });
// }
