import React, { useState } from 'react';
import './DynamicForm.css';
// Estructura del campo dinámico para permitir su validación y añadirlo al formato de nuestro formulario dinámico de manera correcta.
interface DynamicField {
  id: number; 
  label: string;
  type: string;
  value: any;
  validation?: string; 
}

const mockApiSubmit = async (data: DynamicField[]) => {
  return new Promise((resolve) => {
    console.log(data, "Data recibida")
    setTimeout(() => resolve('¡Datos enviados correctamente!'), 1000);
  });
};

const DynamicForm: React.FC = () => {
  // Acá hago uso de useState para gestionar el estado del formulario dinámico. 
  // Cada state tiene un propósito específico:
  // 1. fields: Almacena los campos dinámicos que el usuario ha agregado al formulario. Cada campo incluye su id, tipo, etiqueta, valor, y reglas de validación.
  // 2. fieldType y fieldLabel: Manejan los valores de entrada del usuario al momento de agregar un nuevo campo al formulario.
  // 3. errors: Contiene un array de mensajes de error generados durante la validación del formulario. Esto permite mostrar feedback al usuario sobre campos inválidos o incompletos.
  // 4. successMessage: Almacena un mensaje de éxito que se muestra después de que el formulario pasa todas las validaciones y los datos son enviados correctamente.

  const [fields, setFields] = useState<DynamicField[]>([]);
  const [fieldType, setFieldType] = useState<string>('text');
  const [fieldLabel, setFieldLabel] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const addField = () => {
    if (!fieldLabel) {
      alert('La etiqueta del campo es obligatoria');
      return;
    }
    setFields([
      ...fields,
      {
        id: Date.now(),
        label: fieldLabel,
        type: fieldType,
        value: fieldType === 'checkbox' ? false : '',
        validation: fieldType === 'number' ? 'min:1' : 'required', 
      },
    ]);
    setFieldLabel('');
    setFieldType('text');
  };

  const handleFieldChange = (id: number, value: string | number | boolean) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const validateFields = (): boolean => {
    const validationErrors: string[] = [];
    fields.forEach((field) => {
      if (field.validation?.includes('required') && !field.value) {
        validationErrors.push(`${field.label} es obligatorio`);
      }
      if (field.type === 'number' && field.validation?.includes('min:1')) {
        if (typeof field.value === 'number' && field.value < 1) {
          validationErrors.push(`${field.label} debe ser mayor a 0`);
        }
      }
    });
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      try {
        await mockApiSubmit(fields);
        setSuccessMessage('¡Datos enviados correctamente!');
        setErrors([]);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  };

  return (
    <div className="dynamic-form-container">
      <h1>Formulario Dinámico</h1>

      <div  className="add-field-section">
        <h2>Agregar Campo</h2>
        <input
          type="text"
          placeholder="Etiqueta del Campo"
          value={fieldLabel}
          onChange={(e) => setFieldLabel(e.target.value)}
        />
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        >
          <option value="text">Texto</option>
          <option value="number">Número</option>
          <option value="date">Fecha</option>
          <option value="checkbox">Checkbox</option>
          <option value="email">Correo Electrónico</option>
        </select>
        <button type="button" onClick={addField}>
          Agregar Campo
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Formulario</h2>
        {fields.map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(field.value)}
                onChange={(e) =>
                  handleFieldChange(field.id, e.target.checked)
                }
              />
            ) : (
              <input
                type={field.type}
                value={
                  field.type === 'number' || field.type === 'date'
                    ? field.value.toString()
                    : field.value
                }
                onChange={(e) =>
                  handleFieldChange(
                    field.id,
                    field.type === 'number'
                      ? parseFloat(e.target.value) || ''
                      : e.target.value
                  )
                }
              />
            )}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>

      {errors.length > 0 && (
        <div className="validation-errors" style={{ color: 'red' }}>
          <h3>Errores de Validación</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default DynamicForm;
