"use strict";
let $inputField = $('#input-field');
let $addTodo = $('#add-todo');
let $itemList = $('#item-list');
let $completeList = $('#complete-list');

// eventListeners
$addTodo.click(() => {
    addToTodo($inputField.val());
    // Clear the input field
    $inputField.val("");
});

// eventListener for ToDo editting
$(document).on("click",".todo span.editable",function() {
    // Working!!!!
    // let span = $(this);
    // console.log("span", span);
    // let text = span.text();
    // console.log("text", text);
    // // Pop up an alert for the user to change the input
    // // Change this to an input inline if I have time
    // let new_text = window.prompt("Change value", text);
    // if (new_text !== null) {
    //     span.text(new_text);
    // }
    // End of Working!!!

    var input = $('<input class="editable" />', {
                'type': 'text',
                'name': 'unique',
                'value': $(this).text()
        });
        $(this).parent().append(input);
        $(this).remove();
        input.focus();

});

$(document).on('blur', 'input.editable', function () {
    $(this).parent().append($('<span />').text($(this).val()));
    $(this).remove();
});


// eventListener for checkbok for completed tasks
$(document).on("change",'input:checkbox',function() {
    // When the user clicks the Complete checkbox move the task to a new div
    let $closestDiv = $(this).closest('div');
    if($(this)[0].checked) {
        // If checked move to completed div
        $closestDiv.detach().appendTo($completeList);
    } else {
        //  unchecked move back to inprogress div
        $closestDiv.detach().appendTo($itemList);
    }
});




// Add the input to the ToDo div
function addToTodo(inputValue) {
    $itemList.append(`<div class="todo">
                      <label class="form-check-label">
                          <input class="form-check-input" type="checkbox">
                              Complete
                      </label>
                      <span class="editable" >${inputValue}</span></div>`);
}



