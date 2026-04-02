// Interface som beskriver CourseInfo med objekt
interface CourseInfo {
  code: string;
  name: string;
  progression: string; // "A" | "B" | "C"; // https://www.w3tutorials.net/blog/how-to-require-a-specific-string-in-typescript-interface/
  syllabus: string;
}

//Formulär
const courseForm = document.querySelector<HTMLFormElement>("#course-form");
const errorMsg = document.querySelector<HTMLDivElement>("#error-message");
const tableBody = document.querySelector<HTMLTableSectionElement>("#table-body");
const clearBtn = document.querySelector<HTMLButtonElement>("#clear-storage-btn");

// Skriver ut en ny kurs inom table i DOM
function printNewCourse(course: CourseInfo): void {
  if (tableBody) {
    tableBody.innerHTML += `
    <tr>
      <td>${course.code}</td>
      <td class="row-name">${course.name}</td>
      <td>${course.progression}</td>
      <td><a href="${course.syllabus}" target="_blank">Kursplan</a></td>
      <td><button class="delete-course-btn" data-id="${course.code}" aria-label="Ta bort kurs">Radera</button></td>
    </tr>`;
  }
}

// När formuläret submittas så skickas värdena från inputs till funktionen printnewcourse.
if (courseForm !== null) {
  courseForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const inputCode = (document.getElementById("code") as HTMLInputElement).value.trim().toUpperCase();
    const inputCourseName = (document.getElementById("coursename") as HTMLInputElement).value.trim();
    const inputProgression = (document.getElementById("progression") as HTMLInputElement).value.trim().toUpperCase();
    const inputSyllabus = (document.getElementById("syllabus") as HTMLInputElement).value.trim();
    const errors: string[] = [];
    const storedCode = localStorage.getItem(inputCode);

    const newCourse: CourseInfo = {
      code: inputCode,
      name: inputCourseName,
      progression: inputProgression,
      syllabus: inputSyllabus
    };

    // Felmeddelanden för inputs
    if (inputCode === "") {
      errors.push("Fyll i kurskod!");
    }

    if (inputCourseName === "") {
      errors.push("Fyll i kursnamn!")
    }

    if (inputProgression === "") {
      errors.push("Fyll i progression!")
    } else if (inputProgression !== "A" && inputProgression !== "B" && inputProgression !== "C") {
      errors.push("Progression måste vara A, B eller C!")
    }

    if (inputSyllabus === "") {
      errors.push("Fyll i kursplan!")
    } else if (!inputSyllabus.startsWith("http")) {
      errors.push("Kursplan måste vara en giltig URL!")
    }
    // Om det redan lagras en kurskod i localstorage så visas felmeddelandet
    if (storedCode) {
      errors.push("En kurs finns redan lagrad med den kurskoden!");
    }

    // Om felmeddelanden finns, visa felmeddelandena
    if (errors.length > 0) {
      displayErrorMsg(errors);
    }

    // Om inga felmeddelanden finns och det inte finns en kurs lagrad med samma kurskod
    if (errors.length === 0 && !storedCode) {

      // Sparar kursen som en egen key i localstorage, key är kurskoden
      localStorage.setItem(inputCode, JSON.stringify(newCourse))

      // Anropar funktionen för att skriva ut den nya kursen
      printNewCourse(newCourse);

      // Ta bort eventuella felmeddelanden som blev kvar vid submit
      if (errorMsg) {
        errorMsg.innerHTML = "";
      }
      // Redirect till startsidan
      window.location.href = "index.html";
    }
  });
}


// Om det finns något lagrat i localstorage så hämtas data och skrivs ut genom funktionen printnewcourse i DOM när sidan laddas
if (localStorage.length > 0) {
  const keys = Object.keys(localStorage); // Alla "keys" som finns i localstorage med dess array 
  keys.forEach((key) => {
    const courseData = localStorage.getItem(key); // Varje key
    if (courseData) {
      const course: CourseInfo = JSON.parse(courseData); // Strängen från localstorage hämtas in och görs om till ett objekt
      printNewCourse(course); // Anropar funktionen för att skriva ut varje kurs som finns lagrad inom localstorage till DOM
    }
  });
}


// För att visa felmeddelanden i DOM
function displayErrorMsg(errors: string[]) {
  // Om inga felmeddelanden finns så gör funktionen inget
  if (!errorMsg) return;

  // Tömmer felmeddelanden innan nya läggs till
  errorMsg.innerHTML = "";

  // Skapar lista för varje felmeddelande
  errors.forEach((error) => {
    const li = document.createElement("li")
    li.textContent = error;
    errorMsg.appendChild(li);
  });
}

// För att ta bort en kurs, tog hjälp av denna källa från Web Dev Simplified: https://www.youtube.com/watch?v=cOoP8-NPLSo&t=12s
if (tableBody !== null) {
  tableBody.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("delete-course-btn") && target instanceof HTMLButtonElement) { // Om target har just den klassen och är en knapp
      const btnId = target.dataset.id;
      if (!btnId) return; // Om ingen knapp finns så gör funktionen ingenting

      localStorage.removeItem(btnId); // Tar bort "key" från localstorage med dess data-id (kurskod)
      target.closest("tr")?.remove(); // Om knappen tillhör en rad så tas hela raden med dess element bort
      console.log(`Kurs "${btnId}" togs bort!`);
    }
  })
}


// Eventlyssnare på knapp för att rensa alla kurser i localstorage
if (clearBtn) {
  clearBtn.addEventListener("click", clearStorage);
}

// För att rensa alla kurser
function clearStorage(): void {
  if (localStorage.length === 0) { // Om det inte finns något lagrat i localstorage får användaren en alert
    alert("Det finns inga kurser att rensa!");
    console.log("Det finns inga kurser att rensa")
    return;
  } else { // Om det finns kurser lagrade i localstorage
    alert("Är du säker på att du vill rensa alla kurser?");
    localStorage.clear();
    window.location.href = "index.html";
  }
}

/* // Lägger till data för att simulera och jobba på ett mer effektivt sätt för felhantering 
function addCourses(): void {
  const object1: CourseInfo = {
    code: "DT224G",
    name: "Introduktion till webbutveckling med HTML, CSS och JavaScript",
    progression: "A",
    syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT224G/"
  }

  const object2: CourseInfo = {
    code: "DT200G",
    name: "Grafisk teknik för webb",
    progression: "A",
    syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/"
  }

  const object3: CourseInfo = {
    code: "DT068G",
    name: "Webbanvändbarhet",
    progression: "B",
    syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/"
  }

  const object4: CourseInfo = {
    code: "DT003G",
    name: "Databaser",
    progression: "A",
    syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/"
  }

  const object5: CourseInfo = {
    code: "DT211G",
    name: "Frontend-baserad webbutveckling",
    progression: "B",
    syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/"
  }
  localStorage.setItem(object1.code, JSON.stringify(object1));
  localStorage.setItem(object2.code, JSON.stringify(object2));
  localStorage.setItem(object3.code, JSON.stringify(object3));
  localStorage.setItem(object4.code, JSON.stringify(object4));
  localStorage.setItem(object5.code, JSON.stringify(object5));
}
  addCourses(); */