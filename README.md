# Google_Third-Party_Application_Finder
This Node.js application helps users find third-party applications connected to their Google accounts. Users can authenticate with their Google accounts and retrieve a list of authorized third-party applications with access to their account data.

## Prerequisites ##
 * Node.js
 * NPM (Node Package Manager, usually comes with Node.js installation)

## Installation ##
  1. Clone the repository or download the source code.
  2. Open a terminal or command prompt and navigate to the project directory.
  3. Run the following command to install the required dependencies:
        ```
       1. npm install googleapis
       2. npm install express
       3. npm install google-auth-library
       4. npm install ejs
       
         
         
## Configuration ##
   1. Open the app.js file in a text editor.
   2. Replace the placeholder values in the oauth2Client configuration with your own credentials:
         ```
         const oauth2Client = new google.auth.OAuth2(
        'YOUR_CLIENT_ID',
        'YOUR_CLIENT_SECRET',
        ['YOUR_REDIRECT_URL']
        );
        
         ```
      * YOUR_CLIENT_ID: Your Google OAuth client ID.
      * YOUR_CLIENT_SECRET: Your Google OAuth client secret.
      * YOUR_REDIRECT_URL: The redirect URL registered in your Google OAuth credentials
## Usage ##
   1. Start the application by running the following command:
        ''' node app.js '''
   2. Open a web browser and navigate to http://localhost:3000.
   3. The application will display a homepage with a message indicating whether the authentication was successful or not.
   4. Click on the "Authenticate with Google" button to initiate the authentication process.
   5. You will be redirected to the Google authentication page. Log in with your Google account and grant access to the application.
   6. Upon successful authentication, you will be redirected to the /applications route.
   7. The /applications route will display a list of authorized third-party applications with access to your account data, along with the scopes of access and the access time.
   8. To access the applications route directly, you can navigate to http://localhost:3000/applications.
  
## Additional Instructions ##
   * For security purposes, it is recommended to keep your credentials secure and not share them publicly.
   * To customize the application further, you can modify the code in the app.js file.
   * Ensure that the redirect URL registered in your Google OAuth credentials matches the callback URL in the code (/auth/google/callback).
   * The application uses the EJS template engine for rendering views. The views are stored in the views directory.
   * Feel free to modify the views (index.ejs and home.ejs) to customize the appearance and content of the application.
