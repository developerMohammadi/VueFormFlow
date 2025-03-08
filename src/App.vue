<script setup lang="ts">
import {  RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>

  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

main {
  flex: 1;
  padding: 30px 0;
  width: 100%;
}

.footer {
  padding: 20px 0;
  background-color: white;
  border-top: 1px solid #eaeaea;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  width: 100%;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<style lang="scss">
@use "sass:color";

:root {
  --primary-color: #2ecc71;
  --primary-dark: #27ae60;
  --primary-light: #a9dfbf;
  --accent-color: #16a085;
  --text-color: #333;
  --text-light: #666;
  --background-color: #f5f5f5;
  --border-color: #e0e0e0;
  --error-color: #e74c3c;
  --success-color: #2ecc71;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: 'Vazirmatn', Arial, sans-serif;
  direction: rtl;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: color 0.3s;

  &:hover {
    color: var(--primary-dark);
  }
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 1rem;

  &-primary {
    background-color: var(--primary-color);
    color: white;

    &:hover {
      background-color: var(--primary-dark);
    }

    &:active {
      background-color: color.adjust(#2ecc71, $lightness: -20%);
    }

    &:disabled {
      background-color: var(--primary-light);
      cursor: not-allowed;
    }
  }

  &-secondary {
    background-color: #95a5a6;
    color: white;

    &:hover {
      background-color: color.adjust(#95a5a6, $lightness: -10%);
    }

    &:active {
      background-color: color.adjust(#95a5a6, $lightness: -20%);
    }
  }

  &-block {
    display: block;
    width: 100%;
  }
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: var(--text-color);
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
}

.form-control {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: var(--primary-light);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(46, 204, 113, 0.25);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }

  h1 {
    font-size: 1.6rem;
  }

  .page-title {
    font-size: 1.5rem;
  }
}
</style>


