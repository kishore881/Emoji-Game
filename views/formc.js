const done=`<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
Submitted successfully.<button type="button" class="close" data-dismiss="alert" aria-label="close">
  <span aria-hidden="true">&times;</span></button></div>`;

const failed=`<div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
Submission Failed. Try again.<button type="button" class="close" data-dismiss="alert" aria-label="close">
    <span aria-hidden="true">&times;</span></button></div>`;

$("#ded-form").submit(function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
        type: "POST",
        url: '/dedicate',
        data: form.serialize(), 
        success: function(data)
        {
            console.log(data);
            if(data.success){
                $('#info')[0].innerHTML=done;
            }else{
                $('#info')[0].innerHTML=failed;
            }
        }
    });

    
});