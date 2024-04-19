export const studentValidations = {
    name: { regex: /^[A-Za-z\s]{0,100}$/, message: 'El nombre solo puede contener texto y espacios, máximo 100 caracteres.' },
    last_name: { regex: /^[A-Za-z\s]{0,100}$/, message: 'El apellido solo puede contener texto y espacios, máximo 100 caracteres.' },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,50}$/, message: 'Debe ser un correo electrónico válido, máximo 50 caracteres.' },
    current_course: { regex: /^[A-Za-z0-9\s]{0,50}$/, message: 'El curso solo puede contener texto, espacios y números, máximo 50 caracteres.' },
    percentage_progress_course: { regex: /^(100|[1-9]?[0-9])$/, message: 'El progreso debe ser un número entero de hasta dos cifras.' },
    status: { message: 'El estado es requerido.' }
};

export function validateStudentField(fieldName, value) {
    const validation = studentValidations[fieldName];
    let error = null;

    if (validation.required && !value) {
        error = 'Este campo es requerido.';
    } else if (validation.regex && !validation.regex.test(value)) {
        error = validation.message;
    }

    return error;
}
