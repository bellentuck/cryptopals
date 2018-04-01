function hex2Bin(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    let newBits = parseInt(str[i], 16).toString(2);
    for (let j = 0; j < 4; j++) {
      if (!newBits[j]) newBits = '0' + newBits;
    }
    result.push(newBits);
  }
  return result;
}

function bin2Hex(arr) {
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    let newChar = parseInt(arr[i], 2).toString(16);
    result += newChar;
  }
  return result;
}

function xor(buffer1, buffer2) {
  if (buffer1.length !== buffer2.length) throw Error(
    'buffers must be equal length'
  );
  const bits1 = hex2Bin(buffer1);
  const bits2 = hex2Bin(buffer2);
  const result = [];
  for (let i = 0; i < bits1.length; i++) {
    let newBits = '';
    for (let j = 0; j < 4; j++) {
      newBits += bits1[i][j] ^ bits2[i][j];
    }
    result.push(newBits);
  }
  return bin2Hex(result);
}

module.exports = {
  hex2Bin,
  bin2Hex,
  xor
}
