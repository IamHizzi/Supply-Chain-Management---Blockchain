import React, { useState } from 'react'
import PageHeader from '../PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../Popup";
import * as FaIcons from 'react-icons/fa';
import * as dispatchService from '../../services/dispatchService'
import UnloadConsignmentForm from './UnloadConsignmentForm'
import UnloadManifestForm from './UnloadManifestForm';
import * as unloadService from '../../services/unloadService';
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
  { id: 'dispatchDate', label: 'DFDate'},
  { id: 'from', label: 'From'},
  { id: 'to', label: 'To'},
  { id: 'vehicelNo', label: 'VehicleNo' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]


function UnloadConsignment() {
  
  const classes = useStyles();
  const[id,setId] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [status,setStatus]=useState('Lorry In-transit')
  var newt=[]
  var newa=[]
  var alldbUs=[]
  const updateRecords = () =>{
    
    axios.get('/tms/dispatch/alldummydispatches')
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
  const [disable,setDisable]=useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [nstatus,setNstatus] = useState(0)  
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
  
  const insertunload = (data) =>{

    axios.post('/tms/unload/insertunload',data)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>console.log(err))
  }

  const deleteDummydispatch = (dispatch)=>{
    axios.post('/tms/dispatch/deletdummydispatch',dispatch)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>console.log(err))
  }


  const addOrEdit = (data) => {
      //if (data.id == 0)
    //unloadService.insertunload(data)
    insertunload(data)
    //alert(JSON.stringify(data))
        //resetForm()
      //setRecordForEdit(null)
      //setOpenPopup(false)
      //setRecords(dispatchService.getAlldispatches())
      setNstatus(nstatus+1)
      //setStatus('Lorry unloaded')
      //setDisable(true)
      /*setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        type: 'success'
    })*/
      
  }

  const add = (data) => {
      //unloadService.insertmanifestunload(data)
      //setRecords(dispatchService.getAlldispatches())
      //setNstatus(nstatus+1)
      
  }

  const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
      setId(item.id)
  }

  const makeNotification = () => {

    if(nstatus==1){
        //dispatchService.deleteDispatch(recordForEdit.id)
        //setRecords(dispatchService.getAlldispatches())
        deleteDummydispatch(recordForEdit)
        updateRecords()
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
        setNstatus(0)
    }
    else{
        //setRecords(dispatchService.getAlldispatches())  
        updateRecords()
        setNotify({
            isOpen: true,
            message: 'Not Submitted ',
            type: 'error'
        })
        setNstatus(0)
    }
    }
  

  
  return (
    <div className='dispatch'>
      <>
            <PageHeader
                title="Unload Consignment"
                subTitle="Lorries that are ready to Unload from Current Branch and Send to Destination"
                icon={<FaIcons.FaUnlink fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Unloads"
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
                                     <TableCell>DF-{item.id}</TableCell>
                                    <TableCell>{item.dispatchDate.substring(0,10)}</TableCell>
                                    <TableCell>{item.from}</TableCell>
                                    <TableCell>{item.to}</TableCell>
                                    <TableCell>{item.vehicleNo}</TableCell>
                                    <TableCell style={{fontWeight:'bold', fontSize:'16px',color:'green',animation:'ease-in-out'}}>{status}</TableCell>
                                    <TableCell>
                                     <Controls.Button disabled={disable} 
                                     color='primary'
                                     text="Unload"
                                     onClick={() => { openInPopup(item) }}
                                     />   
                                    </TableCell>
                                    </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup style={{fontSize:'5px',padding:'0'}}
                title="Unload Consignment"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
               <UnloadConsignmentForm
                     recordForEdit={recordForEdit}
                     addOrEdit={addOrEdit}
                     id={id}/>
      
                <UnloadManifestForm
                recordForEdit={recordForEdit}
                add={add}
                id={id}
                />
                 <Controls.Button style={{float:'right',marginTop:'10px',backgroundColor:'green'}}
                        color='primary'
                        text="Submit"
                        onClick={()=>{
                            makeNotification()
                            setOpenPopup(false)}}
                > </Controls.Button>
                
                
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            
            </>
</div>
  );
}

export default UnloadConsignment;
