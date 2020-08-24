export function isEmpty(value) {
  if (value === '' || value === undefined || value === null) {
    return true;
  }
  return false;
}

export function isNotEmpty(value) {
  if (value !== '' && value !== undefined && value !== null) {
    return true;
  }
  return false;
}
