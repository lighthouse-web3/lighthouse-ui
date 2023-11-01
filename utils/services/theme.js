const ThemeProperties = [
  {
    property: "--bg-clr",
    dark: "#08060b",
    light: "#FFFFFF",
  },
  {
    property: "--txt-clr",
    dark: "#FFFFFF",
    light: "#08060b",
  },
  {
    property: "--header-bar-clr",
    dark: "rgba(255, 255, 255, 0.05)",
    light: "#f8f8f8",
  },
  {
    property: "--featureCard-bg-clr",
    dark: "#1F1D23",
    light: "#F7F7F7",
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
    light: "#F7F7F7",
  },
];

export const themeChanger = (theme) => {
  ThemeProperties.forEach((property) => {
    document.documentElement.style.setProperty(
      `${property?.property}`,
      theme === "dark" ? property?.dark : property?.light
    );
  });
};
