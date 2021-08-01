console.log("add js");
//trak the number of parametr
let paramscounter = 0;
//utility function
// for get parameter from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// hide perameter box intially
let parametersbox = document.getElementById("parametersbox");
parametersbox.style.display = "none";

// If the user clicks on params box, hide the json box

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersbox").style.display = "block";
});

// if the user clicks on json box then hide params boc
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersbox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

//if user click on + and - button then whot to do and how to do that are mention hear

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");

  let string = `<form class="row g-3 my-2">   
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${paramscounter + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${paramscounter + 2}" placeholder="Enter Parameter ${paramscounter + 2} Key">
                        </div>
                        
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${
                              paramscounter + 2}" placeholder="Enter Parameter ${paramscounter + 2} Value">
                        </div>
                            <button  class="col-md-auto btn btn-primary deleteParam"> - </button>
                    </form>`;
  //convert string to dom node
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  paramscounter++;
});

//if the submit button are clicked then
let submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  // wait for responce
  document.getElementById('responsePrism').innerHTML = "please wait...";

  //fetch all data user are enterd
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  //    console.log("url is" , url);
  //    console.log("requestType is" , requestType);
  //    console.log("contentType is" , contentType);

  //if user select param optioon instand of json then store all perameter in an object
  if (contentType == "params") {
    var data = {};
    for (let i = 0; i < paramscounter + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
      //to make object as a json string
      data = JSON.stringify(data);
    }
  } else {
    let data = document.getElementById("requestJsonText").value;
      
  }

  console.log("url " , url);
  console.log('requestType is ', requestType);
  console.log('contentType is ', contentType);
  console.log(data);

  // if request type is get then get request using fecth api
  if (requestType == "GET") {
        fetch(url, {
           method: 'GET',
        })
        .then((Response) => Response.text())
        .then((text) => { 
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            body : data,
            headers :{
                "content-type" : "application/json; charset=UTF-8"
            }
         })
         .then((Response) => Response.text())
         .then((text) => { 
         document.getElementById('responsePrism').innerHTML = text;
         Prism.highlightAll();
        });
    }
});
