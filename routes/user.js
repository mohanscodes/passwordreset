const router = require("express").Router();
const bcrypt = require("bcrypt");
const User =  require("../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authenticate");

const SECRET_KEY = process.env.SECRET_KEY;
const MAIL_SEND_IDS = process.env.MAIL_SEND_ID;
const MAIL_PWDS = process.env.MAIL_PWD;

const port = process.env.PORT || 4000;

router.get("/",(req,res)=>{
    res.render("login")
})
router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/fwd",(req,res)=>{
    res.render("FWD");
});
router.get("/reset",(req,res)=>{
    res.render("reset");
});

router.post("/signup",async (req,res)=>{

    try{
    const password = await bcrypt.hash(req.body.password, 10);

    const userdata = new User({
        name :req.body.name,
        email:req.body.email,
        password:password,
       });

    const result = await userdata.save();

    const token = jwt.sign({id:result._id},SECRET_KEY)
    const verifylink = `https://passwordreset-qhgw.onrender.com/verify/${token}`;

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: MAIL_SEND_IDS,
            pass: MAIL_PWDS,
        },
    });

    let info = await transporter.sendMail({
        from:"enterwebsolution Team <webdesignintamil@gmail.com>",
        to:req.body.email,
        subject:"Verify your Email - enterwebsolution Team",
        
        html:`<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
          </div>
          <!-- end preheader -->
        
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;"> Hello Welcome <strong>${req.body.name}</strong>😋</p>
                      <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with you can safely delete this email.</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start button -->
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                  <a href="${verifylink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">conform email</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end button -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                      <p style="margin: 0;"><a href="${verifylink}" target="_blank">${verifylink}</a></p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                      <p style="margin: 0;">enterweb,<br> Team</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start permission -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a request for your account. If you didn't request you can safely delete this email.</p>
                    </td>
                  </tr>
                  <!-- end permission -->
        
                  <!-- start unsubscribe -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">To stop receiving these emails, you can at any time.</p>
                      <p style="margin: 0;">147 S. Broadway St. City, State 12345</p>
                    </td>
                  </tr>
                  <!-- end unsubscribe -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>
    
        `
        });

        if(info){
          return res.render("alerts",{
                alert:"Please verify Your email to contine login",
                name:result.name,
            })
        }
        else{
            return res.render("alerts",{
                alert:"mail sending ",
                name:"failed",
            })
        }
       
}
    catch(error){
        console.log(error);
    }

});

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne( {email:req.body.email} );

        if(user) {
            const result = await bcrypt.compare(req.body.password,user.password);

            if(result) {
                if(!user.verified) {
                    return res.render("alerts",{
                        alert:"Verify your account first🤨 , We are send verification link to your email as 😏",
                        name:user.email
                    });
                }
                else{
                    return res.render("alerts",{
                        alert:"🎉🎉🎉 Your loged in Welcome 🎉🎉🎉",
                        name:user.name,
                    });
                }

            }
            else {
                return res.render("alerts",{
                    alert:"Wrong passwords🥱😴 ",
                    name:"Please Check passwords 😏"

                });
            }
        }  return res.render("alerts",{
            alert:"email not found 😥",
            name:"Please Check email OR Create New Account 😏"
        });
    }
    catch(error) {
            return  console.log(error);
    }
});


router.get("/data",verifyToken,async(req,res)=>{
    try {
        const userId = req.userId;
        const user = await User.findById({_id:userId});
        res.json(user);
    } 
    catch (error) {
        console.log(error);
        return res.json({msg:error.message});
        }
}); 

router.get("/verify/:verifytokan",async(req,res)=> {
    const tokens = req.params.verifytokan;

    try {
        jwt.verify(tokens,SECRET_KEY,async(err,decoded)=> {

            if(err) {
                return res.send("invalid url");
            }
            else {
                const user = await User.findByIdAndUpdate(decoded.id,{
                    verified:true,
                });
                return res.render("alerts",{
                    alert:"Account Verified Sucessfully 😎🎉",
                    name:"Welcome"
                });
            }
        })
      } 
    catch (error) {
        console.log(error);
    }
})

router.post("/fwd", async (req,res)=>{

    try {
        const resetUserdata = await User.findOne({email:req.body.email});

        if(resetUserdata) {
            const passwordtoken = await jwt.sign({id:resetUserdata._id},SECRET_KEY,{expiresIn:10*60});
            const resetlink = `https://passwordreset-qhgw.onrender.com/resetpassword/${passwordtoken}`;


           if(passwordtoken) {

             const transporter = nodemailer.createTransport({
             service:"gmail",
               auth: {
               user: MAIL_SEND_IDS ,
               pass: MAIL_PWDS,
               },
          });

            if(transporter){
                let info = await transporter.sendMail({
                    from:"enterwebsolutions Team <webdesignintamil@gmail.com>",
                    to:req.body.email,
                    subject:"Reset Password - enterwebsolutions Team",
                    html:`
                    <!doctype html>
                    <html lang="en-US">
                    
                    <head>
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                        <title>Reset Password Email Template</title>
                        <meta name="description" content="Reset Password Email Template.">
                        <style type="text/css">
                            a:hover {text-decoration: underline !important;}
                        </style>
                    </head>
                    
                    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                        <!--100% body table-->
                        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                            <tr>
                                <td>
                                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                        align="center" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                              
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0 35px;">
                                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                                requested to reset your password</h1>
                                                            <span
                                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                                We cannot simply send you your old password. A unique link to reset your
                                                                password has been generated for you. To reset your password, click the
                                                                following link and follow the instructions.
                                                            </p>
                                                            <a href="${resetlink}"
                                                                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                                Password</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>
                                                www.passwordreset-qhgw.onrender.com
                                                </strong></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--/100% body table-->
                    </body>
                    
                    </html>`
                });

                if(info){
                    return res.render("alerts",{
                        alert:"Please check your mail 😋: ",
                        name:"Password reset Link send successfully 😁"
                    }); 
                } 
                else{
                    return res.render("alerts",{
                        alert:"mail sending failed 😔: ",
                        name:"check mail Transport"
                    }); 
                }
            }
            else{
                return res.render("alerts",{
                    alert:"transport failed 😏",
                    name:"Mail sending failed Pls Check mail transport"
                });  
            }
           }
           else{
            return res.render("alerts",{
                alert:"Token failed / valied Time out 🤔",
                name:"Reset again "

            });           }
        }
        else{
           return res.render("alerts",{
                alert:"email not found 😔",
                name:"Please Check email OR Create New Account "
            });        
        }
            
    } 
    catch (error) {
        return res.render("alerts",{
            alert:'mail sending catch error 🤔',
            name:error.message
        });
    }
})


router.get("/resetpassword/:resettoken",async (req,res)=>{

    res.render("reset",{
        tokens:req.params.resettoken,
    })


 });

router.post("/passwordreset/:tokans", async (req,res)=>{

    const token = await jwt.verify(req.params.tokans,SECRET_KEY);

    const userfind = await User.findById(token.id);

    if(userfind._id == token.id){

            const newpassword = await bcrypt.hash(req.body.newpassword, 10);

            // res.send(newpassword)
            if(newpassword){

              const updatenewpass = await User.findByIdAndUpdate(token.id,{
                password:newpassword,
                 },{new:true})

                 if(updatenewpass){
                    return res.render("alerts",{
                        alert:"password reset successfully 🎉🎉",
                        name:" Login Again "
                    });

                 } else {
                    res.send("password update failed")
                 }
            } 
            else{
            res.send("password hashing failed");
            }
    }
    else{
        res.send("user not found")
    }  
   
 })


module.exports= router;
