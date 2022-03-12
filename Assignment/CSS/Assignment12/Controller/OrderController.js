//start oders..................................................................................................


/*
    var customerObject3={
        id:"c001",
        name:"name1",
        address:"adress",
        salary:"salary"
    };*/

/*    $('#formselector').append(new Option(customerObject3.id));*/






/*setText();

function setText(){
    $("#inputCity1").val(customerObject3.name);
    $("#inputSalary1").val(customerObject3.address);
    $("#inputSalary11").val(customerObject3.address);

}
*/

//orders customer combo box


/*for (let i = 0; i < customerDB.length; i++) {
    $('#formselector').append(new Option(customerDB[i].getCustomerID()));
}*/



$("#formselector").click(function () {

    var oIds=$("#formselector").val();
    var customerObj=searchoIds(oIds);
    loadTxtField(customerObj);

});

//orders item combo box

$("#formselectorOrder").click(function () {

    var iIds=$("#formselectorOrder").val();
    var itemObj=searchiIds(iIds);
    loadItemTxtField(itemObj);

});



//search customer ids
function searchoIds(id){
    for (let i=0;i<customerDB.length;i++){
        if(customerDB[i].getCustomerID()==id){
            return customerDB[i];
        }
    }
}


// search item ids

function searchiIds(ids){
    for (var i=0;i<itemDB.length;i++){
        if(itemDB[i].id==ids){
            return itemDB[i];
        }
    }
}

function  loadTxtField(customerObj){
    $("#inputCity1").val(customerObj.getCustName);
    $("#inputSalary1").val(customerObj.getCustTP);
    $("#inputSalary11").val(customerObj.getCustAge);
}


function  loadItemTxtField(itemObj){
    $("#validationDefaultUsername").val(itemObj.name);
    $("#validationDefault03").val(itemObj.price);
    $("#validationDefault0311").val(itemObj.qty);
}


$("#validationDefault031").click(function () {
    var orderQty=$("#validationDefault031").val();
    var qtyOnHand=$("#validationDefault0311").val();
    $("#validationDefault031").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (qtyOnHand<orderQty){
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");

    }else{
        $("#lblcusid").text("");

    }

});

$("#orderAddItem").click(function (){

    saveaddItem();
    loadaddItem();
});

function saveaddItem(){

    let itemIds = $("#formselectorOrder").val();
    let itemPrice = $("#validationDefault03").val();
    let itemName = $("#validationDefaultUsername").val();
    let qtyOnHand = $("#validationDefault0311").val();
    let orderQuantity = $("#validationDefault031").val();

    // var itemObjectUpdate=new Customer(itemIds,itemPrice,itemName,qtyOnHand,orderQuantity,orderQuantity*itemPrice);

    var addItemobj={
        iId:itemIds,
        iPrice:itemPrice,
        iName:itemName,
        iQty:qtyOnHand,
        iOrderQty:orderQuantity,
        iTotal:orderQuantity*itemPrice
    };

    addItem.push(addItemobj);



    var total = ($("#totalId").text());
    total=parseInt(total);
    total=total+parseInt(addItemobj.iTotal);
    $("#totalId").text(total);
    $("#subtotalId").text(total);


}

//load item to table
function loadaddItem() {

    $("#orderAddItemTable").empty();
    for (var i of addItem){
        let row = `<tr><td>${i.iId}</td><td>${i.iName}</td><td>${i.iPrice}</td><td>${i.iOrderQty}</td><td>${i.iTotal}</td></tr>`;
        $("#orderAddItemTable").append(row);

        $('#formselectorOrder,#validationDefault03,#validationDefaultUsername,#validationDefault0311,#validationDefault031').val("");
    }
}


//balance,incffient cash prepare
$("#validationTooltip01").click(function (){

    let cash =parseInt($("#validationTooltip01").val());
    var total = parseInt($("#subtotalId").text());
    var balance=cash-total;
    balance=parseInt(balance);
    if (cash<total){
        $("#validationTooltipUsername").val("");

    }else{
        $("#validationTooltipUsername").val(balance);
    }

});

//discount cliced...prepare,sub total prepare

$("#validationTooltip02").click(function (){

    var discount= parseInt($("#validationTooltip02").val());
    var total = parseInt($("#totalId").text());
    var subTotal=total-total*discount/100;
    subTotal=parseInt(subTotal);
    $("#subtotalId").text(subTotal);
});

$("#PurchaseButton").click(function (){

    var orderId=$("#inputEmail41").val();
    var orderDate=$("#inputPassword41").val();

    var customerIds=$("#formselector").val();

    var name=$("#inputCity1").val();


    var salary=$("#inputSalary1").val();
    var address=$("#inputSalary11").val();
    var cash=$("#validationTooltip01").val();
    var discount=$("#validationTooltip02").val();
    var balance=$("#validationTooltipUsername").val();
    var total=$("#totalId").text();
    var subTotal=$("#subtotalId").text();
    var temparray=addItem;


    var addOrder={
        oId:orderId,
        oDate:orderDate,
        customerId:customerIds,
        name:name,
        salary:salary,
        address:address,
        objarray:temparray,
        total:total,
        subTotal:subTotal,
        cash:cash,
        discount:discount,
        balance:balance


    };
    orderDB.push(addOrder);

    addItem=[];
    $("#inputEmail41").val("");
    $("#inputPassword41").val("");

    $("#formselector").val("");

    $("#inputCity1").val("");


    $("#inputSalary1").val("");
    $("#inputSalary11").val("");

    $("#validationTooltip01").val("");
    $("#validationTooltip02").val("");
    $("#validationTooltipUsername").val("");

    $("#totalId").text(0);
    $("#subtotalId").text(0);

    $("#orderAddItemTable").empty();

    alert("Placed");



});

$("#inputEmail41").keydown(function (event){
    if(event.key=="Enter"){

        //alert("searching");

        var orderId=$("#inputEmail41").val();
       // alert(orderId);
        var placeOrderObj=search(orderId);
       // alert("searching2");

        loadOrderTxtField(placeOrderObj);
       // alert("searched3");

    }
});

function search(ids) {
    for (var i=0;i<orderDB.length;i++){
        if(orderDB[i].oId==ids){
            return orderDB[i];
        }else{
            alert("no need to this orderId");
        }
    }

}

function  loadOrderTxtField(placeOrderObj){
    //alert("searched31");
    $("#inputPassword41").val(placeOrderObj.oDate);
   // alert("searched4");
    $("#formselector").val(placeOrderObj.customerId);
   // alert("searched5");
    $("#inputCity1").val(placeOrderObj.name);
    $("#inputSalary1").val(placeOrderObj.salary);
    $("#inputSalary11").val(placeOrderObj.address);
    var total1=parseInt(placeOrderObj.total);
    //alert(total1);

    $("#totalId").text(total1);

    var subtotal1=parseInt(placeOrderObj.subTotal);
   // alert(subtotal1);

    $("#subtotalId").text(subtotal1);


    $("#validationTooltip01").val(placeOrderObj.cash);
    $("#validationTooltip02").val(placeOrderObj.discount);
    $("#validationTooltipUsername").val(placeOrderObj.balance);

    $("#orderAddItemTable").empty();
    for (var i of placeOrderObj.objarray){
        let row = `<tr><td>${i.iId}</td><td>${i.iName}</td><td>${i.iPrice}</td><td>${i.iOrderQty}</td><td>${i.iTotal}</td></tr>`;
        $("#orderAddItemTable").append(row);

        $('#formselectorOrder,#validationDefault03,#validationDefaultUsername,#validationDefault0311,#validationDefault031').val("");
    }


}


//end orders....................................................................................................
