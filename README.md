## For running this application you need to start backend server

#### For start server use this command in root directory

```javascript
npm install
npm run dev
```

### For running the frontend

### Steps

1. Go to client folder
2. Open a instigated terminal
3. Run this command

    ```javascript
    npm install
    npm run dev
    ```

### Create .env file in root and client folder

#### In root .env file add

```javascript
JWT_SECRET = <Add your secret key>

MONGO_CONNECTION_STRING = <Add your mongoDB connection string>
```

#### In client .env file add

##### Create this in client/src/.env

```javascript
VITE_FIREBASE_API_KEY = <Add your firebase Key>
```
