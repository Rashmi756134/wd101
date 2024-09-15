const email = document.getElementById("email");
const userForm = document.getElementById("user-form");
const dobInput = document.getElementById("dob");
const submit = document.getElementById("submit");

email.addEventListener('input',() => validate(email));
submit.addEventListener('click',()=> validate(email));

function validate(element){
    if(element.validity.typeMismatch){
        element.setCustomValidity("please include @ in the email format!!!");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

userForm.addEventListener("submit", validateAge);

function validateAge(event){
    const dob = new Date(dobInput.value); 
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days =  today.getDate() - dob.getDate();

    // claculate the months and days also.
    if (months < 0 || (months === 0 && days < 0)){
        years--;
    }
    const isEligible = years >= 18 && years <= 55;

    if(!isEligible) {
        event.preventDefault();
        dobInput.setCustomValidity("You have not valid age from 18-55.");
        dobInput.reportValidity();
    }else{
        dobInput.setCustomValidity('');
    }
};

let userEntries = [];
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries(); 
}


const retriveEntries = () =>{
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }else{
        entries = [];
    }

    return entries;
}
let UserEntries = retriveEntries();

const displayEntries = ()=>{
    const entries = retriveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptedTermsAndconditions}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class = "table-auto w-full"><tr>
    
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">dob</th>
    <th class="px-4 py-2">accepted terms?</th>
    </tr>${tableEntries}</table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
userForm.addEventListener("submit", saveUserForm);
displayEntries();
