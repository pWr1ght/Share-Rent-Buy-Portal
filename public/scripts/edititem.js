document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addAttachLnk").addEventListener('click',()=>{
        document.getElementById("newAttached").style.display = "block";
    });
});

function saveEdit() {
    //modal for saving screen
    document.getElementById("loadingModalStatus").textContent = "Saving new listing...";
    $("#LoadingModal1").modal();

    console.log("Saving edit......");
    let itemId = document.getElementById("edit_item_Id").value;
    let title = document.getElementById("edit_name").value;
    let descr = document.getElementById("edit_descr").value;
    let price = document.getElementById("edit_price").value;
    let category = document.getElementById("inputCat").value;
    let street = document.getElementById("inputAddress").value;
    let city = document.getElementById("inputCity").value;
    let state = document.getElementById("inputState").value;
    let zip = document.getElementById("inputZip").value;
    let newfilelist = document.getElementById("myFile").files;

    let item = {
        itemID: itemId,
        catID: category,
        itemName: title,
        itemDescription: descr,
        itemPrice: price,
        itemAddress: street,
        itemCity: city,
        itemState: state,
        itemZip: zip,
    }

    var req = new XMLHttpRequest();
    req.open('POST', '/editItem/save', true)
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        //Process response
        if (req.status >= 200 && req.status < 400) {
            var resp = req.responseText;
            console.log(resp);
            
            //upload and delete attachments
            fetch('/aws/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({deleteList:gatherDeleteAttachments("close")})
            })
                .then((data1) => {
                    return data1.json();           
                }).then((data2) => {
                    console.log(data2);
                    //upload attachment
                    document.getElementById("loadingModalStatus").textContent = "Updating attachment...";
                    var form = document.forms.namedItem("fileinfo");
                    var formData = new FormData(form);
                    formData.append("listId",itemId);
                    formData.append("newFileCt",newfilelist.length);
                    return fetch('/aws/upload', {method: 'POST', body: formData});				
                }).then((data3) => {
                    return data3.json();
                }).then((data4) => {
                    console.log(data4);
                    document.getElementById("loadingModalStatus").textContent = data4.uploadStatus;
                    setTimeout(function(){
                        location.reload();
                    },2000);
                    
                    return data4; 
                })
                .catch((err) => console.log(err));  

        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(item));
}

function cancelEdit() {
    document.getElementById("edits").hidden = true;
    document.getElementById("cards").hidden = false;
    document.getElementById("edit_name").value = "";
    document.getElementById("edit_descr").value = "";
    document.getElementById("edit_price").value = "";
    document.getElementById("inputCat").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputCity").value = "";
    document.getElementById("inputState").value = "";
    document.getElementById("inputZip").value = "";
    document.getElementById("curAttached").style.display = "none"
    document.getElementById("addAttachLnk").disabled = false;
    document.getElementById("newAttached").style.display = "none"
    document.getElementById("attachImgs").innerHTML = "";
    document.getElementById("myFile").value = null;
}

function populateCategories(data) {
    let category = document.getElementById("inputCat");
    var req = new XMLHttpRequest();
    req.open('GET', '/editItem/cats', true);
    req.addEventListener('load', function () {
        //Process response
        if (req.status >= 200 && req.status < 400) {
            var resp = JSON.parse(req.responseText);
            // Add a dropdown option for every category found in the data base
            for (var i = 0; i < resp.length; i++) {
                var option = document.createElement("option");
                option.text = resp[i].categoryName;
                option.value = resp[i].categoryId;
                console.log(data.categoryId);
                // Select current category
                if (option.value == data.categoryId) {
                    option.selected = true;
                }
                category.add(option);
            }
            console.log(resp);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}

function populateEditForm(data) {
    let itemId = document.getElementById("edit_item_Id");
    let title = document.getElementById("edit_name");
    let descr = document.getElementById("edit_descr");
    let price = document.getElementById("edit_price");
    let category = document.getElementById("inputCat");
    let street = document.getElementById("inputAddress");
    let city = document.getElementById("inputCity");
    let state = document.getElementById("inputState");
    let zip = document.getElementById("inputZip");
    let imgs = document.getElementById("attachImgs");

    title.focus();
    itemId.value = data.id;
    title.value = data.itemName;
    descr.value = data.itemDescription;
    price.value = data.itemPrice;
    street.value = data.itemAddress;
    city.value = data.itemCity;
    zip.value = data.itemZip;

    for (var i = 0; i < state.options.length; i++) {
        if (state.options[i].value == data.itemState) {
            state.options[i].selected = true;
        }
    }

    for(let n = 0; n < data.attachments.length; n++){
        let tmp = document.createElement("img");
        tmp.className = "img-thumbnail";
        tmp.setAttribute("id", "att_"+data.attachments[n].AttachId);
        tmp.setAttribute("src", data.attachments[n].AttLink);
        
        let tmp2 = document.createElement("span");
        tmp2.setAttribute("id", "attname_"+data.attachments[n].AttachId);
        tmp2.setAttribute("data-filename", data.attachments[n].AttName);
        tmp2.setAttribute("data-id", data.attachments[n].AttachId);
        tmp2.setAttribute("data-deleted", '0');
        tmp2.className = "close";
        tmp2.textContent = "X";
        let tmp3 = document.createElement("div");
        tmp3.className = "img-wrap col-sm-4";
        tmp3.appendChild(tmp2);
        tmp3.appendChild(tmp);
        imgs.appendChild(tmp3);
    }
    addImageRemoveFunction();
    populateCategories(data);
}

function editItem(id) {
    document.getElementById("edits").hidden = false;
    document.getElementById("cards").hidden = true;

    var req = new XMLHttpRequest();
    req.open('POST', '/editItem/id', true)
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        //Process response
        if (req.status >= 200 && req.status < 400) {
            var resp = JSON.parse(req.responseText);
            populateEditForm(resp);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    payload = { id: id }
    req.send(JSON.stringify(payload));
}

function deleteItem(id) {

    var r = confirm("This will permanently remove the item.\nThis change may not be undone!");
    if (r == true) {

        //delete attachment first, then the item from the database
        fetch('/aws/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({deleteList:gatherDeleteAttachments("attachdetails_" + id)})
            })
			.then((data1) => {

				return data1.json();
	
			}).then((data2) => {
				console.log(data2);
				//delete listing
				return fetch('/editItem', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({id:id})});
						
			}).then((data3) => {
				return data3.json();
			}).then((data4) => {
				console.log(data4);
				location.reload();
				return data4; 
			})
			.catch((err) => console.log(err));
    }
}

//This function attaches the 'x' to the pictures and
//sets up the logic for displaying various attachment components
function addImageRemoveFunction(){
    //reference from stackoverflow
    var closeBtns = document.querySelectorAll('.img-wrap .close')

    for (var i = 0, l = closeBtns.length; i < l; i++) {
        closeBtns[i].addEventListener('click', function() {
            this.setAttribute("data-deleted",'1');
            this.parentElement.style.display = "none";
            //var imgWrap = this.parentElement;
            //imgWrap.parentElement.removeChild(imgWrap);
            let imgWrapList = document.getElementsByClassName("img-wrap");
            let curDeletelist = gatherDeleteAttachments("close");
            if(imgWrapList.length-curDeletelist.files.length > 0){
                document.getElementById("curAttached").style.display = "block";
            }else{
                document.getElementById("curAttached").style.display = "none";
            }
            
            document.getElementById("addAttachLnk").disabled = false;
            
        });
    }

    //disable add attachment link
    let imgWrapList = document.getElementsByClassName("img-wrap");
    if(imgWrapList.length == 3){
        document.getElementById("addAttachLnk").disabled = true;
    }else{
        document.getElementById("addAttachLnk").disabled = false;
    }
    if(imgWrapList.length > 0){
        document.getElementById("curAttached").style.display = "block";
    }else{
        document.getElementById("curAttached").style.display = "none";
    }
}

//This function gathers the attachments to be deleted
function gatherDeleteAttachments(imgtagClassName){
    //an object: {deleteCt:,files:[{attachId:,filename:}]}
    let curImgList = document.getElementsByClassName(imgtagClassName);
    let result = {files:[]};
    let deleteCt = 0;
    for(let i = 0; i < curImgList.length; i++){
        if(curImgList[i].getAttribute('data-deleted') == 1){
            result.files.push({"attachId":curImgList[i].getAttribute('data-id'),
                        "filename":curImgList[i].getAttribute('data-filename')});
            deleteCt++;
        }
    }
    result.deleteCt = deleteCt;
    return result;
}