import React, { useState, useEffect } from 'react'
import PageHeader from '../PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../Popup";
import * as manifestService from '../../services/manifestService'
import * as FaIcons from 'react-icons/fa';
import * as dispatchService from '../../services/dispatchService'
import DispatchConsignmentForm from './DispatchConsignmentForm'
import Notification from "../../Notification";
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
  { id: 'manifestDate', label: 'MFDate'},
  { id: 'from', label: 'From'},
  { id: 'to', label: 'To'},
  { id: 'vehicelNo', label: 'VehicleNo' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]


function DispatchConsignment() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [status,setStatus]=useState({value:"New Manifest"})
  //const [records, setRecords] = useState(manifestService.getAllDummymanifests())
  var alldbUs=[]
  var newa=[]
  var newt=[]
  const updateRecords = () =>{
    
    axios.get('/tms/loading/alldummymanifests')
    .then(res=>{
        res.data.forEach(element=>{
            alldbUs.push(element)
        })
        setRecords(alldbUs)   
    })
    .catch(err=>{
        console.log(err)
    })

    

 }
  const [records, setRecords] = useState([])

    updateRecords()
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)
  const [disable,setDisable]=useState({value:false})
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
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


  const insertDispatch = (dispatch) => {
      axios.post('/tms/dispatch/insertdispatch',dispatch)
      .then(res=>{
          console.log(res.data)
      })
      .catch(err=>console.log(err))
  }

  const deletedummymanifest= (data)=>{
    axios.post('/tms/loading/deletedummymanifest',data)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>console.log(err))
  }
  const addOrEdit = (dispatch, resetForm) => {
    //alert(JSON.stringify(dispatch))  
    //dispatchService.insertdispatch(dispatch)
    //manifestService.deleteDummyManifest(dispatch.id)
    //alert(JSON.stringify(dispatch))  
    insertDispatch(dispatch)
    deletedummymanifest(dispatch)
    resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      setNotify({
        isOpen: true,
        message: 'Lorry Dispatch Successful',
        type: 'success'
    })
      updateRecords()
      
  }

  const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
      
  }

  
  
  
  return (
    <div className='dispatch'>
      <>
            <PageHeader
                title="Dispatch Lorry"
                subTitle="Lorries that are ready to dispatch from Current Branch and Send to Destination"
                icon={<FaIcons.FaUnlink fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Manifests that need to be Dispatched"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
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
                                     <TableCell>MF-{item.id}</TableCell>
                                    <TableCell>{item.manifestDate.substring(0,10)}</TableCell>
                                    <TableCell>{item.from}</TableCell>
                                    <TableCell>{item.to}</TableCell>
                                    <TableCell>{item.vehicleNo}</TableCell>
                                     <TableCell style={{fontWeight:'bold', fontSize:'16px',color:'green',animation:'ease-in-out'}}>{status.value}</TableCell>
                                    <TableCell>
                                     <Controls.Button disabled={disable.value} 
                                     color='primary'
                                     text="Dispatch"
                                     onClick={() => { 
                                        openInPopup(item) 
                                    }}
                                     />   
                                    </TableCell>
                                    </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Lorry Dispatch"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
              <DispatchConsignmentForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
      
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            </>
</div>
  );
}

export default DispatchConsignment;
