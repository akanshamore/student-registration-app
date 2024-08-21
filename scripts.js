// Get references to the form and table elements
const registrationForm = document.getElementById("registrationForm");
const studentsTableBody = document
  .getElementById("studentsTable")
  .querySelector("tbody");

// Load students from local storage on page load
document.addEventListener("DOMContentLoaded", loadStudentsFromLocalStorage);

// Event listener for form submission
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Retrieve form values
  const name = document.getElementById("firstName").value.trim();
  const studentID = document.getElementById("studentID").value.trim();
  const emailID = document.getElementById("emailID").value.trim();
  const contactNo = document.getElementById("contactNo").value.trim();

  // Validate form values
  if (!name || !studentID || !emailID || !contactNo) {
    alert("Please fill in all the fields.");
    return;
  }

  // Create a new student object
  const student = {
    name: name,
    studentID: studentID,
    emailID: emailID,
    contactNo: contactNo,
  };

  // Save the student to local storage
  saveStudentToLocalStorage(student);

  // Add the student to the table
  addStudentToTable(student);

  // Reset the form
  registrationForm.reset();
});

// Function to save a student to local storage
function saveStudentToLocalStorage(student) {
  // Get existing students from local storage
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Add the new student to the array
  students.push(student);

  // Save the updated array back to local storage
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to load students from local storage
function loadStudentsFromLocalStorage() {
  // Get students from local storage
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Add each student to the table
  students.forEach(addStudentToTable);
}

// Function to add a student to the table
function addStudentToTable(student) {
  // Create a new table row
  const newRow = studentsTableBody.insertRow();

  // Create table cells and set their text content
  const nameCell = newRow.insertCell(0);
  nameCell.textContent = student.name;

  const studentIDCell = newRow.insertCell(1);
  studentIDCell.textContent = student.studentID;

  const emailIDCell = newRow.insertCell(2);
  emailIDCell.textContent = student.emailID;

  const contactNoCell = newRow.insertCell(3);
  contactNoCell.textContent = student.contactNo;

  // Create the actions cell with edit and delete buttons
  const actionsCell = newRow.insertCell(4);

  // Create edit button
  const editButton = document.createElement("a");
  editButton.href = "#";
  editButton.textContent = "Edit";
  editButton.className = "edit";
  editButton.addEventListener("click", function (event) {
    event.preventDefault();
    editStudent(newRow, student);
  });

  // Create delete button
  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", function (event) {
    event.preventDefault();
    deleteStudent(newRow, student);
  });

  // Append buttons to the actions cell
  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
}

// Function to edit a student
function editStudent(row, student) {
  // Populate the form with existing student details
  document.getElementById("firstName").value = student.name;
  document.getElementById("studentID").value = student.studentID;
  document.getElementById("emailID").value = student.emailID;
  document.getElementById("contactNo").value = student.contactNo;

  // Remove the student from local storage and the table
  deleteStudent(row, student);
}

// Function to delete a student
function deleteStudent(row, student) {
  // Remove the student row from the table
  row.remove();

  // Get existing students from local storage
  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Filter out the student to be deleted
  const updatedStudents = students.filter(
    (s) => s.studentID !== student.studentID
  );

  // Save the updated list back to local storage
  localStorage.setItem("students", JSON.stringify(updatedStudents));
}
