//Book class 
class Plist{
    constructor(product,price,quantity){
       this.product=product;
       this.price=price;
       this.quantity=quantity;
    }
}
//UI Class
class UI{
    static Display(){
        //get the books from storage
        const shoplist=store.getlist();
       const shoplists=shoplist;
       shoplists.forEach(list=>{
         UI.addShopList(list);
       }) 
    }
    static addShopList(list){
        var rowlist=document.getElementById("list");
        const addlist=document.createElement("tr");
        addlist.innerHTML=`
        <td>${list.product}</td>
        <td>${list.price}</td>
        <td>${list.quantity}</td>
        <td id="total">${list.quantity*list.price}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>
        `
       rowlist.appendChild(addlist);
    }
    static netTotal(value){
        var total=0;
        const amount=document.getElementById("amount");
        var allvalue=store.getlist();
       allvalue.forEach(e=>{
           total+=+e.price*e.quantity;
       })
       amount.innerHTML=`${total}`;
    }
    static deleteList(e){
      if(e.classList.contains('delete')){
        e.parentElement.parentElement.remove();    
      }
    }
    static showAlert(message,className)
    {
        const div=document.createElement("div");
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.getElementById("form-info");
        container.insertBefore(div, form);

        //Remove the div from alert
        setTimeout(e=>{
         document.querySelector('.alert').remove(); 
        },2000);

    }
    static ClearForm()
    {
        document.getElementById("product").value='';
        document.getElementById("price").value='';
        document.getElementById("quantity").value='';
    }
}
//Storage Handle
class store{
    static getlist(){
      let lists;
      if(localStorage.getItem("lists")===null)
      {
          lists=[];
      }
      else{
          lists=JSON.parse(localStorage.getItem("lists"));
      }
      return lists;
    }
    static addList(list){
        const lists=store.getlist();
        lists.push(list);
        localStorage.setItem("lists",JSON.stringify(lists));
    }
    static removeList(product){
       const lists=store.getlist();
       lists.forEach((list,index)=>{
           if(list.product===product)
           {
               lists.splice(index,1);
           }
       })
       localStorage.setItem("lists",JSON.stringify(lists)); 
    }
}
//Event Display Book
document.addEventListener('DOMContentLoaded',UI.Display);
// Event Add Book
const inp=document.getElementById("form-info");
inp.addEventListener('submit',e=>{
    //prevent default behavior
    e.preventDefault();
    const product=document.getElementById("product").value;
    const price=+document.getElementById("price").value;
    const quantity=+document.getElementById("quantity").value;
    if(product===''||price===''||quantity==='')
    { 
        //show Error Message
        UI.showAlert("Please fill the all fields","danger");

    }else{
        const newlist=new Plist(product,price,quantity);
    //Add UI     
    UI.addShopList(newlist);
    //Add list into the storage
    store.addList(newlist);
    //Clear the form value 
    UI.ClearForm();
    //Alert message
    UI.showAlert("List added","success");
    //Total
    UI.netTotal();
    }
    
})
// Event Remove Book
document.getElementById("list").addEventListener("click",e=>{
    //remove from UI
    UI.deleteList(e.target);
    //Remove from Storage
    store.removeList(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    //Remove success message
    UI.showAlert("List removed","danger");
    //update net total
    UI.netTotal();
})