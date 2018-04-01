const { xor, hex2Bin, bin2Hex } = require('../xor');
const { expect, should } = require('chai');

// Test Data
const bufferNumberOne = '1c0111001f010100061a024b53535009181c';        //a
const bufferNumberTwo = '686974207468652062756c6c277320657965';        //b
const bufferOneBufferTwoXORd = '746865206b696420646f6e277420706c6179'; //c

const bufferNumberOneInBinary = ["0001", "1100", "0000", "0001", "0001", "0001", "0000", "0000", "0001", "1111", "0000", "0001", "0000", "0001", "0000", "0000", "0000", "0110", "0001", "1010", "0000", "0010", "0100", "1011", "0101", "0011", "0101", "0011", "0101", "0000", "0000", "1001", "0001", "1000", "0001", "1100"];
const bufferNumberTwoInBinary = ["0110", "1000", "0110", "1001", "0111", "0100", "0010", "0000", "0111", "0100", "0110", "1000", "0110", "0101", "0010", "0000", "0110", "0010", "0111", "0101", "0110", "1100", "0110", "1100", "0010", "0111", "0111", "0011", "0010", "0000", "0110", "0101", "0111", "1001", "0110", "0101"];
const bufferOneBufferTwoXORdInBinary = ["0111", "0100", "0110", "1000", "0110", "0101", "0010", "0000", "0110", "1011", "0110", "1001", "0110", "0100", "0010", "0000", "0110", "0100", "0110", "1111", "0110", "1110", "0010", "0111", "0111", "0100", "0010", "0000", "0111", "0000", "0110", "1100", "0110", "0001", "0111", "1001"];

const bufferNumberOne2Binary = hex2Bin(bufferNumberOne);
const bufferNumberTwo2Binary = hex2Bin(bufferNumberTwo);
const bufferOneBufferTwoXORd2Binary = hex2Bin(bufferOneBufferTwoXORd);

const bufferNumberOne2Hexidecimal = bin2Hex(bufferNumberOneInBinary)
const bufferNumberTwo2Hexidecimal = bin2Hex(bufferNumberTwoInBinary);
const bufferOneBufferTwoXORd2Hexidecimal = bin2Hex(bufferOneBufferTwoXORdInBinary);

const buffers = {
  buffersInBin: [
    bufferNumberOneInBinary,
    bufferNumberTwoInBinary,
    bufferOneBufferTwoXORdInBinary
  ],
  buffers2Bin: [
    bufferNumberOne2Binary,
    bufferNumberTwo2Binary,
    bufferOneBufferTwoXORd2Binary
  ],
  buffersInHex: [
    bufferNumberOne,
    bufferNumberTwo,
    bufferOneBufferTwoXORd
  ],
  buffers2Hex: [
    bufferNumberOne2Hexidecimal,
    bufferNumberTwo2Hexidecimal,
    bufferOneBufferTwoXORd2Hexidecimal
  ]
};


describe('Fixed XOR', () => {

  describe('Hexedecimal to binary conversion subroutine', () => {

    it('Converts a hexidecimal string to an array of 8-bit bytes', () => {
      for (const buffer of buffers.buffers2Bin) {
        expect(buffer).to.be.an('array');
        buffer.forEach(byte => {
          expect(byte).to.match(/^[0-1]+$/);
          expect(byte).to.have.lengthOf(8/2);
        });
      }
    });
    it('Produces an array of bytes with the same number of bytes as characters in the input string', () => {
      const { buffers2Bin, buffersInHex } = buffers;
      const binaryArrays = [...buffers2Bin];
      const inputStrings = [...buffersInHex];
      while (binaryArrays.length && inputStrings.length) {
        expect(binaryArrays.shift()).to.have.lengthOf(inputStrings.shift().length);
      }
    });
    it('Computes byte values correctly', () => {
      const { buffers2Bin, buffersInBin } = buffers;
      const results = [...buffers2Bin];
      const data = [...buffersInBin];
      while (results.length && data.length) {
        expect(results.shift()).to.have.deep.members(data.shift());
      }
    });
    it('Is the inverse of the binary-to-hexidecimal conversion function', () => {
      for (const buffer of buffers.buffersInBin) {
        expect(hex2Bin(bin2Hex(buffer))).to.have.deep.members(buffer);
      }
    });
    // should factor out above thunk to a 'test two arrays under this same condition' function (e.g. via same queue implementation)
    // it('Should have an option to go two characters at a time for hex', () => {});

  });
  describe('Binary to hexidecimal conversion subroutine', () => {

    //it('Takes in an array and produces a string', () => {});
    it('Produces a string equal to the input string', () => {
      const { buffers2Hex, buffersInHex } = buffers;
      const hexidecimalStrings = [...buffers2Hex];
      const inputStrings = [...buffersInHex];
      while (hexidecimalStrings.length && inputStrings.length) {
        expect(hexidecimalStrings.shift()).to.equal(inputStrings.shift());
      }
    });
    it('Is the inverse of the hexidecimal-to-binary conversion function', () => {
      for (const buffer of buffers.buffersInHex) {
        expect(bin2Hex(hex2Bin(buffer))).to.equal(buffer);
      }
    });

  });
  describe('The XOR function', () => {

    // it('Takes two strings', () => {});
    it('Takes two equal-length buffers', () => {
      const newBuffer = bufferNumberOne + bufferNumberTwo;
      expect(() => xor(bufferNumberOne, bufferNumberTwo)).not.to.throw(Error);
      expect(() => xor(bufferNumberTwo, bufferNumberOne)).not.to.throw(Error);
      expect(() => xor(bufferNumberOne, newBuffer)).to.throw(
        'buffers must be equal length'
      );
      expect(() => xor(newBuffer, bufferNumberTwo)).to.throw(
        'buffers must be equal length'
      );
    });
    it('Produces the XOR combination of two equal-length buffers', () => {
      expect(xor(bufferNumberOne, bufferNumberTwo)).to.equal(bufferOneBufferTwoXORd);
      expect(xor(bufferNumberTwo, bufferNumberOne)).to.equal(bufferOneBufferTwoXORd);
    });
  });

});
