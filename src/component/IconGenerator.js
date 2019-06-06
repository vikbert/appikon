import React, {useEffect, useState} from 'react';
import toast from 'native-toast';
import 'native-toast/dist/native-toast.css';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";

const IconGenerator = () => {
  const [inputValue, setInputValue] = useState("öÜ");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [image, setImage] = useState("");
  const handleOnChange = (e) => {
    let value = e.target.value.trim();
    if (value.length > 2) {
      toast({
        message: 'Max. 2x letter allowed!',
        timeout: 5000,
        type: 'warning',
      });
      value = value.substr(0, 2);
    }
    setInputValue(value);
  };

  useEffect(() => {
    let textSize = "170px";
    let textOffsetX = 8;
    let textOffsetY = 195;
    if (inputValue.length === 1) {
      textSize = "200px";
      textOffsetX = 30;
    }
    let canvasTxt = document.getElementById("canvasComponent").getContext("2d");
    canvasTxt.canvas.width = 260;
    canvasTxt.canvas.height = 260;
    canvasTxt.font = `${textSize} Major Mono Display`;
    canvasTxt.fillStyle = "#990cab";
    canvasTxt.fillText(inputValue, textOffsetX, textOffsetY);
    canvasTxt.fillRect(0, 0, canvasTxt.width, canvasTxt.height);
    setImage(canvasTxt.canvas.toDataURL());

  }, [inputValue]);

  const handleClickIcon = () => {
    toast({
      timeout: 10000,
      type: 'success',
      message: 'Icon downloaded, then click on the button to go to favicon generator for uploading your icon.!',
    });

    setIsDownloaded(true);
  };

  function ImageLink() {
    return image.length === 0 ? null : (
      <a href={image} download={inputValue + ".png"} onClick={handleClickIcon}>
        <img className={'appIcon'} id="imageComponent" alt="icon" src={image}/>
      </a>
    );
  }

  return (
    <>
      <canvas id="canvasComponent" className="icon calendar"/>
      <Card className={"MuiRewardCard--01"}>
        <CardContent className={"MuiCardContent-root"}>
          <Typography className={"MuiTypography--overline"} variant={"overline"}>
            Enter Letters:
          </Typography>
          <input
            className={"MuiInput"}
            type="text"
            value={inputValue}
            onChange={handleOnChange}
            size="25"
            placeholder="enter max. 2 characters"
          />
          {isDownloaded && (
            <a href="https://realfavicongenerator.net/" target="__blank">
              <Button className={"MuiButton--readMore"}>To Favicon Generator</Button>
            </a>
          )}
        </CardContent>
        <ImageLink/>
      </Card>
    </>
  );
};

IconGenerator.getTheme = muiBaseTheme => ({
  MuiCard: {
    root: {
      "&.MuiRewardCard--01": {
        borderRadius: muiBaseTheme.spacing.unit * 2, // 16px
        transition: "0.3s",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        width: "400px",
        position: "relative",
        maxWidth: 800,
        overflow: "initial",
        display: "flex",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        background:
          "linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)",
        "& .MuiCardMedia-root": {
          flexShrink: 0,
          width: "30%",
          paddingTop: "30%",
          marginLeft: "auto",
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 2,
        },
        "& .MuiTypography--overline": {
          lineHeight: 2,
          color: "#ffffff",
          fontWeight: "bold",
          opacity: 0.7,
        },
        "& .MuiInput": {
          marginBottom: 10,
          padding: "8px",
          height: "20px",
          fontSize: 14,
        },
        "& .MuiTypography--heading": {
          fontWeight: "900",
          color: "#ffffff",
          letterSpacing: 0.5,
        },
        "& .MuiTypography--subheading": {
          marginBottom: muiBaseTheme.spacing.unit * 2,
          color: "#ffffff",
        },
        "& .MuiButton--readMore": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 15,
          paddingLeft: 30,
          paddingRight: 30,
          color: "#ffffff",
          textTransform: "none",
        },
        "& a": {
          textDecoration: "none",
        },
      },
    },
  },
});

export default IconGenerator;
