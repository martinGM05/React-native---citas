import React, {Fragment, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';



const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);

  // Definir el state de citas
  const [citas, setCitas] = useState([
    {id: "1", paciente: "Hook", propietario: "Juan", sintomas: "No come"},
    {id: "2", paciente: "Redux", propietario: "Martin", sintomas: "No Duerme"},
    {id: "3", paciente: "Native", propietario: "Itzel", sintomas: "No canta"},
  ]);

  // Elimina los pacientes del state
  const eliminarCita = (id) => {
    setCitas(citas.filter(cita => cita.id !== id));
  }

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  // Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>

        <View>
          <TouchableHighlight onPress={()=> mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario 
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => <Cita cita={item} eliminarCita={eliminarCita}/> }
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },  
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contenido:{
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
