import React from "react";
import Button from "@material-ui/core/Button";
import "FaviconGeneratorButton.scss";

export default function index() {
  return (
    <a href="https://realfavicongenerator.net/" className={"buttonLink"}>
      <Button className={"gotoButton"}>To Favicon Generator</Button>
    </a>
  );
}
