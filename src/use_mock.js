const USE_MOCK = true; 

console.log('use_mock.js executed.');
console.log('USE_MOCK set to:', USE_MOCK);

if (USE_MOCK) {
  console.log('use_mock = true -> condition checked (Mock API)');

} else {
  console.log('use_mock = false -> condition checked (Real API)');
}
module.exports = USE_MOCK;
