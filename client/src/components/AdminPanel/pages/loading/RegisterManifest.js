import React, { useState } from 'react'
import PageHeader from '../PageHeader';
import * as FaIcons from 'react-icons/fa';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, IconButton,TextField } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import SearchIcon from '@material-ui/icons/Search';
import * as consignmentService from "../../services/consignmentService";
import * as preManifestService from '../../services/currentManifestData'
import RegisterManifestForm from './RegisterManifestForm'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';


const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
      color:"white",
  },
  formPaper:{
    marginLeft: theme.spacing(28),
    padding: theme.spacing(2),
    width:'50%',
 },
  searchInput: {
      width: '75%',
     }
}))


const headCells = [
    { id: 'id', label: 'CNNo'},    
    { id: 'bookingDate', label: 'BookingDate'},
    { id: 'valueofGoods', label: 'Value(Rs)', disableSorting: true },
    { id: 'consignorName', label: 'Consignor '},
    { id: 'consigneeName', label: 'Consignee '},
     {id:'from', label:'From'},
    { id: 'to', label: "To"},
    { id: 'shippingAddress', label: 'Ship-Address' },
    {id: 'Action', label:'Action'}
    
]

function RegisterManifest() {
  const classes = useStyles();
  var alldbUs=[]
  const [records, setRecords] = useState([])
  axios.get('/tms/booking/allbookings')
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
    const [goods,setGoods]=useState([{}])
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
                    return items.filter(x => x.consignorName.toLowerCase().includes(target.value))
            }
        })
    }

    const addtoManifest = (id)=> {
        console.log(records[id])
    }

  return (
    <div className='loading'>
      <>
    <PageHeader title="Register Manifest" subTitle="Register a Manifest for different goods to be loaded on a Vehicle or Ship" icon={<FaIcons.FaCashRegister />} 
    />
    <Paper className={classes.formPaper}>
        <RegisterManifestForm goods={goods}/>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </Paper>
    <Paper className={classes.pageContent}>
        <Toolbar>
        <TextField
                label="Search Manifests By Consignor Name"
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
            <TableBody style={{color:"white"}}>
                {
                    recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.id}-CL</TableCell>
                            <TableCell>{item.bookingDate.substring(0,10)}</TableCell>
                            <TableCell>{item.valueofGoods}</TableCell>
                            <TableCell>{item.consignorName}</TableCell>
                            <TableCell>{item.consigneeName}</TableCell>
                            <TableCell>{item.from}</TableCell>
                            <TableCell>{item.cityReference}</TableCell>
                            <TableCell>{item.shippingAddress}</TableCell>
                            <TableCell>{
                                <Controls.Button style={{padding:"0",backgroundColor:'green'}}     
                                    text="Add to Manifest" 
                                    onClick={()=> 
                                        {
                                        //preManifestService.insertPreManifestItem(records[item.id-1]);
                                        setGoods(old=>[...old,records[item.id-1]]) 
                                        ToastsStore.success("Item added to cart")   
                                       }
                                       }
                                />}
                        </TableCell>
                        </TableRow>)
                    )
                }
            </TableBody>
        </TblContainer>
        <TblPagination />
    </Paper>
</></div>
  );
}

export default RegisterManifest;
