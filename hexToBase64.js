function hexToBase64(hexString) {
  return new Buffer(hexString, 'hex').toString('base64');
}
