import React, { Component, createContext } from "react";
import localStorage from "../utils/localStorage";

const THEME = {
  light: "light",
  dark: "dark",
};
const Context = createContext();

class ThemeContext extends Component {
  static Consumer = Context.Consumer;

  toggle = () => {
    this.setState(({ isChecked, theme }) => ({
      isChecked: !isChecked,
      theme: theme === "light" ? "dark" : "light",
    }));
  };

  state = {
    theme: THEME.light,
    isChecked: false,
    toggle: this.toggle,
  };

  componentDidMount() {
    const currentTheme = localStorage.get("theme");

    if (currentTheme) {
      this.setState({
        theme: currentTheme,
        isChecked: currentTheme === THEME.light ? false : true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { theme } = this.state;
    const prevTheme = prevState.theme;

    if (prevTheme !== theme) {
      localStorage.save("theme", theme);
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          isChecked: this.state.isChecked,
          theme: this.state.theme,
          onToggle: this.toggle,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ThemeContext;
