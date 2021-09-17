function onLoad() {
	// Get css colors
	const styles = getComputedStyle(document.documentElement);

	const primaryColor = styles.getPropertyValue("--primary-color");
	const accentColor = styles.getPropertyValue("--accent-color");

	// Set hard skill progress
	[...document.getElementsByClassName("skill-progress")].forEach(
		setSkillProgress
	);

	// Set hard skill icons
	[...document.getElementsByClassName("svg-icon")].forEach(setSkillIcons);

	// Set soft skill icons
	[...document.getElementsByClassName("soft-skill-icon")].forEach((element) => {
		setLordIconProps(element, primaryColor, accentColor);
	});

	// Configure gliders
	[...document.getElementsByClassName("glider-wrapper")].forEach(setGlider);

	// Dynamically change navbar color
	changeNavbarOnScroll();
}

function setSkillIcons(element) {
	element.style["mask-image"] = `url(${element.getAttribute("url")})`;
	element.style["-webkit-mask-image"] = `url(${element.getAttribute("url")})`;
}

function setLordIconProps(element, col1, col2) {
	col1.trim();
	col2.trim();

	element.setAttribute("trigger", "loop");
	element.setAttribute("delay", "3000");
	element.setAttribute("colors", "primary:" + col1 + ",secondary:" + col2);
}

function setSkillProgress(element) {
	const dasharrey = 251;
	const value = element.getAttribute("value");
	const dashoffset = dasharrey * (value - 1);

	element.innerHTML += `<svg>
            <circle class="circle-progress" r="40" cx="50" cy="50" 
			stroke-dasharray="${dasharrey}"
			stroke-dashoffset="${dashoffset}"
			></circle>
    </svg>`;
}

function changeNavbarOnScroll() {
	// Backgrounds
	const nav_bg = [
		document.getElementById("nav-bg-0"),
		document.getElementById("nav-bg-1"),
		document.getElementById("nav-bg-2"),
	];

	// Y values
	const scrollPoints = Array.prototype.map.call(
		document.getElementsByClassName("section"),
		function (section) {
			return section.offsetTop + section.offsetHeight;
		}
	);

	var currentIndex;
	var currentSection;

	window.addEventListener("scroll", function () {
		for (i = 0; i < scrollPoints.length; i++) {
			if (this.window.scrollY < scrollPoints[i]) {
				currentSection = i;
				break;
			}
		}

		currentIndex = currentSection === 0 ? 0 : (currentSection % 2) + 1;

		for (i = 0; i < nav_bg.length; i++) {
			nav_bg[i].style.opacity = i == currentIndex ? 1 : 0;
		}
	});
}

function changeTheme() {
	const selector = document.getElementsByClassName("selector")[0];
	selector.classList.toggle("selector-active");

	const currentTheme = document.documentElement.getAttribute("data-theme");
	if (currentTheme === "light")
		document.documentElement.setAttribute("data-theme", "dark");
	else document.documentElement.setAttribute("data-theme", "light");
}

function setGlider(element) {
	element.innerHTML +=
		"<button class='glider-l-arrow'><</button>" +
		"<button class='glider-r-arrow'>></button >";

	var glider = element.querySelector(".glider");
	new Glider(glider, {
		draggable: true,
		scrollLock: true,
		rewind: true,

		arrows: {
			prev: element.querySelector(".glider-l-arrow"),
			next: element.querySelector(".glider-r-arrow"),
		},
	});
}
