// implement the functionalities of the add form

// variables associated to add contact form
var showFormBtn = document.getElementById("showFormBtn");
var add_form = document.querySelector(".add_form");
var fname = document.getElementById("fname");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var add_btn = document.getElementById("add_btn");

var name_error = document.getElementById("name_error");
var email_error = document.getElementById("email_error");
var phone_error = document.getElementById("phone_error");
var edit_form = document.getElementById("edit_form");

const checkNum = /\d+$/g;
const checkLet = /^[A-Za-z]+$/; 
const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// to show the contact form when the "add contact" button is clicked
function showAddForm(){
    if(add_form.style.display==='none'){
        add_form.style.display = 'block';
        if(edit_form.style.display==='block' && add_form.style.display==='block' ){
            edit_form.style.display = 'none';
            
        } 
    } else{
        add_form.style.display = 'none';
        if(edit_form.style.display==='block' ){
            edit_form.style.display = 'none';
            
        }
    }
}
// now we want to display the info entered in the add form.
// this will happen when we click the save button on the form
add_btn.addEventListener('click', saveContact);

// saveContact function

// all contacts are saved in an array
var contacts = [];
function saveContact(){
    // before we save a contact, we must validate the info entered
    // so let's validate and call the function here
    validationFunc(fname, email, phone)
}
// validation function
function validationFunc(vName, vEmail, vPhone){
    if(vName=="" || !checkLet.test(vName.value)){
        name_error.innerHTML = "Invalid name";
        vName.style.border = "1px solid red";
    }
    else if(vEmail=="" || !checkEmail.test(vEmail.value)){
        email_error.innerHTML = "Invalid Email";
        vEmail.style.border = "1px solid red";
    }
    else if(vPhone=="" || !checkNum.test(vPhone.value)){
        phone_error.innerHTML = "Invalid phone";
        vPhone.style.border = "1px solid red";
    }
    else{
        // we want to now save the validated info
        var contact = [];
        contact[0] = vName.value;
        contact[1] = vEmail.value;
        contact[2] = vPhone.value;
        contacts.unshift(contact);
        // now display a message to user that the info is saved
        alert("Contact saved!")
        // now we have display the contact to the user
        // we shall create a function for that and call it here
        displayContacts();
        // we have make sure the form is empty after the contact is saved
        vName.value = "";
        vEmail.value = "";
        vPhone.value = "";

        // make the add contact form disappear after saving contact
        hideAddForm();
    }
}

// function to display contacts
function displayContacts(){
    var sn = 1;
    // first we generate a table that will carry the contacts
    var table = "<table class='table'>";
    // this is the head of the table
    table+= "<tr><td>SN</td><td>Name</td><td>Email</td><td>Phone</td><td>Action</td></tr>";
    // now we generate the elements of the table using data in our contacts array
    for(i=0; i<contacts.length; i++){
        var contact = contacts[i];
        table+= "<tr>";
            table+= "<td>"+ sn + "</td>";
            table+= "<td>"+ contact[0] + "</td>";
            table+= "<td>"+ contact[1] + "</td>";
            table+= "<td>"+ contact[2] + "</td>";
            table+= `<td>
                        <i onclick="editForm(`+i+`)" style = "color:blue;" class="bi bi-pen-fill"></i>
                        <i onclick="hide()" data-bs-toggle="modal" data-bs-target="#delModal" style = "padding-left: 10px; color:red;" class='bi bi-trash3'></i>
                    </td>`
        table+= "</tr>";                
        sn++;
    }
    table+= "</table>";
    // assign this table to the one in the html file
    // so that we can see the contacts as they are being added
    document.getElementById("table").innerHTML = table;
}

// implement the functionalities of the edit form
function editForm(i){
    // to close the add contact form before editing a row
    var contact = contacts[i];
    if(edit_form.style.display==='none'){
        edit_form.style.display = 'block';
    }
    hideAddForm();
    var editInputs = "<div class='my-4 d-flex flex-row justify-content-around w-60vw'>";
        editInputs+= "<div><input id='edname' type='text' placeholder='name' value="+contact[0]+"><small><div id='name_error'></div></small></div>";
        editInputs+= "<div><input id='edemail' type='email' placeholder='email' value="+contact[1]+"><small><div id='email_error'></div></small></div>";
        editInputs+= "<div><input id='edphone' type='number' placeholder='phone' value="+contact[2]+"><small><div id='phone_error'></div></small></div>";
        editInputs+= "<button type='button' class='btn btn-primary' onclick='saveEditFunc("+i+")'>save</button>";
    editInputs+= "</div>"
    edit_form.innerHTML = editInputs;
}
// implement the functionalities of the edit and delete icons
// on save the edited fields, we call the saveEditFunc() 

function saveEditFunc(i){
    var contact = [];
    contact[0] = document.getElementById("edname").value;
    contact[1] = document.getElementById("edemail").value;
    contact[2] = document.getElementById("edphone").value;
    
    if(contact[0]=="" || !checkLet.test(contact[0])){
        name_error.innerHTML = "Invalid name";
        document.getElementById("edname").style.border = "1px solid red";
    }
    else if(contact[1]=="" || !checkEmail.test(contact[1])){
        email_error.innerHTML = "Invalid Email";
        document.getElementById("edemail").style.border = "1px solid red";
    }
    else if(contact[2]=="" || !checkNum.test(contact[2])){
        phone_error.innerHTML = "Invalid phone";
        document.getElementById("edphone").style.border = "1px solid red";
    }
    else{
        // we want to now save the validated info
        contacts[i] = contact;
        console.log(contact[0], contact[1], contact[2]);
        console.log(contacts[i]);
        // now display a message to user that the info is saved
        alert("Contact has been edited!")
        // now we have display the contact to the user
        // we shall create a function for that and call it here
        displayContacts();
        // to clear the edit form
        document.getElementById("edit_form").innerHTML = "";
            // to hide form
        hideEditForm();
    }
}
// function to delete row
function del(i){
    contacts.splice(i, 1);
    displayContacts();
}
function hideAddForm(){
    if(add_form.style.display=== 'block'){
        add_form.style.display = 'none';
    } else{
        console.log("hi")
    }
}

function hideEditForm(){
    if(edit_form.style.display=== 'block'){
        edit_form.style.display = 'none';
    } else{
        edit_form.style.display = 'block';
    }
}
function hide(){
    if(add_form.style.display==='block' || edit_form.style.display==='block'){
        add_form.style.display= 'none';
        edit_form.style.display= 'none';
    }
}
// make sure the edit form and the add form can not be seen at the same time