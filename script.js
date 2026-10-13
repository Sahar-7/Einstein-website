/* =========================================================
   Albert Einstein – Personal Website
   script.js – builds the publication cards and runs the mobile menu
   ========================================================= */

/* ---------------------------------------------------------
   1. PUBLICATION DATA
   HOW TO ADD A PAPER: copy one { ... } block, paste it at the end
   of the list (add a comma after the previous block), and change
   the values. A new card appears automatically and CSS Grid
   places it in the next free spot. No HTML changes are needed.
   --------------------------------------------------------- */
const publications = [
  {
    year: 1905,
    title: "On a Heuristic Point of View Concerning the Production and Transformation of Light",
    original: "Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt",
    journal: "Annalen der Physik, vol. 17",
    description: "I proposed that light carries energy in small packets (light quanta), which explains the photoelectric effect. This work was cited in my Nobel Prize.",
    url: "https://doi.org/10.1002/andp.19053220607"
  },
  {
    year: 1905,
    title: "On the Movement of Small Particles Suspended in Stationary Liquids Required by the Molecular-Kinetic Theory of Heat",
    original: "Über die von der molekularkinetischen Theorie der Wärme geforderte Bewegung von in ruhenden Flüssigkeiten suspendierten Teilchen",
    journal: "Annalen der Physik, vol. 17",
    description: "I explained Brownian motion, the jittery movement of tiny particles in liquid, giving strong evidence that atoms and molecules are real.",
    url: "https://doi.org/10.1002/andp.19053220806"
  },
  {
    year: 1905,
    title: "On the Electrodynamics of Moving Bodies",
    original: "Zur Elektrodynamik bewegter Körper",
    journal: "Annalen der Physik, vol. 17",
    description: "Here I introduced the special theory of relativity, built on two ideas: the laws of physics are the same for all uniformly moving observers, and the speed of light is constant.",
    url: "https://doi.org/10.1002/andp.19053221004"
  },
  {
    year: 1905,
    title: "Does the Inertia of a Body Depend upon its Energy Content?",
    original: "Ist die Trägheit eines Körpers von seinem Energieinhalt abhängig?",
    journal: "Annalen der Physik, vol. 18",
    description: "A three-page follow-up in which I showed that mass and energy are equivalent – the idea behind E = mc².",
    url: "https://doi.org/10.1002/andp.19053231314"
  },
  {
    year: 1906,
    title: "A New Determination of Molecular Dimensions",
    original: "Eine neue Bestimmung der Moleküldimensionen",
    journal: "Annalen der Physik, vol. 19",
    description: "Based on my doctoral dissertation. I used the flow of liquids to estimate the size of molecules and Avogadro's number.",
    url: "https://doi.org/10.1002/andp.19063240204"
  },
  {
    year: 1916,
    title: "The Foundation of the General Theory of Relativity",
    original: "Die Grundlage der allgemeinen Relativitätstheorie",
    journal: "Annalen der Physik, vol. 49",
    description: "My complete presentation of general relativity, which describes gravity as the curvature of space and time.",
    url: "https://doi.org/10.1002/andp.19163540702"
  },
  {
    year: 1935,
    title: "Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?",
    original: "With Boris Podolsky and Nathan Rosen",
    journal: "Physical Review, vol. 47",
    description: "The “EPR” paper, written with my colleagues. We asked whether quantum mechanics is complete, drawing attention to what is now called quantum entanglement.",
    url: "https://doi.org/10.1103/PhysRev.47.777"
  }
];

/* ---------------------------------------------------------
   2. BUILD ONE CARD PER PAPER
   --------------------------------------------------------- */
function createPaperCard(paper, index) {
  const card = document.createElement("article");
  card.className = "paper-card";

  // Top row: reusable icon + year + journal
  const top = document.createElement("div");
  top.className = "paper-top";

  const icon = document.createElement("img");
  icon.className = "paper-icon";
  icon.src = "images/paper-icon.svg"; // the same icon is reused for every paper
  icon.alt = "";                     // decorative, so screen readers skip it
  icon.width = 48;
  icon.height = 48;

  const meta = document.createElement("div");
  const year = document.createElement("p");
  year.className = "paper-year";
  year.textContent = paper.year;
  const journal = document.createElement("p");
  journal.className = "paper-journal";
  journal.textContent = paper.journal;
  meta.append(year, journal);

  // Mark the four papers from my 1905 "miracle year"
  if (paper.year === 1905) {
    const badge = document.createElement("span");
    badge.className = "paper-badge";
    badge.textContent = "Miracle year";
    meta.append(badge);
  }

  // Card number, e.g. "No. 01"
  const number = document.createElement("p");
  number.className = "paper-number";
  number.textContent = "No. " + String(index + 1).padStart(2, "0");

  top.append(icon, meta, number);

  // Title (with original German title underneath)
  const title = document.createElement("h3");
  title.textContent = paper.title;
  const original = document.createElement("span");
  original.className = "paper-original";
  original.textContent = paper.original;
  title.append(original);

  // Short description
  const description = document.createElement("p");
  description.className = "paper-desc";
  description.textContent = paper.description;

  // Link to the published paper (opens the journal's page)
  const link = document.createElement("a");
  link.className = "paper-link";
  link.href = paper.url;
  link.textContent = "Read the paper →";
  link.setAttribute("aria-label", "Read the paper: " + paper.title + " (" + paper.year + ")");

  card.append(top, title, description, link);
  return card;
}

function renderPublications() {
  const grid = document.getElementById("paper-grid");
  const count = document.getElementById("paper-count");
  if (!grid) return;

  // Show oldest first; papers from the same year keep their list order
  const sorted = [...publications].sort((a, b) => a.year - b.year);

  sorted.forEach((paper, index) => {
    grid.append(createPaperCard(paper, index));
  });

  if (count) {
    count.textContent = "Showing all " + publications.length + " papers in my selected collection.";
  }
}

/* ---------------------------------------------------------
   3. MOBILE MENU (hamburger button)
   --------------------------------------------------------- */
function setupMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!button || !nav) return;

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  // <button> already works with Enter and Space, so it is keyboard accessible
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  // Close the menu after a link is chosen
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Close the menu with the Escape key and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      button.focus();
    }
  });
}

/* ---------------------------------------------------------
   4. START EVERYTHING
   --------------------------------------------------------- */
renderPublications();
setupMobileMenu();

const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
