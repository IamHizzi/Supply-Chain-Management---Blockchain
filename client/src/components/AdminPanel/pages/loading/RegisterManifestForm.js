import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';
import * as consignmentService from '../../services/consignmentService';
import * as manifestService from '../../services/manifestService';
import * as preManifestService from '../../services/currentManifestData'
import * as FcIcons from 'react-icons/fc'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import * as carServices from '../../services/carServices'

const getVehicles = ()=>{

    // var vh=[]
    // axios.get('/tms/vehicle/allVehicles')
    // .then(res=>{
    //     res.data.forEach(v=>{
    //         vh.push(v)
    //     })
    // })
    // .catch(err=>console.log(err))
    var vehicl=carServices.getAllvehicle()
      var vehs=[]
    for(let i=0; i<vehicl.length; i++){
        const veh={
            id:vehicl[i].RegistrationNum,
            title:vehicl[i].RegistrationNum
        }
        vehs.push(veh)
    }
return vehs
    
    
}
const initialFValues = {
    id: 0,
    manifestDate: new Date(),
    from:'',
    to:'',
    vehicleNo:'',
    amount:'',
    advancePayment:'',
    dueBalance:'',
    Remarks:'',
}

export default function RegisterManifestForm(props) {

    // const [veh, setveh] = useState([])
    // var vh=[]
    // axios.get('/tms/vehicle/allVehicles')
    // .then(res=>{
    //     res.data.forEach(v=>{
    //         vh.push(v)
    //     })
    // })
    // .catch(err=>console.log(err))
    // //var vehicl=carServices.getAllvehicle()
    //   var vehs=[]
    // for(let i=0; i<vh.length; i++){
    //     const veh={
    //         id:i+1,
    //         title:vh[i].RegistrationNumber
    //     }
    //     vehs.push(veh)
    // }
    // setveh(vehs)
    const {goods}=props
    const history = useHistory()
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount.length > 0 ? "" : "Fill this field."
        if ('advancePayment' in fieldValues){
            temp.advancePayment = fieldValues.advancePayment.length > 0 ? "" : "Fill this field."
            if(parseInt(fieldValues.advancePayment)>parseInt(fieldValues.amount))
            temp.advancePayment="Advance Payment should be less or equal than total amount"
        }
        if ('dueBalance' in fieldValues)
            {
                temp.dueBalance = fieldValues.dueBalance.length > 0 ? "" : "Fill this field."
                if(parseInt(fieldValues.dueBalance) + parseInt(fieldValues.advancePayment)!=parseInt(fieldValues.amount))
                temp.dueBalance="Due balance is incorrect."
            }
        if ('Remarks' in fieldValues)
            temp.Remarks = fieldValues.Remarks.length>0 ? "" : "Give some Remarks and Details to Manifest."
        

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

    const handleSubmit = e => {
        e.preventDefault()
        //console.log(goods)  
        if (validate()){
          //manifestService.insertManifestItem(values);
          //preManifestService.insertPreManifestItem(goods,values.id);
          var preManifests=[]
          goods.splice(0,1)
            for(let i=0; i<goods.length; i++){
            //goods[i].manifestId=values.id
            //alert(data[i].manifestId)
            preManifests.push(goods[i]) 
        }
          
          axios.post('/tms/loading/registermanifest',values)
          .then(res=>{
              console.log(res.data)
          })
          .catch(err=>console.log(err))
          
          axios.post('/tms/loading/insertpremanifest',preManifests)
          .then(res=>{
              console.log(res.data)
          })
          .catch(err=>console.log(err))
          resetForm()
          ToastsStore.success("Manifest generated Successfully")
          history.push('/loading')
        }

    }

    return (
          <Form onSubmit={handleSubmit}>
            
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
        
            <Grid container style={{marginLeft:"10%"}} >
                <Grid item>
                    <Controls.DatePicker
                        name="manifestDate"
                        label="Manifest Date"
                        value={values.manifestDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="from"
                        label="From Branch"
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
                        name="vehicleNo"
                        label="Vehicle No"
                        value={values.vehicleNo}
                        onChange={handleInputChange}
                        error={errors.vehicleNo}
                        options={getVehicles()}
                        size='large'
                        icon={<AiIcons.AiOutlineFieldNumber/>}
                    />
                    <Controls.Input
                        name="amount"
                        label="Total Amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                        icon={<MdIcons.MdAttachMoney/>}
                    />
                    <Controls.Input
                        name="advancePayment"
                        label="Advance Payment"
                        value={values.advancePayment}
                        onChange={handleInputChange}
                        error={errors.advancePayment}
                        icon={<FcIcons.FcAdvance/>}
                    />
                    <Controls.Input
                        name="dueBalance"
                        label="Due balance"
                        value={values.dueBalance}
                        onChange={handleInputChange}
                        error={errors.dueBalance}
                        icon={<MdIcons.MdAttachMoney/>}
                    />
                    <Controls.Input
                        name="Remarks"
                        label="Remarks"
                        value={values.Remarks}
                        onChange={handleInputChange}
                        error={errors.Remarks}
                        icon={<FcIcons.FcViewDetails/>}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Register" />
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