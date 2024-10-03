document
  .getElementById("addPipelineBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const title = document.querySelector("#inputPassword2").value;
    const color = document.querySelector("#colorinp2").value;
    const form = document.querySelector("#addPipelineForm");

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
        form.reset();
      })
      .catch(function (error) {
        console.error(error);
        alert(
          "There was an error adding the pipeline: " +
            (error.response.data.error || "")
        );
      });
  });

function submitAllPipesUpdatedForm() {
    
    const forms = document.querySelectorAll(".updatePipesForm");
    const allData = []; // Array to hold all form data

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

    console.log(allData); // Log all collected data

    // Send data to server
    axios
      .post("/user/pipeline/update", allData)
      .then(function (response) {
        console.log(response.data);
        // alert("Pipelines updated successfully!");
        let allPipeContainer = document.getElementById("allPipesShowing");
        allPipeContainer.innerHTML = "";
        displayPipes(response.data,allPipeContainer)
        let btn = document.getElementById("submitAllPipesUpdatedForm")
        btn.hidden = true
      })
      .catch(function (error) {
        console.error(error);
        alert("There was an error updating the pipelines.");
      });
  };

function deletePipeFromAdmin(id) {
  axios
    .get(`/user/pipeline/del/${id}`)
    .then(function (response) {
      // Yaha par aap response ko handle kar sakte hain
      console.log(response.data);
      let allPipeContainer = document.getElementById("allPipesShowing");
        allPipeContainer.innerHTML = "";
        displayPipes(response.data,allPipeContainer);
      })

    .catch(function (error) {
      // Agar koi error aata hai, toh yaha par handle karein
      console.error("Error fetching data:", error);
    });
}


function displayPipes(array,allPipeContainer){
    array.forEach((newPipeline) => {
        if(newPipeline.defaultVal){
      allPipeContainer.innerHTML += `<li style="display: flex; border-radius: 4px; padding: 0 8px; border: 1px solid gray; justify-content: space-between; align-items: center; margin: 4px 0;">
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



function openActionBar(id) {
    let box = document.querySelector(`#actionBar-${id}`)
    if (box.style.display === 'none') {
        box.style.display = 'flex'
    }else box.style.display = 'none'

}