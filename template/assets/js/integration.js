function toggleList(button) {
    const nestedList = button.parentElement.parentElement.nextElementSibling;
    if (nestedList.style.display === "none" || !nestedList.style.display) {
        nestedList.style.display = "block";
        button.setAttribute('class', 'fa-solid fa-chevron-up')

    } else {
        nestedList.style.display = "none";
        button.setAttribute('class', 'fa-solid fa-chevron-down')
    }

    // document.querySelector('a').
}

//todo chage hole page permission 
function changePermissionOfPage(pageId) {
const checkbox = document.getElementById(`page-${pageId}`);
const isChecked = checkbox.checked;

// AJAX request bhejo
$.ajax({
url: `/user/fb/page/${pageId}`,
method: 'POST',
contentType: 'application/json',
data: JSON.stringify({ permitted: isChecked }),
success: function (response) {
    if (response.success) {
        checkbox.checked = response.permitted;
        //window.location.reload()
        let allFormsCheckBox = document.querySelectorAll(`.page-${pageId}`)
        allFormsCheckBox.forEach((formCheckBox)=>{
            formCheckBox.checked = response.permitted;
        })
    } else {
        // Error handle karo aur checkbox ki value revert karo
        alert(response.message || 'Failed to update permission');
        checkbox.checked = !isChecked;
    }
},
error: function (xhr, status, error) {
    console.error('Error updating permission:', error);
    alert('Something went wrong');
    // Agar error ho to checkbox ki value revert karo
    checkbox.checked = !isChecked;
}
});
}

//todo chage form permission and page when all same
function changePermissionOfForm(formId) {
const checkbox = document.getElementById(`form-${formId}`);
const isChecked = checkbox.checked;

// AJAX request bhejo
$.ajax({
url: `/user/fb/form/${formId}`,
method: 'POST',
contentType: 'application/json',
data: JSON.stringify({ permitted: isChecked }),
success: function (response) {
    if (response.success) {
        checkbox.checked = response.permitted;
       if(!response.PAGE.permitted && response.PAGE.pageId !== null){
        let pageCheckBox = document.querySelector(`#page-${response.PAGE.pageId}`)
        pageCheckBox.checked = false
       }
    } else {
        // Error handle karo aur checkbox ki value revert karo
        alert(response.message || 'Failed to update permission');
        checkbox.checked = !isChecked;
    }
},
error: function (xhr, status, error) {
    console.error('Error updating permission:', error);
    alert('Something went wrong');
    // Agar error ho to checkbox ki value revert karo
    checkbox.checked = !isChecked;
}
});
}

