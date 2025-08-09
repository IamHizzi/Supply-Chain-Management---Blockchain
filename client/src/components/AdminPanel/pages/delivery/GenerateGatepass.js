import React, { useState } from 'react'
import PageHeader from '../PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../Popup";
import * as FaIcons from 'react-icons/fa';
import * as dispatchService from '../../services/dispatchService'
import * as unloadService from '../../services/unloadService';
import GatePass from './GatePass';
import * as deliveryService from '../../services/deliveryService'
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
    { id: 'id', label: 'CN.No'},    
    { id: 'bookingDate', label: 'CN.Date'},
    { id: 'valueofGoods', label: 'Value(Rs)', disableSorting: true },
    { id: 'consignorName', label: 'Consignor '},
    { id: 'consigneeName', label: 'Consignee '},
    { id: 'shippingAddress', label: 'ShipAddress' },
    { id: 'from', label: 'From'},
    { id: 'to', label: 'To'},
    { id: 'gatePass', label: 'GatePass'},
    { id: 'status', label: 'Status'},
    
]


function GenerateGatepass() {
  //deliveryService.deleteDeliveries()
  const classes = useStyles();
  var rec=unloadService.getAllunloads()
  const newr=[]
  for(let i=0; i<rec.length;  i++){
    for(let item of rec[i]){
        newr.push(item);
    }
  }
  //alert(JSON.stringify(newr))
  //alert(JSON.stringify(rec))

  var alldbUs=[]
  const [records, setRecords] = useState([])

  const updateRecords =  ()=>{

    axios.get('/tms/unload/alldummyunloads')
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
   updateRecords()
  const[id,setId] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [status,setStatus]=useState('Not Issued')
//  const [records, setRecords] = useState(newr)
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
  
  const insertdelivery = (data)=>{
    axios.post('/tms/delivery/insertDelivery',data)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>console.log(err))
  }

   const deleteDummyUnload = (data)=>{

    axios.post('/tms/unload/deletdummyunload',data)
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>console.log(err))
  

   }
  const addOrEdit = (data,resetForm) => {
     deliveryService.insertdelivery(data)
     unloadService.deleteUnload(data.id)
    //alert(JSON.stringify(data))
    insertdelivery(data)
    deleteDummyUnload(data)
    resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      //updateRecords()
      //newr.pop(recordForEdit)
      setRecords(newr)
     // setNstatus(nstatus+1)
      //setStatus('Gatepass Issued')
      //setDisable(true)
      setNotify({
        isOpen: true,
        message: 'GatePass Issued',
        type: 'success'
    })
      
  }

  const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
      setId(item.id)
  }


  
  return (
    <div className='delivery'>
      <>
            <PageHeader
                title="Generate GatePasses"
                subTitle="Generate gatepasses to products recieved to make delivery to their destination"
                icon={<FaIcons.FaShippingFast fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search CNs"
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
                                    <TableCell>PKG{item.id}</TableCell>
                                    <TableCell>{item.bookingDate.substring(0,10)}</TableCell>
                                    <TableCell>{item.valueofGoods}</TableCell>
                                    <TableCell>{item.consignorName}</TableCell>
                                    <TableCell>{item.consigneeName}</TableCell>
                                    <TableCell>{item.shippingAddress}</TableCell>
                                    <TableCell>{item.from}</TableCell>
                                    <TableCell>{item.to}</TableCell>
                                    <TableCell>
                                     <Controls.Button disabled={disable} 
                                     color='primary'
                                     text="Issue"
                                     onClick={() => { openInPopup(item) }}
                                     />   
                                    </TableCell>
                                    <TableCell style={{fontWeight:'bold', fontSize:'16px',color:'green',animation:'ease-in-out'}}>{status}</TableCell>
                                    </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup style={{fontSize:'5px',padding:'0'}}
                title="GatePass"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
              <GatePass
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
                />  
                
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
                 </>
</div>
  );
}

export default GenerateGatepass;
