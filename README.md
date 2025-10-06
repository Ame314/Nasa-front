paso 1)
crear con el framework que se va a utilizar 

`npx create-react-app .`
`npm install axios `
`npm install three framer-motion`


y luego se instalan las librerías 

```
npm install axios
npm install papaparse
npm install recharts
```

para iniciar el proyecto 
`npm start`
### **1. Importaciones**


```
import React, { useState } from "react";
import axios from "axios";
```

- **`React` y `useState`**: Se usan para crear componentes funcionales y manejar el estado.
- **`axios`**: Se usa para hacer peticiones HTTP a un backend (como un servidor local en `http://127.0.0.1:8000`).

---

### **2. Componente `App`**


```
function App() { ... }
```

- Es un componente funcional de React que representa la interfaz de usuario para el explorador de exoplanetas.

---

### **3. Estados del componente**


```
const [inputs, setInputs] = useState({});
const [predictResult, setPredictResult] = useState(null);
const [analisisResult, setAnalisisResult] = useState(null);
const [loading, setLoading] = useState(false);
```

- **`inputs`**: Almacena los valores ingresados por el usuario.
- **`predictResult`**: Guarda el resultado de la predicción hecha por el modelo (ej. Random Forest).
- **`analisisResult`**: Guarda el resultado del análisis completo del planeta.
- **`loading`**: Muestra un estado de carga mientras se procesan las peticiones al backend.

---

### **4. Manejador de cambios en los inputs**

```
const handleChange = (e) => {
  let value = e.target.type === "checkbox" ? (e.target.checked ? 1 : 0) : parseFloat(e.target.value);
  setInputs({
    ...inputs,
    [e.target.name]: isNaN(value) ? null : value
  });
};
```

- Maneja los cambios en los campos de entrada (inputs y checkboxes).
- Convierte el valor de un checkbox en `1` o `0` según su estado.
- Actualiza el estado `inputs` con el valor del campo modificado.

---

### **5. Función para realizar predicción**


```
const handlePredict = async () => {
  setLoading(true);
  try {
    const res = await axios.post("http://127.0.0.1:8000/predict", inputs);
    setPredictResult(res.data);
  } catch (err) {
    console.error(err);
    alert("Error en /predict");
  }
  setLoading(false);
};
```

- Envía los datos de `inputs` al endpoint `/predict` del backend.
- Muestra un mensaje de error si ocurre un problema.
- Actualiza el estado `predictResult` con los datos recibidos.

---

### **6. Función para análisis completo**


```
const handleAnalisis = async () => {
  setLoading(true);
  try {
    const res = await axios.post("http://127.0.0.1:8000/analisis", inputs);
    setAnalisisResult(res.data);
  } catch (err) {
    console.error(err);
    alert("Error en /analisis");
  }
  setLoading(false);
};
```

- Similar a `handlePredict`, pero envía los datos a `/analisis`.
- Muestra el resultado del análisis en la interfaz.

---

### **7. Renderizado del componente**

```
return ( ... )
```

- **Estructura general**:
    - Un contenedor con `maxWidth`, `padding`, y estilo visual (colores, fuentes).
    - **Título**: "Explorador de Exoplanetas".
    - **Inputs numéricos**: Para las características de los exoplanetas (ej. `koi_period`, `koi_duration`, etc.).
    - **Checkboxes**: Para flags como `koi_fpflag_nt`, `koi_fpflag_ss`, etc.
    - **Botones**:
        - "Predecir" → Llama a `handlePredict`.
        - "Análisis Completo" → Llama a `handleAnalisis`.
    - **Mostrar resultados**:
        - **`predictResult`**: Muestra el tipo de planeta y sus probabilidades.
        - **`analisisResult`**: Muestra si el planeta está en la zona habitable y alertas.

---

### **8. Estilos y UI**

- Se usan estilos inline para dar un aspecto moderno y atractivo.
