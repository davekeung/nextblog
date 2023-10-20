import { createHash } from 'crypto';

export default function getSwcSHA1(value) {
  const algorithm = 'sha1';
  const hash = createHash(algorithm);
  hash.update(Buffer.from(value, 'utf-8'));
  return hash.digest('hex').toUpperCase();
}
