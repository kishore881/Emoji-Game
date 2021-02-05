var auth2;
gapi.load("auth2", init);

function init(){
    gapi.auth2.init({cookiepolicy: 'single_ost_origin'});
    auth2 = gapi.auth2.getAuthInstance();
    if(auth2.isSignedIn.get())
        onSignIn();
    else
        renderButton();
}

function renderButton(){
    gapi.signin2.render('my-signin2',{
        'scope':'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'ux_mode': 'redirect',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
}

function onFailure(error){
    $('#info')[0].innerHTML=`<div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
    ${error}<br>SignIn failed. Try again using your Institute Mail ID. Make sure cookies are not blocked.
    <button type="button" class="close" data-dismiss="alert" aria-label="close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}

function onSignIn(googleUser){
    $('#my-signin2')[0].innerHTML=`<div class="spinner-border text-primary"></div>`;

    let profile = googleUser.getBasicProfile();
    let fullName = profile.getName();
    let imageUrl = profile.getImageUrl();
    let email = profile.getEmail();
    let id_token = googleUser.getAuthResponse().id_token;
    $.post('/verify',{id_token:id_token},(data)=>{
        if(data.error){
            $('#my-signin2')[0].innerHTML=``;
            renderButton();
            onFailure(data.error);
        }
        else{
            window.location.replace("/idc");
        }
    });
}