import React, { useState } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../useTable";
import * as preManifestService from '../../services/currentManifestData'
import Controls from "../../controls/Controls";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import * as manifestService from '../../services/manifestService'
import axios from 'axios'
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
    { id: 'id', label: 'MFNo'},    
    { id: 'productDetails', label: 'Details'},
    { id: 'from', label: 'From' },
    { id: 'to', label: 'To'},
    { id: 'vehicle', label: 'VehicleNo'},
    { id: 'remarks', label: 'Remarks'},
    
]


function UnloadManifestForm(props) {

    const { add, recordForEdit,id} = props
    var id1 = parseInt(id)
    //const rec=manifestService.getAllManifests()
    //const con=rec.filter(x => x.id == id1)
    var rec=[]
    var con=[]
    const updateRecords = () =>{
        axios.get('/tms/loading/allmanifests')
        .then(res=>{
                res.data.forEach(element=>{
                    rec.push(element)
                })

                con=rec.filter(x=>parseInt(x.id)==id1)
                setRecords(con)    
        })
        .catch(err=> console.log(err))
    }
    
    const classes = useStyles();
    const [records, setRecords] = useState([])
    updateRecords()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    
    //alert(JSON.stringify(records))
    //preManifestService.removePreManifestItem()
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
                    return items.filter(x => x.vehicleNo.toLowerCase().includes(target.value))
            }
        })
    }

   

  return (
    <div>
    <label style={{color:'black',fontWeight:'bold',marginLeft:'5px',marginTop:'20px',marginBottom:'0',marginRight:'75%'}}> Manifest Details</label>    
    <Controls.ActionButton style={{float:'right'}}
        color="primary"
        onClick={() => { add(con)  }}>
        <CheckCircleIcon fontSize="small">  </CheckCircleIcon>
    </Controls.ActionButton>
    <Paper className={classes.pageContent}> 
    <TblContainer>
          <TblHead  />
          <TableBody style={{color:"white"}}>
              {
                  recordsAfterPagingAndSorting().map(item =>
                      (<TableRow key={item.id}>
                          <TableCell>{item.id}-MF</TableCell>
                          <TableCell>{item.manifestDate.substring(0,10)}</TableCell>
                          <TableCell>{item.from}</TableCell>
                          <TableCell>{item.to}</TableCell>
                          <TableCell>{item.vehicleNo}</TableCell>
                          <TableCell>{item.Remarks}</TableCell>
                        </TableRow>)
                  )
              }
          </TableBody>
      </TblContainer>
      </Paper>
              </div>
  );
}

export default UnloadManifestForm;
