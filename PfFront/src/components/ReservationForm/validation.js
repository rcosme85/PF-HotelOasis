export const validate = (inputs) => {
    const errors = {};
  
    if (inputs['first-name'] === "") {
      errors['first-name'] = 'El nombre es obligatorio';
    } else if (inputs['first-name'].length < 3) {
      errors['first-name'] = 'El nombre debe tener al menos 3 caracteres';
    } else if (inputs['first-name'].length > 50) {
      errors['first-name'] = 'El nombre no debe superar los 50 caracteres';
    }
  
    if (inputs['last-name'] === "") {
      errors['last-name'] = 'El apellido es obligatorio';
    } else if (inputs['last-name'].length < 3) {
      errors['last-name'] = 'El apellido debe tener al menos 3 caracteres';
    } else if (inputs['last-name'].length > 50) {
      errors['last-name'] = 'El apellido no debe superar los 50 caracteres';
    }
  
    if (inputs.dni === "") {
      errors.dni = 'El DNI/Pasaporte es obligatorio';
    } else if (inputs.dni.length < 7 || inputs.dni.length > 15) {
      errors.dni = 'El DNI/Pasaporte debe tener entre 7 y 15 caracteres';
    }
  
    if (inputs.telephone === "") {
      errors.telephone = 'El número de teléfono es obligatorio';
    } else if (!/^\d{9,15}$/.test(inputs.telephone)) {
      errors.telephone = 'El número de teléfono no es válido';
    }
  
    if (inputs.email === "") {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(inputs.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (inputs.nacimiento === "") {
        errors.nacimiento = 'La fecha de nacimiento es obligatoria';
      } else {
        const today = new Date();
        const inputDate = new Date(inputs.nacimiento);
        const minAge = 18; // Cambia esto si deseas ajustar la edad mínima
    
        if (
          isNaN(inputDate.getTime()) ||
          inputDate >= today ||
          today.getFullYear() - inputDate.getFullYear() < minAge
        ) {
          errors.nacimiento = 'La fecha de nacimiento no es válida';
        }
      }
  
    // Agrega más validaciones según sea necesario
  
    return errors;
  };