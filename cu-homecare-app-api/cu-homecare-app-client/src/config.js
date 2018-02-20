export default {
  MAX_ATTACHMENT_SIZE: 5000000,

  cognito: {
    USER_POOL_ID: "us-east-2_E77cCuZ6B",
    REGION: "us-east-2",
    IDENTITY_POOL_ID: "us-east-2:fd84fd9d-d4bf-483c-9ef4-0c05b4a60303",
    APP_CLIENT_ID: "troot9jpu42b8keduf22qv3s"
  },
  apiGateway: {
    URL: "https://tfkkrbg72l.execute-api.us-east-2.amazonaws.com/prod",
    REGION: "us-east-2"
  },
  s3: {
    BUCKET: "note-app-upload-bucket"
  }
};
