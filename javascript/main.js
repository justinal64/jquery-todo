"use strict";

// Stretch goals
/*
1.  error handling - disabled buttons when there is nothing in input - ie i should not be able to click add button and it add an item with no content Done
2.  counting.  have it display how many todo items you have and how many are completed.  and update as you add new items and complete them
3.  complexity.  add a “due date” to your task - have inprogress list display by due date
*/

let $inputField = $('#input-field');
let $addTodo = $('#add-todo');
let $itemList = $('#item-list');
let $completeList = $('#complete-list');


// eventListeners
// eventListener on input field for enabling the button
$inputField.keyup(() => {
    if($inputField.val().length > 0) {
        // When the inputField is no longer empty enable the button
        $addTodo.attr("disabled", false);
    } else if ($inputField.val().length === 0) {
        // If the field is empty again disable the button
        $addTodo.attr("disabled", true);
    }

});

// eventListener for add button
$addTodo.click(() => {
    addToTodo($inputField.val());
    // Clear the input field and disable the button
    $inputField.val("");
    $addTodo.attr("disabled", true);
    badgeCount();
});


// eventListener for ToDo editting
$(document).on("click",".todo span.editable",function() {

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
    badgeCount();
});

// eventListener for delete button
$(document).on("click",".delete",function() {
    $(this).closest('div').remove();
    badgeCount();
});

// Add the input to the ToDo div
function addToTodo(inputValue) {
    $itemList.append(`<div class="todo">
                      <label class="form-check-label">
                          <input class="form-check-input" type="checkbox">
                              Complete
                      </label>
                      <span class="editable" >${inputValue}</span>
                      <button type="button" class="btn btn-danger delete">Delete</button></div>`);
}

// this sets the number of completed/todo tasks based on the # of items in the div
function badgeCount() {
    let lengOfToDoTasks = $('.todo-tasks').find('.todo').length;
    let lengOfCompleteTasks = $('.complete-tasks').find('.todo').length;
    $('#todo-badge').text(lengOfToDoTasks);
    $('#complete-badge').text(lengOfCompleteTasks);
}



