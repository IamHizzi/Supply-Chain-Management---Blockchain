import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';
import * as consignmentService from '../../services/consignmentService'
import * as AiIcons from 'react-icons/ai'
import axios from 'axios';


const initialFValues = {
    id: 0,
    consignmentNo:'',
    shippingBranch:''
}

export default function TrackForm(props) {

    var setRecord=props.setrecords
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('shippingBranch' in fieldValues)
            temp.shippingBranch= fieldValues.shippingBranch ? "": "Shipping Address may be Wrong"
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
        if (validate()){
            //var id1=parseInt(values.consignmentNo)
            const rec=consignmentService.getAllConsignments()
            //var con=rec.filter(x => x.id == id1 && x.shippingAddress==values.shippingBranch)
            //setRecord(con)
            const track={
                shippingBranch:values.shippingBranch
            }
            axios.post('/tms/booking/trackconsignment',track)
            .then(res=>{
                console.log(res.data)
                var con=[]
                con.push(res.data)
                setRecord(con)
            })
            .catch(err=>console.log(err))
        }

    }

    return (
          <Form onSubmit={handleSubmit}>
            <Grid container style={{marginLeft:"25%"}} >
                <Grid item>
                    <Controls.Input
                        name="shippingBranch"
                        label="Shipping Address"
                        value={values.shippingBranch}
                        onChange={handleInputChange}
                        error={errors.shippingBranch}
                        icon={<AiIcons.AiOutlineBranches/>}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Track" />
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