import React, { useState } from 'react'
import PageHeader from '../AdminPanel/pages/PageHeader';
import * as AiIcons from 'react-icons/ai'
import useTable from "../AdminPanel/useTable";
import Controls from "../AdminPanel/controls/Controls";
import SearchIcon from '@material-ui/icons/Search';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton,TextField } from '@material-ui/core';
import axios from 'axios'
import PrintIcon from '@material-ui/icons/Print'
import AddIcon from '@material-ui/icons/Add';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

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
    { id: 'Name', label: 'User_Name'},
    { id: 'Email', label: 'Email', disableSorting: true },
    { id: 'registered', label: 'DateOfRegistration'},
    { id: 'status', label: 'Status'},
    { id: 'Report', label: 'Report'},
    
  ]
export default function Setting() {

    var alldbUs=[]
    const [records, setRecords] = useState([])
    const classes = useStyles();
    const [load,setLoad]=useState(false)
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
                  return items.filter(x => x.name.toLowerCase().includes(target.value))
          }
      })
  }
    
    
  const loadUsers = () =>{

    axios.get('/tms/users/alldbusers')
    .then(res=>{
        res.data.forEach(element=>{
            alldbUs.push(element)
        })      
    setRecords(alldbUs)
        ToastsStore.success("Users Loaded")
        setLoad(true)
    })
    .catch(err=>{
        console.log(err)
        ToastsStore.error("No Internet Connection")
    })
}
    
    
    return (
        <div className='loading'>
            <PageHeader title="Users Activity" subTitle="All Users Of the System and their activity Status" icon={<AiIcons.AiFillDatabase fontSize='large'/>} />
            <Paper className={classes.pageContent}>

      <Toolbar>
      <TextField
                label="Search For Users"
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
          <Controls.Button 
                        text="Load Users"
                        variant="outlined"
                        disabled={load}
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={loadUsers}
                    />
      </Toolbar>
      <TblContainer>
          <TblHead />
          <TableBody>
              {
                  recordsAfterPagingAndSorting().map(item =>
                      (<TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.date.substring(0,15)}</TableCell>
                          <TableCell style={{fontWeight:'bold', fontSize:'16px',color:'green',animation:'ease-in-out'}}>Active</TableCell>
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
      </Paper>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
        </div>
    )
}
