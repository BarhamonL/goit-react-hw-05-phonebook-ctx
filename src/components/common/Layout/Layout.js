import React from "react";
import PropTypes from "prop-types";
import withThemeContext from "../../../hoc/withThemeContext";
import styles from "./Layout.module.css";

function Layout(props) {
  const { dataTheme, children } = props;
  return (
    <div
      className={`${styles.container} ${
        dataTheme.isChecked ? styles.dark : styles.light
      }`}
    >
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,

  dataTheme: PropTypes.shape({
    isChecked: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
  }).isRequired,
};

export default withThemeContext(Layout);
