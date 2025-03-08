<template>
  <div class="address-form-page">
    <div class="container">
      <h1>ثبت آدرس</h1>
      <p class="subtitle">لطفا مشخصات و آدرس خود را وارد کنید</p>

      <div v-if="!showMap" class="form-container">
        <form @submit.prevent="validateForm">
          <div class="form-row">
            <FormInput
              id="firstName"
              label="نام"
              v-model="formData.first_name"
              :error="errors.first_name"
              placeholder="مثال: محمد رضا"
              required
            />

            <FormInput
              id="lastName"
              label="نام خانوادگی"
              v-model="formData.last_name"
              :error="errors.last_name"
              placeholder="مثال: رضایی"
              required
            />

            <FormInput
              id="mobile"
              label="تلفن همراه"
              v-model="formData.coordinate_mobile"
              :error="errors.coordinate_mobile"
              placeholder="مثال: 09123456789"
              required
            />
          </div>

          <div class="form-row">
            <FormInput
              id="phone"
              label="تلفن ثابت (اختیاری)"
              v-model="formData.coordinate_phone_number"
              :error="errors.coordinate_phone_number"
              placeholder="مثال: 02123456789"
            />
            <FormTextarea
              id="address"
              label="آدرس"
              v-model="formData.address"
              :error="errors.address"
              placeholder="مثال: تهران، خیابان ولیعصر، پلاک 123"
              required
            />
          </div>

          <div class="form-row">
            <RadioGroup
              label="جنسیت"
              v-model="formData.gender"
              :error="errors.gender"
              :options="genderOptions"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block">ثبت و ادامه</button>
        </form>
      </div>

      <div v-else class="map-container">
        <h3>لطفا موقعیت خود را روی نقشه مشخص کنید</h3>
        <div class="google-map" ref="mapContainer">
          <div class="map-placeholder" ref="mapPlaceholder">
            <p>لطفا روی نقشه کلیک کنید تا موقعیت خود را مشخص کنید.</p>
          </div>
        </div>
        <div class="map-actions">
          <button @click="showMap = false" class="btn btn-secondary">بازگشت</button>
          <button @click="submitAddress" class="btn btn-primary">ثبت آدرس</button>
        </div>
      </div>
    </div>

    <!-- Alert Messages -->
    <div v-if="alertMessage.show" :class="['alert', `alert-${alertMessage.type}`]">
      {{ alertMessage.text }}
    </div>

    <div v-if="showToast" class="toast-message">
      موقعیت انتخاب شد
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,  watch } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '@/components/form/FormInput.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import RadioGroup from '@/components/form/RadioGroup.vue';

const router = useRouter();

interface FormData {
  first_name: string;
  last_name: string;
  coordinate_mobile: string;
  coordinate_phone_number: string;
  address: string;
  region: number;
  gender: string;
  lat: number;
  lng: number;
}

interface AlertMessage {
  show: boolean;
  text: string;
  type: 'success' | 'error';
}

const API_BASE_URL = 'https://stage.achareh.ir/api';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
};

const showMap = ref(false);
const mapContainer = ref<HTMLDivElement | null>(null);
const mapPlaceholder = ref<HTMLDivElement | null>(null);
const showToast = ref(false);

const formData = reactive<FormData>({
  first_name: '',
  last_name: '',
  coordinate_mobile: '',
  coordinate_phone_number: '',
  address: '',
  region: 1,
  gender: '',
  lat: 0,
  lng: 0
});

const errors = reactive<Record<string, string>>({});
const alertMessage = reactive<AlertMessage>({
  show: false,
  text: '',
  type: 'success'
});

const genderOptions = [
  { value: 'male', label: 'آقا' },
  { value: 'female', label: 'خانم' }
];

const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key]);
  let isValid = true;

  if (!formData.first_name || formData.first_name.length < 3) {
    errors.first_name = 'نام باید حداقل 3 کاراکتر باشد';
    isValid = false;
  }

  if (!formData.last_name || formData.last_name.length < 3) {
    errors.last_name = 'نام خانوادگی باید حداقل 3 کاراکتر باشد';
    isValid = false;
  }

  if (!formData.coordinate_mobile || !/^09\d{9}$/.test(formData.coordinate_mobile)) {
    errors.coordinate_mobile = 'شماره موبایل باید 11 رقم و با 09 شروع شود';
    isValid = false;
  }

  if (formData.coordinate_phone_number && !/^\d{11}$/.test(formData.coordinate_phone_number)) {
    errors.coordinate_phone_number = 'شماره تلفن ثابت باید 11 رقم باشد';
    isValid = false;
  }

  if (!formData.address || formData.address.length < 10) {
    errors.address = 'آدرس باید حداقل 10 کاراکتر باشد';
    isValid = false;
  }

  if (!formData.gender) {
    errors.gender = 'لطفا جنسیت را انتخاب کنید';
    isValid = false;
  }

  if (isValid) {
    showMap.value = true;
  }
};

const showMarker = (x: number, y: number, lat: number, lng: number) => {
  if (!mapContainer.value) return;

  // Clear existing markers
  const existingMarkers = mapContainer.value.querySelectorAll('.map-marker, .coord-info');
  existingMarkers.forEach(marker => marker.remove());

  // Add new marker
  const marker = document.createElement('div');
  marker.className = 'map-marker';
  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;
  mapContainer.value.appendChild(marker);

  // Show coordinates
  const coordInfo = document.createElement('div');
  coordInfo.className = 'coord-info';
  coordInfo.textContent = `موقعیت انتخاب شده: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  mapContainer.value.appendChild(coordInfo);

  // Show toast
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};

const handleMapClick = (event: MouseEvent) => {
  if (!mapPlaceholder.value) return;

  const rect = mapPlaceholder.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Generate random coordinates for Tehran area
  const lat = 35.7 + Math.random() * 0.1;
  const lng = 51.3 + Math.random() * 0.1;

  formData.lat = lat;
  formData.lng = lng;
  showMarker(x, y, lat, lng);
};

const showAlert = (text: string, type: 'success' | 'error') => {
  alertMessage.show = true;
  alertMessage.text = text;
  alertMessage.type = type;

  setTimeout(() => {
    alertMessage.show = false;
  }, 3000);
};

const submitAddress = async () => {
  try {
    if (formData.lat === 0 || formData.lng === 0) {
      showAlert('لطفا موقعیت خود را روی نقشه مشخص کنید', 'error');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/karfarmas/address`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.json();
    showAlert('آدرس با موفقیت ثبت شد', 'success');

    setTimeout(() => {
      router.push('/addresses');
    }, 2000);
  } catch (error: any) {
    console.error('Error submitting address:', error);
    showAlert('خطا در ثبت آدرس: ' + (error.message || 'خطای سرور'), 'error');
  }
};

// Setup map click handler when map is shown
watch(showMap, (newVal) => {
  if (newVal) {
    // Add small delay to ensure DOM is updated
    setTimeout(() => {
      if (mapPlaceholder.value) {
        mapPlaceholder.value.addEventListener('click', handleMapClick);
      }
    }, 100);
  }
});
</script>

<style lang="scss" scoped>
@use "sass:color";

.address-form-page {
  padding: 20px 0;
  width: 100%;

  h1 {
    text-align: center;
    margin-bottom: 10px;
    color: #333;
  }

  .subtitle {
    text-align: center;
    margin-bottom: 20px;
    color: var(--text-light);
  }

  .form-container, .map-container {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .form-container {
    form {
      .form-row {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
        flex-wrap: wrap;

        > * {
          flex: 1 1 calc(33.333% - 14px);

          &.full-width {
            flex: 1 1 100%;
            min-width: 100%;
          }
        }
      }
    }
  }

  .google-map {
    height: 400px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 20px 0;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;

    .map-placeholder {
      cursor: pointer; // Add cursor pointer to indicate clickable area
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      padding: 20px;
      background-color: #f8f8f8;
    }

    .map-marker {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #e74c3c;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }

    .coord-info {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(255, 255, 255, 0.8);
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .map-container h3 {
    margin-bottom: 20px;
    text-align: center;
  }

  .map-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    gap: 15px;

    button {
      flex: 1;
    }
  }

  .alert {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    z-index: 100;

    &.alert-success {
      background-color: #2ecc71;
      color: white;
    }

    &.alert-error {
      background-color: #e74c3c;
      color: white;
    }
  }

  .toast-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 1000;
    animation: fadeInOut 2s ease;
  }
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;

  &:hover {
    background-color: color.adjust(#95a5a6, $lightness: -10%);
  }
}

@media (min-width: 768px) {
  .form-container, .map-container {
    padding: 30px;
  }

  .alert {
    width: 400px;
    left: auto;
    right: 20px;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .address-form-page {
    .form-container {
      form {
        .form-row {
          flex-direction: column;
          gap: 0;

          .form-group {
            width: 100%;
            min-width: 100%;
          }
        }
      }
    }
  }
}
</style>
