const { xor, hex2Bin, bin2Hex } = require('../xor');
const { expect, should } = require('chai');

const a = '1c0111001f010100061a024b53535009181c';
const b = '686974207468652062756c6c277320657965';
const c = '746865206b696420646f6e277420706c6179';

describe('Fixed XOR', () => {

  describe('Hexedecimal to binary conversion subroutine', () => {

    const d = ["0001", "1100", "0000", "0001", "0001", "0001", "0000", "0000", "0001", "1111", "0000", "0001", "0000", "0001", "0000", "0000", "0000", "0110", "0001", "1010", "0000", "0010", "0100", "1011", "0101", "0011", "0101", "0011", "0101", "0000", "0000", "1001", "0001", "1000", "0001", "1100"];
    const e = ["0110", "1000", "0110", "1001", "0111", "0100", "0010", "0000", "0111", "0100", "0110", "1000", "0110", "0101", "0010", "0000", "0110", "0010", "0111", "0101", "0110", "1100", "0110", "1100", "0010", "0111", "0111", "0011", "0010", "0000", "0110", "0101", "0111", "1001", "0110", "0101"];
    const f = hex2Bin(a);
    const g = hex2Bin(b);

    it('Converts a hexidecimal string to an array of 8-bit bytes', () => {
      expect(f).to.be.an('array');
      expect(g).to.be.an('array');
      f.forEach(byte => expect(byte).to.match(/^[0-1]+$/));
      g.forEach(byte => expect(byte).to.match(/^[0-1]+$/));
      f.forEach(byte => expect(byte).to.have.lengthOf(8/2));
      g.forEach(byte => expect(byte).to.have.lengthOf(8/2));
    });
    it('Produces an array of bytes with the same number of bytes as characters in the input string', () => {
      expect(f).to.have.lengthOf(d.length);
      expect(g).to.have.lengthOf(e.length);
    });
    it('Produces an array of bytes whose values correspond to those in the input string', () => {
      expect(f).to.have.deep.members(d);
      expect(g).to.have.deep.members(e);
      expect(bin2Hex(f)).to.equal(a);
      expect(bin2Hex(g)).to.equal(b);
    });
  });
  describe('Binary to hexidecimal conversion subroutine', () => {

  });

  describe('The XOR function', () => {



    it('Takes two equal-length strings ("buffers")', () => {
      const d = a + b;
      expect(() => xor(a, b)).not.to.throw(Error);
      expect(() => xor(b, a)).not.to.throw(Error);
      expect(() => xor(a, d)).to.throw('buffers must be equal length');
      expect(() => xor(d, b)).to.throw('buffers must be equal length');
    });
    it('Produces the XOR combination of two equal-length buffers', () => {
      expect(xor(a, b)).to.equal(c);
      expect(xor(b, a)).to.equal(c);
    });
  });


  })




