const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

// Function to add task
function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button"); // New edit button
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit"; // New edit button
        deleteButton.classList.add("deleteButton");
        editButton.classList.add("editButton"); // New edit button
        li.textContent = taskText;
        li.appendChild(deleteButton);
        li.appendChild(editButton); // New edit button
        taskList.appendChild(li);
        taskInput.value = "";

        // Attach event listener to delete button
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        // Attach event listener to edit button
        editButton.addEventListener("click", function (e) {
            const editText = prompt("Edit task:", Array.from(li.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent.trim())
            .join(""));
            if (editText !== null) {
                li.textContent = editText;
                li.appendChild(deleteButton);
                li.appendChild(editButton);
            }
            e.stopImmediatePropagation();
        });


        // Add event listener for strikeout
        li.addEventListener("click", function () {
            li.classList.toggle("completed");
        });

        // Add drag-and-drop functionality
        li.draggable = true;
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("dragenter", dragEnter);
        li.addEventListener("dragleave", dragLeave);
        li.addEventListener("drop", dragDrop);
    }
}


// Functions for drag-and-drop functionality
let draggedItem = null;

function dragStart() {
    draggedItem = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
}

function dragLeave() {
    this.style.backgroundColor = "transparent";
}

function dragDrop() {
    this.style.backgroundColor = "transparent";
    const droppedPosition = Array.from(this.parentNode.children).indexOf(this);
    const draggedPosition = Array.from(taskList.children).indexOf(draggedItem);
    if (draggedPosition < droppedPosition) {
        this.parentNode.insertBefore(draggedItem, this.nextSibling);
    } else {
        this.parentNode.insertBefore(draggedItem, this);
    }
}

