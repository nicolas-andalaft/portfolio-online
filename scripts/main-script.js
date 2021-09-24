function onLoad() {
	// Get css colors
	const styles = getComputedStyle(document.documentElement);

	const primaryColor = styles.getPropertyValue("--primary-color");
	const accentColor = styles.getPropertyValue("--accent-color");

	// Get data theme icon
	const dataThemeMainIcon = document.getElementById("data-theme-main-icon");

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

	onScrollEvents();

	// Activate paralax effect
	var rellax = new Rellax(".rellax");

	// Theme changing function
	document
		.getElementById("data-theme-controls")
		.addEventListener("click", () => {
			const currentTheme = document.documentElement.getAttribute("data-theme");

			if (currentTheme === "light")
				document.documentElement.setAttribute("data-theme", "dark");
			else document.documentElement.setAttribute("data-theme", "light");

			dataThemeMainIcon.classList.toggle("hidden");
		});
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

function onScrollEvents() {
	// Scroll elements variables
	const navBg = document.getElementById("nav-bg");

	const header = document.getElementsByTagName("header")[0];
	const headerHeight = header.offsetTop + header.offsetHeight;

	const scrollElements = document.getElementsByClassName("anim-on-scroll");

	// Check element height function
	const isElementInView = (el) => {
		const elementTop = el.getBoundingClientRect().top;

		return (
			elementTop <=
			(window.innerHeight || document.documentElement.clientHeight) -
				el.offsetHeight / 2
		);
	};

	const handleNavbarScroll = () => {
		console.log(headerHeight);
		if (window.scrollY > headerHeight) {
			navBg.classList.add("animate");
		} else {
			navBg.classList.remove("animate");
		}
	};

	// Check all elements height
	const handleScrollElements = () => {
		[...scrollElements].forEach((el) => {
			if (isElementInView(el)) {
				el.classList.add("animate");
			} else {
				el.classList.remove("animate");
			}
		});
	};

	window.addEventListener("scroll", () => {
		handleNavbarScroll();
		handleScrollElements();
	});
}
