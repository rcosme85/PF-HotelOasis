import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import Detalle from './DashDetalle';
import Form from './DashForm';
import { GetHabitaciones, GetUsers, PutHabitacion, PutHabitacionDetail, PutUsers } from '../../redux/actions';
import FormUser from './FormUser';
import FormHabitacion from './FormHabitacion';
import axios from 'axios';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';


function Reservas({setIsOpenDetalle, setDataDetail, setDataId, setTypeData}) {
  
  const dispatch = useDispatch()
    const [selectedStatus, setSelectedStatus] = useState("all");
    const[selectedRole, setSelectedRole] = useState([])
    const [menuState, setMenuState] = useState({});
    const [reservas, setReservas] = useState([])
    const [doc, setDoc] = useState("")//esto deberia guardar el id
    const [admin, setAdmin] = useState(false)
    const habitaciones = useSelector((state) => state.habitaciones);
    const [multi, setMulti] = useState([])
    const toggleMenuForItem = (item) => {
      setMenuState((prevState) => ({
        ...prevState,
        [item.id]: !prevState[item.id],
      }));
    };
    const handlerSelect = (select) => {
      return (
        (select.deleted === selectedStatus || selectedStatus === "all") &&
        (selectedRole.length === 0 || selectedRole.includes(select.ClienteDocIdentidad)) 
        
      );
      
    }; 
    const changeSelect = (values) => {
      // Filtra solo los valores seleccionados
      const newSelectedRoles = values.filter((value) => value !== null);
    
      // Actualiza el estado con los valores seleccionados
      setSelectedRole(newSelectedRoles);
    };
    const [isOpenForm, setIsOpenForm] = useState(false);
    //const [isOpenDetalle, setIsOpenDetalle] = useState(false);
    const toggleMenuDetalle = (id) => {
      setIsOpenDetalle(!isOpenDetalle);
      setDoc(id)
    };
    const toggleMenuForm = (id, adm) => {
      setIsOpenForm(!isOpenForm);
      setDoc(id)
      
    };
    const handleDelete = async(id, deleteItem)=>{
        let res = {}
        if(deleteItem === true){
            res.deleted = false
        }else{
            res.deleted = true
        }
       const respuesta =  await axios.put(`${import.meta.env.VITE_API_URL}/hotel/reservas/${id}`, res)
       console.log(res)
        console.log(respuesta.data.data)
      }
    /*
    const PutForm = async(id, hab)=>{
      try{  
        await dispatch(PutHabitacionDetail(id, hab))
        setDoc("")
    }catch(error){
     console.error(error)
    } 
    }
    */
   
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/reservas`)
        setReservas(res.data.data)
        const multiFilter = new Set(reservas.map(item => item.ClienteDocIdentidad))
        setMulti([...multiFilter])
      };
      fetchData();
    }, [handleDelete]);


return(

<main className=""> 

{isOpenForm && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
    
    <FormHabitacion estado={isOpenForm} /*PutForm={PutForm}*/ cambiarEstado={setIsOpenForm} id={doc} />
      </div>
  )}
  {/* {isOpenDetalle && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
      
      <Detalle estado={isOpenDetalle} cambiarEstado={setIsOpenDetalle} id={doc}/>
      </div>
  )} */}
  <TabGroup className="mt-6 ">
  <TabList>
        <Tab>Reservas</Tab>
      </TabList>
      <TabPanels> 
      <TabPanel> 
  <Grid className="gap-6 m-6"> 
  <div className="flex space-x-2">
 <MultiSelect
 className="max-w-full sm:max-w-xs"
 onValueChange={changeSelect}
 placeholder="Buscar cliente..."
 value={selectedRole}
 >
  {
  multi.map((item)=>{
        if(item !== null && item !== undefined){
      return(
      <MultiSelectItem key={item} value={item}>
      {item}
      </MultiSelectItem>)}
    })
    
  }
 </MultiSelect>
 <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
<SelectItem value="all">All</SelectItem>
<SelectItem value={false}>Active</SelectItem>
<SelectItem value={true}>Inactive</SelectItem>

</Select>          
  </div>
<Card >
<Title>Lista de reservas</Title>
<Table className='h-[70vh]'>
<TableHead>
<TableRow>
  <TableHeaderCell></TableHeaderCell>
          <TableHeaderCell>Fechas</TableHeaderCell>
          <TableHeaderCell>Pago</TableHeaderCell>
          <TableHeaderCell>Cliente</TableHeaderCell>
          <TableHeaderCell>Estado</TableHeaderCell>
          <TableHeaderCell>Detalle</TableHeaderCell>
</TableRow>
</TableHead>
<TableBody >
  
{reservas.filter((item)=> handlerSelect(item))
         .map((item,i) => (
          <TableRow key={item.id}>
            <TableCell><Text>{i+1}</Text></TableCell>
            <TableCell><Text>{item.fechaIngreso + " - " + item.fechaSalida}</Text></TableCell>
            <TableCell>
              <Text>{item.pago_Estado}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.ClienteDocIdentidad}</Text>
            </TableCell>
            <TableCell>
          <Button onClick={()=>handleDelete(item.id, item.deleted)} color={item.deleted === false ? 'emerald' : 'red'} className='flex-row'> 
  <div className="flex items-center">
    <div className="mr-2">{item.deleted === false ? "activo":"inactivo"}</div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  </div>
</Button>

            </TableCell>
 <TableCell >
 <DescriptionOutlinedIcon className='cursor-pointer' onClick={() =>{
    setIsOpenDetalle(true)
    setDataDetail(item)
    setDataId(item.id)
    setTypeData('reservas')
    }}/>
 {/* <div className='flex'>
  <span onClick={() => toggleMenuForItem(item)}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
  </span>
 


</div> */}
  </TableCell> 


  {/* {menuState[item.id] &&(
  <TableCell>

  <div className='mt-2 -ml-10 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col h-13 w-13'
  >
  <span onClick={() =>toggleMenuDetalle(item.id)} className='m-1'>Detalle</span>
  <span onClick={() =>toggleMenuForm(item.id)} className='m-1'>Modificar</span>
  </div>
  </TableCell>
  )
} */}
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

export default Reservas