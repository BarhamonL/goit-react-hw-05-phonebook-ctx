import React from "react";
import ThemeContext from "../context/ThemeContext";

const withThemeContext = (WrappedComponent) => {
  return function withThemeContext(props) {
    return (
      <ThemeContext.Consumer>
        {(theme) => <WrappedComponent {...props} dataTheme={theme} />}
      </ThemeContext.Consumer>
    );
  };
};

export default withThemeContext;
