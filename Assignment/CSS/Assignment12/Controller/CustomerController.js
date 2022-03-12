//customer.................................................................
$("#btnSaveOrUpdate1").click(function () {
    //
    saveCustomer();
    //clearAll();/**/
    loadCustomer();
    console.log(customerDB);
});
function saveCustomer(){
    //gather customer information
    let customerID = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerTP = $("#txtCusTP").val();

    /* var customerObject={
                id:customerID,
                name:customerName,
                address:customerAddress,
                salary:customerTP

     };*/

    var customerObjectUpdate=new Customer(customerID,customerName,customerAddress,customerTP);

    /*create a html row*/
    //let row = `<tr><td>${customerID}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerTP}</td></tr>`;

    customerDB.push(customerObjectUpdate);



    for (let i = 0; i < customerDB.length; i++) {
        $('#formselector').append(new Option(customerDB[i].getCustomerID()));
    }

}

function loadCustomer() {
    alert("LoadCustomer Load");
    $("#customerTable").empty();
    for (let i = 0; i < customerDB.length; i++) {
        let row = `<tr><td>${customerDB[i].getCustomerID()}</td><td>${customerDB[i].getCustName()}</td><td>${customerDB[i].getCustAge()}</td><td>${customerDB[i].getCustTP()}</td></tr>`;
        $("#customerTable").append(row);

        $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').val("");

    }



    $("#customerTable>tr").click(function(){

        let cusID = $(this).children(":eq(0)").text(); // select first td and get text
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusSalary = $(this).children(":eq(3)").text();

        // console.log(cusID, cusName, cusAddress, cusSalary);
        $("#txtCusID").val(cusID);
        $("#txtCusName").val(cusName);
        $("#txtCusAddress").val(cusAddress);
        $("#txtCusTP").val(cusSalary);

    });

    $("#customerTable>tr").dblclick(function(){
        alert("Do you want to delete this row");
        $(this).closest("tr").remove();
        $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').val("");
    });

    $("#customerTable>tr").click(function(){
        var row_index = $(this).closest("tr").index();
        var col_index = $(this).index();
        console.log(row_index);
    });

    $("#updateBtn").click(function (){
        //alert("ayyqqqqa"+row_index);
        editRow();
    });

    function editRow(){
        let cusID1 = $(row_index).children(":eq(0)").text(); // select first td and get text
        let cusName1 = $(row_index).children(":eq(1)").text();
        let cusAddress1 = $(row_index).children(":eq(2)").text();
        let cusSalary1 = $(row_index).children(":eq(3)").text();
        $(row_index).children(":eq(0)").val(cusID1);
    }
}


//----------------------------------------Start issue of update


/* function loadCustomerUpadate() {

     //$("#customerTable").empty();
     for (var i of customerUpdateDb){
         let row = `<tr><td>${customerUpdateDb[i].getCustID()}</td><td>${customerUpdateDb[i].getCustName()}</td><td>${customerUpdateDb[i].getCustAge()}</td><td>${customerUpdateDb[i].getCustTP()}</td></tr>`;
         $("#customerTable").append(row);

         $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').val("");
     }

   /!*  $("#customerTable>tr").click(function(){

         let cusID = $(this).children(":eq(0)").text(); // select first td and get text
         let cusName = $(this).children(":eq(1)").text();
         let cusAddress = $(this).children(":eq(2)").text();
         let cusSalary = $(this).children(":eq(3)").text();

         // console.log(cusID, cusName, cusAddress, cusSalary);
         $("#txtCusID").val(cusID);
         $("#txtCusName").val(cusName);
         $("#txtCusAddress").val(cusAddress);
         $("#txtCusTP").val(cusSalary);

     });*!/

   /!*  $("#customerTable>tr").dblclick(function(){
         alert("Do you want to delete this row");
         $(this).closest("tr").remove();
         $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').val("");
     });
*!/
    /!* $("#customerTable>tr").click(function(){
         var row_index = $(this).closest("tr").index();
         var col_index = $(this).index();
         console.log(row_index);
     });*!/

    /!* $("#updateBtn").click(function () {
         //alert("ayyqqqqa"+row_index);
         editRow();
     });

     function editRow(){
         let cusID1 = $(row_index).children(":eq(0)").text(); // select first td and get text
         let cusName1 = $(row_index).children(":eq(1)").text();
         let cusAddress1 = $(row_index).children(":eq(2)").text();
         let cusSalary1 = $(row_index).children(":eq(3)").text();
         $(row_index).children(":eq(0)").val(cusID1);
     }*!/
 }
*/


//----------------------------------------end issue of update

// $("#txtCusID").focus();

$("#txtCusID").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusName").focus();
    }
});


$("#txtCusName").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusAddress").focus();
    }
});

$("#txtCusAddress").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusTP").focus();
    }
});


$("#btnSearch1").click(function () {

    var searchID=$("#exampleInputEmail1").val();
    var response=searchCustomer(searchID);
    if (response){
        $("#txtCusID").val(response.getCustomerID());
        $("#txtCusName").val(response.getCustName());
        $("#txtCusAddress").val(response.getCustAge());
        $("#txtCusTP").val(response.getCustTP());
    }else {
        alert("Invalid ID.")
    }
});

function searchCustomer(id){

    for (let i=0;i<customerDB.length;i++){
        if(customerDB[i].getCustomerID()==id){
            return customerDB[i];
        }
    }
}

//start Validation************************************************************

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[A-z ]{5,20}$/;

//method calling start

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP').on('blur', function () {
    formValid();
});

$("#txtCusID").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusTP").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

function checkIfValid() {
    var cusID = $("#txtCusID").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusAddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtCusTP").focus();
                var cusSalary = $("#txtCusTP").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        /*  saveCustomer();*/
                        clearAll();
                    }
                } else {
                    $("#txtCusTP").focus();
                }
            } else {
                $("#txtCusAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusID").focus();
    }
}



// form valid method

function formValid() {
    var cusID = $("#txtCusID").val();
    $("#txtCusID").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtCusTP").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtCusTP").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtCusTP").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
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

$("#updateBtn").click(function () {
    alert("akila");

    let customerId=$("#txtCusID").val();
    let customerName=$("#txtCusName").val();
    let customerAge=$("#txtCusAddress").val();
    let customerTP=$("#txtCusTP").val();
    var CustObj=new Customer(customerId,customerName,customerAge,customerTP);
    if (confirm("Do you want to update this Customer?")){
        updateCustomer1(CustObj);
        loadCustomer();
        alert("Updated.");
    }
});
function updateCustomer1(obj) {
    alert("updateCustomer Calleeeeeeeeeeeeeeed");
    for (let i=0;i<customerDB.length;i++){
        if(customerDB[i].getCustomerID()==obj.getCustomerID()){
            customerDB[i].setCustID(obj.getCustomerID());
            customerDB[i].setCustName(obj.getCustName());
            customerDB[i].setCustAge(obj.getCustAge());
            customerDB[i].setCustTP(obj.getCustTP());
        }
    }
}
//end customer...................................