import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { DeleteIcon, EditIcon, Button, Pane, FormField, AddIcon, Table, Dialog, TextInput, Text } from 'evergreen-ui';

const info = [
  { id: 1, personaje: 'Monkey D. Luffy', anime: 'One Piece' },
  { id: 2, personaje: 'Uzumaki Naruto', anime: 'Naruto' },
  { id: 3, personaje: 'Yagami Light', anime: 'Death Note' },
  { id: 4, personaje: 'Sun Jinwoo', anime: 'Solo Leveling' },
  { id: 5, personaje: 'Goku', anime: 'Dragon Ball Z' },
  { id: 6, personaje: 'Goblin Slayer', anime: 'Goblin Slayer' }
]

function App() {
  const [data, setData] = useState(info);

  const [form, setForm] = useState({
    id: '',
    personaje: '',
    anime: ''
  });

  const [dialogInsertar, setDialogInsertar] = useState({ isShown: false });
  const [dialogEditar, setDialogEditar] = useState({ isShown: false });

  const handleChange = (e, id) => {
    setForm({
      ...form,
      id: id,
      [e.target.name]: e.target.value,
    })
  }

  const HandleInsert = () => {
    setData([...data, form])
  }
  const handleEdit = (e, registro) => {
    setDialogEditar({isShown: e});
    setForm(registro);
  }
  const handleUpdate = (dato)=>{
    var contador=0;
    var lista = data;
    lista.map( registro =>{
      if(dato.id=== registro.id){
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
        
      }
      contador++;
    })
    setData(lista);
  }
  const handleEliminar = (dato)=>{
    Swal.fire({
      title: `Desea eliminar registro ${dato.id}?` ,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
   }).then((result) => {
      if(result.value){
        let contador =0;
        var lista = data;
        lista.map( registro =>{
          if(registro.id === dato.id){
            lista.splice(contador,1);
          }
          contador++;
        });
        setData([...lista]);
     }
   }) 
  }


  return (
    <>
      <Pane
        height='100%'
        width='100%'
        display=""
        alignItems="center"
        justifyContent="center"
        border="default"
      >
        <Pane
          height='100%'
          width='100%'
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <Button
            marginTop='10px'
            marginBottom='10px'
            appearance='primary'
            intent='success'
            iconBefore={AddIcon}
            onClick={() => setDialogInsertar({ isShown: true })}
          >
            Insertar Personaje
        </Button>

        </Pane>

        <Pane
          width='auto'
          height='auto'
          marginLeft='5px'
          marginRight='5px'
        >
          <Table

          >
            <Table.Head
              display='flex'
              border="default"
            >
              <Table.HeaderCell >Id</Table.HeaderCell>
              <Table.HeaderCell>Personaje</Table.HeaderCell>
              <Table.HeaderCell>Anime</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Head>
            <Table.Body>
              {data.map((personaje) => {
                return (
                  <Table.Row key={personaje.id} width='auto' >
                    <Table.TextCell>{personaje.id}</Table.TextCell>
                    <Table.TextCell>{personaje.personaje}</Table.TextCell>
                    <Table.TextCell>{personaje.anime}</Table.TextCell>
                    <Table.TextCell >
                      <Button appearance='primary' intent='warning' iconAfter={EditIcon} onClick={() => { handleEdit(true, personaje) }} >Editar</Button>
                      {"  "}
                      <Button appearance='primary' intent='danger' iconAfter={DeleteIcon} onClick={()=>{handleEliminar(personaje)}} >Eliminar</Button>

                    </Table.TextCell>
                  </Table.Row>);
              })}
            </Table.Body>
          </Table>

        </Pane>

        <Pane>
          <Dialog
            isShown={dialogInsertar.isShown}
            intent='success'
            title="Insertar nuevo personaje"
            onCloseComplete={() => setDialogInsertar({ isShown: false })}
            onConfirm={() => {
              if (form.personaje !== "" && form.anime !== "") {
                HandleInsert()
              }
              setDialogInsertar({ isShown: false })
            }}
            onCancel={() => {
              setForm({
                id: '',
                personaje: '',
                anime: ''
              })
              setDialogInsertar({ isShown: false })
            }}
            confirmLabel='Aceptar'
            cancelLabel='Cancelar'
          >
            <Pane>
              <FormField>
                <Pane
                  height='auto'
                  width='auto'
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>Id:</Text>
                  <TextInput readOnly type='text' value={data.length + 1}></TextInput>
                </Pane>
              </FormField>
              <FormField>
                <Pane
                  height='auto'
                  width='auto'
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>Personaje:</Text>
                  <TextInput name='personaje' type='text' onChange={(e) => { handleChange(e, data.length + 1) }}></TextInput>
                </Pane>
              </FormField>
              <FormField>
                <Pane
                  height='auto'
                  width='auto'
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>Anime:</Text>
                  <TextInput name='anime' type='text' onChange={(e) => { handleChange(e, data.length + 1) }}></TextInput>
                </Pane>
              </FormField>
            </Pane>

          </Dialog>


        </Pane>


        <Pane>
          <Dialog
            isShown={dialogEditar.isShown}
            intent='success'
            title="Insertar nuevo personaje"
            onCloseComplete={() => setDialogEditar({ isShown: false })}
            onConfirm={() => {
              if (form.personaje !== "" && form.anime !== "") {
                handleUpdate(form);
              }
              setDialogEditar({ isShown: false })
            }}
            onCancel={() => {
              setForm({
                id: '',
                personaje: '',
                anime: ''
              })
              setDialogEditar({ isShown: false })
            }}
            confirmLabel='Aceptar'
            cancelLabel='Cancelar'
          >
            <Pane>
              <FormField>
                <Pane
                  height='auto'
                  width='auto'
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>Id:</Text>
                  <TextInput readOnly type='text' value={form.id}></TextInput>
                </Pane>
              </FormField>
              <FormField>
                <Pane
                  height='auto'
                  width='auto'
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>Personaje:</Text>
                  <TextInput name='personaje' type='text' value={form.personaje} onChange={(e) => { handleChange(e, form.id) }}></TextInput>
                </Pane>
              </FormField>
              <FormField>
                <Pane
                  height='auto'
                  width='auto'
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text>Anime:</Text>
                  <TextInput name='anime' type='text' value={form.anime} onChange={(e) => { handleChange(e, form.id) }}></TextInput>
                </Pane>
              </FormField>
            </Pane>

          </Dialog>


        </Pane>







      </Pane>
    </>
  );
}

export default App;
