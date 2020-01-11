import React from "react";
import Button from "@material-ui/core/Button";

export default function FaviconRedirectButton() {
  return (
    <a href="https://realfavicongenerator.net/" className="redirection-link" target="_blank">
      <Button className="button" variant="outlined">To Favicon Generator</Button>
    </a>
  );
}
