interface CourseInfo {
  code: string;
  name: string;
  progression: "A" | "B" | "C"; // https://www.w3tutorials.net/blog/how-to-require-a-specific-string-in-typescript-interface/
  syllabus: string;
}

