
function Validator(options) {
    function validation(inputEle,rule){
        var errorEle = inputEle.parentElement.querySelector('.'+options.errormesEle);
        var formgrEle = inputEle.parentElement;
        var errormes;
        var rules = selectorRules[rule.selector];
        for (const item of rules) {
            errormes=item(inputEle.value);
            if(errormes) break;
        }
        // var errormes = rule.isvalid(inputEle.value);  
        if(errormes){      
            errorEle.innerText = errormes;
            formgrEle.classList.add('invalid');
        }
        else {
            errorEle.innerText='';
            formgrEle.classList.remove('invalid');
        }
        return !errormes;  
    }
    var formElement = document.querySelector(`#${options.form}`);
    var selectorRules = {}
    if (formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();
            is_form_valid = true;
            options.rules.forEach(rule=>{
                var inputEle = formElement.querySelector(rule.selector);
                var is_valid = validation(inputEle,rule);
                if(!is_valid) {
                    is_form_valid = false;
                }
            });
            // console.log(is_form_valid);
            
            if(is_form_valid){
                //submit bang cach gui API bang js
                if(typeof options.onSubmit ==='function'){
                    //submit bang cach gui API bang js
                    var data ={}
                    var formEnableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    console.log(formEnableInputs);
                    for (const item of formEnableInputs) {
                        data[item.name] = item.value;
                    }
                    options.onSubmit(data);
                }else { //submit mac dinh cua trinh duyet
                    formElement.submit();
                }
            }
        }
        options.rules.forEach(rule=> {

            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.isvalid);
            }else {
                selectorRules[rule.selector]=[rule.isvalid];
            }

            var inputEle = document.querySelector(rule.selector);
            if(inputEle){
                inputEle.onblur = function() {
                    validation(inputEle,rule);
                                      
                }
                inputEle.oninput = ()=>{
                    var errorEle = inputEle.parentElement.querySelector('.'+options.errormesEle);
                    var formgrEle = inputEle.parentElement;
                    errorEle.innerText='';
                    formgrEle.classList.remove('invalid');
                }
            }    
        });
    }
    
}
Validator.isRequire=(selector,mes)=>{
    return {
        selector : selector,
        isvalid :(str)=> {
            return str.trim() ? undefined :mes || "Vui lòng nhập đầy đủ!";
        },
    }
}
Validator.isEmail=(selector,mes)=>{
    return {
        selector : selector,
        isvalid :(value)=> {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(value)? undefined:mes ||"Vui lòng nhập đúng email!"
        },
    }
}
Validator.minLenght=(selector,min)=>{
    return {
        selector : selector,
        isvalid :(value)=> {
            return value.length >=min?undefined :"Mật khẩu phải lớn hơn hoặc bằng " + min +" kí tự";
        },
    }
}
Validator.confirmPass=(selector,selector2,mes="")=>{
    return {
        selector : selector,
        isvalid :(value)=> {
            var pass = document.querySelector(selector2).value;
            // console.log(pass);
            return (value === pass)?undefined :mes || "Giá trị không khớp!"
        },
    }
}