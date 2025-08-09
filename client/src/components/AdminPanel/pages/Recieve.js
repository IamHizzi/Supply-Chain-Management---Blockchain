import { BsBoxArrowInDownLeft } from 'react-icons/bs';
import React, { useState } from 'react'
import PageHeader from './PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton,TextField } from '@material-ui/core';
import useTable from "../useTable";
import Controls from "../controls/Controls";
import SearchIcon from '@material-ui/icons/Search';
import Popup from "../Popup";
import * as unloadService from '../services/unloadService'
import PrintIcon from '@material-ui/icons/Print'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  },
  searchInput: {
      width: '75%'
  },
  newButton: {
      position: 'absolute',
      right: '10px'
  }
}))

const headCells = [
  { id: 'id', label: 'CN.No'},    
  { id: 'bookingDate', label: 'CN.Date'},
  { id: 'valueofGoods', label: 'Value(Rs)', disableSorting: true },
  { id: 'consignorName', label: 'Consignor '},
  { id: 'consigneeName', label: 'Consignee '},
  { id: 'shippingAddress', label: 'ShipAddress' },
  { id: 'status', label: 'Status'},
  { id: 'Report', label: 'Report'},
  
]


function Recieve() {

  const classes = useStyles();
  const[id,setId] = useState(null);
//   var rec=unloadService.getAllunloads()
//   const newr=[]
//   for(let i=0; i<rec.length;  i++){
//     for(let item of rec[i]){
//         newr.push(item);
//     }
//   }
var alldbUs=[]
  const [records, setRecords] = useState([])
  axios.get('/tms/unload/allunloads')
      .then(res=>{
          res.data.forEach(element=>{
              alldbUs.push(element)
          })      
          setRecords(alldbUs)
      })
      .catch(err=>{
          console.log(err)
      })
  
  
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)
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
                  return items.filter(x => x.consigneeName.toLowerCase().includes(target.value))
          }
      })
  }
  
  
  const openInPopup = item => {
      setOpenPopup(true)
      setId(item.id)
  }


  return (
    <div className='recieve'>
      <PageHeader title="Recieved Consignments" subTitle="All Consigments that has been recieved" icon={<BsBoxArrowInDownLeft/>} />
      <Paper className={classes.pageContent}>

      <Toolbar>
      <TextField
                label="Search Recieved Consignments"
                className={classes.searchInput}
                InputProps={{
                    endAdornment: (<InputAdornment position="start">
                       <IconButton>
                       <SearchIcon/>
                        </IconButton>                  
                    </InputAdornment>)
                }}
                onChange={handleSearch}
            />
          
      </Toolbar>
      <TblContainer>
          <TblHead />
          <TableBody>
              {
                  recordsAfterPagingAndSorting().map(item =>
                      (<TableRow key={item.id}>
                          <TableCell>MF00{item.id}</TableCell>
                          <TableCell>{item.bookingDate.substring(0,10)}</TableCell>
                          <TableCell>{item.valueofGoods}</TableCell>
                          <TableCell>{item.consignorName}</TableCell>
                          <TableCell>{item.consigneeName}</TableCell>
                          <TableCell>{item.shippingAddress}</TableCell>
                          <TableCell style={{fontWeight:'bold', fontSize:'16px',color:'green',animation:'ease-in-out'}}>Pushed to Stock</TableCell>
                          <TableCell><Controls.ActionButton
                                color="primary"
                                >
                                <PrintIcon fontSize="small" />
                            </Controls.ActionButton></TableCell>
                          </TableRow>)
                  )
              }
          </TableBody>
      </TblContainer>
      <TblPagination />
      </Paper>
      <Popup style={{fontSize:'5px',padding:'0'}}
      title=""
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      >

      </Popup>

    </div>
  );
}

export default Recieve;
