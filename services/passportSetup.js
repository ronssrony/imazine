process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
const passport = require('passport'); 
const FacebookStrategy = require('passport-facebook') ;
const GoogleStrategy = require('passport-google-oauth20'); 
const TwitterStrategy = require('passport-twitter')
const config = require('config') ;
const newUser = require('../controllers/userAuthController')
const newSnaper = require('../controllers/apiController')
const { callbackURL } = require('../controllers/authController');
const dotenv = require("dotenv") ;
dotenv.config() ;
  
passport.use(new GoogleStrategy({
    //option for the google start
    clientID:process.env.clientID , 
    clientSecret:process.env.clientSecret,
    callbackURL:"https://imazineblue.onrender.com/auth/google/redirect"
} , async (accessToken ,refreshToken,profile,done)=>{
    
    let user = await newSnaper.LoginwithSocial(
        profile.displayName, 
        profile.emails[0].value,
        profile.photos[0].value
    );
  

    done(null,user); 
      
        }
))

passport.use(new FacebookStrategy({
      clientID:process.env.AppID ,
      clientSecret:process.env.Appsecret ,
      callbackURL: "https://imazineblue.onrender.com/auth/facebook/redirect",
      profileFields: ['id', 'displayName', 'photos', 'email', 'friends']
}, async (accessToken , refreshToken , profile , done)=>{
     
     try{
        let user = await newSnaper.LoginwithSocial(
            profile.displayName, 
            profile.emails[0].value,
            profile.photos[0].value
        );

            done(null,user)
     }
     catch(err){

         done(null,err)
     }

}
))

passport.use(new TwitterStrategy({
     consumerKey:process.env.consumerKey, 
     consumerSecret:process.env.consumerSecret, 
     callbackURL: "https://mazn.onrender.com/auth/twitter/redirect", 
     includeEmail: true 
} , async (accessToken , refreshToken , profile , done )=>{
     try{
         const user = await newUser.socialprofiles(
            profile.emails[0].value ,
            profile.id , 
            profile.photos[0].value, 
            profile.displayName ); 

            done(null,user)
     }
     catch(err){

         done(null,err)
     }
    
    } 
) )


