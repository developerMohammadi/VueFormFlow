<script setup lang="ts">

</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-logo">
          <router-link to="/">
            <img src="@/assets/logo.webp" alt="آچاره" class="logo" />
          </router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/" class="navbar-link" exact>
            <span class="link-text">ثبت آدرس</span>
          </router-link>
          <router-link to="/addresses" class="navbar-link">
            <span class="link-text">آدرس‌های من</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>



<style lang="scss" scoped>
@use "sass:color";

.navbar {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &-logo {
    .logo {
      height: 40px;
      width: auto;
    }
  }

  &-menu {
    display: flex;
    gap: 20px;
  }

  &-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: var(--primary-color);
    }

    &.router-link-active {
      color: var(--primary-color);

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: var(--primary-color);
        border-radius: 2px;
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    &-content {
      flex-direction: column;
      gap: 15px;
    }

    &-menu {
      width: 100%;
      justify-content: center;
    }
  }
}

@media (min-width: 1024px) {
  .navbar {
    padding: 15px 0;

    &-content {
      flex-direction: row;
    }

    &-logo {
      .logo {
        height: 50px;
      }
    }

    &-menu {
      gap: 30px;

      .navbar-link {
        font-size: 1.1rem;
      }
    }
  }
}
</style>
