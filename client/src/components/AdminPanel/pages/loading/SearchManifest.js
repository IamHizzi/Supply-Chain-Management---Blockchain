import React, { useState } from 'react'
import PageHeader from '../PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton, TextField } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import * as manifestService from '../../services/manifestService'
import SearchManifestForm from './SearchManifestForm';
import Notification from "../../Notification";
import ConfirmDialog from "../../ConfirmDialog";
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
  { id: 'Remarks', label: 'Remarks' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function SearchManifest() {

   const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    var alldbUs=[]
    const [records, setRecords] = useState([])
    axios.get('/tms/loading/allmanifests')
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
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

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

     const updateManifestItem = (manifest) => {
       axios.post('/tms/loading/updatemanifest',manifest)
       .then(res=>{
           console.log(res.data)
       })
       .catch(err=>console.log(err)) 
     }

     const updateRecords = () =>{
        axios.get('/tms/loading/allmanifests')
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

    const addOrEdit = (manifest,resetForm) => {
        //if (manifest.id == 0)
          //  manifestService.insertManifestItem(manifest)
        //else
        updateManifestItem(manifest)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        updateRecords()
        //setRecords(manifestService.getAllManifests())
        setNotify({
          isOpen: true,
          message: 'Submitted Successfully',
          type: 'success'
      })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const DeleteManifestItem = (item) => {
            axios.post('/tms/loading/deletemanifest',item)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=> console.log(err))

            axios.post('/tms/laoding/deletedummymanifest',item)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }

    const onDelete = item => {
      setConfirmDialog({
          ...confirmDialog,
          isOpen: false
      })
      //manifestService.deleteManifest(id);
      DeleteManifestItem(item)
      updateRecords()
      setNotify({
          isOpen: true,
          message: 'Deleted Successfully',
          type: 'error'
      })
  }

  return (
    <div className='loading'>
       <>
            <PageHeader
                title="Find a Manifest"
                subTitle="Find a Manifest and Quickly Edit or Delete it"
                icon= { <SearchIcon/> }
            />
            <Paper className={classes.pageContent}>

         <Toolbar>
                <TextField
                label="Search Manifests By vehicleNo"
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
                                     <TableCell>MF-{item.id}</TableCell>
                                    <TableCell>{item.manifestDate.substring(0,10)}</TableCell>
                                    <TableCell>{item.from}</TableCell>
                                    <TableCell>{item.to}</TableCell>
                                    <TableCell>{item.vehicleNo}</TableCell>
                                    <TableCell>{item.Remarks}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                              setConfirmDialog({
                                                  isOpen: true,
                                                  title: 'Are you sure to delete this record?',
                                                  subTitle: "You can't undo this operation",
                                                  onConfirm: () => { onDelete(item) }
                                              })
                                          }}
                                          >
                                        <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                    </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Manifest Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SearchManifestForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
             </>
    </div>
  );
}

