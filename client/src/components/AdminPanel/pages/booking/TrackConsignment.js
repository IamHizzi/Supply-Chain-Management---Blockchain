import React, { Component, useState } from 'react'
import PageHeader from '../PageHeader';
import { Paper,makeStyles } from '@material-ui/core';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import TrackForm from './TrackForm';
import { TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../useTable'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
    
}))

const headCells = [
    { id: 'id', label: 'CN.No'},    
    { id: 'to', label: 'To'},
    { id: 'from', label: 'From'},
    { id: 'bookingDate', label: 'BookingDate'},
    { id: 'valueofGoods', label: 'Goods Value(Rs)', disableSorting: true },
    { id: 'consignorName', label: 'Consignor '},
    { id: 'consigneeName', label: 'Consignee '},
    { id: 'shippingAddress', label: 'ShippingAddress' },
 ]

export default function TrackConsignment() {

    const classes = useStyles();
    const [record,setRecord]=useState([])
        const [pres,setPres]=useState('No Tracking Done yet')
        const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
        const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(record, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.valueofGoods.toLowerCase().includes(target.value))
            }
        })
    }
        var traked=(
            <TblContainer>
            <TblHead  />
            <TableBody style={{color:"white"}}>
                {
                    recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>PKG00{item.id}</TableCell>
                            <TableCell>{item.from}</TableCell>
                            <TableCell>{item.cityReference}</TableCell>
                            <TableCell>{item.bookingDate.substring(0,10)}</TableCell>
                            <TableCell>{item.valueofGoods}</TableCell>
                            <TableCell>{item.consignorName}</TableCell>
                            <TableCell>{item.consigneeName}</TableCell>
                            <TableCell>{item.shippingAddress}</TableCell>
                            </TableRow>)
                    )
                }
            </TableBody>
        </TblContainer>
            
        )

        var newd=(
            <div> {pres}</div>
        )

        
     const setRecords = (rec) =>{
        setRecord(rec)
        if(record.length<=0)
        setPres('No record Found')
      }
      
      return (
        <>
           <div className='booking'>
            <PageHeader title="Track Consignment" subTitle="Track a Consignment by Providing the Reference Number" icon={<BookmarksIcon/>} />
            <Paper className={classes.pageContent}>
                <TrackForm setrecords={setRecords}/>
            </Paper>
            <Paper className={classes.pageContent}>
            <div>
                {record.length>0 ? traked:newd}
            </div>
            </Paper>
            </div>
        </>
    )
}
