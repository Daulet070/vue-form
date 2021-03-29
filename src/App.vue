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
          <label :class="{ 'error-item': $v.form.date.birthday.$error }">
            <span>Дата рождения<i>*</i></span>
            <input
              type="date"
              name="birthday"
              v-model="form.date.birthday"
              :class="{ 'name-error': $v.form.date.birthday.$error }"
            />
            <div class="error" v-if="!$v.form.date.birthday.required">
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
          <label :class="{ 'error-item': $v.form.date.passportIssue.$error }">
            <span>Дата выдачи<i>*</i></span>
            <input
              id="issueDate"
              name="issueDate"
              type="date"
              v-model="form.date.passportIssue"
              :class="{ 'name-error': $v.form.date.passportIssue.$error }"
            />
            <div class="error" v-if="!$v.form.date.passportIssue.required">
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
        date: {
          birthday: "",
          passportIssue: "",
        },
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
      date: {
        birthday: required,
        passportIssue: required,
        // between: between(20, 30),
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

<style lang="scss">
$ruler: 16px;
$color-red: #ae1100;
$color-bg: #ebecf0;
$color-shadow: #babecc;
$color-white: #fff;

body,
html {
  background-color: $color-bg;
  line-height: 1;
}

a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  box-shadow: none;
  outline: #000 dotted 1px;
  outline-offset: 0.05em;
}

body,
p,
input,
select,
button {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.2px;
  font-size: $ruler;
}

i {
  color: $color-red;
  font-weight: 600;
}

select {
  padding: $ruler;
  box-shadow: inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color-white;
  background-color: $color-bg;
  border: none;
  &[multiple] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
}

#app {
  padding: 15px 0;
}

form {
  padding: $ruler;
  width: 90%;
  margin: 0 auto;
  h1 {
    margin: 0;
    font-size: calc(1vw + 1em);
    text-align: center;
    color: $color-red;
    line-height: 1.6;
  }
  h3 {
    text-align: left;
    color: #000;
    font-size: 1em;
    @media (min-width: 425px) {
      font-size: 1.3em;
    }
  }
  p {
    text-align: center;
  }
}

.form-segments {
  display: flex;
  gap: 15px;
  flex-direction: column;
  padding: $ruler 0;
  @media (min-width: 962px) {
    flex-direction: row;
    padding: $ruler * 2 0;
  }
}

.segment {
  flex: 1 1 auto;
}

button,
input {
  border: 0;
  font-size: $ruler;
  border-radius: 0px;
  padding: $ruler;
  background-color: $color-bg;
  text-shadow: 1px 1px 0 $color-white;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: $ruler * 1.1;
  width: 100%;

  span {
    color: #000;
    margin-bottom: 8px;
  }

  &.checkbox {
    flex-flow: wrap-reverse;
    align-items: center;
    cursor: pointer;

    span {
      margin-bottom: 0px;
    }
  }

  .error {
    display: none;
  }

  &.error-item {
    .error {
      display: block;
      color: $color-red;
      font-size: 13.5px;
    }
  }
}

input {
  box-shadow: inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color-white;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;

  &.name-error {
    border: 1px solid $color-red;
    margin-bottom: 8px;
  }

  &:focus {
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
  }

  &[type="date"] {
    padding: 13.4px;
  }

  &[type="checkbox"] {
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 0px;
    appearance: auto;
    -moz-appearance: auto;
    -webkit-appearance: auto;
    box-shadow: unset;
  }
}

button {
  display: block;
  width: 100%;
  border: 1px solid $color-red;
  color: $color-red;
  box-shadow: -5px -5px 20px $color-white, 5px 5px 20px $color-shadow;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  margin-inline: auto;
  cursor: pointer;

  &:hover {
    box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow;
  }

  &:active {
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
  }

  @media (min-width: 754px) {
    width: 50%;
  }
}
</style>
