<template>
  <Dialog v-model:visible="dialogVisible" header="Editar Estudiante" :modal="true" :closable="false" :style="{ width: '50vw' }">
    <div class="p-fluid">
      <div class="p-field">
        <label for="studentName">Nombre</label>
        <InputText id="studentName" v-model="localStudent.name" @input="validateField('name')" required />
        <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
      </div>
      <div class="p-field">
        <label for="studentLastName">Apellido</label>
        <InputText id="studentLastName" v-model="localStudent.last_name" @input="validateField('last_name')" required />
        <small v-if="errors.last_name" class="p-error">{{ errors.last_name }}</small>
      </div>
      <div class="p-field">
        <label for="studentEmail">Email</label>
        <InputText id="studentEmail" v-model="localStudent.email" @input="validateField('email')" required />
        <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
      </div>
      <div class="p-field">
        <label for="studentCourse">Curso Actual</label>
        <InputText id="studentCourse" v-model="localStudent.current_course" @input="validateField('current_course')" required />
        <small v-if="errors.current_course" class="p-error">{{ errors.current_course }}</small>
      </div>
      <div class="p-field">
        <label for="studentProgress">Progreso (%)</label>
        <InputText id="studentProgress" v-model="localStudent.percentage_progress_course" @input="validateField('percentage_progress_course')" required />
        <small v-if="errors.percentage_progress_course" class="p-error">{{ errors.percentage_progress_course }}</small>
      </div>
      <div class="p-field">
        <label for="studentStatus">Estado</label>
        <Dropdown id="studentStatus" v-model="localStudent.status" :options="statuses" optionLabel="name" optionValue="code" placeholder="Selecciona"/>
        <small v-if="errors.status" class="p-error">{{ errors.status }}</small>
      </div>
    </div>
    <template #footer>
      <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Guardar cambios" icon="pi pi-check" @click="submitForm" :disabled="hasErrors" class="p-button-text" />
    </template>
  </Dialog>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Swal from 'sweetalert2';
import apiService from '@/services/apiService'; // Asegúrate de que la ruta es correcta
import { validateStudentField } from '@/utils/validationsStudent';

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:visible', 'studentUpdated']);
// eslint-disable-next-line no-undef
const props = defineProps({
  student: {
    type: Object,
    default: () => ({})
  }
});

const localStudent = ref({...props.student});

const statuses = [
  {name: 'Activo', code: 1},
  {name: 'Inactivo', code: 0}
];

watch(() => props.student, (newValue) => {
  localStudent.value = {...newValue};
}, {deep: true});

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

  apiService.updateStudent(localStudent.value.id, localStudent.value)
      .then(response => {
        closeModal();
        emit('studentUpdated');
        Swal.fire({
          icon: 'success',
          title: 'Estudiante actualizado',
          text: response.data.message,
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: error.message,
        });
      });
};

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

function validateField(fieldName) {
  const value = localStudent.value[fieldName];
  errors.value[fieldName] = validateStudentField(fieldName, value);
}
</script>

<style>
</style>
