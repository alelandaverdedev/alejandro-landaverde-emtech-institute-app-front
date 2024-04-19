<template>
  <Dialog v-model:visible="dialogVisible" header="Crear Estudiante" :modal="true" :closable="false" :style="{ width: '50vw' }">
    <div class="p-fluid">
      <div class="p-field">
        <label for="studentName">Nombre</label>
        <InputText id="studentName" v-model="newStudent.name" @input="validateField('name')" required />
        <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
      </div>
      <div class="p-field">
        <label for="studentLastName">Apellido</label>
        <InputText id="studentLastName" v-model="newStudent.last_name" @input="validateField('last_name')" required />
        <small v-if="errors.last_name" class="p-error">{{ errors.last_name }}</small>
      </div>
      <div class="p-field">
        <label for="studentEmail">Email</label>
        <InputText id="studentEmail" type="email" v-model="newStudent.email" @input="validateField('email')" required />
        <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
      </div>
      <div class="p-field">
        <label for="studentCourse">Curso Actual</label>
        <InputText id="studentCourse" v-model="newStudent.current_course" @input="validateField('current_course')" required />
        <small v-if="errors.current_course" class="p-error">{{ errors.current_course }}</small>
      </div>
      <div class="p-field">
        <label for="studentProgress">Progreso (%)</label>
        <InputText id="studentProgress" v-model.number="newStudent.percentage_progress_course" @input="validateField('percentage_progress_course')" required />
        <small v-if="errors.percentage_progress_course" class="p-error">{{ errors.percentage_progress_course }}</small>
      </div>
      <div class="p-field">
        <label for="studentStatus">Estado</label>
        <Dropdown id="studentStatus" v-model="newStudent.status" :options="statuses" optionLabel="name" optionValue="code" placeholder="Selecciona" @change="validateField('status')" required />
        <small v-if="errors.status" class="p-error">{{ errors.status }}</small>
      </div>
    </div>
    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Crear Estudiante" icon="pi pi-check" @click="submitForm" :disabled="hasErrors" class="p-button-text" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import apiService from '@/services/apiService';
import Swal from 'sweetalert2';
import { validateStudentField } from '@/utils/validationsStudent';

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:visible', 'studentCreated']);

const newStudent = ref({
  name: '',
  last_name: '',
  email: '',
  current_course: '',
  percentage_progress_course: '',
  status: null
});

const statuses = [
  { name: 'Activo', code: 1 },
  { name: 'Inactivo', code: 0 }
];

const dialogVisible = ref(false);

const errors = ref({
  name: null,
  last_name: null,
  email: null,
  current_course: null,
  percentage_progress_course: null,
  status: null
});
const hasErrors = computed(() => {
  return Object.values(errors.value).some(error => error);
});

const closeModal = () => {
  dialogVisible.value = false;
  emit('update:visible', false);
};

const submitForm = () => {
  if (hasErrors.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Validación fallida',
      text: 'Por favor, corrija los errores antes de enviar.',
    });
    return;
  }

  apiService.createStudent(newStudent.value)
      .then(response => {
        closeModal();
        emit('studentCreated');
        Swal.fire({
          icon: 'success',
          title: 'Estudiante creado',
          text: response.data.message,
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear',
          text: error.message,
        });
      });
};
function validateField(fieldName) {
  const value = newStudent.value[fieldName];
  errors.value[fieldName] = validateStudentField(fieldName, value);
}
</script>

<style>
</style>
