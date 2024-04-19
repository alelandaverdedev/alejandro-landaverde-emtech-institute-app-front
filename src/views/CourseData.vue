<template>
  <div>
    <Card>
      <template #title>Grafica de cursos</template>
      <template #content>
        <p class="m-0 text-center">
          Este apartado te permite analizar que curso es el que cuenta con más estudiantes inscritos activos.
        </p>
        <div class="card flex justify-content-center">
          <Chart type="doughnut" :data="doughnutChartData" :options="doughnutChartOptions" class="w-full md:w-30rem" />
        </div>
      </template>
    </Card>

    <Card>
      <template #title>Progreso de los estudiantes por curso</template>
      <template #content>
        <p class="m-0 text-center">
          Esta gráfica muestra el número de estudiantes y el progreso promedio por curso.
        </p>
        <div class="card">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import Card from 'primevue/card';
import apiService from '@/services/apiService';

const doughnutChartData = ref(null);
const doughnutChartOptions = ref(null);
const barChartData = ref(null);
const barChartOptions = ref(null);

onMounted(async () => {
  try {
    const response = await apiService.getStudentsCoursesProgress();
    doughnutChartData.value = formatDoughnutChartData(response.data);
    doughnutChartOptions.value = setDoughnutChartOptions();
    barChartData.value = formatBarChartData(response.data);
    barChartOptions.value = setBarChartOptions();
  } catch (error) {
    console.error('Error fetching the student courses data:', error);
  }
});

function formatDoughnutChartData(courses) {
  const documentStyle = getComputedStyle(document.documentElement);
  const colors = [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500')];
  const hoverColors = [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')];

  return {
    labels: courses.map(course => course.current_course),
    datasets: [
      {
        data: courses.map(course => course.student_count),
        backgroundColor: colors.slice(0, courses.length),
        hoverBackgroundColor: hoverColors.slice(0, courses.length)
      }
    ]
  };
}

function setDoughnutChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    cutout: '60%'
  };
}

function formatBarChartData(data) {
  const studentCounts = data.map(course => course.student_count);
  const averageProgresses = data.map(course => parseFloat(course.average_progress));

  return {
    labels: data.map(course => course.current_course),
    datasets: [
      {
        label: 'Cantidad de estudiantes',
        data: studentCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      },
      {
        label: 'Progreso promedio por materia y estudiantes',
        data: averageProgresses,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgb(255, 206, 86)',
        borderWidth: 1
      }
    ]
  };
}

function setBarChartOptions() {
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--surface-d');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor
        }
      }
    }
  };
}
</script>

<style>
</style>
