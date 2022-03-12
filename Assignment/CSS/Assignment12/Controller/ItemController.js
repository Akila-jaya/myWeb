//Item....................................................................

$("#btnSaveOrUpdate").click(function () {
   // alert("Do you want really add this item...?");
    //alert("a")
    saveItem();
    loadItem();

    //gather customer information

});


$("#itemCode").keydown(function (event) {
    if (event.key == "Enter") {

        $("#itemName").focus();
    }
});


$("#itemName").keydown(function (event) {
    if (event.key == "Enter") {
        $("#itemQty").focus();
    }
});


$("#itemQty").keydown(function (event) {
    if (event.key == "Enter") {
        $("#itemPrice").focus();
    }
});


function saveItem(){
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemQty = $("#itemQty").val();
    let itemPrice = $("#itemPrice").val();

    var itemObject={
        id:itemCode,
        name:itemName,
        qty:itemQty,
        price:itemPrice
    };

    itemDB.push(itemObject);
    //console.log(itemDB);
    $("#formselectorOrder").append(new Option(itemObject.id));


}


function loadItem() {
    //alert("lo")
    $("#itemTable").empty();
    for (var i of itemDB){
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.qty}</td><td>${i.price}</td></tr>`;
        $("#itemTable").append(row);

        $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    }


    $("#itemTable>tr").click(function(){

        let itemCode = $(this).children(":eq(0)").text(); // select first td and get text
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let itemPrice = $(this).children(":eq(3)").text();

        console.log(itemCode, itemName, itemQty, itemPrice);
        $("#itemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemQty").val(itemQty);
        $("#itemPrice").val(itemPrice);
    });


    $("#itemTable>tr").dblclick(function(){
        alert("Do you want to delete this row");
        $(this).closest("tr").remove();
        $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    });
}


$("#btnSearch").click(function () {

    var id=$("#exampleInputEmail12").val();

    var obj=search1(id);
    if(obj){
        $("#itemCode").val(obj.id);
        $("#itemName").val(obj.name);
        $("#itemQty").val(obj.qty);
        $("#itemPrice").val(obj.price);
    }else{
        alert("No Such a Customer");
        $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    }
});



function search1(ids){
    for (var i=0;i<itemDB.length;i++){
        if(itemDB[i].id==ids){
            return itemDB[i];
        }
    }
}

//start Validation************************************************************

var itemCodeRegEx = /^(I00-)[0-9]{3}$/;
var itemNameRegEx = /^[A-z ]{4,}$/;
var itemUnitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
var itemQtyOnHandRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


//method calling start

$('#itemCode,#itemName,#itemQty,#itemPrice').on('blur', function () {
    formValid1();
});


$("#itemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid1();
    }
});

$("#itemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid1();
    }
});

$("#itemQty").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid1();
    }
});

$("#itemPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid1();
    }
});

function checkIfValid1() {
    var cusID = $("#itemCode").val();
    if (itemCodeRegEx.test(cusID)) {
        $("#itemName").focus();
        var cusName = $("#itemName").val();
        if (itemNameRegEx.test(cusName)) {
            $("#itemQty").focus();
            var cusAddress = $("#itemQty").val();
            if (itemUnitPriceRegEx.test(cusAddress)) {
                $("#itemPrice").focus();
                var cusSalary = $("#itemPrice").val();
                var resp = itemQtyOnHandRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        /*  saveCustomer();*/
                        clearAll();
                    }
                } else {
                    $("#itemPrice").focus();
                }
            } else {
                $("#itemQty").focus();
            }
        } else {
            $("#itemName").focus();
        }
    } else {
        $("#itemCode").focus();
    }
}



// form valid method

function formValid1() {
    var cusID = $("#itemCode").val();
    $("#itemCode").css('border', '2px solid green');
    $("#lblcusid1").text("");
    if (itemCodeRegEx.test(cusID)) {
        var cusName = $("#itemName").val();
        if (itemNameRegEx.test(cusName)) {
            $("#itemName").css('border', '2px solid green');
            $("#lblcusname1").text("");
            var cusAddress = $("#itemQty").val();
            if (itemUnitPriceRegEx.test(cusAddress)) {
                var cusSalary = $("#itemPrice").val();
                var resp = itemQtyOnHandRegEx.test(cusSalary);
                $("#itemQty").css('border', '2px solid green');
                $("#lblcusaddress1").text("");
                if (resp) {
                    $("#itemPrice").css('border', '2px solid green');
                    $("#lblcussalary1").text("");
                    return true;
                } else {
                    $("#itemPrice").css('border', '2px solid red');
                    $("#lblcussalary1").text("Item Price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#itemQty").css('border', '2px solid red');
                $("#lblcusaddress1").text("Item qty is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#itemName").css('border', '2px solid red');
            $("#lblcusname1").text("Item Name is a required field : Mimimum 4,Spaces Allowed");
            return false;
        }
    } else {
        $("#itemCode").css('border', '2px solid red');
        $("#lblcusid1").text("Item ID is a required field : Pattern I00-000");
        return false;
    }
}


function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveOrUpdate1").attr('disabled', false);
    } else {
        $("#btnSaveOrUpdate1").attr('disabled', true);
    }
}

//End Validation**************************************************************
// end Item..................................................
