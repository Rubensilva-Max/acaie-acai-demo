// CONFIGURAÇÃO DA DEMONSTRAÇÃO: substitua pelo WhatsApp do cliente (somente números, com DDI).
const WHATSAPP_NUMBER = "5500000000000";
const toast = document.getElementById("toast");
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
function sendToWhatsApp(message){
  if(!WHATSAPP_NUMBER || WHATSAPP_NUMBER==="5500000000000"){notify("Demonstração: configure o WhatsApp do estabelecimento no arquivo script.js.");return}
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
document.querySelectorAll(".add-button").forEach(button=>button.addEventListener("click",()=>{
  const name=button.dataset.product,price=Number(button.dataset.price);
  notify(`${name} adicionado • R$ ${price.toFixed(2).replace(".",",")}`);
  sendToWhatsApp(`Olá! Quero pedir: ${name} — R$ ${price.toFixed(2).replace(".",",")}.`);
}));
const menuToggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}));
let selectedSize="300ml",selectedPrice=14.90;
const priceEl=document.getElementById("builder-price");
document.querySelectorAll(".size-option").forEach(option=>option.addEventListener("click",()=>{
  document.querySelectorAll(".size-option").forEach(item=>item.classList.remove("active"));
  option.classList.add("active");selectedSize=option.dataset.size;selectedPrice=Number(option.dataset.price);priceEl.textContent=`R$ ${selectedPrice.toFixed(2).replace(".",",")}`;
}));
document.querySelectorAll(".topping input").forEach(input=>input.addEventListener("change",()=>{
  const checked=[...document.querySelectorAll(".topping input:checked")];
  if(checked.length>4){input.checked=false;notify("Escolha até 4 adicionais inclusos.");}
}));
document.getElementById("add-custom").addEventListener("click",()=>{
  const extras=[...document.querySelectorAll(".topping input:checked")].map(input=>input.value);
  const message=`Olá! Quero montar um açaí de ${selectedSize}, com ${extras.length?extras.join(", "):"sem adicionais selecionados"}. Total: R$ ${selectedPrice.toFixed(2).replace(".",",")}.`;
  notify("Seu açaí personalizado foi preparado para o pedido!");
  sendToWhatsApp(message);
});
document.getElementById("whatsapp-cta").addEventListener("click",event=>{event.preventDefault();sendToWhatsApp("Olá! Gostaria de fazer um pedido de açaí. Pode me enviar o cardápio?")});
