import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem, TextInput, BarList, DonutChart } from '@tremor/react';
import { Dialog, Transition } from "@headlessui/react";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import DashDetalle from './DashDetalle';
import Form from './DashForm';
import Usuarios from './DashUsuarios';
import Habitaciones from './DashHabitaciones';
import { GetClientes, GetUsers, PutClientes } from '../../redux/actions';
import axios from 'axios';
import Reservas from './Reservas';
import { IconId } from '@tabler/icons-react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import Tipos from './TiposHabs';
import { BarChart } from "@tremor/react"
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined"
import ReviewAdmin from './ReviewsAdmin';
const Sidebar = () => {
const dispatch = useDispatch()
  const [sidenav, setSidenav] = useState(true);
  const [section, setSection] = useState('dashboard');
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRole, setSelectedRole] = useState([]);
  const [habsDetalle, setHabsDetalle] = useState([])
  const [menuState, setMenuState] = useState({});
  const [doc, setDoc] = useState("")//esto deberia guardar el documento
  const clientes = useSelector((state) => state.clientes);
 const [habitaciones, setHabitaciones] = useState([])
 const users = useSelector((state) => state.users);
 useEffect(() => {
  const fetchData = async () => {
    await dispatch(GetUsers());
  };
  fetchData();
  setIsOpenDetalle(false)
}, [dispatch]);
 const name = useSelector((state) => state.auth.displayName);
 const imageOfProfile = useSelector((state) => state.auth.photoURL);

useEffect(() => {
  const fetchData = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle`)
  setHabsDetalle(res.data.data)}
fetchData();
}, []);
useEffect(() => {
  const fetchData = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones`)
  setHabitaciones(res.data.data)}
fetchData();
}, []);

  const toggleMenuForItem = (item) => {
    setMenuState((prevState) => ({
      ...prevState,
      [item.doc_Identidad]: !prevState[item.doc_Identidad],
    }));
  };
  const changeSection = (newSection) => {
    setSection(newSection);
  };
  const handlerSelect = (select) => {
    return (
      (select.deleted === selectedStatus || selectedStatus === "all") &&
      (selectedRole.length === 0 || selectedRole.includes(select.doc_Identidad))
    );
  }; 
  const changeStatus = (status)=>{
    //deberia hacer un borrado logico
   
  }
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenDetalle, setIsOpenDetalle] = useState(false);
  //
  const [dataDetail, setDataDetail] = useState({});
  const [typeData, setTypeData] = useState("");
  const [dataId, setDataId] = useState("");const [reser, setReser] = useState([])
useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/reservas`);
    setReser(res.data.data)
  };
  fetchData();
}, []);

const char = {
  primer: 0,
  segundo: 0,
  tercero:0
}
const charCliente = {
  primer: 0,
  segundo: 0,
  tercero:0
}
let ingresoTotal = 0

reser.forEach(r => {
  
  if (r.pago_Estado === "approved") {
    if(r.createdAt !== undefined && r.createdAt !== null){
    const fecha = new Date(r.createdAt);
    let mes = fecha.getMonth() + 1;
   
      
      console.log(mes)
    
    if (mes >= 1 && mes <= 4) {
      
      r.Reserva_Items.forEach(item => {
        char.primer += item.precio;
      });
    }
    if (mes >= 4 && mes <= 8) {
      
      r.Reserva_Items.forEach(item => {
        char.segundo += item.precio;
      });
    }
    if (mes >= 8) {
     
      r.Reserva_Items.forEach(item => {
        char.tercero += item.precio;
      });
    }
  }

r.Reserva_Items.forEach(item => {
  ingresoTotal += item.precio
});
  }
});
let porcentajeIngreso = (ingresoTotal / 800000) * 100
ingresoTotal = ingresoTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const habitaciones_ingresos = [];

habsDetalle.forEach(h => {
  const hab = {};
  hab.name = `${h.tipo_Habitacion} - ${h.subTipo}`;
  hab.ingresos = 0;
  habitaciones_ingresos.push(hab);
});

 function obtenerDetalleHabitacion(item) {
  try {
    const res = habitaciones.find(h=> h.id === item.HabitacionId)
    //await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/${item.HabitacionId}`);
    const hab = habsDetalle.find(h=> h.id === res.HabitacionDetalleId)
    //const resDetalle = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/${hab.HabitacionDetalleId}`);
    const name = `${hab.tipo_Habitacion} - ${hab.subTipo}`;
    return { name, ingreso: item.precio };
  } catch (error) {
    console.error(error);
    return null;
  }
}

 function procesarReservas() {
  for (const r of reser) {
    if (r.pago_Estado === "approved") {
      const promesasDetalle = r.Reserva_Items.map(y => obtenerDetalleHabitacion(y));
      promesasDetalle.forEach(result => {
        if (result) {
          const { name, ingreso } = result;
          const habitacion = habitaciones_ingresos.find(i => i.name === name);
          if (habitacion) {
            habitacion.ingresos += ingreso;
          }
        }
      });
    }
  }
}

procesarReservas()
  console.log(habitaciones_ingresos);

  const toggleMenuDetalle = () => {
    setIsOpenDetalle(!isOpenDetalle);
   // setDoc(document)
  };
  const toggleMenuForm = (document) => {
    setIsOpenForm(!isOpenForm);
    setDoc(document)
  };
  const handleDelete = async(docItem, deleteItem)=>{
    let cliente = {}
    if(deleteItem === true){
     cliente.deleted = false
    }else{
      cliente.deleted = true
    }
    await dispatch(PutClientes(docItem, cliente))
    await dispatch(GetClientes())
  }
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetClientes());
    };
    fetchData();
    setIsOpenDetalle(false)
  }, [dispatch]);

 /* clientes.forEach(r => {
    console.log("gola")
      const fecha = new Date(r.createdAt);
      let mes = fecha.getMonth() + 1;
        console.log(mes)
      if (mes >= 1 && mes <= 4) {
          charCliente.primer += 1;
      }
      if (mes >= 4 && mes <= 8) {
          charCliente.segundo += 1;
      }
      if (mes >= 8) {
          charCliente.tercero += 1;
      }
  });
*/
const chartHabitaciones = habitaciones_ingresos.filter((h) => h.ingresos > 1);
  //data deberian ser los clientes de las BD
  const PutForm = async(documento, cliente)=>{
    try{  
      await dispatch(PutClientes(documento, cliente))
      dispatch(GetClientes());
      setDoc("")
  }catch(error){
   console.error(error)
  } 
  }
 const porcentajeClientes = Math.floor( (clientes.length / 1000) * 100)
 const porcentajeUsers = Math.floor( (users.length / 1000) * 100)
  const chartdata = [
    {
      date: "Enero-Abril",
      ingresos: char.primer,
     // "clientes": charCliente.primer,
    },
    {
      date: "Mayo-Agosto",
      ingresos: char.segundo,
      //"clientes": charCliente.segundo,
    },
    {
      date: "Septiembre-Diciembre",
      ingresos: char.tercero,
      //"clientes": charCliente.tercero,
    }
  ];

  // console.log("AbrirDetalle", isOpenDetalle);
  return (
    <div id="view" className="h-full w-screen mt-20 flex flex-row">
      <button
        onClick={() => setSidenav(!sidenav)}
        className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
      >
        <svg
          className="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="sidebar"
        className={`bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out ${
          sidenav ? "" : "transform -translate-x-full"
        }`}
      >
        <div className="space-y-6 md:space-y-10 mt-0">

          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
            Oasis<span className="text-teal-600">.</span>
          </h1>
          <div id="profile" className="space-y-3">
            <img
              src={imageOfProfile}
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                {name}
              </h2>
              <p className="text-xs text-gray-500 text-center">Administrator</p>
            </div>
          </div>

          <div id="menu" className="flex flex-col space-y-2">
            <a
              onClick={() => changeSection("dashboard")}
              href="#"
              className=" pt-4 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out "
            >
              <LeaderboardOutlinedIcon />
              <span className="ml-2">Estadísticas</span>
            </a>
            <a
              href="#"
              onClick={() => changeSection("clientes")}
              className="pt-4 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <GroupOutlinedIcon />
              <span className="ml-2">Clientes</span>
            </a>
            {/* Add the rest of the menu items here */}
            <a
              href="#"
              onClick={() => changeSection("usuarios")}
              className="  pt-4 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <AssignmentIndOutlinedIcon />
              <span className="ml-2">Usuarios</span>
            </a>
            <a
              href="#"
              onClick={() => changeSection("Tipos")}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center pt-4"
            >
              <MeetingRoomOutlinedIcon />
              <span>Tipos Habitación</span>
            </a>
            {/* <a
        href="#"
        onClick={() => changeSection('habitaciones')}
        className=" pt-4 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <HotelOutlinedIcon />
        <span className="ml-2">Habitaciones</span>
      </a> */}
            <a
              href="#"
              onClick={() => changeSection("reservas")}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center pt-4"
            >
              <ConfirmationNumberOutlinedIcon />
              <span className="ml-2">Reservas</span>
            </a>
            <a
              onClick={() => changeSection("reviews")}
              href="#"
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center pt-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>

              <span className="ml-2">Reseñas</span>
            </a>
          </div>
        </div>
      </div>

      {/* INFORMACION PARA EL TABLERO */}

      <div className="flex-1 bg-gray-100">
        {isOpenDetalle && (
          <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto">
            <DashDetalle
              onClose={setIsOpenDetalle}
              id={dataId}
              data={dataDetail}
              type={typeData}
            />
          </div>
        )}

        {
          //DASHBOARD
          section === "dashboard" && (
            <main className="p-12">
              <Title>Dashboard</Title>

    <TabGroup className="mt-6">
      <TabList>
        <Tab>Ingresos</Tab>
        <Tab>Ingresos por habitacion</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
            <Card>
            
            <Text>Ingreso bruto</Text>
    <Metric>{ingresoTotal}</Metric>
    <Flex className="mt-4">
      <Text>{porcentajeIngreso}% del objetivo anual</Text>
      <Text>$ 800,000</Text>
    </Flex>
    <ProgressBar value={porcentajeIngreso} className="mt-2" />
    <div className="h-2" />    
            </Card>
            <Card>
            
            <Text>Clientes</Text>
    <Metric>{clientes.length}</Metric>
    <Flex className="mt-4">
      <Text>{porcentajeClientes}% del objetivo anual</Text>
      <Text>1000</Text>
    </Flex>
    <ProgressBar value={porcentajeClientes} className="mt-2" />
    <div className="h-2" />
            </Card>
            <Card>
            <Text>Usuarios</Text>
    <Metric>{users.length}</Metric>
    <Flex className="mt-4">
      <Text>{porcentajeUsers}% del objetivo anual</Text>
      <Text>{1000}</Text>
    </Flex>
    <ProgressBar value={porcentajeUsers} className="mt-2" />
              <div className="h-2" />
            </Card>

            

          </Grid>
      <Grid className="gap-6 mt-6">
      <Card>
            <Title>Ingresos</Title>
            <AreaChart 
            data={chartdata}
            index="date"
      categories={["ingresos"]}
      colors={["indigo"]}
      
      />  
      <div className="h-2 w-96" />
            </Card>
      </Grid>
         
        </TabPanel>
        
        <TabPanel>
          <Grid  className="gap-6 mt-6 column items-center justify-center"> 
          <Title>Ingresos por habitacion 2023</Title>
          <DonutChart
      className="mt-6"
      data={chartHabitaciones}
      category="ingresos"
      index="name"
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber", "blue", "emerald", "pink", "rose", "fuchsia", "zinc", "yellow", "lime", ""]}
    />
  
  <Card>
  <BarChart
      className="mt-6 "
      data={chartHabitaciones}
      index="name"
      categories={["ingresos"]}
      colors={["blue"]}
      yAxisWidth={56}
    />
  </Card>
  
  </Grid>
     </TabPanel> 

      </TabPanels>
    </TabGroup>
  </main>
  
     )}
        {
section === "reviews" && ( 

<ReviewAdmin/>
)
}
       {
section === "Tipos" && ( 

<Tipos setIsOpenDetalle={setIsOpenDetalle} setDataDetail={setDataDetail} setDataId={setDataId} setTypeData={setTypeData}/>
)
}
     {
section === "reservas" && ( 

<Reservas setIsOpenDetalle={setIsOpenDetalle} setDataDetail={setDataDetail} setDataId={setDataId} setTypeData={setTypeData}/>
)
}
{
section === "usuarios" && ( 

<Usuarios  setIsOpenDetalle={setIsOpenDetalle} setDataDetail={setDataDetail} setDataId={setDataId} setTypeData={setTypeData}/>
)
}
{
section === "habitaciones" && ( 

<Habitaciones />
)
}
{//CLIENTES
section === "clientes" && ( 
  <main className=""> 

{isOpenForm && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
    
      <Form estado={isOpenForm} PutForm={PutForm} cambiarEstado={setIsOpenForm} documento={doc} setDoc = {setDoc}/>
      </div>
  )}
  
  <TabGroup className="mt-6 ">
  <TabList>
        <Tab>Clientes</Tab>
      </TabList>
      <TabPanels> 
      <TabPanel> 
  <Grid className="gap-6 m-6"> 
  <div className="flex space-x-2">
 <MultiSelect
 className="max-w-full sm:max-w-xs"
 onValueChange={setSelectedRole}
 placeholder="Buscar DNI..."
 >
  {
    clientes.map((item)=>{
      return(
      <MultiSelectItem key={item.doc_Identidad} value={item.doc_Identidad}>
      {item.doc_Identidad}
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
<SelectItem value={false}>Active</SelectItem>
<SelectItem value={true}>Inactive</SelectItem>

</Select>          
  </div>
<Card >
<Title>Lista de clientes</Title>
<Table className='h-[60vh]'>
<TableHead className='bg-white'>
<TableRow>
  <TableHeaderCell></TableHeaderCell>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Documento</TableHeaderCell>
          <TableHeaderCell>Pais</TableHeaderCell>
          <TableHeaderCell>Estado</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
</TableRow>
</TableHead>
<TableBody >
  
{clientes.filter((item)=> handlerSelect(item))
         .map((item,i) => (
          <TableRow key={item.doc_Identidad}>
            <TableCell><Text>{i+1}</Text></TableCell>
            <TableCell><Text>{item.nombre}</Text></TableCell>
            <TableCell>
              <Text>{item.doc_Identidad}</Text>
            </TableCell>
            <TableCell> 
              <Text>{item.pais}</Text>
            </TableCell>
            <TableCell>
          <Button onClick={()=>handleDelete(item.doc_Identidad, item.deleted)}  color={item.deleted === false ? 'emerald' : 'red'} className='flex-row'> 
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
    toggleMenuDetalle()
    setDataDetail(item)
    setDataId(item.doc_Identidad)
    setTypeData('clientes')
    }}/>

                                    {/* <div className='flex inline-flex'>
  <span onClick={() => toggleMenuForItem(item)}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
  </span>
</div> */}
                                  </TableCell>
                                  {/* {menuState[item.doc_Identidad] &&(
  <TableCell> 
  <div className='bg-zinc-300 mt-2 -ml-10 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col h-13 w-13'
  >
  <span onClick={() =>toggleMenuDetalle(item.doc_Identidad)} className='m-1'>Detalle</span>
  <span onClick={() =>toggleMenuForm(item.doc_Identidad)} className='m-1'>Modificar</span>
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
      </div>

      {/* INFORMACION PARA EL TABLERO */}
    </div>
  );
};
export default Sidebar;