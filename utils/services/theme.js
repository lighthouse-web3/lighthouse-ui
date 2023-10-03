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
];

export const themeChanger = (theme) => {
  ThemeProperties.forEach((property) => {
    document.documentElement.style.setProperty(
      `${property?.property}`,
      theme === "dark" ? property?.dark : property?.light
    );
  });
};
