var auth2 = null;
var gid  = null;
gapi.load("auth2", init);

function init(){
    gapi.auth2.init({cookiepolicy: 'single_ost_origin'});
    auth2 = gapi.auth2.getAuthInstance();
}

function signOut() {
    auth2.signOut().then(function () {
        user = auth2.currentUser.get();
        gid = auth2.currentUser.get().getId();
        $.post('/signout',{gid:gid},(data)=>{
            if(data.error){
                onFailure(data.error);
            }
            else{
                window.location.replace('/');
            }
        });
    });
}

function onFailure(error){
    $('#info')[0].innerHTML=`<div class="alert alert-warning alert-dismissible fade show text-center my-2" role="alert">
   SignOut failed. ${error}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}