import React, { useEffect, useState } from "react";
import "native-toast/dist/native-toast.css";
import { CanvasConfig } from "./CanvasConfig";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { successToast, errorToast } from "../utils/toastHelper";

const useStyles = makeStyles(theme => ({
  root: {
    flowGrow: 1,
    margin: theme.spacing(3)
  },
  generatorWrapper: {
    borderRadius: 16,
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    background:
      "linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)"
  },
  inputLabel: {
    display: "block"
  },
  inputField: {
    height: 14,
    fontSize: 14,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  gotoButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 100,
    color: "#ffffff",
    textTransform: "none",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10
  },
  buttonLink: {
    textDecoration: "none"
  }
}));

const isEmoji = value => {
  return value.match(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
  );
};

const IconGenerator = () => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState("🍖");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    let inputType = inputValue.length === 1 ? "single" : "double";
    if (isEmoji(inputValue)) {
      inputType = "emoji";
    }

    const canvasTxt = document
      .getElementById("canvasComponent")
      .getContext("2d");

    canvasTxt.canvas.width = CanvasConfig.width;
    canvasTxt.canvas.height = CanvasConfig.height;
    canvasTxt.font = CanvasConfig.textFont[inputType];
    canvasTxt.fillStyle = CanvasConfig.textColor;
    canvasTxt.fillText(
      inputValue,
      CanvasConfig.offsetX[inputType],
      CanvasConfig.offsetY[inputType]
    );
    canvasTxt.fillRect(0, 0, canvasTxt.width, canvasTxt.height);
    setImage(canvasTxt.canvas.toDataURL());
  }, [inputValue]);

  const handleOnChange = e => {
    let value = e.target.value.trim();
    if (value.length > 2) {
      errorToast("Max. 2x Characters allowed!");
      value = value.substr(0, 2);
    }
    setInputValue(value);
  };

  const handleClickForDownload = e => {
    if (inputValue.length === 0) {
      e.preventDefault();

      return;
    }
    successToast(
      "Icon downloaded! Now click on the button to go to favicon generator for uploading your icon!"
    );
    setIsDownloaded(true);
  };

  function ImageLink() {
    return (
      image.length > 0 && (
        <a
          href={image}
          download={inputValue + ".png"}
          onClick={handleClickForDownload}
        >
          <img
            className={"appIcon"}
            id="imageComponent"
            alt="icon"
            src={image}
          />
        </a>
      )
    );
  }

  function ButtonLink() {
    return isDownloaded ? (
      <a
        href="https://realfavicongenerator.net/"
        className={classes.buttonLink}
      >
        <Button className={classes.gotoButton}>To Favicon Generator</Button>
      </a>
    ) : (
      <span>type and click for download ... 🚀</span>
    );
  }

  return (
    <div className={classes.root}>
      <canvas id="canvasComponent" className="icon calendar" />
      <Grid container spacing={3} className={classes.generatorWrapper}>
        <Grid item xs={12} container direction={"row"}>
          <Grid item xs={12} sm={3}>
            <ImageLink />
          </Grid>
          <Grid item xs={12} sm={9} container>
            <Grid item xs={12}>
              <Typography variant={"overline"} className={classes.inputLabel}>
                Enter Letters:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                className={classes.inputField}
                type="text"
                value={inputValue}
                onChange={handleOnChange}
                size="25"
                placeholder="enter max. 2 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonLink />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default IconGenerator;
