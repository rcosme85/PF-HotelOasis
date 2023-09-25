import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import Detalle from './DashDetalle';
import Form from './DashForm';
import { GetUsers, PutUsers, GetTiposHabitaciones } from '../../redux/actions';
import FormUser from './FormUser';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from 'axios';

function Tipos( {data, toggleMenuDetalle, setIsOpenDetalle, setDataDetail, setDataId, setTypeData}) {
  
  const dispatch = useDispatch()
    const [selectedStatus, setSelectedStatus] = useState("all");
    const[selectedRole, setSelectedRole] = useState([])
    const [menuState, setMenuState] = useState({});
  
    const [doc, setDoc] = useState("")//esto deberia guardar el id
    const [admin, setAdmin] = useState(false)
    const users = useSelector((state) => state.users);
    //const [tipos, setTipos] = useState([])
    const tipos = useSelector((state) => state.habitaciones);
    const toggleMenuForItem = (item) => {
      setMenuState((prevState) => ({
        ...prevState,
        [item.nombre]: !prevState[item.nombre],
      }));
    };
    const handlerSelect = (select) => {
      return (
        (select.subTipo === selectedStatus || selectedStatus === "all") &&
        (selectedRole.length === 0 || selectedRole.includes(select.id.toString())) 
        
      );
      
    }; 
    const changeSelect = (values) => {
      // Filtra solo los valores seleccionados
      const newSelectedRoles = values.filter((value) => value !== null);
    
      // Actualiza el estado con los valores seleccionados
      setSelectedRole(newSelectedRoles);
    };
    const [isOpenForm, setIsOpenForm] = useState(false);
    
    /* 
    const [isOpenDetalle, setIsOpenDetalle] = useState(false);
    const toggleMenuDetalle = (id) => {
      setIsOpenDetalle(!isOpenDetalle);
      setDoc(id)
    }; */

    const toggleMenuForm = (id, adm) => {
      setIsOpenForm(!isOpenForm);
      setDoc(id)
      setAdmin(adm)
    };
    /*
    const handleDelete = async(docItem, deleteItem)=>{
      let user = {}
      if(deleteItem === true){
        user.deleted = false
      }else{
        user.deleted = true
      }
       await axios.put(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/put/${docItem}`, user)
     
    }
    */
    const PutForm = async(id, user)=>{
      try{  
        await dispatch(PutUsers(id, user))
        dispatch(GetUsers());
        setDoc("")
    }catch(error){
     console.error(error)
    } 
    }

    /* const fetchData = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle`)
         setTipos(res.data.data)
       }; */


    useEffect(() => {
      
      //fetchData();
      dispatch(GetTiposHabitaciones());
     
    }, []);

return(

<main className=""> 

{isOpenForm && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
    
    <FormUser estado={isOpenForm} PutForm={PutForm} cambiarEstado={setIsOpenForm} documento={doc} admin={admin}/>
      </div>
  )}
  {/* {isOpenDetalle && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
      
      <Detalle estado={isOpenDetalle} cambiarEstado={setIsOpenDetalle} id={doc}/>
      </div>
  )} */}
  <TabGroup className="mt-6 ">
  <TabList>
        <Tab>Tipos de habitacion</Tab>
      </TabList>
      <TabPanels> 
      <TabPanel> 
  <Grid className="gap-6 m-6"> 
  <div className="flex space-x-2">
 <MultiSelect
 className="max-w-full sm:max-w-xs"
 onValueChange={changeSelect}
 placeholder="Buscar id..."
 value={selectedRole}
 >
  {
    tipos.map((item)=>{
      return(
      <MultiSelectItem key={item.id.toString()} value={item.id.toString()}>
      {item.id.toString()}
      </MultiSelectItem>)
    })
    
  }
 </MultiSelect>
 <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
<SelectItem value="all">All</SelectItem>
<SelectItem value={"Economica"}>Economica</SelectItem>
<SelectItem value={"Confort"}>Confort</SelectItem>
<SelectItem value={"Gold"}>Gold</SelectItem>
</Select>          
  </div>
<Card >
<Title>Lista de tipos de habitacion</Title>
<Table className='h-[65vh]'>
<TableHead>
<TableRow>
          <TableHeaderCell>Id</TableHeaderCell>
          <TableHeaderCell>Tipo</TableHeaderCell>
          <TableHeaderCell>Subtipo</TableHeaderCell>
          <TableHeaderCell>USD</TableHeaderCell>
          <TableHeaderCell>Detalle</TableHeaderCell>
</TableRow>
</TableHead>
<TableBody >
  
{tipos.filter((item)=> handlerSelect(item))
         .map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Text>{item.tipo_Habitacion}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.subTipo}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.precio}</Text>
            </TableCell>
            
 <TableCell >
 <DescriptionOutlinedIcon className='cursor-pointer' onClick={() =>{
    setIsOpenDetalle(true)
    setDataDetail(item)
    setDataId(item.id)
    setTypeData('habitaciones')
    }}/>

 {/* <div className='flex inline-flex'>
  <span onClick={() => toggleMenuForItem(item)}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
  </span>
 
</div>
 */}
  </TableCell>           
  {/* {menuState[item.nombre] &&(
  <TableCell> 
  <div className='bg-zinc-300 mt-2 -ml-10 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col h-13 w-13'
  >
  <span onClick={() =>toggleMenuDetalle(item.id)} className='m-1'>Detalle</span>
  <span onClick={() =>toggleMenuForm(item.id, item.admin)} className='m-1'>Modificar</span>
  </div>
  </TableCell>
  ) 
  }
  */}

          </TableRow>
          
        ))}
      
</TableBody>
</Table>
</Card>

</Grid>
</TabPanel>

</TabPanels>
</TabGroup>   
</main>

)

}
export default Tipos