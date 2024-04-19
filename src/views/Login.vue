<template>
  <div id="login" class="login">
    <div class="requirements">
      <h1>Universidad Techemt</h1>
      <p>Sistema administrativo para gestión de estudiantes.</p>
    </div>
    <div class="login-wrapper">
      <div class="login-inner" v-show="loggedIn">
      </div>
      <div class="login-inner" v-show="!loggedIn">
        <header>
          <h2>Bienvenido</h2>
        </header>
        <form @submit="login">
          <input
              type="email"
              placeholder="Correo electronico"
              v-model="user.email"
              required
          />
          <input
              type="password"
              placeholder="Contraseña"
              v-model="user.password"
              required
          />
          <div v-if="errors.length" class="errors">
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </div>
          <button v-if="loading" disabled>Cargando...</button>

          <button v-else>Iniciar sesión &rarr;</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({ email: 'user@example.com', password: "testepassword" });
const loading = ref(false);
const loggedIn = ref(false);
const errors = ref([]);
const attempts = ref(0);

const login = async (e) => {
  e.preventDefault();
  errors.value = [];
  loading.value = true;
  loggedIn.value = false;
  attempts.value++;

  setTimeout(() => {
      attempts.value = 0;
      loggedIn.value = true;
      router.push('/estudiantes');
  }, 1000);
};

</script>


<style scoped lang="scss">
@import "src/assets/login.scss";
</style>
