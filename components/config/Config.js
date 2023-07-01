// let urlFinder, hostingUrl, splitUrl, urlHttp = '';

//URL CONFIG DYNAMIC
// if(typeof window !=="undefined"){
//     urlFinder = window.location.href;
//     splitUrl = urlFinder.split("/");
//     urlHttp = splitUrl[0];
//     hostingUrl = splitUrl[2];

// }

//SET ALL URL
 
// const applicationUrl = urlHttp+"//"+hostingUrl+"/api";
// const baseUrl = urlHttp+"//"+hostingUrl;
// const apiUrl = "https://onboarding.paythrough.in/dev/v1/adminapi";
// const recaptchaKey = "6LeCz6UeAAAAAFNB9N_yfwivy772K0D3uIAFFOck";

const applicationUrl = "http://localhost:3000/api";
const baseUrl = "http://localhost:3000";
const apiUrl = "https://onboarding.paythrough.in/dev/v1/adminapi";


//GOOGLE CAPTCHA KEY
const recaptchaKey = "6LeCz6UeAAAAAFNB9N_yfwivy772K0D3uIAFFOck";

export {
    applicationUrl,
    baseUrl,
    apiUrl,
    recaptchaKey
}