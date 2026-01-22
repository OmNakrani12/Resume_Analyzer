import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "resume-analyzer-b7199",
      clientEmail: "firebase-adminsdk-fbsvc@resume-analyzer-b7199.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDwUR1ZVcROjLIs\njtSd793TYRjlD/EnfUa1lSTwf3jbpggKN43torTmfNobg1S/m5htnOV9UVqtOK2t\nNFLKv8aQQuCNP1csfHongraVHhf8L+6u1lugoWj7dc1KQ10jJLxMi6c44v1Thdb8\nwcyulaVUcqgxFn+Xb/HjmM0N5R3/x/x5qanBBK1YUtEufxpSc+0JyCdkGQGWPvi5\nXn+QE6HqmpMtpzX8QYtvzZxKgU5pCbkfhGNDqnxOEtAGq1TN6YwBthla0I4i2XNj\n3jigU9YhGDpkOctcyGfUtVMcBsVTajMsCVJHS56XPLxycNkYMiguJIQDAM+BlOXY\np1vTBbb9AgMBAAECggEAGUgHROMrdDID+oEKKBVYakjgNBTRw1xACJFIog5e+giE\n9wIyKapAyrCex18xFrk5N2rWj7Dzz55TUxHald7H9lw6wFFGC/WKakari5NvZYXr\nX7RITmU8pJuXfbUJgs12C71zWZ4zlUpSvCNtM36ltnUbcZKS2K0brtxf0hLk7Yf5\ntyKnj9vYykZKagFzIHLuNiMurdqjTi7SGXKmFnLZ4hyXFmGdvCPrz4wepQ61tHz5\n7+NGpqeClCTYm+Zbq4IzNya0heaUoOEu61Xb/Q92o4CCur4t8mdaX4oeTviYbV9o\nbd+WqftFOfNSMp1alw6S9QkTPaDd0VSIEB7DALPTdwKBgQD/liFYlcgFF/MMLOur\nDokq/E7hcDgZ6f8SDFAAWm6cqtKnO9JXnlaFFP6B3XNwNdaKVlEK2D9TJMWQTDKd\nwEagOm0KMOVyjlI+r7MHPjh974PTgkHYA37Htm8npJZt48BhTLXZd1tQDwWiuZ0F\n65jhOpSh0avl/jp50MfUPHnlSwKBgQDwtKjMpc9WgMGfFZg4OOfRluZQvOTtglLw\nVrL8cu6CU5Khlz4mPjiOZ2+mltA9P4VNBAIbscHj5/20cNLGGKaNMVDn7kz3LLd7\n095IUIutViExuF3ZhWNdlVqKtFGZzyIme8uuqxHr1F6HNIvR+IQvqorqk6aVem3F\nb8p4xixP1wKBgQCe8YpDQMJnCIHJbJYShrOe29FiORtqYi6R1r5ZueNX4pOmFHm2\nq206zdeIg2MqwRBub0du6xRWbGPAXOKNX+mL80mkMMw/9WoIOdOoCXWwO6dLfZHc\n+C97m2R8zsoOBLi6ya29U5ChtPXYQH36FI26Y2fTSkUQfo12+/OJdSKJCQKBgCul\n1uYlOw/IkVOzqsKnLwJGhsUlO64F79w9HH/Cp5Viajh7IH320nKgNxLSTjiNCDML\nAwbamPom206ZFt9tIOaBhtZH1BUOOsdth+U9Fdb8w1AsynfjRD14E88LG7D0apDn\n6etmgf1tqSaDVMdidTXfiwk2dQKuDLG8r85uwSJJAoGAN5jW73588zmtPZU8Zk5/\nHDQ/li9LrygLNtTzPvMt7oUD0ToVdSxMqTFmaGhJRLHjvuF8mIF4sdo0rIXeQcxP\nqJ2dSDx+3v/TrUW51ILE/K9CXfqEQfuGG92O0ZcND6/Aph6/2WXUXLJaTzlGXQte\nYj7S0Oxw/bgqed2CmZuzwYo=\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://resume-analyzer-b7199-default-rtdb.asia-southeast1.firebasedatabase.app/",
  });
}

export const auth = admin.auth();
export const rtdb = admin.database();
