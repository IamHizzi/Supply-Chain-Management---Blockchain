import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../useTable";
import * as consignmentService from "../../services/consignmentService";
import Controls from "../../controls/Controls";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import * as preManifestService from '../../services/currentManifestData'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      color:"white",

  },
  searchInput: {
      width: '100%'
  }
}))


const headCells = [
    { id: 'id', label: 'CN No'},    
    { id: 'to', label: 'To'},
    { id: 'bookingDate', label: 'Booking Date'},
    { id: 'valueofGoods', label: 'Value(Rs)', disableSorting: true },
    { id: 'consignorName', label: 'Consignor '},
    { id: 'consigneeName', label: 'Consignee '},
    { id: 'shippingAddress', label: 'Ship-Address' },
    
]


function UnloadConsignmentForm(props) {

    const { addOrEdit, recordForEdit,id} = props
    var id1=parseInt(id)
    var rec=[]
    var con=[]
    //id1=id1-101
    //const rec=preManifestService.getAllPreManifests()
    //const con=rec.filter(x => x.manifestId == id1)
    const updateRecords = () =>{
        axios.get('/tms/loading/allpremanifests')
        .then(res=>{
                res.data.forEach(element=>{
                    rec.push(element)
                })

                con=rec.filter(x=>x.manifestId+1==id1)
                setRecords(con)
        })
        .catch(err=> console.log(err))
    }
    
    const classes = useStyles();
    const [records, setRecords] = useState([])
    updateRecords()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

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



  return (
      <div>
      <label style={{color:'black',fontWeight:'bold',marginLeft:'5px',marginRight:'70%'}}> Consignment Details</label>    
      <Controls.ActionButton 
        color="primary"
        onClick={() => { addOrEdit(records)  }}>
        <CheckCircleIcon fontSize="small">  </CheckCircleIcon>
    </Controls.ActionButton>
    
      <Paper className={classes.pageContent}>
      <TblContainer>
            <TblHead  />
            <TableBody style={{color:"white"}}>
                {
                    recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.id}-CL</TableCell>
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
        </Paper>
        </div>
  );
}

export default UnloadConsignmentForm;
