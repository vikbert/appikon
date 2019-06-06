import React, {useEffect, useState} from 'react';
import toast from 'native-toast';
import 'native-toast/dist/native-toast.css';
import {CanvasConfig} from './CanvasConfig';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flowGrow: 1,
    margin: theme.spacing(3),
  },
  generatorWrapper: {
    borderRadius: 16,
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    background: "linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)",
  },
  inputLabel: {
    display: "block",
  },
  inputField: {
    height: 14,
    fontSize: 14,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
    margin: 10,
  },
  buttonLink: {
    textDecoration: "none",
  },
}));

const IconGenerator = () => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState("♜");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const inputType = inputValue.length === 1 ? 'single' : 'double';
    const canvasTxt = document.getElementById("canvasComponent").getContext("2d");

    canvasTxt.canvas.width = CanvasConfig.width;
    canvasTxt.canvas.height = CanvasConfig.height;
    canvasTxt.font = CanvasConfig.textFont[inputType];
    canvasTxt.fillStyle = CanvasConfig.textColor;
    canvasTxt.fillText(inputValue, CanvasConfig.offsetX[inputType], CanvasConfig.offsetY[inputType]);
    canvasTxt.fillRect(0, 0, canvasTxt.width, canvasTxt.height);
    setImage(canvasTxt.canvas.toDataURL());

  }, [inputValue]);

  const handleOnChange = e => {
    let value = e.target.value.trim();
    if (value.length > 2) {
      toast({
        message: 'Max. 2x Characters allowed!',
        timeout: 5000,
        type: 'error',
        edge: true,
      });
      value = value.substr(0, 2);
    }
    setInputValue(value);
  };

  const handleClickForDownload = e => {
    if (inputValue.length === 0) {
      e.preventDefault();
      toast({
        timeout: 5000,
        type: 'error',
        edge: true,
        message: 'Your input is empty!',
      });
      return;
    }
    toast({
      timeout: 5000,
      type: 'success',
      edge: true,
      message: 'Icon downloaded! Now click on the button to go to favicon generator for uploading your icon!',
    });

    setIsDownloaded(true);
  };

  function ImageLink() {
    return image.length > 0 && (
      <a href={image} download={inputValue + ".png"} onClick={handleClickForDownload}>
        <img className={'appIcon'} id="imageComponent" alt="icon" src={image}/>
      </a>
    );
  };

  function ButtonLink() {
    return isDownloaded
      ? (
      <a href="https://realfavicongenerator.net/" className={classes.buttonLink}>
        <Button className={classes.gotoButton}>
          To Favicon Generator
        </Button>
      </a>
    )
      : (<span>type and click for download ... 🚀</span>);
  };

  return (
    <div className={classes.root}>
      <canvas id="canvasComponent" className="icon calendar"/>
      <Grid container spacing={3} className={classes.generatorWrapper}>
        <Grid item xs={12} container direction={'row'}>
          <Grid item xs={12} sm={3}>
            <ImageLink/>
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
              <ButtonLink/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default IconGenerator;
