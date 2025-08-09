import React, { useState } from 'react'
import PageHeader from './PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton, TextField } from '@material-ui/core';
import useTable from "../useTable";
import Controls from "../controls/Controls";
import Popup from "../Popup";
import * as FaIcons from 'react-icons/fa';
import * as dispatchService from '../services/dispatchService'
import PrintIcon from '@material-ui/icons/Print'
import SearchIcon from '@material-ui/icons/Search';
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
  { id: 'id', label: 'MF No'},    
  { id: 'dispatchDate', label: 'DFDate'},
  { id: 'from', label: 'From'},
  { id: 'to', label: 'To'},
  { id: 'vehicelNo', label: 'VehicleNo' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]


function Dispatch() {

  const classes = useStyles();
  const[id,setId] = useState(null);
  //const [records, setRecords] = useState(dispatchService.getAlldispatches())
  var alldbUs=[]
  const [records, setRecords] = useState([])
  axios.get('/tms/dispatch/alldispatches')
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
                  return items.filter(x => x.vehicleNo.toLowerCase().includes(target.value))
          }
      })
  }
  
  
  const openInPopup = item => {
      setOpenPopup(true)
      setId(item.id)
  }

  
  return (
    <div className='dispatch'>
      <PageHeader title="Dispatch Consignment Details" subTitle="All Consignments that are dispatched" icon={<FaIcons.FaUnlink/>} />
      <Paper className={classes.pageContent}>

      <Toolbar>
      <TextField
                label="Search Already Loaded Consignments"
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
                          <TableCell>{item.dispatchDate.substring(0,10)}</TableCell>
                          <TableCell>{item.from}</TableCell>
                          <TableCell>{item.to}</TableCell>
                          <TableCell>{item.vehicleNo}</TableCell>
                          <TableCell style={{fontWeight:'bold', fontSize:'16px',color:'green',animation:'ease-in-out'}}>Dispatched</TableCell>
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

export default Dispatch;
