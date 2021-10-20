
// console.log(courses_ele);
var courseApi = 'http://localhost:3000/courses';
function start(){
    getCourses(renderCoursesAll);
    handleCreateCourses();
}
start();

function getCourses(callback){
    fetch(courseApi)
    .then( (response)=>{
        return response.json();
    } )
    .then(callback);
}
function createCourse(data,callback){
    options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi,options)
    .then( (response)=> {
        return response.json();
    }).then(callback);
}
function updateCourse(id){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var des = document.querySelector('input[name="des"]').value;
        var data = {
            name:name,
            des : des
        } 

        //gui du lieu ve server :
        options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(courseApi+'/'+id,options)
        .then( (response)=> {
            return response.json();
        }).then((result)=>{
            var li_ele = document.getElementById(id);
            html = `<h3>${result.name}</h3>
            <p>${result.des}</p>
            <button onclick = deleteCourse(${result.id}) > Xoá </button>
            <button onclick = handleUpdateCourse(${result.id}) > Sửa </button>
            `;
            li_ele.innerHTML = html;
        });
    }
}
function renderCoursesAll(courses){
    var courses_ele = document.querySelector('.list-courses');
    var html_arr = courses.map((course)=>{
        var html_course = `<li id='${course.id}'>
        <h3>${course.name}</h3>
        <p>${course.des}</p>
        <button onclick = deleteCourse(${course.id}) > Xoá </button>
        <button onclick = handleUpdateCourse(${course.id}) > Sửa </button> 
        </li>`;
        return html_course;
    });
    courses_ele.innerHTML = html_arr.join('');
}
function renderCourse(course){
    var courses_ele = document.querySelector('.list-courses');
    var html_course = `<li id='${course.id}'>
    <h3>${course.name}</h3>
    <p>${course.des}</p>
    <button onclick = deleteCourse(${course.id}) > Xoá </button> 
    <button onclick = handleUpdateCourse(${course.id}) > Sửa </button> 
    </li>`;
    courses_ele.innerHTML += html_course;
}

function handleCreateCourses(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(e){
        var name = document.querySelector('input[name="name"]').value;
        var des = document.querySelector('input[name="des"]').value;
        var data = {
            name:name,
            des : des
        }
        createCourse(data,renderCourse);
    }
}
function deleteCourse(id){
    options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    }
    fetch(courseApi+'/'+id,options)
    .then( (response)=> {
        return response.json();
    }).then((data)=>{
        elementRemove = document.getElementById(id);
        elementRemove.remove();
    });
}
function handleUpdateCourse(id){
    renderFormCourse(id);
    updateCourse(id);
}
function renderFormCourse(id){

    // lay course tu csdl 
    options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    }
    fetch(courseApi+'/'+id,options)
    .then( (response)=> {
        return response.json();
    }).then((data)=>{
        var name_ele = document.querySelector('input[name="name"]');
        var des_ele = document.querySelector('input[name="des"]');
        var createBtn = document.querySelector('#create');
        name_ele.value= data.name;
        des_ele.value = data.des;
        createBtn.innerText = 'Update';
    });
    
}