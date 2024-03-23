import "@rneui/themed";
import { ThemeProvider, createTheme } from "@rneui/themed";
import Nav from "./modules/navigation/Nav";

declare module "@rneui/themed" {
  export interface Colors {
    tertiary: string;
    accent: string;
    surface: string;
  }
}

const theme = createTheme({
  lightColors: {
    primary: "#0064E0",
    tertiary: "#FF88CB",
    secondary: "#E6E6E6",
    accent: "#FF06F1",
    error: "#F25B5B",
  },
  darkColors: {
    primary: "#0064E0",
    tertiary: "#FF88CB",
    secondary: "#1C1F2D",
    accent: "#FF06F1",
    background: "#2B3040",
    error: "#F25B5B",
  },
  mode: "dark",
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
    </ThemeProvider>
  );
}
