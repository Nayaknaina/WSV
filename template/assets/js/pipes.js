
document
  .getElementById("addPipelineBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    addPipeLoader()
    const title = document.querySelector("#inputPassword2").value;
    const color = document.querySelector("#colorinp2").value;
    const form = document.querySelector("#addPipelineForm");
    const pipelineBoxContainer = document.querySelector("#pipelineBoxContainer-row");

    axios
      .post(
        "/user/pipeline",
        { title, color },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data);
        // alert('Pipeline added successfully!');

        // Assuming response.data contains the newly created pipeline data
        const newPipeline = response.data;

        // Create the li HTML
        const liElement = `<li style="display: flex; border-radius: 4px; padding: 0 8px; border: 1px solid gray; justify-content: space-between; align-items: center; margin: 4px 0;">
                                            <form class="updatePipesForm" style="display: flex; justify-content: space-between; margin-right: 10px;"
                                                action="/user/pipeline/update/${newPipeline._id}" id="${newPipeline._id}" method="post">

                                                <input type="radio" value="on" disabled class="colorinp"
                                                    style="width: 20px; height: 20px; border: none; padding: 0;"
                                                    name="defaultVal" id="check-${newPipeline._id}">

                                                <input type="text" disabled name="title" style="text-transform: capitalize;" value="${newPipeline.title}"
                                                    id="title-${newPipeline._id}}">

                                                <input type="color" disabled class="colorinp" value="${newPipeline.color}"
                                                    style="width: 28px; height: 28px; border: none; padding: 0;"
                                                    name="color" id="color-${newPipeline._id}">
                                            </form>
                                            <span
                                                style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                                                <label for="title-${newPipeline._id}" style="margin: 0;">
                                                <i onclick="updatePiplineForm('${newPipeline._id}')" style="cursor: pointer;"
                                                    class="fa-solid fa-pen-to-square"></i>
                                                </label>

                                                <a onclick="deletePipeFromAdmin('${newPipeline._id}')"><i class="fa-regular fa-trash-can"
                                                        style="color: crimson;"></i></a>
                                            </span>
                                        </li>`;

        // Append to the ul with id 'allPipesShowing'
        document
          .getElementById("allPipesShowing")
          .insertAdjacentHTML("beforeend", liElement);

          let newpipe = `
          <div class="col-sm-6 col-lg-3">
                            <div class="card text-white" style="background-color: ${newPipeline.color};">
                                <div class="card-body pb-0">
                                    <h4 class="mb-0">
                                        <span class="count" style="text-transform: capitalize; font-size: x-large;">
                                            0
                                        </span>
                                    </h4>
                                    <p style="text-transform: capitalize; font-size: x-large;" class="text-light">
                                        ${newPipeline.title}</p>

                                </div>

                            </div>
                        </div>
          `
          pipelineBoxContainer.innerHTML += newpipe;
          removePipeLoader()
        form.reset();
      })
      .catch(function (error) {
        console.error(error);
        removePipeLoader()
        alert(
          "There was an error adding the pipeline: " +
            (error.response.data.error || "")
        );
      });
  });

async function submitAllPipesUpdatedForm() {
    
    const forms = document.querySelectorAll(".updatePipesForm");
    let allData = []; // Array to hold all form data

    forms.forEach((form) => {
      let formData = new FormData(form);

      let data = {};
      for (let pair of formData.entries()) {
        data[pair[0]] = pair[1];
      }

      const urlParts = form.action.split("/");
      const id = urlParts[urlParts.length - 1];
      data.id = id;
      if (!data.title) {
        data.title = document.querySelector(`#title-${id}`).value; // Use existing value if empty
      }
      if (!data.color) {
        data.color = document.querySelector(`#color-${id}`).value; // Use existing value if empty
      }
      allData.push(data);
    });

    // console.log(allData); // Log all collected data
    // todo start loading here 
    addPipeLoader()
    //todo  Send data to server
    try {
      
      // console.log("waiting for res")
      let res = await axios.post("/user/pipeline/update", allData)
     //  console.log("waiting for res",res.status)
      if(res.status == 200){
        try {
          
          let allPipeRes = await axios.get('/user/get-all/pipes')
          // console.log(allPipeRes.status)
          if(res.status==200){
            // console.log("Responce data ",allPipeRes.data);
            let allNewPipelines = allPipeRes.data;
            // todo all pipe clear
            let allPipeContainer = document.getElementById("allPipesShowing");
            allPipeContainer.innerHTML = "";
    
            // todo all pipe reseting 
            displayPipes(allNewPipelines,allPipeContainer)
    
            // todo all pipes top box clear & reseting
            let pipelineBoxContainer = document.querySelector("#pipelineBoxContainer-row");
            pipelineBoxContainer.innerHTML = '';
            displayPipesOnTop(allNewPipelines,pipelineBoxContainer)
    
            let btn = document.getElementById("submitAllPipesUpdatedForm")
            btn.hidden = true
            //todo removing pipe loader
            removePipeLoader()
            // location.reload()
          
        }
      } catch (err) {
          console.log(err)  
      }
      }

    } catch (error) {
      console.log(error);
      removePipeLoader();
    }
     
  };
  async function deletePipeFromAdmin(id) {
    addPipeLoader()
    $.ajax({
      url: `/user/pipeline/del/${id}`,
      method: 'GET',
      success: function(res) {
        if (res) {
          console.log("Response:", res);
          $("#allPipesShowing").load("/user/dashboard #allPipesShowing > *");
          // // todo Pipe container ko reset karte hain   
          // let allPipeContainer = document.getElementById("allPipesShowing");
          // allPipeContainer.innerHTML = "";
          // displayPipes(res, allPipeContainer); 
          
          // // todo Top box ko bhi clear aur reset karte hain
          // let pipelineBoxContainer = document.querySelector("#pipelineBoxContainer-row");
          $("#pipelineBoxContainer-row").load("/user/dashboard #pipelineBoxContainer-row > *");
          // pipelineBoxContainer.innerHTML = '';
          // // displayPipesOnTop(res, pipelineBoxContainer);

          removePipeLoader(); // Loader remove karte hain
        }
      },
      error: function(err) {
        console.log("Error:", err);
        removePipeLoader(); // Loader remove karte hain
      }
    });
  }


function displayPipes(array,allPipeContainer){
    array.forEach((newPipeline) => {
        if(newPipeline.defaultVal){
          console.log("default pipe", newPipeline)
      allPipeContainer.innerHTML = `<li style="display: flex; border-radius: 4px; padding: 0 8px; border: 1px solid gray; justify-content: space-between; align-items: center; margin: 4px 0;">
                                        <form class="updatePipesForm" style="display: flex; justify-content: space-between; margin-right: 10px;"
                                            action="/user/pipeline/update/${newPipeline._id}" id="${newPipeline._id}" method="post">

                                            <input type="radio" value="on" checked disabled class="colorinp"
                                                style="width: 20px; height: 20px; border: none; padding: 0;"
                                                name="defaultVal" id="check-${newPipeline._id}">

                                            <input type="text" disabled name="title" style="text-transform: capitalize;" value="${newPipeline.title}"
                                                id="title-${newPipeline._id}">

                                            <input type="color" disabled class="colorinp" value="${newPipeline.color}"
                                                style="width: 28px; height: 28px; border: none; padding: 0;"
                                                name="color" id="color-${newPipeline._id}">
                                        </form>
                                        <span
                                            style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                                            <label for="title-${newPipeline._id}" style="margin: 0;">
                                            <i onclick="updatePiplineForm('${newPipeline._id}')" style="cursor: pointer;"
                                                class="fa-solid fa-pen-to-square"></i>
                                            </label>

                                            <a onclick="deletePipeFromAdmin('${newPipeline._id}')"><i class="fa-regular fa-trash-can"
                                                    style="color: crimson;"></i></a>
                                        </span>
                                    </li>`;
        }
    });
    
    array.forEach((newPipeline) => {
        if(!newPipeline.defaultVal){
      allPipeContainer.innerHTML += `<li style="display: flex; border-radius: 4px; padding: 0 8px; border: 1px solid gray; justify-content: space-between; align-items: center; margin: 4px 0;">
                                        <form class="updatePipesForm" style="display: flex; justify-content: space-between; margin-right: 10px;"
                                            action="/user/pipeline/update/${newPipeline._id}" id="${newPipeline._id}" method="post">

                                            <input type="radio" value="on" disabled class="colorinp"
                                                style="width: 20px; height: 20px; border: none; padding: 0;"
                                                name="defaultVal" id="check-${newPipeline._id}">

                                            <input type="text" disabled name="title" style="text-transform: capitalize;" value="${newPipeline.title}"
                                                id="title-${newPipeline._id}">

                                            <input type="color" disabled class="colorinp" value="${newPipeline.color}"
                                                style="width: 28px; height: 28px; border: none; padding: 0;"
                                                name="color" id="color-${newPipeline._id}">
                                        </form>
                                        <span
                                            style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                                            <label for="title-${newPipeline._id}" style="margin: 0;">
                                            <i onclick="updatePiplineForm('${newPipeline._id}')" style="cursor: pointer;"
                                                class="fa-solid fa-pen-to-square"></i>
                                            </label>

                                            <a href="/user/pipeline/del/${newPipeline._id}"><i class="fa-regular fa-trash-can"
                                                    style="color: crimson;"></i></a>
                                        </span>
                                    </li>`;
        }
    });


    allPipeContainer.innerHTML += ' <button id="submitAllPipesUpdatedForm" onclick="submitAllPipesUpdatedForm()" class="btn btn-success btn-sm float-right mx-2 mt-2" hidden>Save</button>'
    radioBtns();
}


function displayPipesOnTop(array,allPipeContainer){
  allPipeContainer.innerHTML = '';
  array.forEach((newPipeline) => {
      if(newPipeline.defaultVal){
    allPipeContainer.innerHTML += `<div class="col-sm-6 col-lg-3">
                            <div class="card text-white" style="background-color: ${newPipeline.color};">
                                <div class="card-body pb-0">
                                    <h4 class="mb-0">
                                        <span class="count" style="text-transform: capitalize; font-size: x-large;">
                                            0
                                        </span>
                                    </h4>
                                    <p style="text-transform: capitalize; font-size: x-large;" class="text-light">
                                        ${newPipeline.title}</p>

                                </div>

                            </div>
                        </div>`;
      }
  });
  
  array.forEach((newPipeline) => {
      if(!newPipeline.defaultVal){
    allPipeContainer.innerHTML += `<div class="col-sm-6 col-lg-3">
                            <div class="card text-white" style="background-color: ${newPipeline.color};">
                                <div class="card-body pb-0">
                                    <h4 class="mb-0">
                                        <span class="count" style="text-transform: capitalize; font-size: x-large;">
                                            0
                                        </span>
                                    </h4>
                                    <p style="text-transform: capitalize; font-size: x-large;" class="text-light">
                                        ${newPipeline.title}</p>

                                </div>

                            </div>
                        </div>`;
      }
  });
}


function openActionBar(id) {
    let box = document.querySelector(`#actionBar-${id}`)
    if (box.style.display === 'none') {
        box.style.display = 'flex'
    }else box.style.display = 'none'

}

async function removePipeLoader(){
  let loadBox = document.querySelector('#addPipeLoader')
  if(loadBox){
      console.log('remove Pipe Loader ')
      loadBox.style.display = 'none'
  }
}
async function addPipeLoader(){
  let loadBox = document.querySelector('#addPipeLoader')
  if(loadBox){
      console.log('add Pipe Loader ')
      loadBox.style.display = 'flex'
  }
}

