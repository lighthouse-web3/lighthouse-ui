const ThemeProperties = [
  {
    property: "--bg-clr",
    dark: "#000000",
    light: "#FFFFFF",
  },
  {
    property: "--txt-clr",
    dark: "#FFFFFF",
    light: "#000000",
  },
  {
    property: "--header-bar-clr",
    dark: "rgba(255, 255, 255, 0.05)",
    light: "#f8f8f8",
  },
  {
    property: "--featureCard-bg-clr",
    dark: "#1F1D23",
    light: "#c7c7c785",
  },
  {
    property: "--featureCard-bg-innerClr",
    dark: "linear-gradient(125deg, #000 -1.58%, rgba(77, 77, 77, 0.00) 123.59%)",
    light: "#FFF",
  },
  {
    property: "--testimonialCard-bg-clr",
    dark: "linear-gradient(125deg, #000 -1.58%, rgba(77, 77, 77, 0.00) 123.59%)",
    light: "none",
  },
  {
    property: "--testimonialCard-border-clr",
    dark: "#4f4f4f",
    light: "#c0c0c0",
  },
  {
    property: "--wave-pattern",
    dark: `url("/wavePattern_dark.svg")`,
    light: `url("/wavePattern_light.svg")`,
  },
  {
    property: "--answer-text-color",
    dark: "#a3aab8",
    light: "#4d4d4d",
  },
];

export const themeChanger = (theme) => {
  theme &&
    localStorage.setItem("lighthouse.storage/store", JSON.stringify({ theme }));
  ThemeProperties.forEach((property) => {
    document.documentElement.style.setProperty(
      `${property?.property}`,
      theme === "dark" ? property?.dark : property?.light
    );
  });
};
