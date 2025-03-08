<template>
  <div class="address-list-page">
    <div class="container">
      <div class="header">
        <h1>آدرس‌های من</h1>
      </div>

      <div class="address-list-container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>در حال بارگیری آدرس‌ها...</p>
        </div>

        <div v-else-if="error" class="error-message">
          <p>{{ error }}</p>
          <button @click="fetchAddresses" class="btn btn-primary">تلاش مجدد</button>
        </div>

        <div v-else-if="addresses.length === 0" class="no-addresses">
          <p>هیچ آدرسی ثبت نشده است</p>
          <router-link to="/" class="btn btn-primary">ثبت آدرس جدید</router-link>
        </div>

        <div v-else class="address-list">
          <div v-for="address in addresses" :key="address.id" class="address-card">
            <div class="address-info">
              <div class="address-header">
                <h3>{{ address.first_name }} {{ address.last_name }}</h3>
                <span :class="['gender-tag', {'male': address.gender === 'male', 'female': address.gender === 'female'}]">
                  {{ address.gender === 'male' ? 'آقا' : address.gender === 'female' ? 'خانم' : '' }}
                </span>
              </div>

              <div class="address-contact">
                <div class="contact-item">
                  <span class="label">موبایل:</span>
                  <span>{{ address.coordinate_mobile || '---' }}</span>
                </div>
                <div class="contact-item">
                  <span class="label">تلفن ثابت:</span>
                  <span>{{ address.coordinate_phone_number || '---' }}</span>
                </div>
              </div>

              <div class="address-text">
                <span class="label">آدرس:</span>
                <p>{{ address.address }}</p>
              </div>

              <div class="address-region">
                <span class="label">منطقه:</span>
                <span>{{ address.region?.name || '---' }}</span>
                <span class="city">{{ address.region?.city_object?.city_name || '---' }} - {{ address.region?.state_object?.state_name || '---' }}</span>
              </div>
            </div>

            <div class="address-coordinates">
              <div class="coordinate">
                <span class="label">عرض جغرافیایی:</span>
                <span>{{ address.lat }}</span>
              </div>
              <div class="coordinate">
                <span class="label">طول جغرافیایی:</span>
                <span>{{ address.lng }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE_URL = 'https://stage.achareh.ir/api';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
};

export default {
  name: 'AddressList',
  data() {
    return {
      addresses: [],
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchAddresses()
  },
  methods: {
    async fetchAddresses() {
      this.loading = true;
      this.error = null;

      try {
        // Direct fetch usage without plugin
        const response = await fetch(`${API_BASE_URL}/karfarmas/address`, {
          method: 'GET',
          headers: API_HEADERS
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.addresses = data;
      } catch (error) {
        console.error('Error fetching addresses:', error);
        this.error = 'خطا در بارگیری آدرس‌ها: ' + (error.message || 'خطای سرور');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:color";

.address-list-page {
  padding: 20px 0;
  width: 100%;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
    width: 100%;

    h1 {
      color: #333;
      margin: 0;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .address-list-container {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  .loading, .error-message, .no-addresses {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    text-align: center;

    p {
      margin-bottom: 20px;
    }
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 15px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .address-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .address-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;

    .address-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }

      .gender-tag {
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.8rem;

        &.male {
          background-color: #3498db;
          color: white;
        }

        &.female {
          background-color: #e84393;
          color: white;
        }
      }
    }

    .address-contact {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        gap: 20px;
      }
    }

    .address-text, .address-region, .address-coordinates, .coordinate {
      margin-bottom: 10px;
    }

    .label {
      font-weight: 500;
      margin-left: 5px;
    }

    .address-coordinates {
      display: flex;
      flex-direction: column;
      gap: 5px;
      border-top: 1px solid #eee;
      padding-top: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        gap: 20px;
      }
    }

    .city {
      margin-right: 10px;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

@media (min-width: 768px) {
  .address-list-page {
    .address-list {
      .address-card {
        padding: 20px;
      }
    }
  }
}

@media (min-width: 1024px) {
  .address-list-page {
    /* Adjust styles for larger screens if needed */
  }
}
</style>
