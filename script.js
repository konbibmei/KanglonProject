const data = {
  "7": {
    "Mathematics": ["Integers", "Fractions and Decimals", "Simple Equations", "Lines and Angles"],
    "Science": ["Nutrition in Plants", "Heat", "Acids and Bases", "Motion and Time"],
    "Social Science": ["Environment", "Inside Our Earth", "Markets Around Us", "State Government"],
    "English": ["Grammar Basics", "Reading Comprehension", "Writing Skills", "Literature"],
    "Manipuri": ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"]
  },
  "8": {
    "Mathematics": ["Rational Numbers", "Linear Equations", "Squares and Square Roots", "Data Handling"],
    "Science": ["Crop Production", "Microorganisms", "Force and Pressure", "Light"],
    "Social Science": ["Resources", "The Indian Constitution", "Parliament", "Industries"],
    "English": ["Grammar", "Comprehension", "Writing", "Literature"],
    "Manipuri": ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"]
  },
  "9": {
    "Mathematics": ["Number Systems", "Polynomials", "Coordinate Geometry", "Statistics"],
    "Science": ["Matter in Our Surroundings", "Atoms and Molecules", "Motion", "Force and Laws of Motion"],
    "Social Science": ["India: Size and Location", "Physical Features", "Democracy", "Climate"],
    "English": ["Grammar", "Reading", "Writing", "Literature"],
    "Manipuri": ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"]
  },
  "10": {
    "Mathematics": ["Real Numbers", "Polynomials", "Pair of Linear Equations", "Trigonometry"],
    "Science": ["Chemical Reactions", "Acids, Bases and Salts", "Life Processes", "Light"],
    "Social Science": ["Power Sharing", "Federalism", "Development", "Sectors of Economy"],
    "English": ["Grammar", "Reading", "Writing", "Literature"],
    "Manipuri": ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"]
  }
};

const classTabs = document.querySelectorAll(".class-tab");
const subjectGrid = document.getElementById("subjectGrid");
const chapterSelect = document.getElementById("chapterSelect");
const resourceTitle = document.getElementById("resourceTitle");
const resourceMeta = document.getElementById("resourceMeta");
const downloadBtn = document.getElementById("downloadBtn");

let selectedClass = "7";
let selectedSubject = "";

function renderSubjects() {
  subjectGrid.innerHTML = "";
  Object.keys(data[selectedClass]).forEach(subject => {
    const btn = document.createElement("button");
    btn.className = "subject-btn";
    btn.textContent = subject;
    btn.addEventListener("click", () => {
      selectedSubject = subject;
      document.querySelectorAll(".subject-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderChapters();
    });
    subjectGrid.appendChild(btn);
  });
  chapterSelect.innerHTML = '<option value="">Select a chapter</option>';
  resetResource();
}

function renderChapters() {
  chapterSelect.innerHTML = '<option value="">Select a chapter</option>';
  data[selectedClass][selectedSubject].forEach((chapter, index) => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    option.dataset.index = index + 1;
    chapterSelect.appendChild(option);
  });
  resetResource();
}

function resetResource() {
  resourceTitle.textContent = "Choose a chapter";
  resourceMeta.textContent = "Your download will appear here.";
  downloadBtn.classList.add("disabled");
  downloadBtn.href = "#";
  downloadBtn.setAttribute("aria-disabled", "true");
}

chapterSelect.addEventListener("change", () => {
  const chapter = chapterSelect.value;
  if (!chapter || !selectedSubject) {
    resetResource();
    return;
  }
  const file = `pdfs/class-${selectedClass}/${selectedSubject.toLowerCase().replaceAll(" ", "-")}/${chapter.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}.pdf`;
  resourceTitle.textContent = `${chapter} — ${selectedSubject}`;
  resourceMeta.textContent = `Class ${selectedClass} • PDF study material`;
  downloadBtn.href = file;
  downloadBtn.classList.remove("disabled");
  downloadBtn.removeAttribute("aria-disabled");
  downloadBtn.setAttribute("download", "");
});

classTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    classTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    selectedClass = tab.dataset.class;
    selectedSubject = "";
    renderSubjects();
  });
});

const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
document.getElementById("menuBtn").addEventListener("click", () => {
  sideMenu.classList.add("open");
  overlay.classList.add("show");
});
document.getElementById("closeBtn").addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
document.querySelectorAll(".side-menu a").forEach(a => a.addEventListener("click", closeMenu));
function closeMenu() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
}

renderSubjects();
