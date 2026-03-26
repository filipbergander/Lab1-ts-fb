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
    </tr>`;
  }
}

// När formuläret submittas så skickas värdena från inputs till funktionen printnewcourse.
if (courseForm) {
  courseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputCode = document.getElementById("code") as HTMLInputElement;
    const inputCourseName = document.getElementById("coursename") as HTMLInputElement;
    const inputProgression = document.getElementById("progression") as HTMLInputElement;
    const inputSyllabus = document.getElementById("syllabus") as HTMLInputElement;
    /*
    const inputCode = document.querySelector<HTMLInputElement>("#code");
    const inputCourseName = document.querySelector<HTMLInputElement>("#coursename");
    const inputProgression = document.querySelector<HTMLInputElement>("#progression");
    const inputSyllabus = document.querySelector<HTMLInputElement>("#syllabus");
*/
    const newCourse: CourseInfo = {
      code: inputCode.value.trim(),
      name: inputCourseName.value.trim(),
      progression: inputProgression.value.trim(),
      syllabus: inputSyllabus.value.trim()
    };
    printNewCourse(newCourse);
  });
}
