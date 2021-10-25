window.onload = display;//we use this to display or not certain blocks on the web page, for example if you are logged the connection form won't display


if (localStorage.getItem("tcompt") == null) {   //this condition is used to see if there is already a counter existing or not
            localStorage.setItem("tcompt", 1);  //if there isn't any counter existing, then we create one
    }
else {
    if (localStorage.getItem("name") != null) { //otherwise if there is already a counter it means that some lists already exist, so we show them
                createLists();
    }
}


    function createLists(){     //this function is used to show each existing list
        var temp= 0;
        while(temp<localStorage.getItem("tcompt") ){
            if(localStorage.getItem(temp+"compt") != null){
                showList(temp);
            }
            
            temp++;
        }
    }

    function showList(tag){//this function is used to show a specific list, tagged by it's number
        
        var test = document.createElement('div');
        test.innerHTML = '<div class="ui input"><input type="text" placeholder="Add..." name="' + tag +'entry" id="' + tag +'entry"></div><div class="ui buttons"><button class="ui button" type="button" name="Add" id="' + tag +'add" onclick="show('+tag+')">Add</button><button class="ui orange button" type="button" onclick="progress('+tag+')">In progress</button><button class="ui green button" type="button" onclick="finish('+tag+')">Finished</button><button class="ui grey button" type="button" onclick="reset('+tag+')">Reset</button></div><div id="tablehere'+tag+'"></div><br><br><div class="ui buttons"><button class="negative ui button" type="button" name="remove" id="' + tag +'remove" onclick="remove('+tag+')">Remove task</button><button class="negative ui button" type="button" onclick=removeList('+tag+')>Remove list</button></div><br><br>';
        test.setAttribute('id', 'table-here' + tag);//we first create the top of the list, with all the buttons to add or manae our tasks
        document.body.appendChild(test);
        table(tag); //we then call a function to show every task that is linked to this list
    }

       


    function add(){
        localStorage.setItem("liste" + localStorage.getItem("tcompt"), document.getElementById("liste").value);
        showList(localStorage.getItem("tcompt"));
        localStorage.setItem("tcompt", 1 + parseInt(localStorage.getItem("tcompt")));
    }


    function show(tag){
        storage(tag);
        table(tag);
    }

    function storage(tag){
        if (localStorage.getItem(tag+"compt") == null) {
            localStorage.setItem(tag+"compt", 1);
        }
        if(document.getElementById(tag+"entry").value != "" && document.getElementById(tag+"entry").value != null && document.getElementById(tag+"entry").value.length>2 && isNaN(document.getElementById(tag + "entry").value)==true){
            localStorage.setItem(tag+"entry" + localStorage.getItem(tag+"compt"), document.getElementById(tag+"entry").value);
            localStorage.setItem(tag+"compt", 1 + parseInt(localStorage.getItem(tag+"compt")));
            document.getElementById(tag + "entry").style.borderColor = "grey";
        }
        else{
            document.getElementById(tag+"entry").style.borderColor="red";
            alert("Incorrect entry, please write something possible");
        }
    }

    function table(tag){    //this function is used to show every single task attached to one list
        var table="<table class='ui celled table'><thead><tr><th>" + localStorage.getItem("liste" + tag) +"</th><th>Task</th></tr></thead><tbody>"; //we start by creating a table with 2 division for each row (a checkbox and the name of the task)
        var temp=parseInt(localStorage.getItem(tag+"compt"))-1;
        while(temp>0){
            if(localStorage.getItem(tag+"entry"+temp)!=null){   //our counter is our limit (there can't be moer task than the counter), but bevause we can remove tasks sometimes it can be that certain tasks doesn't exist, so we have to check for that
                var temp2="negative";
                temp3="icon close";
                if(localStorage.getItem(tag+"state"+temp) != null){ //we also use this loop to already check the status of the task, depending on the status we will apply a different class so it impacts the CSS
                    if(localStorage.getItem(tag + "state" + temp) =="positive"){
                        temp2 = "positive";
                        temp3="icon checkmark";
                    }
                    else{
                        if(localStorage.getItem(tag + "state" + temp) == "warning"){
                            temp2 = "warning";
                            temp3="clock outline icon";
                        }
                        
                    }
                    
                }
                table = table + "<tr id='"+tag+"row" + temp + "'><td><div class='ui checkbox'><input type='checkbox' id='"+tag+"box" + temp + "'><label></label></div></td><td class='"+temp2+"' id='task" + temp + "'><i class='"+temp3+"'></i>" + localStorage.getItem(tag+"entry" + temp) + "</td></tr>";
                // and then when every single task is finally written in the table we finnish by adding the button to remove tasks and the one to remove a list
            }
            temp--;
        }
        document.getElementById("tablehere"+tag).innerHTML=table;   //and we write this on the page
    }

    

    function remove(tag){   //this function is used to remove a task from a list
        var temp=0;
        while(temp<localStorage.getItem(tag+"compt")){  //we check every checkbox, if one is checked then we will delete the task in the local storage and on the web page

            if (document.getElementById(tag+"box" + temp)!= null && document.getElementById(tag+"box" + temp).checked == true) {
                document.getElementById(tag+"row"+temp).remove();
                localStorage.removeItem(tag+"entry"+temp);
            }
            
        temp++;
        }   

    }
    
    function removeList(tag){   //this function is used to remove an existing list, we use a tag as a parameter to be able to locate the list we want to delete
        var temp = 0;
        while (temp < localStorage.getItem(tag + "compt")) {    //with this loop i delete every single line of the table, plus the tasks in the database
            if (document.getElementById(tag + "box" + temp) != null) {
                document.getElementById(tag + "row" + temp).remove();
                localStorage.removeItem(tag + "entry" + temp);
            }
            if (localStorage.getItem(tag + "state" + temp) != null) {   //and of course we remove the different state of the tasks saved in the local storage
            localStorage.removeItem(tag + "state" + temp);
            }
            temp++;
        }
        if (localStorage.getItem(tag + "compt") != null) {  //we also remove the dedicated counter
            localStorage.removeItem(tag + "compt");
        }
        
        if(localStorage.getItem("liste"+tag) !=null){
            localStorage.removeItem("liste"+tag);
        }
        document.getElementById("table-here"+tag).remove(); //once everything is deleted we can finally delete the division of the list
    }

    function finish(tag) {  //this function is used to mark a task as completed
        temp=localStorage.getItem(tag+"compt")-1;
        while(temp>0){
            if(document.getElementById(tag + "box" + temp)!=null && document.getElementById(tag+"box"+temp).checked==true){ //we check each checkbox and if one is checked then we will change the state of the task in the storage
                localStorage.setItem(tag + "state" + temp, "positive")
            }
            temp--;
        }
        table(tag); //we then reshow the table, but with the state that changed
    }


    function progress(tag) {    //it's the exact same thing as above, but this time it will mark the task as "in progress"
            temp = localStorage.getItem(tag + "compt") - 1;
            while (temp > 0) {
                if (document.getElementById(tag + "box" + temp)!= null && document.getElementById(tag + "box" + temp).checked == true) {
                    localStorage.setItem(tag + "state" + temp, "warning")
                }
                temp--;
            }
            table(tag);
        }

    function reset(tag) {   //again it's the same thing, but this time it will mark the task as not done, just in case you missclicked on a task that asn't done or in progress
        temp = localStorage.getItem(tag + "compt") - 1;
        while (temp > 0) {
            if (document.getElementById(tag + "box" + temp) != null && document.getElementById(tag + "box" + temp).checked == true) {
                localStorage.setItem(tag + "state" + temp, "")
            }
            temp--;
        }
        table(tag);
}
    
function log() {    //this function is used when you first open the page. It will ask for a name and a surname, it will then show it on the upper left corner, and let you use the list app
    localStorage.setItem("name", document.getElementById("logsurname").value);  //we add the surname in the local storage
    localStorage.setItem("surname", document.getElementById("name").value); //we also add the name in the storage
}

//this function is used to display or not certain elements on the web page
function display() {
    if (localStorage.getItem("name") != null) { //if the name is set this means someone is connected, so we can hide the form and show the creation list block
        document.getElementById("form").style.display = "none";
        document.getElementById("logs").innerHTML = localStorage.getItem("name") + " " + localStorage.getItem("surname");
    }
    else {
        document.getElementById("add").style.display = "none";  //if the name isn't set this means that no one is connected, so we show the connection form
    }
}

//Function used to disconnect from your session and use another name
function disconnect() {
    localStorage.removeItem("surname"); //we remove the name in the storage
    localStorage.removeItem("name");//we also remove the surname in the storage
    location.reload();  //and we reload the page
}
