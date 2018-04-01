function singleByteXorCipher(str) {

  const bytes = hex2Bin(str);
  const frequencies = {};
  for (let byte of bytes) {
    if (byte in frequencies) frequencies[byte] += 1;
    else frequencies[byte] = 1;
  }

  let maxFrequency = 0;
  let mostFrequentByte = null;
  for (let byte in frequencies) {
    if (frequencies[byte] > maxFrequency) {
      maxFrequency = frequencies[byte];
      mostFrequentByte = byte;
    }
  }
  const key = mostFrequentByte;

  const message = [];
  for (let byte of bytes) {
    let newBits = '';
    for (let i = 0; i < 4; i++) {
      newBits += byte[i] ^ key[i];
    }
    message.push(newBits);
  }

  return bin2Hex(message);
}

// ( to be continued )
