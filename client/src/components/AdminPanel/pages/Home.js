import React from 'react';
import PageHeader from './PageHeader';
import * as AiIcons from 'react-icons/ai';
import SimpleCard from './Card';
import * as consignmentService from '../services/consignmentService'
import * as manifestService from '../services/manifestService'



function Home() {
  var recs=consignmentService.getAllConsignments()
  var countBooks=recs.length
  var manif=manifestService.getAllManifests().length
  return (
    <div className='home'>
      <PageHeader title="Home" subTitle="Statistics of the System" icon={<AiIcons.AiFillHome fontSize='large'/>} />
      <div className='cards'>
      <div className='card' style={{color:'white'}}>
      <SimpleCard heading="Bookings" count= {countBooks} desc="Recent Bookings" />
      </div>
      <div className='card' >
      <SimpleCard heading="Manifests" count= {manif} desc="Recent Trucks to be Loaded" />
      </div>
      <div className='card' >
      <SimpleCard heading="Payments" count= {countBooks} desc="Daily Transactions" />
      </div>  
      </div>
     
    </div>
  );
}

export default Home;
