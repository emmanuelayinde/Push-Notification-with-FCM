import { config } from 'dotenv';
config();

export const firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC54HWvwOjIWB9Y\nvUOO0zfX+vybg32PLptFdS/bTNVW2qEHs0aF/U7gM8C59HTsc0cfWLOTFTtZwJf2\nfphnVknd3TWB1kYR5nmRubHL+6BPAF6pGgoB2kD4gSqwfAJn9UCr2aieZ+F0L52l\nUh9k53RtU/8ya5sLhrzEs8nBdjxRixsDeLq1wleD9QngQb8SrZMd9h0wantsip/j\nyDMTIccx3RtSF1zhL/xxkHOciMchLXJAt7/pZvEWbgmLCMDc1CjmxTG12u98WYrX\nKYYMO++vNeCmpMapFr7SaCex0cuIgcqbWERxk6cRQbWJb6NHZ69pd2WJZQpvMjtm\nnhh8EdELAgMBAAECggEAV9ztZIXYw5M8RhM5ExNuy05eCBjwyjTqurt5Qr2f/u1b\nvysURBQIK9zq1jvi5T5cuUmRoQ4hPvzWGHOhEP/t7M07FMO33ZBHmQXhMJ4iGhX/\nqQmg/10u5wkPp9sGvCNnTZSWq0JJhUVYzKP0KRtrop5Y/Hl3EczAAG9ICIYeXyCE\nhkmkpRBLQVjyTn8sTpFDiwSVU+KJXohir8t9ADf1wdtMghCDcTMasVOo6zIShIe8\n1a36GWGD1GOtbeD25zCmjnaJLWni3uQLgDlXArrwjrouyQHeSkWgtWs4mHDh6XKR\nQlBYhF4AJg9ODxgn1Ry/dNS8KRDcNT9UU53tBZlrCQKBgQD+/YKkzeCDNtZ725Pj\ne2nJWve3XIjLPdpHxSi5tXe+uGrwCOl/hdWiIjy9H2VvLosxFtDj2amPLtn5A7yJ\nfyIHpAsdTIxCtiPUDdIDUXR6VrdPH/iw9oK/kTkfF1CbMgjwAeIMliaLPN3hAn6m\nTB4VMWt+th49gJDyfrcgLEBlFQKBgQC6nOMtykpcq9G6+Axc1jI13VZWONTk2rlK\nvUAyHFk5ExNEI9PFIVIsMfBB9LJhs8MCOWOzWgqjPwUv9XlQGQ2is6QLI9Nvwdjo\n638y99kXNXNK5zpKqp7yVHJoOaRuMEYCkEJj0F16VRe+47lXYCYjam2vhsm2ENIT\ntHE7d1slnwKBgQDJRC6niL1KtLEtSE7+An6oaX4XpBlxWtv9RFj15I+k4Ym+9zne\n5zON6zpICQ0WagWB9MFi535XvyJb1CAv40JoB4qiULZxPbUf/tyis9udaO79rH2u\nqJThQm505QFBzoeRcdsMFkRMKPn1TfPLrU8daUmw1W0fHGjMj0paQbN+VQKBgAOk\nUi6vlvnuBH7QnnUlXP9+HVQ7cbQxrJIP1XPk57zcaXDX/icHunHQW6791olfl7uw\nYQi8Bh8feLtx3/c3NfPp65aoEVVKBDCvf+D/w0XXrjNVBec1Izr5eO4dyd64pHUi\nWZlXFKvxgzAfg5t37eadChz11XPvKhpmWBtf/fBjAoGAIbplDFypDf24K+zAigkR\nZWKpzbFpjAC6BvP+c10NG/IFCpzn37WoZX1IO7F+N7n/k2zeKd1QfEZGTqq8zGvO\n9T9ULmsrznzOoRcUQhfqFogc3lW+txJ8pJGX79cgyjfrIUP/yJEjU9P2KcJ8rA2d\n1gLUZq36jJPeUafGdnUTmIY=\n-----END PRIVATE KEY-----\n',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e8rl6%40push-notification-projec-b90a6.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};