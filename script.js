document.addEventListener("DOMContentLoaded", function () {
    const addItem = document.getElementById("add-item");
    const popupDiv = document.getElementById("popup-div");
    const closeBtn = document.getElementById("close-btn");
    const saveBtn = document.getElementById("save-btn");
    const noteInput = document.getElementById("note-input");
    const notesList = document.querySelector("#notes-div ul");

    let editMode = false;
    let currentNote = null;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    function saveNotesToLocalStorage() {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function loadNotes() {
        notesList.innerHTML = `<li id="add-item"><i class="fa-solid fa-plus"></i></li>`;
        notes.forEach((noteText, index) => createNoteElement(noteText, index));
        addEventListeners();
    }

    function createNoteElement(text, index) {
        const newNote = document.createElement("li");
        newNote.id = "note-item";

        const noteText = document.createElement("span");
        noteText.id = "note-text";
        noteText.textContent = text;
        newNote.appendChild(noteText);

        const controlDiv = document.createElement("div");
        controlDiv.id = "control-div";

        const editButton = document.createElement("button");
        editButton.id = "note-edit";
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            noteInput.value = text;
            editMode = true;
            currentNote = index;
            popupDiv.style.display = "flex";
        };

        const removeButton = document.createElement("button");
        removeButton.id = "note-remove";
        removeButton.textContent = "Remove";
        removeButton.onclick = function () {
            notes.splice(index, 1);
            saveNotesToLocalStorage();
            loadNotes();
        };

        controlDiv.appendChild(editButton);
        controlDiv.appendChild(removeButton);
        newNote.appendChild(controlDiv);

        notesList.appendChild(newNote);
    }

    addItem.addEventListener("click", function () {
        editMode = false;
        popupDiv.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        popupDiv.style.display = "none";
        noteInput.value = "";
        editMode = false;
    });

    saveBtn.addEventListener("click", function () {
        const textareaValue = noteInput.value.trim();
        if (textareaValue === "") {
            alert("Note cannot be empty!");
            return;
        }

        if (editMode && currentNote !== null) {
            notes[currentNote] = textareaValue;
        } else {
            notes.push(textareaValue);
        }

        saveNotesToLocalStorage();
        loadNotes();
        noteInput.value = "";
        popupDiv.style.display = "none";
        editMode = false;
        currentNote = null;
    });

    function addEventListeners() {
        document.getElementById("add-item").addEventListener("click", function () {
            editMode = false;
            popupDiv.style.display = "flex";
        });
    }

    loadNotes();
});