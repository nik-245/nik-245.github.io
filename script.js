console.log('add js');
//trak the number of parametr
let paramscounter = 0;
//utility function
// for get parameter from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;;
}

// hide perameter box intially
let parametersbox = document.getElementById('parametersbox');
parametersbox.style.display = 'none';

// If the user clicks on params box, hide the json box

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click' , ()=>{
  document.getElementById('requestJsonBox').style.display = 'none';
  document.getElementById('parametersbox').style.display = 'block';

});

// if the user clicks on json box then hide params boc
let jsonRadio    = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click' , ()=>{
  document.getElementById('parametersbox').style.display = 'none';
  document.getElementById('requestJsonBox').style.display = 'block';

});

let addParam = document.getElementById('addParam'); 
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params');

    let string = `<form class="row g-3 my-2">   
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${paramscounter + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${paramscounter+ 2}" placeholder="Enter Parameter ${paramscounter + 2} Key">
                        </div>
                        
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${paramscounter + 2}" placeholder="Enter Parameter ${paramscounter + 2} Value">
                        </div>
                            <button  class="col-md-auto btn btn-primary deleteParam"> - </button>
                    </form>`;
     //convert string to dom node
    let paramElement = getElementFromString(string);
     params.appendChild(paramElement);

     let deleteParam = document.getElementsByClassName('deleteParam');
     for( item of deleteParam){
         item.addEventListener('click' , (e)=>{
            e.target.parentElement.remove();; 
         })
     }
                paramscounter++;
})