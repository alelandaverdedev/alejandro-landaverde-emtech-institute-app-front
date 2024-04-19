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

// Color palette for charts
const colorPalette = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

// Function to generate colors from the palette
function generateColors(count) {
  return colorPalette.slice(0, count);
}

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
  const backgroundColors = generateColors(courses.length);
  const hoverBackgroundColors = backgroundColors.map(color => `${color}99`);

  return {
    labels: courses.map(course => course.current_course),
    datasets: [
      {
        data: courses.map(course => course.student_count),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors
      }
    ]
  };
}

function setDoughnutChartOptions() {
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

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
  const colors = generateColors(data.length * 2); // Generate colors for both datasets
  const studentCounts = data.map(course => course.student_count);
  const averageProgresses = data.map(course => parseFloat(course.average_progress));

  return {
    labels: data.map(course => course.current_course),
    datasets: [
      {
        label: 'Cantidad de estudiantes',
        data: studentCounts,
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length),
        borderWidth: 1
      },
      {
        label: 'Progreso promedio',
        data: averageProgresses,
        backgroundColor: colors.slice(data.length, data.length * 2),
        borderColor: colors.slice(data.length, data.length * 2),
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
