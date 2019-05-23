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
  joinRequest = 'joinRequest'
}

export enum InfoTypes {
  warning = 'warning',
  error = 'error',
  success = 'success'
}

export enum Actions {
  request = 'Solicitar'
}

export enum Months {
  jan = 0,
  feb = 1,
  mar = 2,
  apr = 3,
  may = 4,
  jun = 5,
  jul = 6,
  aug = 7,
  sep = 8,
  oct = 9,
  nov = 10,
  dec = 11
}

export enum Errors {
  signup = 'No se pudo registrar el usuario',
  login = 'Usuario o contraseña no valida',
  userCreate = 'No se pudo crear el usuario',
  noSaving = 'Aun no hace parte de ninguna natillera, debe solicitar el acceso a una'
}

export enum InfoGroup {
  savingRequest = "savingRequest"
}

export enum Warnings {
  request = 'Tendra acceso a la información cuando el administrador apruebe la solicitud'
}