import PageHeader from './PageHeader';
import * as FaIcons from 'react-icons/fa';
import React, { useState } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, TextField, IconButton } from '@material-ui/core';
import useTable from "../useTable";
import * as manifestService from "../services/manifestService";
import Controls from "../controls/Controls";
import SearchIcon from '@material-ui/icons/Search';
import PrintIcon from '@material-ui/icons/Print'
import easyinvoice from 'easyinvoice';
import Popup from '../Popup';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
      color:"white",

  },
  searchInput: {
      width: '75%'
  }
}))


const headCells = [
    { id: 'id', label: 'MFNo'},    
    { id: 'manifestDate', label: 'MFDate'},
    { id: 'from', label: 'From'},
    { id: 'to', label: 'To'},
    { id: 'vehicelNo', label: 'VehicleNo' },
    { id: 'amount', label: 'TotalAmount '},
    { id: 'advancePayment', label: 'Advance(Rs)'},
    { id: 'dueBalance', label: 'Due(Rs)' },
    { id: 'Remarks', label: 'Remarks' },
    { id: 'report', label: 'Report' },

    
]


function Loading() {

  const classes = useStyles();
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

    const renderReciept = (item) => {
        //const cuProd=prod.filter(it=>it.id==item.id)
        const data = {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE
            
            //"locale": "de-DE", 
            //Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html 
            
            "currency": "USD", 
            //Defaults to no currency. List of currency codes: https://www.iban.com/currency-codes
            
            "taxNotation": "vat", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
                "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64
            "sender": {
              "company": "Sample Corp",
              "address": "Sample Street 123",
              "zip": "1234 AB",
              "city": "Sampletown",
              "country": "Samplecountry"
              //"custom1": "custom value 1",
              //"custom2": "custom value 2",
              //"custom3": "custom value 3"
            },
            "client": {
              "company": "Client Corp",
              "address": "Clientstreet 456",
              "zip": "4567 CD",
              "city": "Clientcity",
              "country": "Clientcountry"
              //"custom1": "custom value 1",
              //"custom2": "custom value 2",
              //"custom3": "custom value 3"
            },
            "invoiceNumber": "2021.0001",
            "invoiceDate": "1.1.2021",
            "products": [
                {
                    "quantity": "2",
                    "description": "Test1",
                    "tax": 6,
                    "price": 33.87
                },
                {
                    "quantity": "4",
                    "description": "Test2",
                    "tax": 21,
                    "price": 10.45
                }
            ],
            "bottomNotice": "Kindly pay your invoice within 15 days.",
            //Used for translating the headers to your preferred language
            //Defaults to English. Below example is translated to Dutch
            // "translate": { 
            //     "invoiceNumber": "Factuurnummer",
            //     "invoiceDate": "Factuurdatum",
            //     "products": "Producten", 
            //     "quantity": "Aantal", 
            //     "price": "Prijs",
            //     "subtotal": "Subtotaal",
            //     "total": "Totaal" 
            // }
          }; 
        //alert(JSON.stringify(data))
        easyinvoice.createInvoice(data, (result) =>{
            //console.log(result.pdf)
            setOpenPopup(true);
            easyinvoice.render('reciept',result.pdf,()=>{
                console.log('invoice rendered')
            })
        } );
    }

  return (
    <div className='loading'>
      <PageHeader title="Loading Consignments" subTitle="All Consigmnets that needs to be loaded or have been loaded" icon={<FaIcons.FaTruckLoading/>} />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
        <TextField
                label="Search Manifests"
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
                            <TableCell>MF00{item.id}</TableCell>
                            <TableCell>{item.manifestDate.substring(0,10)}</TableCell>
                            <TableCell>{item.from}</TableCell>
                            <TableCell>{item.to}</TableCell>
                            <TableCell>{item.vehicleNo}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.advancePayment}</TableCell>
                            <TableCell>{item.dueBalance}</TableCell>
                            <TableCell>{item.Remarks}</TableCell>
                            <TableCell>
                            <Controls.ActionButton
                                color="primary"
                                onClick={() => renderReciept(item) }>
                                <PrintIcon fontSize="small" />
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
    title="Consignment Report"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
    >
        <div id='reciept'></div>
    </Popup>
    </div>

  );
}

export default Loading;
