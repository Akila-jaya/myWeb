function Item(id,price,name,qtyOnHand,orderQuantity,iTotal){
    var itemId=id;
    var itemPrice=price;
    var itemName=name;
    var itemQty=qtyOnHand;
    var itemOrderQty=orderQuantity;
    var itemTotal=iTotal;


    this.getItemID=function () {
        return itemId;

    }
    this.getItemName=function () {
        return itemName;

    }
    this.getItemQty=function () {
        return itemQty;

    }
    this.getItemPrice=function () {
        return itemPrice;

    }
    this.getitemOrderQty=function () {
        return itemOrderQty;

    }

    this.itemTotal=function () {
        return itemTotal;

    }

    this.setItemID = function (v) {
        itemId=v;
    }

    this.setitemPrice = function (v) {
        itemPrice=v;
    }

    this.setItemName = function (v) {
        itemName=v;
    }

    this.setItemQty = function (v) {
        itemQty=v;
    }

    this.itemOrderQty = function (v) {
        itemOrderQty=v;
    }

    this.itemTotal = function (v) {
        itemTotal=v;
    }
}