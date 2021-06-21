import React, { memo, useMemo, useState, useRef , useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { GlobalPagination , request } from 'strapi-helper-plugin';
import { isObject } from 'lodash';
import { Table, Button ,Select ,Input } from '@buffetjs/core';
import pluginPkg from '../../../../package.json';

import { LoadingBar } from '@buffetjs/styles';
import {Modal} from 'react-bootstrap'


import axios from 'axios';
import Wrapper from './Wrapper';
 //import AsyncSelect from 'react-select/async'


const LIMIT_OPTIONS = ['5','10', '20', '50', '100'];
const icon = pluginPkg.strapi.icon;

const DataView = ({
  data = [],
  activeModel = '',
  loading,
  page,
  limit,
  totalCount,
  onChangeParams,
  isMigrateActive,
  show,
  isDeleted,
  isCreated,
  hasMapping,
  refreshData,
}) => {
  const history = useHistory();
  const searchRef=useRef();
  const fieldRef=useRef();
  const tableHeaders = useMemo(
    () =>
      data && data.length
        ? Object.keys(data[0]).map((d) => ({ name: d, value: d }
          
          ))
        : [],
    [data]
  );
  
  const headerData=[...tableHeaders];
// console.log(headerData.tableHeaders);
 headerData.splice(0,1,{name:"all" , value:"all"});

 headerData.pop();
 headerData.pop();
 headerData.pop();
 console.log({headerData});
 const dataHead=headerData.map((item=>({label: item.name , value:item.value})));



 const [isShow,setIsShow]=useState(false);

  
  const tableData = useMemo(
    () =>
      data && data.length
        ? data.map((dataObject) => {
            let newObj = {};
            setIsShow(false)
            if (!dataObject) return newObj;

            for (let key in dataObject) {
              if (isObject(dataObject[key])) {
                newObj[key] = JSON.stringify(dataObject[key], null, 2);
              } else {
                newObj[key] = dataObject[key];
              }
            }

            return newObj;
          })
        : [],
    [data]
    
  );
 // console.log(tableData)

  const [isMigrating, setIsMigrating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearching , setIsSearching]=useState(false);
  const [searchContent , setSearchContent]=useState([]);
  const [header , setHeader]=useState([]);
  const [field, setField]=useState("");
  const [query, setQuery]=useState('')
  //const [isShow,setIsShow]=useState(false);
  const [showP , setShowP]=useState(true);
  const [error ,setError]=useState('');
const [modal ,setModal]=useState(false);



const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const formSubmit=(e)=>{
    e.preventDefault();
   
   
    

}
  



  const migrate = (model) => {
    setIsMigrating(true);
    request(`/strapi-plugin-elastic/migrate-model`, {
      method: 'POST',
      body: { model },
    })
      .then((res) => {
        if (res.success) {
          alert('Migration was successful');
          refreshData();
        } else alert('Migration was unsuccessful');
      })
      .catch(() => alert('Migration was unsuccessful'))
      .finally(() => setIsMigrating(false));
  };
 const onChangeSearchField=(e)=>{
  console.log(e.target.value);
  setField(e.target.value);


  }
  const onChangeSearchQuery=(e)=>{
    console.log(e.target.value);
    setQuery(e.target.value);
  
  
    }
  const deleteIndex = (model) => {
    setIsDeleting(true);
    request(`/strapi-plugin-elastic/delete-index`, {
      method: 'POST',
      body: { model },
    })
      .then((res) => {
        if (res.success) {
          alert(`${model} deleted`);
          refreshData();
        } else alert(`cannot deleted ${model}`);
      })
      .catch(() => alert(`cannot deleted ${model}`))
      .finally(() => setIsDeleting(false));
  };
  
  console.log({show})
  const search = async(model)=>{
    setIsSearching(true);
    // const field=fieldRef.current.value;
    // let query =''
    //  query=JSON.stringify(searchRef.current.value) ;
    console.log({field})
   const searchData=await request(`/strapi-plugin-elastic/search?index=${model}&q=${query}&_limit=${limit}&field=${field}`,{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      // body:{field}
    }).then( res=>{ //res.json();
      
     
        console.log( JSON.stringify(res.data) )
        setSearchContent(res.data);
         setIsShow(!show)
         

      

     
    //return;
    

   // console.log(searchContent);
    })
    .catch(async(e)=>{
     
     // alert(e)

    })
    .finally(()=>{
      setIsSearching(false);
      
      
     
      
     

    });
    
    
    

  };
   console.log( {field});
   console.log( "show 2",{show});

  const createIndex = (model) => {
    setIsCreating(true);
    request(`/strapi-plugin-elastic/create-index`, {
      method: 'POST',
      body: { model },
    })
      .then((res) => {
        refreshData();
        if (res.success) alert(`${model} created`);
        else alert(`cannot create ${model}`);
      })
      .catch(() => alert(`cannot create ${model}`))
      .finally(() => setIsCreating(false));
  };
   console.log(error)
  return (
    <Wrapper>
      <div className="row px-4">
        <h2>{activeModel?.index?.toUpperCase()}</h2>
        {/* {searchContent && <div>{searchContent.data}</div>} */}
        {/* {error && <h5 className="text-center" style={{color:"red"}}>{error}</h5>} */}

          <form onSubmit={formSubmit} style={{paddingLeft:"20px"}}>
              <div className="form-row">
                <div className="form-group col-mb-5">

                
            <input type="text" name="search" onChange={(e)=>onChangeSearchQuery(e) }  className="form-control"  placeholder="search...." style={{height:"35px"},{fontSize:"16px"}} ></input>
            {/* {error && <h5 className="text-center" style={{color:"red"}}>{error}</h5>} */}
            </div>

            <div className="form-group col-mb-2">
            <Select style={{width:"150px"}}    placeholder=" "  value={dataHead.value}  options={dataHead} onChange={(e)=>onChangeSearchField(e) } 
          />
          </div>
          
          <div className="form-group col-mb-5 " style={{fontSize:"17px"}} >
          <Button
          type={formSubmit}
        
        color="primary"
        isLoading={isSearching}
        onClick={() => {
          
          search(activeModel.model);
         setShow(true);
          
        }}
        className="ml-auto"
        disabled={!query}
      >
        search
      </Button>
          
            {/* <button disabled={!query}  type="submit" className="text-white btn btn-primary btn-lg ml-auto" onClick={(e)=>{search(activeModel.model)} } style={{width:"90px"}}>search</button> */}
            </div>
            </div>

          </form>









   
         {/* <Button
        
          color="primary"
          isLoading={isSearching}
          onClick={() => {
            
            search(activeModel.model);
           // setShow(true);
            setShowP(false)
          }}
          className="ml-auto"
          disabled={isSearching}
        >
          search
        </Button>
        
        <input ref={searchRef} name="search" type="text" style={{width:"120px"},{paddingRight:"4px"},{border:"0px"}} v-model="query" placeholder="Searching............"  />
        
          <Select style={{width:"150px"}} value={field} className="col-2" placeholder='select field to search' options={dataHead} onChange={(e)=>onChangeSearchField(e) } 
          />  */}

           
          <Modal show={modal} onHide={handleClose}   size="sm"    aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title><h3 style={{color:"red"}}>Error</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Can't search in ${activeModel.model} is empty`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      










           
        <Button
          color="success"
          isLoading={isMigrating}
          onClick={() => {
            migrate(activeModel.model);
          }}
          className="ml-auto"
          disabled={!isMigrateActive}
        >
          migrate
        </Button>
        
        <Button
          color="primary"
          isLoading={isCreating}
          disabled={isCreated}
          onClick={() => {
            createIndex(activeModel.model);
          }}
          className="ml-2"
        >
          create
        </Button>
        <Button
          color="delete"
          isLoading={isDeleting}
          disabled={isDeleted}
          onClick={() => {
            deleteIndex(activeModel.model);
          }}
          className="ml-2"
        >
          delete
        </Button>
      </div>
      <hr />
      {loading  ? (
        
        new Array(10).fill(0).map(() => (
          <>
            <LoadingBar />
            <div className="mt-3" />
          </>
        ))
      ) : (
        <>
          <Table
            headers={tableHeaders}
            
            rows={tableData}
           
          />



          <div className="mt-5 row align-items-center px-2">
            <Select
              name="params._limit"
              onChange={onChangeParams}
              options={LIMIT_OPTIONS}
              value={limit}
              className="col-2"
            />
            <div className="col-8 ml-auto">
              <GlobalPagination
                count={totalCount}
                
                onChangeParams={onChangeParams}
                params={{
                  _limit: parseInt(limit || 10, 10),
                  _page: page,
                }}
              />
            </div>
            
            
          </div>
         
          
        
          
          

        </>
      )}
      
     


       <div>
        
      { isShow && activeModel.index && searchContent !== 'Not Matching Result' &&  searchContent  ?  (
        <>
        <hr>
      </hr>
         <h2>SEARCH RESULT</h2>
         
         
          <Table
            headers={tableHeaders}
            
            rows={searchContent}
            onClickRow={(e, data) =>
              history.push(
                `/plugins/content-manager/collectionType/${
                  activeModel?.plugin
                    ? `plugins::${activeModel?.plugin}.${activeModel?.model}`
                    : `application::${activeModel?.model}.${activeModel?.model}`
                }/${data.id}`
              )
            }
          />



          <div className="mt-5 row align-items-center px-2">
            <Select
              name="params._limit"
              onChange={onChangeParams}
              options={LIMIT_OPTIONS}
              value={limit}
              className="col-2"
            />
            <div className="col-8 ml-auto">
              <GlobalPagination
                count={totalCount}
                onChangeParams={onChangeParams}
                params={{
                  _limit: parseInt(limit || 10, 10),
                  _page: page,
                }}
              />
            </div>
            
            
          </div>
         
          
        
          
              

        </>
      ):
      
      null
        }

        {
          isShow && searchContent === 'Not Matching Result'  ? (
            <>
            <hr>
            </hr>
        
            <h2>SEARCH RESULT</h2>
            <h2 style={{color:"red"}}>{searchContent}</h2>
            </>
            
          ): null
        }



</div>






    </Wrapper>
  );
};




DataView.propTypes = {
  data: PropTypes.array.isRequired,
  refreshData: PropTypes.func.isRequired,
  activeModel: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  limit: PropTypes.string.isRequired,
  onChangeParams: PropTypes.func.isRequired,
  isMigrateActive: PropTypes.bool.isRequired,
  show:PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  hasMapping: PropTypes.bool.isRequired,
};

export default memo(DataView);
