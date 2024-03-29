/* eslint-disable no-param-reassign */
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

const NESSESARY_FIELD_CAPTION = 'Обязательное поле';
const WRONG_PHONE_CAPTION = 'Неверный номер';
const WRONG_EMAIL_CAPTION = 'Неверный email';

export default (form: HTMLFormElement) => {
  const nameErrorLabelEl = form.querySelector('#name-error') as HTMLDivElement | null;
  const phoneErrorLabelEl = form.querySelector('#phone-error') as HTMLDivElement;
  const emailErrorLabelEl = form.querySelector('#email-error') as HTMLDivElement;
  const cityErrorLabelEl = form.querySelector('#city-error') as HTMLDivElement | null;
  const nameInputEl = form.querySelector('[data-type="name"]') as HTMLInputElement | null;
  const phoneInputEl = form.querySelector('[data-type="phone"]') as HTMLInputElement;
  const emailInputEl = form.querySelector('[data-type="email"]') as HTMLInputElement;
  const cityInputEl = form.querySelector('[data-type="city"]') as HTMLInputElement | null;

  let isOk = true;

  nameErrorLabelEl?.classList.add('invisible');
  phoneErrorLabelEl.classList.add('invisible');
  emailErrorLabelEl.classList.add('invisible');
  cityErrorLabelEl?.classList.add('invisible');

  if (nameInputEl && nameErrorLabelEl && nameInputEl.value === '') {
    nameInputEl.classList.add('input-error');
    nameErrorLabelEl.classList.remove('invisible');
    nameErrorLabelEl.textContent = NESSESARY_FIELD_CAPTION;
    isOk = false;
  }
  if (phoneInputEl.value === '') {
    phoneInputEl.classList.add('input-error');
    phoneErrorLabelEl.classList.remove('invisible');
    phoneErrorLabelEl.textContent = NESSESARY_FIELD_CAPTION;
    isOk = false;
  }
  if (emailInputEl.value === '') {
    emailInputEl.classList.add('input-error');
    emailErrorLabelEl.classList.remove('invisible');
    emailErrorLabelEl.textContent = NESSESARY_FIELD_CAPTION;
    isOk = false;
  }
  if (cityInputEl && cityErrorLabelEl && cityInputEl.value === '') {
    cityInputEl.classList.add('input-error');
    cityErrorLabelEl.classList.remove('invisible');
    cityErrorLabelEl.textContent = NESSESARY_FIELD_CAPTION;
    isOk = false;
  }

  if (
    phoneInputEl.value !== ''
    && !isMobilePhone(`${phoneInputEl.value.replace(/\(|\)|-|_/g, '')}`)
  ) {
    phoneInputEl.classList.add('input-error');
    phoneErrorLabelEl.textContent = WRONG_PHONE_CAPTION;
    phoneErrorLabelEl.classList.remove('invisible');
    isOk = false;
  }

  if (emailInputEl.value !== '' && !isEmail(emailInputEl.value)) {
    emailInputEl.classList.add('input-error');
    emailErrorLabelEl.textContent = WRONG_EMAIL_CAPTION;
    emailErrorLabelEl.classList.remove('invisible');
    isOk = false;
  }

  if (isOk) {
    form.action = 'sendMail.php';
    form.method = 'POST';
    nameErrorLabelEl?.classList.add('invisible');
    phoneErrorLabelEl.classList.add('invisible');
    emailErrorLabelEl.classList.add('invisible');
    cityErrorLabelEl?.classList.add('invisible');
    if (nameInputEl) {
      localStorage.setItem('userName', nameInputEl.value);
    } else {
      localStorage.setItem('userName', '');
    }

    return true;
  }
  return false;
};
