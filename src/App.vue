<template>
  <div id="app">
    <form @submit.prevent="checkForm">
      <h1>Заполните форму</h1>
      <p><i>*</i> - Поле обязательное для заполнения.</p>
      <div class="form-segments">
        <div class="segment">
          <h3>Ваши данные:</h3>
          <label :class="{ 'error-item': $v.form.lastName.$error }">
            <span>Фамилия<i>*</i></span>
            <input
              type="text"
              name="lastName"
              v-model.trim="form.lastName"
              :class="{ 'name-error': $v.form.lastName.$error }"
            />
            <div class="error" v-if="!$v.form.lastName.required">
              Поле, обязательное для заполнения
            </div>
            <div class="error" v-if="!$v.form.lastName.minLength">
              Должно быть больше двух символов
            </div>
          </label>
          <label :class="{ 'error-item': $v.form.firstName.$error }">
            <span>Имя<i>*</i></span>
            <input
              type="text"
              name="firstName"
              v-model.trim="form.firstName"
              :class="{ 'name-error': $v.form.firstName.$error }"
            />
            <div class="error" v-if="!$v.form.firstName.required">
              Поле, обязательное для заполнения
            </div>
            <div class="error" v-if="!$v.form.firstName.minLength">
              Должно быть больше двух символов
            </div>
          </label>
          <label>
            <span>Отчество</span>
            <input
              type="text"
              name="middleName"
              v-model.trim="form.middleName"
            />
            <div class="error" v-if="!$v.form.middleName.minLength">
              Должно быть больше двух символов
            </div>
          </label>
          <label :class="{ 'error-item': $v.form.birthdayDate.$error }">
            <span>Дата рождения<i>*</i></span>
            <input
              type="date"
              name="birthday"
              v-model="form.birthdayDate"
              :class="{ 'name-error': $v.form.birthdayDate.$error }"
            />
            <div class="error" v-if="!$v.form.birthdayDate.required">
              Поле, обязательное для заполнения
            </div>
          </label>
          <label :class="{ 'error-item': $v.form.telephone.$error }">
            <span>Номер телефона<i>*</i></span>
            <input
              type="text"
              name="telephone"
              v-model="form.telephone"
              :class="{ 'name-error': $v.form.telephone.$error }"
            />
            <div class="error" v-if="!$v.form.telephone.required">
              Поле, обязательное для заполнения
            </div>
          </label>
          <label class="client-gender">
            <span>Пол</span>
            <select name="gender" id="gender" v-model="form.gender">
              <option
                v-for="(gender, index) in genders"
                :value="gender.value"
                :key="index"
              >
                {{ gender.label }}
              </option>
            </select>
          </label>
          <label class="client-group">
            <span>Группа клиентов<i>*</i></span>
            <select
              name="clientType"
              id="clientType"
              v-model="form.selectedClientsTypes"
              multiple
            >
              <option
                v-for="(clientType, index) in clientsType"
                :value="clientType.value"
                :key="index"
              >
                {{ clientType.label }}
              </option>
            </select>
          </label>
          <label class="checkbox">
            <input type="checkbox" v-model="form.agreeWithSentSMS" />
            <span>Не отправлять СМС</span>
          </label>
        </div>
        <div class="segment">
          <h3>Адрес:</h3>
          <label>
            <span>Индекс</span>
            <input type="text" name="postcode" />
          </label>
          <label>
            <span>Страна</span>
            <input type="text" name="country" />
          </label>
          <label>
            <span>Область</span>
            <input type="text" name="region" />
          </label>
          <label :class="{ 'error-item': $v.form.city.$error }">
            <span>Город<i>*</i></span>
            <input
              type="text"
              name="city"
              v-model="form.city"
              :class="{ 'name-error': $v.form.city.$error }"
            />
            <div class="error" v-if="!$v.form.city.required">
              Поле, обязательное для заполнения
            </div>
          </label>
          <label>
            <span>Улица</span>
            <input type="text" name="street" />
          </label>
          <label>
            <span>Дом</span>
            <input type="text" name="home" />
          </label>
        </div>
        <div class="segment">
          <h3>Паспорт:</h3>
          <label>
            <span>Тип документа<i>*</i></span>
            <select
              id="documents"
              name="documents"
              v-model="form.selectedDocumentsType"
            >
              <option
                v-for="(document, index) in documents"
                :value="document.value"
                :key="index"
              >
                {{ document.label }}
              </option>
            </select>
          </label>
          <label>
            <span>Серия</span>
            <input type="text" name="passportSeries" />
          </label>
          <label>
            <span>Номер</span>
            <input type="text" name="passportNumber" />
          </label>
          <label>
            <span>Кем выдан</span>
            <input type="text" name="passportSeries" />
          </label>
          <label :class="{ 'error-item': $v.form.passportIssueDate.$error }">
            <span>Дата выдачи<i>*</i></span>
            <input
              id="issueDate"
              name="issueDate"
              type="date"
              v-model="form.passportIssueDate"
              :class="{ 'name-error': $v.form.passportIssueDate.$error }"
            />
            <div class="error" v-if="!$v.form.passportIssueDate.required">
              Поле, обязательное для заполнения
            </div>
          </label>
        </div>
      </div>
      <button class="red" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        middleName: "",
        birthdayDate: "",
        telephone: "",
        gender: "Male",
        selectedClientsTypes: ["VIP"],
        agreeWithSentSMS: false,
        postalCode: "",
        country: "",
        region: "",
        city: "",
        street: "",
        home: "",
        selectedDocumentsType: "passport",
        passportSeries: "",
        passportNumber: "",
        passportIssueDate: "",
      },
      genders: [
        {
          label: "Мужской",
          value: "Male",
        },
        {
          label: "Женский",
          value: "Female",
        },
      ],
      documents: [
        {
          label: "Паспорт",
          value: "passport",
        },
        {
          label: "Свидетельство о рождении",
          value: "birth-certificate",
        },
        {
          label: "Вод. удостоверение",
          value: "driving-licence",
        },
      ],
      clientsType: [
        {
          label: "VIP",
          value: "VIP",
        },
        {
          label: "Проблемные",
          value: "Problematic",
        },
        {
          label: "ОМС",
          value: "OMS",
        },
      ],
    };
  },
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      middleName: {
        minLength: minLength(3),
      },
      birthdayDate: {
        required,
      },
      passportIssueDate: {
        required,
      },
      telephone: {
        required,
        minLength: minLength(11),
        // between: between(20, 30),
      },
      city: {
        required,
      },
    },
  },
  methods: {
    checkForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        console.log("Упешная валидаия");
      }
    },
  },
};
</script>
