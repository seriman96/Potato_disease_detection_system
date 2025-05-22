import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import Image1 from "./bg.png";
import { DropzoneArea } from 'material-ui-dropzone';
import axios from "axios";
import Image from "./cancel.jpg";




//const axios = require("axios").defaults; //default

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  uploadButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "white",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: { 
    backgroundImage: `url(${Image1})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "100vh", // Ensures it fits exactly one viewport height
    marginTop: "8px",
    //overflow: "hidden", // Prevents scrolling within the container
    display: "flex", // Ensures content aligns properly
    flexDirection: "column", // Allows stacking of elements
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: '#000000a6',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
  },
  appbar: {
    background: '#02fe45',
    boxShadow: 'none',
    color: 'white'
  },
  buttonBody: {
    width: "40px",
    height: "40px",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover", // Ensures the image fits the button
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginLeft: "180px",
    marginTop: "-30px",
    border: "none", // Removes any default border
    borderRadius: "50%", // Makes the button circular
    cursor: "pointer", // Adds a pointer cursor on hover
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adds a shadow for better visibility
    transition: "transform 0.2s ease-in-out", // Adds hover effect
    outline: "none", // Removes the outline on focus
  }
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  let confidence = 0;

  const sendFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(process.env.REACT_APP_API_URL, formData);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    };
  useEffect(() => {
    let isMounted = true;

    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      isMounted = false;
      URL.revokeObjectURL(objectUrl); // Clean up object URL
    };
  }, [selectedFile]);

  useEffect(() => {
    let isMounted = true;

    if (preview && selectedFile) {
      sendFile(selectedFile).then(() => {
        if (!isMounted) return;
      });
    }

    return () => {
      isMounted = false;
    };
  }, [preview, selectedFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(null);
      setImage(false);
      setData(null);
      return;
    }
    setSelectedFile(files[0]);
    setImage(true);
    setData(null);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            EasyasCode: Potato Disease Classification
          </Typography>
          <div className={classes.grow} />
          <Avatar src={cblogo}></Avatar>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid container className={classes.gridContainer} spacing={2}>
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ""}`}>
              {image && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="img"
                    title="Potato Leaf"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table size="small" aria-label="results table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row" className={classes.tableCell}>
                            {data.class}
                          </TableCell>
                          <TableCell align="right" className={classes.tableCell}>
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <button
                    className={classes.buttonBody}
                    type="button"
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
                    onClick={() => window.location.reload()}
                  />
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};