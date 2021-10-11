import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import  "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
       setDatePickerVisibility(true);
    };
   
    const hideDatePicker = () => {
       setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };


    // Muestra el DateTimePicker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
     };

    const confirmarHora = (date) => {
        const opciones = { hour: 'numeric', minute: 'numeric', hour12: true };
        guardarHora(date.toLocaleTimeString('es-ES', opciones));
        hideTimePicker();
    };

    // Crear nueva cita
    const crearNuevaCita = () => {
        // Validar
        if(paciente.trim() === '' ||
            propietario.trim() === '' ||
            telefono.trim() === '' ||
            sintomas.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === ''){
                mostrarAlerta();
            return;
        }

        // Crear nueva cita
        const cita = { paciente, propietario, telefono, sintomas, fecha, hora };
        cita.id = uuidv4();
        // console.log(cita);
        //Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        // Ocultar el formulario
        guardarMostrarForm(false);

        // Resetear el formulario

    }

    // Muestra la alerta si falla la validacion
    const mostrarAlerta = () => {
        // Poner alerta con diseño
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{text: 'OK'}]
        );
    }



  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={texto => guardarPaciente(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={texto => guardarPropietario(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Teléfono Contacto:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={texto => guardarTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
            <Text style={styles.label}>Fecha</Text>
            <Button title="Seleccionar fecha" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale="es_ES"
            />
            <Text>{fecha}</Text>
        </View>

        <View>
            <Text style={styles.label}>Hora</Text>
            <Button title="Seleccionar hora" onPress={showTimePicker} />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale="es_ES"
                is24Hour
            />
            <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput 
            multiline
            style={styles.input}
            onChangeText={texto => guardarSintomas(texto)}
          />
        </View>
        <View>
            <TouchableHighlight onPress={()=> crearNuevaCita()} style={styles.btnSubmit}>
              <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
            </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario:{
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    color: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 40,
    },
    textoSubmit: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Alerta
    alerta:{
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    alertaTexto:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertaBoton:{
        padding: 10,
        backgroundColor: '#7D024E',
        marginTop: 20,
    },
    alertaTextoBoton:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Formulario;
