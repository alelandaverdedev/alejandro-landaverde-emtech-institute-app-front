<template>
  <div class="card">
    <TabMenu :model="items" :activeIndex="activeIndex" @tab-change="onTabChange" />
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import TabMenu from 'primevue/tabmenu';

const router = useRouter();
const route = useRoute();

const items = ref([]);

const activeIndex = computed(() => {
  return items.value.findIndex(item => router.currentRoute.value.path === item.to);
});

const onTabChange = (event) => {
  if (event.value && 'to' in event.value) {
    router.push(event.value.to);
  }
};

watch(route, () => {
}, {immediate: true});

items.value.push({
  label: 'Cerrar sesión',
  icon: 'pi pi-sign-out',
  command: () => {
    router.push('/inicio');
  }
});
items.value.push({
  label: 'Metricas de cursos',
  icon: 'pi pi-book',
  command: () => {
    router.push('/informacion/cursos');
  }
});
items.value.push({
  label: 'Estudiantes',
  icon: 'pi pi-users',
  command: () => {
    router.push('/estudiantes');
  }
});
</script>
