import React from 'react'
import PageHeader from '../PageHeader';
import { Paper,makeStyles } from '@material-ui/core';
import { BookConsignments, ItemDetails } from './BookConsignment.js';
import BookmarksIcon from '@material-ui/icons/Bookmarks';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
    }
}))

export default function BookNewConsignment() {

    const classes = useStyles();

    return (
        <>
           <div className='booking'>
            <PageHeader title="Book Consignments" subTitle="Add a new Consignment" icon={<BookmarksIcon/>} />
            <Paper className={classes.pageContent}>
                <ItemDetails/>
            </Paper>
            <Paper className={classes.pageContent}>
                <BookConsignments/>
            </Paper>
            
            </div>
        </>
    )
}
