import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';
import * as consignmentService from '../../services/consignmentService';
import * as itemService from '../../services/itemDetailsService';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Notification from '../../Notification'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import storehash from '../../../../storehash';
import Web3 from 'web3'

const transportationItems = [
    { id: 'road', title: 'Road' },
    { id: 'sea', title: 'Sea' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    bookingDate:new Date(),
    manifestId:0,
    cityReference: '',
    transportationMode:'road',
    shippingAddress:'',
    valueofGoods:'',
    consignorName:'',
    consigneeName:'',
    from:'',
    blockchainid:'',
    blockchainHash:'',
    isPermanent: false,
}

export function BookConsignments() {

    const history = useHistory()
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [accounts,setAccounts]= useState([])
    const [datahash, setdatahash] = useState(null)
    const [trxHash, setTrxHash] = useState(null)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('cityReference' in fieldValues)
            temp.cityReference = fieldValues.cityReference ? "" : "This destination branch is required."
        if ('consignorName' in fieldValues)
            temp.consignorName = fieldValues.consignorName ? "" : "Consignor Details are required."
        if ('consigneeName' in fieldValues)
            temp.consigneeName = fieldValues.consigneeName ? "" : "Consignee Details are required."
        if ('valueofGoods' in fieldValues)
            temp.valueofGoods = fieldValues.valueofGoods > 0 ? "" : "Value of goods must be greater than Rs 0."
        if ('shippingAddress' in fieldValues)
            temp.shippingAddress = fieldValues.shippingAddress  ? "" : "Shipping Address is required."
        if ('from' in fieldValues)
            temp.from = fieldValues.from ? "" : "The source branch is required."
    
            setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
        //else console.log(temp);    
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

     const loadBlockCHainData = async () => {
        const web3=new Web3(Web3.givenProvider || "http://localhost:8545")
        const accountsfromEth = await web3.eth.requestAccounts()
        console.log(accountsfromEth[0])
        //setAccounts(accountsfromEth)
        var hash=web3.utils.sha3(JSON.stringify(values))
        const ethAddress= await storehash.options.address
        setdatahash(hash)
        // storing hash to blockchain 
        var id = web3.utils.randomHex(8)
        values.blockchainid=id
        values.blockchainHash=hash
        //console.log(accountsfromEth[1])
         storehash.methods.addHash(id,hash).send({
             from: accountsfromEth[0],
             gas: 30000
         }, (err,txhash)=>{
             if (err) throw err;
             console.log(txhash)
             setTrxHash(txhash)
         })
         }
    const  handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            consignmentService.insertConsignment(values)
            loadBlockCHainData().then(console.log())
            //console.log(values)
            axios.post('/tms/booking/bookconsignment',values)
            .then(res=> {
                console.log(res.data)
                setNotify({
                    isOpen: true,
                    message: 'Consignment Booked Successfully ',
                    type: 'success'
                })

                setNotify({
                    isOpen: true,
                    message: 'blockchainHash of Data: '+values.blockchainHash+ " \n Transaction Hash: "+trxHash,
                    type: 'success'
                })
                //history.push('/')
            })
            .catch(err=> console.log(err))
            
            // resetForm() 
            // //return <Redirect to='/booking'/>
        }

    }

    return (
          <Form onSubmit={handleSubmit}>
            <label for="Items" style={{marginBottom:'4px'}}>Consignment Details</label>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="consignorName"
                        label="Consignor Name"
                        value={values.consignorName}
                        onChange={handleInputChange}
                        error={errors.consignorName}
                        icon={<GiIcons.GiPoliceOfficerHead/>}
                    />
                    <Controls.Input
                        name="consigneeName"
                        label="Consignee Name"
                        value={values.consigneeName}
                        onChange={handleInputChange}
                        error={errors.consigneeName}
                        icon={<AiIcons.AiOutlineSend/>}
                    />
                    <Controls.Input
                        name="valueofGoods"
                        label="Value of Goods(Rs.)"
                        value={values.valueofGoods}
                        onChange={handleInputChange}
                        error={errors.valueofGoods}
                        icon={<GiIcons.GiPriceTag/>}

                    />
                    <Controls.Input
                        name="shippingAddress"
                        label="Shipping Address"
                        value={values.shippingAddress}
                        onChange={handleInputChange}
                        error={errors.shippingAddress}
                        icon={<FaIcons.FaRegAddressCard/>}
                    />
                    <Controls.RadioGroup
                        name="transportationMode"
                        label="Transportation Mode"
                        value={values.transportationMode}
                        onChange={handleInputChange}
                        items={transportationItems}
                    />
                </Grid>
                <Grid item xs={6}>
                <Controls.Select
                        name="from"
                        label="From Branch"
                        value={values.from}
                        onChange={handleInputChange}
                        options={consignmentService.getBranchesCollection()}
                        error={errors.from}
                    />
                    
                    <Controls.Select
                        name="cityReference"
                        label="To Branch"
                        value={values.cityReference}
                        onChange={handleInputChange}
                        options={consignmentService.getBranchesCollection()}
                        error={errors.cityReference}
                    />
                    
                    <Controls.DatePicker
                        name="bookingDate"
                        label="Booking Date"
                        value={values.bookingDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Consignment"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
   )
}


const initialIValues = {
    id: 0,
    manifestId:0,
    productDetails: '',
    from:'islamabad',
    actualWeight:'',
    quantity:'',
    TaxRate:'',
    to:'',
    isPermanent: false,
}

export function ItemDetails() {

    const history = useHistory()
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('productDetails' in fieldValues)
            temp.productDetails = fieldValues.productDetails ? "" : "This field is required."
        if ('actualWeight' in fieldValues)
            temp.actualWeight = fieldValues.actualWeight > 0 ? "" : "Actual must be greater than 0 kg."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity > 0 ? "" : "quantity must be greater than 1 item."
        if ('TaxRate' in fieldValues)
            temp.TaxRate = fieldValues.TaxRate.length != 0 ? "" : "This field is required."
        if ('to' in fieldValues)
            temp.to = fieldValues.to.length != 0 ? "" : "This field is required."
        if ('from' in fieldValues)
            temp.from = fieldValues.from.length != 0 ? "" : "This field is required."
        
            setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
        //else console.log(temp);    
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialIValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            itemService.insertitem(values)
            axios.post('/tms/booking/bookitem',values)
            .then(res=> {
                console.log(res.data)
                setNotify({
                    isOpen: true,
                    message: 'Item added for booking',
                    type: 'success'
                })
                //history.push('/bookOrder')
            })
            .catch(err=> console.log(err))
            
            resetForm()
        }

    }

    return (
          <Form onSubmit={handleSubmit}>
            <label for="Items" style={{marginBottom:'4px'}}>Item Details</label>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="productDetails"
                        label="Product Name and Details"
                        value={values.productDetails}
                        onChange={handleInputChange}
                        error={errors.productDetails}
                        icon={<FaIcons.FaProductHunt/>}
                        size={'small'}
                    />
                    <Controls.Input
                        name="actualWeight"
                        label="Actual Weight"
                        value={values.actualWeight}
                        onChange={handleInputChange}
                        error={errors.actualWeight}
                        icon={<FaIcons.FaWeight/>}
                    />
                    <Controls.Input
                        name="quantity"
                        label="Quantity"
                        value={values.quantity}
                        onChange={handleInputChange}
                        error={errors.quantity}
                        icon={<AiIcons.AiOutlineNumber/>}
                    />
                    
                </Grid>
                <Grid item xs={6}>
                <Controls.Select
                        name="from"
                        label="From"
                        value={values.from}
                        onChange={handleInputChange}
                        options={consignmentService.getBranchesCollection()}
                        error={errors.from}
                    />

                    <Controls.Select
                        name="to"
                        label="To"
                        value={values.to}
                        onChange={handleInputChange}
                        options={consignmentService.getBranchesCollection()}
                        error={errors.to}
                    />
                    
                    <Controls.Select
                        name="TaxRate"
                        label="TaxRate"
                        value={values.TaxRate}
                        onChange={handleInputChange}
                        options={itemService.getTaxRateCollection()}
                        error={errors.TaxRate}
                    />

                    <div >
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>                   
                </Grid>
            </Grid>
        </Form>
   )
}