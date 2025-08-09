import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
    minWidth:230,
    color:'black',
    transition: 'transfrom .2s',
    minHeight:175  
  },
  
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    fontWeight:'bold',
    color:'black',
  },
  pos: {
    marginBottom: 12,
  },
  cardA:{
    backgroundColor:'SlateBlue',
    color:'white',
    "&:hover":{
      backgroundColor:'white',
      color:'black'
    }
  },
  
});

export default function SimpleCard(props) {
  const history=useHistory()
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
const handleClick = ()=>{
  if(props.heading=="Bookings")
  history.push("/booking")
  else if(props.heading=="Manifests")
  history.push("/Loading")
  else
  history.push("/payments")
}
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.heading}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.count}{bull}
        </Typography>
        <Typography variant="body2" component="p">
          {props.desc}
                  </Typography>
      </CardContent>
      <CardActions >
        <Button size="small" className={classes.cardA} onClick={handleClick}>Learn more</Button>
      </CardActions>
    </Card>
  );
}