const products = [
  {id:1,name:"iPhone 16 Pro",category:"pro",label:"PRO",description:"256 GB · Titânio natural",price:8499,image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"iPhone 16",category:"normal",label:"DESTAQUE",description:"128 GB · Ultramarino",price:5999,image:"https://images.unsplash.com/photo-1726581893783-3c7e4b0e8b26?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"iPhone 15 Pro",category:"pro",label:"PRO",description:"256 GB · Titânio azul",price:6999,image:"https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"iPhone 15",category:"normal",label:"ESSENCIAL",description:"128 GB · Preto",price:4599,image:"https://images.unsplash.com/photo-1696446702183-cbd13d4c4e8c?auto=format&fit=crop&w=700&q=80"}
];
let cart = [];
let activeFilter = "todos";
const grid = document.getElementById("product-grid");
const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

function renderProducts(){
  const term = document.getElementById("search").value.toLowerCase().trim();
  const visible = products.filter(p => (activeFilter==="todos" || p.category===activeFilter) && p.name.toLowerCase().includes(term));
  grid.innerHTML = visible.length ? visible.map(p => `
    <article class="product-card">
      <div class="product-image"><span class="product-tag">${p.label}</span><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="product-info"><span class="product-category">${p.category==="pro"?"LINHA PRO":"LINHA IPHONE"}</span>
      <h3>${p.name}</h3><p class="product-description">${p.description}</p>
      <div class="product-price">${money(p.price)}<small>Preço demonstrativo à vista</small></div>
      <button class="add-button" onclick="addToCart(${p.id})">ADICIONAR À SACOLA +</button></div>
    </article>`).join("") : '<p class="no-results">Nenhum modelo encontrado.</p>';
}
function addToCart(id){
  const found=cart.find(item=>item.id===id);
  if(found) found.qty++; else cart.push({...products.find(p=>p.id===id),qty:1});
  renderCart(); openCart();
}
function changeQty(id,amount){
  const item=cart.find(p=>p.id===id); if(!item)return;
  item.qty+=amount; if(item.qty<=0)cart=cart.filter(p=>p.id!==id);
  renderCart();
}
function removeItem(id){cart=cart.filter(p=>p.id!==id);renderCart()}
function renderCart(){
  document.getElementById("cart-count").textContent=cart.reduce((sum,p)=>sum+p.qty,0);
  document.getElementById("cart-total").textContent=money(cart.reduce((sum,p)=>sum+p.price*p.qty,0));
  document.getElementById("cart-items").innerHTML=cart.length?cart.map(p=>`
    <div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p>
    <div class="quantity"><button onclick="changeQty(${p.id},-1)">−</button><span>${p.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div>
    <button class="remove-item" onclick="removeItem(${p.id})" aria-label="Remover ${p.name}">×</button></div>`).join(""):'<div class="empty-cart">Sua sacola está vazia.<br><span>Adicione um modelo para começar.</span></div>';
}
function openCart(){document.getElementById("cart-drawer").classList.add("open");document.getElementById("overlay").classList.add("show");document.getElementById("cart-drawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cart-drawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");document.getElementById("cart-drawer").setAttribute("aria-hidden","true")}
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  button.classList.add("active");activeFilter=button.dataset.filter;renderProducts();
}));
document.getElementById("search").addEventListener("input",renderProducts);
document.getElementById("open-cart").addEventListener("click",openCart);
document.getElementById("close-cart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("menu-button").addEventListener("click",()=>document.getElementById("nav").classList.toggle("show"));
document.querySelectorAll(".nav a").forEach(link=>link.addEventListener("click",()=>document.getElementById("nav").classList.remove("show")));
document.getElementById("checkout").addEventListener("click",()=>{
  if(!cart.length){alert("Adicione um iPhone à sacola antes de continuar.");return;}
  alert("Esta é uma loja demonstrativa. Para receber pedidos reais, conecte um meio de pagamento e um sistema de vendas.");
});
document.getElementById("newsletter-form").addEventListener("submit",event=>{
  event.preventDefault();document.getElementById("newsletter-message").textContent="Cadastro demonstrativo realizado! Obrigado.";
  event.target.reset();
});
renderProducts();renderCart();
