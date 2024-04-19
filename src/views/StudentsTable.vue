<template>
  <div class="card">
    <DataTable v-model:filters="filters" :value="students" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading">
      <template #header>
        <div class="flex justify-content-between">
          <Button label="Crear Estudiante" icon="pi pi-plus" class="p-button-rounded p-button-success" @click="showCreateModal" />
          <InputText v-model="filters['global'].value" placeholder="Search..." class="p-inputtext-sm" />
        </div>
      </template>

      <template #empty> No students found. </template>
      <template #loading> Loading student data. Please wait... </template>
      <Column field="name" header="Nombre" sortable filter></Column>
      <Column field="last_name" header="Apellidos" sortable filter></Column>
      <Column field="email" header="Correo electronico" sortable filter></Column>
      <Column field="current_course" header="Curso actual" sortable filter></Column>
      <Column field="percentage_progress_course" header="Progreso del curso (%)" sortable filter></Column>
      <Column field="status" header="Estus del estudiante" sortable filter>
        <template #body="slotProps">
          {{ slotProps.data.status === 1 ? 'Activo' : 'Inactivo' }}
        </template>
      </Column>
      <Column field="created_at" header="Fecha de creación" sortable filter>
        <template #body="slotProps">
          {{ createdAtTemplate(slotProps.data) }}
        </template>
      </Column>
      <Column header="Actions" style="width:150px">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editStudent(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-wrong p-mr-2" @click="confirmDelete(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>
    <StudentEditModal v-model:visible="editDialogVisible" :student="selectedStudent" @update:visible="editDialogVisible = $event" @studentUpdated="handleStudentUpdated"/>
    <StudentCreateModal v-model:visible="createDialogVisible" @studentCreated="fetchStudents"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import apiService from '@/services/apiService';
import StudentEditModal from '@/components/StudentEditModal.vue';
import StudentCreateModal from '@/components/StudentCreateModal.vue';

// Variables reactivas
const students = ref([]);
const filters = ref({global: {value: null}});
const loading = ref(true);
const editDialogVisible = ref(false);
const selectedStudent = ref(null);
const createDialogVisible = ref(false);

// Ciclos de vida del componente
onMounted(fetchStudents);

// Funciones de utilidad
const createdAtTemplate = (rowData) => {
  return rowData.created_at ? format(new Date(rowData.created_at), 'PPP', {locale: es}) : '';
};

// Acciones del componente
function showCreateModal() {
  createDialogVisible.value = true;
}

function editStudent(student) {
  selectedStudent.value = student;
  editDialogVisible.value = true;
}

async function fetchStudents() {
  loading.value = true;
  try {
    const response = await apiService.getStudents();
    students.value = response.data.students;
  } catch (error) {
    console.error('Failed to fetch students:', error);
  } finally {
    loading.value = false;
  }
}

function confirmDelete(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteStudentProcess(id);
    }
  });
}

function deleteStudentProcess(id) {
  apiService.deleteStudent(id)
      .then(() => {
        fetchStudents();
        Swal.fire('Eliminado!', 'El estudiante ha sido eliminado.', 'success');
      })
      .catch(error => {
        console.error('Ha ocurrido un error eliminando al estudiante:', error);
        Swal.fire('Error!', 'Hubo un problema al eliminar al estudiante.', 'error');
      });
}

// Efectos colaterales o funciones de manejo de eventos
async function handleStudentUpdated() {
  await fetchStudents();
}

</script>

<style scoped>
</style>
