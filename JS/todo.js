
var data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{
	completed: [],
	todo: []
};

var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M17.573 1.848c.083.699-.476 1.152-1.182 1.152h-8.774c-.704 0-1.266-.452-1.182-1.156-1.329.281-4.435 1.159-4.435 2.516 0 .303.103.7.235 1.361 3.175 2.953 15.758 3.088 19.476.244.159-.824.289-1.278.289-1.611 0-1.333-3.091-2.223-4.427-2.506zm3.113 6.897c-.868 4.587-2.184 10.54-2.709 13.287-1.079 1.312-3.545 1.968-6.013 1.968s-4.935-.656-6.013-1.968c-.529-2.884-1.834-8.868-2.684-13.414.679.274 1.408.492 2.149.67 0 0 2.132 10.441 2.382 11.747.722.514 2.237.965 4.166.965 1.933 0 3.452-.454 4.17-.969.224-1.131 2.411-11.661 2.411-11.661.733-.165 1.46-.367 2.141-.625zm-13.069-6.763c.922 0 1.669-1.08 1.669-1.982h5.437c0 .902.747 1.982 1.668 1.982h-8.774z"/></svg>'
var completeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="Nofill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8 c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>'

refreshList();

document.getElementById('add').addEventListener('click', function() {
	var value = document.getElementById('item').value;
	if (value) {
		addItemTodo(value);
		document.getElementById('item').value = '';
		data.todo.push(value);
		Updater();
	}
});

document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
  	addItemTodo(value);
	document.getElementById('item').value = '';
	data.todo.push(value);
	Updater();
  }
});

function refreshList() {
	if (!data.completed.length && !data.todo.length) return;

	for (var a = 0; a < data.completed.length; a++) {
		var value = data.completed[a];
		addItemTodo(value, true);
	}

	for (var b = 0; b < data.todo.length; b++) {
		var value = data.todo[b];
		addItemTodo(value);
	}

}

function Updater(){
	localStorage.setItem('todolist', JSON.stringify(data));

}


function removeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.completed.splice(data.completed.indexOf(value),1);
	}
	else{
		data.todo.splice(data.todo.indexOf(value),1);
	}
	Updater();
	parent.removeChild(item);
}

function completeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.completed.splice(data.completed.indexOf(value),1);
		data.todo.push(value);
	}
	else{
		data.todo.splice(data.todo.indexOf(value),1);
		data.completed.push(value);
	}

	Updater();

	var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');
	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[1]);

}

function addItemTodo(text, todo) {

	var list = (todo) ? document.getElementById('todo'):document.getElementById('completed');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG;

	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG;

	complete.addEventListener('click', completeItem);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);

	list.insertBefore(item, list.childNodes[1]);
}


