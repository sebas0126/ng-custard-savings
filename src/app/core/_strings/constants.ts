export enum Routes {
  login = '/login',
  signup = '/signup',
  home = '/content/home',
  join = '/content/join',
  dashboard = '/content/dashboard'
}

export enum Collections {
  users = 'users',
  saving = 'saving',
  savingData = 'savingData',
  joinRequest = 'joinRequest',
  monthlySavings = 'monthlySavings',
  userMessage = 'userMessage',
  generalMessage = 'generalMessage',
  message = 'message'
}

export enum InfoTypes {
  warning = 'warning',
  error = 'error',
  success = 'success'
}

export enum Actions {
  request = 'Solicitar'
}

export const Months = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
]

export enum Errors {
  signup = 'No se pudo registrar el usuario',
  login = 'Usuario o contraseña no valida',
  userCreate = 'No se pudo crear el usuario',
}