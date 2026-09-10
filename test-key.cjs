const crypto = require('crypto');

let privateKey = " -----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDW8/TWTOBrRYPn\n-----END PRIVATE KEY-----\n";

if (privateKey && !privateKey.includes('\n')) {
  console.log('Reconstructing...');
} else {
  console.log('Skipping reconstruction because newlines exist.');
}

try {
  crypto.createPrivateKey(privateKey);
  console.log('SUCCESS');
} catch (e) {
  console.log('ERROR:', e.message);
}
