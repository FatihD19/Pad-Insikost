import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Info(props) {
  const { title, subtitle, color, shadowColor, icon } = props;

  const useStyles = makeStyles((theme) =>
    createStyles({
      card: {
        width: "100%",
        background: color,
        boxShadow: "0px 4px 8px 4px " + shadowColor,
        borderRadius: 16,
        position: "relative",
      },
      title: {
        color: "rgba(255,255,255,1)",
        fontWeight: "bold",
      },
      subtitle: {
        color: "rgba(255,255,255,0.8)",
      },
      cardContent: {
        zIndex: 9999999,
      },
      iconWrapper: {
        position: "absolute",
        top: -30,
        right: -30,
        padding: theme.spacing(2),
        zIndex: 1,
      },
      icon: {
        fontSize: 40,
        color: color,
      },
    })
  );
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.iconWrapper}>{icon}</div>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
