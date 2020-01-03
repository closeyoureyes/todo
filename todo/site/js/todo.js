var list = new Sortable(document.getElementsByClassName("collection")[0]);
var todolist = [{id:1272, text:"do something crazy", done:true}, {id:1288, text:"make me happy", done:false}, {id:3272, text:"kill myself", done:false}];
var todomother = document.getElementsByClassName("collection")[0];
var queue = [];
var hidden = [];

function makeDoneTodo () {
  var id = parseInt(this.id.split("toggle-")[1]);
  var h4 = this.parentElement.children[1];
  var child = this.children[0];
  if (this.classList.contains("load-complete")) {
    this.classList.remove("load-complete");
    queue.push({event:"done", done: false, id: id});
    h4.classList.remove("cross");
    child.style.display = "none";
    this.parentElement.done = "false";
  } else {
    this.classList.add("load-complete");
    queue.push({event:"done", done: true, id: id});
    h4.classList.add("cross");
    child.style.display = "block";
    this.parentElement.done = "true";
  }
}

function alreadyDone () {
  var h4 = this.parentElement.children[1];
  var child = this.children[0];
  if (this.classList.contains("load-complete")) {
    this.classList.remove("load-complete");
    h4.classList.remove("cross");
    child.style.display = "none";
    this.parentElement.done = "false";
  } else {
    this.classList.add("load-complete");
    h4.classList.add("cross");
    child.style.display = "block";
    this.parentElement.done = "true";
  }
}

function deleteTodo () {
  var id = parseInt(this.id.split("delete-")[1]);
  todomother.removeChild(document.getElementById("li-" + id));
  queue.push({event:"remove", id: id})
}

function addTodoElement (todo, pusher) {
  if (!pusher) {document.getElementsByClassName("toggle-all")[0].checked = true;}
  var todostring = `<div class="todo" id="${todo.id}">
      <div class="circle-loader checkbox" id="toggle-${todo.id}">
        <div class="checkmark draw"></div>
      </div>
      <h4 id="name-${todo.id}">${todo.text}</h4>
      <div class="delete" id="delete-${todo.id}">&times;</div>
    </div>`;
  var li = document.createElement("li");
  li.id = "li-" + todo.id;
  li.innerHTML = todostring;
  if (todomother.firstChild) {
    todomother.insertBefore(li, todomother.firstChild);
  } else {
    todomother.append(li);
  }
  var toggle = li.children[0].children[0];
  toggle.onclick = makeDoneTodo;
  if (todo.done) {toggle.done = alreadyDone; toggle.done();}
  var del = li.children[0].children[2];
  del.onclick = deleteTodo;
  if (pusher) {
    queue.push ({event:"create", todo:todo})
  }
}

todolist.forEach(addTodoElement);
var addData;
document.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    var cont, todo;
    cont = getTodo();
    if (cont) {
      addTodoElement(addData, true);
    }
  }
});

document.getElementsByClassName("toggle-all")[0].onclick = function () {
  if (this.checked) {
    hidden.forEach(function (elem) {todomother.append(elem)});
    hidden = [];
} else {
  while (todomother.firstChild) {
    hidden.push(todomother.firstChild);
    todomother.removeChild(todomother.firstChild);
  }
}}

function getTodo () {
  var inp = document.getElementById("main-input");
  var text = inp.value;
  text = text.replace(/ +/g, ' ').trim();
  if (text.length > 2) {
    inp.value = "";
    addData = {text: text, id : Math.floor(Math.random() * (1000000 - 1 + 1)) + 1, done:false}
    return true;
  } else {return false, false}
}

//document.getElementsByClassName("todo").forEach
