// Interface som beskriver CourseInfo med objekt
interface CourseInfo {
  code: string;
  name: string;
  progression: string; // "A" | "B" | "C"; // https://www.w3tutorials.net/blog/how-to-require-a-specific-string-in-typescript-interface/
  syllabus: string;
}

//Formulär
const courseForm = document.querySelector<HTMLFormElement>("#course-form");
const newCourseBtn = document.querySelector<HTMLButtonElement>("#newcourse-button");
const errorMsg = document.querySelector<HTMLDivElement>("#error-message");

// Eventlyssnare på knapp
if (newCourseBtn) {
  newCourseBtn.addEventListener("click", () => {
    courseForm?.classList.toggle("hidden");
  });
}

// Skriver ut en ny kurs inom table i DOM
function printNewCourse(course: CourseInfo): void {
  const tableBody = document.querySelector<HTMLTableSectionElement>("#table-body");
  if (tableBody) {
    tableBody.innerHTML += `
    <tr>
      <td>${course.code}</td>
      <td>${course.name}</td>
      <td>${course.progression}</td>
      <td>${course.syllabus}</td>
      <td><button class="delete-course-btn" aria-label="Ta bort kurs"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ff0000"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button></td>
    </tr>`;
  }
}

// När formuläret submittas så skickas värdena från inputs till funktionen printnewcourse.
if (courseForm) {
  courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]")
    const inputCode = document.getElementById("code") as HTMLInputElement;
    const inputCourseName = document.getElementById("coursename") as HTMLInputElement;
    const inputProgression = document.getElementById("progression") as HTMLInputElement;
    const inputSyllabus = document.getElementById("syllabus") as HTMLInputElement;
    const errors: string[] = [];

    /*
    const inputCode = document.querySelector<HTMLInputElement>("#code");
    const inputCourseName = document.querySelector<HTMLInputElement>("#coursename");
    const inputProgression = document.querySelector<HTMLInputElement>("#progression");
    const inputSyllabus = document.querySelector<HTMLInputElement>("#syllabus");
*/
    const newCourse: CourseInfo = {
      code: inputCode.value.trim(),
      name: inputCourseName.value.trim(),
      progression: inputProgression.value.trim().toUpperCase(),
      syllabus: inputSyllabus.value.trim()
    };

    if (inputCode.value.trim() === "") {
      errors.push("Fyll i kurskod!");
    }

    if (inputCourseName.value.trim() === "") {
      errors.push("Fyll i kursnamn!")
    }

    if (inputProgression.value.trim() === "") {
      errors.push("Fyll i progression!")
    } else if (inputProgression.value.toUpperCase() !== "A" && inputProgression.value.toUpperCase() !== "B") {
      errors.push("Progression måste vara A eller B!")
    }

    if (inputSyllabus.value.trim() === "") {
      errors.push("Fyll i kursplan!")
    }
    // Om felmeddelanden finns, visa felmeddelandena
    if (errors.length > 0) {
      displayErrorMsg(errors);
    }

    // Om inga felmeddelanden finns
    if (errors.length === 0) {
      // Lägger till den nya kursen i arrayen
      courses.push(newCourse);
      console.log(courses);
      // Sparar kursen som array i localstorage
      localStorage.setItem("courses", JSON.stringify(courses))

      // Anropar funktionen för att skriva ut den nya kursen
      printNewCourse(newCourse);
      // Resettar inputfälten efter lyckad submit
      inputCode.value = "";
      inputCourseName.value = "";
      inputProgression.value = "";
      inputSyllabus.value = "";

      // Ta bort eventuella felmeddelanden som blev kvar vid submit
      if (errorMsg) {
        errorMsg.innerHTML = "";
      }
      // Redirect till startsidan
      window.location.href = "index.html";
    }
  });
}

const courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");
courses.forEach(printNewCourse);

function displayErrorMsg(errors: string[]) {
  // Om inga felmeddelanden finns så gör funktionen inget
  if (!errorMsg) {
    return;
  }
  // Tömmer felmeddelanden innan nya läggs till
  errorMsg.innerHTML = "";

  // Skapar lista för varje felmeddelande
  errors.forEach((error) => {
    const li = document.createElement("li")
    li.textContent = error;
    errorMsg.appendChild(li);
  });
}

