(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();class p{constructor(t){this.utility_indicator_parent=t}utility_indicator_getHTML(t){return`
                <div class="card mb-4" style="max-width: 800px; margin: 0 auto; background-color: white; border: 1px solid #91bbe6;">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${t.src}" class="img-fluid rounded-start" alt="${t.title}" style="height: 100%; object-fit: cover;">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h3 class="card-title mb-3" style="color: #333;">${t.title}</h3>
                                <div class="mb-3" style="background-color: #edf4fc; padding: 10px 15px; border-radius: 5px;">
                                    <span style="color: #333; font-size: 1.1rem; font-weight: 500;">Тариф: ${t.tariff}</span>
                                </div>
                                <div class="mb-3">
                                    <h5 class="card-subtitle mb-2" style="color: #666;">Описание услуги:</h5>
                                    <p class="card-text" style="color: #555;">${t.description}</p>
                                </div>
                                <div class="mt-3" style="background-color: #edf4fc; padding: 10px 15px; border-radius: 5px; color: #333;">
                                    <i class="bi bi-info-circle-fill"></i>
                                    <strong>Важно:</strong> Для точного расчета оплаты рекомендуется установка индивидуальных приборов учета.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `}utility_indicator_render(t){const i=this.utility_indicator_getHTML(t);this.utility_indicator_parent.insertAdjacentHTML("beforeend",i)}}class _{constructor(t){this.utility_indicator_parent=t}utility_indicator_addListeners(t){const i=document.getElementById("utility_indicator_home-button");i&&i.addEventListener("click",t)}utility_indicator_getHTML(){return`
                <button id="utility_indicator_home-button" style="background: none; color: black; border: none; padding: 0; cursor: pointer; font-size: 1.8rem; font-weight: 500;">
                    Квартплата
                </button>
            `}utility_indicator_render(t){const i=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",i),this.utility_indicator_addListeners(t)}}class h{async utility_indicator_get(t){try{const i=await fetch(t);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return{data:await i.json(),status:i.status}}catch(i){throw console.error("GET request error:",i),i}}async utility_indicator_post(t,i){try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return{data:await r.json(),status:r.status}}catch(r){throw console.error("POST request error:",r),r}}async utility_indicator_patch(t,i){try{const r=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return{data:await r.json(),status:r.status}}catch(r){throw console.error("PATCH request error:",r),r}}async utility_indicator_delete(t){try{const i=await fetch(t,{method:"DELETE",headers:{Accept:"application/json"}});if(!i.ok&&i.status!==204)throw new Error(`HTTP error! status: ${i.status}`);let r=null;return i.status!==204&&(r=await i.json()),{data:r,status:i.status}}catch(i){throw console.error("DELETE request error:",i),i}}}const s=new h;class f{constructor(){this.baseUrl="http://localhost:3000"}utility_indicator_getServices(){return`${this.baseUrl}/utility_indicator`}utility_indicator_getServiceById(t){return`${this.baseUrl}/utility_indicator/${t}`}utility_indicator_createService(){return`${this.baseUrl}/utility_indicator`}utility_indicator_removeService(t){return`${this.baseUrl}/utility_indicator/${t}`}utility_indicator_updateService(t){return`${this.baseUrl}/utility_indicator/${t}`}}const l=new f;class m{constructor(t,i){this.utility_indicator_parent=t,this.utility_indicator_id=i,this.utility_indicator_serviceData=null}async utility_indicator_loadServiceData(){try{const{data:t,status:i}=await s.utility_indicator_get(l.utility_indicator_getServiceById(this.utility_indicator_id));i===200&&t&&(this.utility_indicator_serviceData=t,this.utility_indicator_renderProduct())}catch(t){console.error("Ошибка загрузки данных услуги:",t),alert("Не удалось загрузить данные услуги")}}utility_indicator_renderProduct(){if(!this.utility_indicator_serviceData)return;new p(this.utility_indicator_pageRoot).utility_indicator_render(this.utility_indicator_serviceData)}get utility_indicator_pageRoot(){return document.getElementById("utility_indicator_product-page")}utility_indicator_getHTML(){return`
            <div id="utility_indicator_product-page">
                <div id="utility_indicator_header-container" class="header" style="background-color: white; border-bottom: 1px solid #e0e0e0; padding: 1rem 0; margin-bottom: 2rem;">
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div id="utility_indicator_home-button-container"></div>
                            <div style="width: 100px;"></div>
                        </div>
                    </div>
                </div>
                <div class="container mt-4"></div>
            </div>
        `}utility_indicator_goHome(){new y(this.utility_indicator_parent).utility_indicator_render()}utility_indicator_render(){this.utility_indicator_parent.innerHTML="";const t=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",t);const i=document.getElementById("utility_indicator_home-button-container");new _(i).utility_indicator_render(this.utility_indicator_goHome.bind(this)),this.utility_indicator_loadServiceData()}}class b{constructor(t,i){this.utility_indicator_parent=t,this.utility_indicator_id=i,this.utility_indicator_serviceData=null}utility_indicator_getHTML(){return`
            <div id="utility_indicator_edit-page">
                <div id="utility_indicator_header-container" class="header" style="background-color: white; border-bottom: 1px solid #e0e0e0; padding: 1rem 0; margin-bottom: 2rem;">
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div id="utility_indicator_home-button-container"></div>
                            <div style="width: 100px;"></div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card" style="border: 1px solid #91bbe6; border-radius: 10px;">
                                <div class="card-header" style="background-color: #edf4fc; padding: 20px; border-bottom: 1px solid #91bbe6;">
                                    <h3 class="mb-0" style="color: #333;">Редактирование услуги</h3>
                                </div>
                                <div class="card-body" style="padding: 30px;">
                                    <div id="utility_indicator_loading" style="text-align: center; padding: 50px;">
                                        Загрузка данных...
                                    </div>
                                    <form id="utility_indicator_edit-form" style="display: none;">
                                        <div class="mb-3">
                                            <label for="utility_indicator_title" class="form-label" style="font-weight: 500;">Название услуги</label>
                                            <input type="text" class="form-control" id="utility_indicator_title" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_src" class="form-label" style="font-weight: 500;">URL изображения</label>
                                            <input type="url" class="form-control" id="utility_indicator_src" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_tariff" class="form-label" style="font-weight: 500;">Тариф</label>
                                            <input type="text" class="form-control" id="utility_indicator_tariff" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_description" class="form-label" style="font-weight: 500;">Описание</label>
                                            <textarea class="form-control" id="utility_indicator_description" rows="5" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;"></textarea>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <button type="submit" class="btn" style="background-color: #ff8f00; color: white; border: none; padding: 10px 30px;">
                                                Сохранить
                                            </button>
                                            <button type="button" id="utility_indicator_cancel-btn" class="btn" style="background-color: #ff8f00; color: white; border: none; padding: 10px 30px;">
                                                Отмена
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}async utility_indicator_loadData(){console.log("Загрузка данных для ID:",this.utility_indicator_id);const t=document.getElementById("utility_indicator_loading"),i=document.getElementById("utility_indicator_edit-form");try{const{data:r,status:e}=await s.utility_indicator_get(l.utility_indicator_getServiceById(this.utility_indicator_id));e===200&&r&&(this.utility_indicator_serviceData=r,t&&(t.style.display="none"),i&&(i.style.display="block"),this.utility_indicator_fillForm())}catch(r){console.error("Ошибка загрузки данных:",r),t&&(t.innerHTML='Ошибка загрузки данных. <button onclick="location.reload()">Попробовать снова</button>'),alert("Не удалось загрузить данные услуги")}}utility_indicator_fillForm(){if(!this.utility_indicator_serviceData)return;const t=document.getElementById("utility_indicator_title"),i=document.getElementById("utility_indicator_src"),r=document.getElementById("utility_indicator_tariff"),e=document.getElementById("utility_indicator_description");t&&(t.value=this.utility_indicator_serviceData.title||""),i&&(i.value=this.utility_indicator_serviceData.src||""),r&&(r.value=this.utility_indicator_serviceData.tariff||""),e&&(e.value=this.utility_indicator_serviceData.description||"")}async utility_indicator_saveData(t){t.preventDefault();const i={title:document.getElementById("utility_indicator_title").value,src:document.getElementById("utility_indicator_src").value,tariff:document.getElementById("utility_indicator_tariff").value,description:document.getElementById("utility_indicator_description").value};try{const{status:r}=await s.utility_indicator_patch(l.utility_indicator_updateService(this.utility_indicator_id),i);r===200&&(alert("Услуга успешно обновлена!"),this.utility_indicator_goBack())}catch(r){alert("Ошибка при обновлении услуги"),console.error("Ошибка:",r)}}utility_indicator_goBack(){new y(this.utility_indicator_parent).utility_indicator_render()}utility_indicator_addListeners(){const t=document.getElementById("utility_indicator_edit-form");t&&t.addEventListener("submit",this.utility_indicator_saveData.bind(this));const i=document.getElementById("utility_indicator_cancel-btn");i&&i.addEventListener("click",this.utility_indicator_goBack.bind(this))}utility_indicator_render(){this.utility_indicator_parent.innerHTML="";const t=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",t);const i=document.getElementById("utility_indicator_home-button-container");new _(i).utility_indicator_render(this.utility_indicator_goBack.bind(this)),this.utility_indicator_loadData(),this.utility_indicator_addListeners()}}class g{constructor(t){this.utility_indicator_parent=t}utility_indicator_getHTML(t,i,r){const e=[];for(let d=0;d<t.length;d+=3)e.push(t.slice(d,d+3));return`
            <style>
                .card:hover {
                    transform: translateY(-5px);
                }
                .utility_indicator_grid-container {
                    margin-bottom: 40px;
                }
                @media (max-width: 768px) {
                    .col-md-4 {
                        margin-bottom: 20px;
                    }
                }
            </style>
            <div class="utility_indicator_grid-container">
                ${e.map(d=>`<div class="row">${d.map(n=>`
                <div class="col-md-4 mb-4">
                    <div class="card h-100" style="background-color: #edf4fc; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s; border: none;">
                        <img class="card-img-top" src="${n.src}" alt="${n.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h5 class="card-title" style="margin: 0; font-size: 1.1rem; color: #333;">${n.title}</h5>
                                <button class="utility_indicator_delete-card-btn" data-id="${n.id}" style="background-color: #ff8f00; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.8rem;">
                                    Удалить
                                </button>
                            </div>
                            <div class="mb-2">
                                <span style="background-color: white; color: #6e9fcf; padding: 5px 12px; border-radius: 5px; font-size: 0.9rem; font-weight: 500; display: inline-block;">${n.tariff}</span>
                            </div>
                            <p class="card-text text-muted flex-grow-1">${n.text||"Нажмите для подробной информации"}</p>
                            <div style="display: flex; gap: 10px; margin-top: auto;">
                                <button class="btn w-100" id="utility_indicator_product-card-${n.id}" data-id="${n.id}" style="background-color: #ff8f00; color: white; border: none; flex: 1;">
                                    Подробнее
                                </button>
                                <button class="utility_indicator_edit-card-btn btn w-100" data-id="${n.id}" style="background-color: #ff8f00; color: white; border: none; flex: 1;">
                                    Редактировать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("")}</div>`).join("")}
                ${t.length===0?'<div class="text-center py-5">Нет доступных услуг</div>':""}
            </div>
        `}utility_indicator_addListeners(t,i,r,e){t.forEach(c=>{const n=document.getElementById(`utility_indicator_product-card-${c.id}`);n&&n.addEventListener("click",i)}),document.querySelectorAll(".utility_indicator_delete-card-btn").forEach(c=>{c.addEventListener("click",n=>{n.stopPropagation();const u=c.getAttribute("data-id");r&&r(u)})}),document.querySelectorAll(".utility_indicator_edit-card-btn").forEach(c=>{c.addEventListener("click",n=>{n.stopPropagation();const u=c.getAttribute("data-id");e&&e(u)})})}utility_indicator_render(t,i,r,e){const o=this.utility_indicator_getHTML(t,r,e);this.utility_indicator_parent.innerHTML="",this.utility_indicator_parent.insertAdjacentHTML("beforeend",o),this.utility_indicator_addListeners(t,i,r,e)}}class y{constructor(t){this.utility_indicator_parent=t,this.utility_indicator_products=[],this.utility_indicator_filteredProducts=[]}async utility_indicator_loadProducts(t=""){try{let i=l.utility_indicator_getServices();t&&t.trim()&&(i+=`?title=${encodeURIComponent(t.trim())}`);const{data:r,status:e}=await s.utility_indicator_get(i);if(e===200&&r){this.utility_indicator_products=r,this.utility_indicator_filteredProducts=[...r],this.utility_indicator_updateProductCards();const o=document.getElementById("utility_indicator_no-results");o&&(o.style.display=this.utility_indicator_filteredProducts.length===0?"block":"none")}}catch(i){console.error("Ошибка загрузки данных:",i),alert("Не удалось загрузить данные")}}utility_indicator_filterProducts(t){this.utility_indicator_loadProducts(t)}utility_indicator_clickCard(t){const i=t.target.dataset.id;new m(this.utility_indicator_parent,i).utility_indicator_render()}utility_indicator_editCard(t){new b(this.utility_indicator_parent,t).utility_indicator_render()}async utility_indicator_deleteCard(t){if(confirm("Вы уверены, что хотите удалить эту услугу?"))try{const{status:i}=await s.utility_indicator_delete(l.utility_indicator_removeService(t));i===204&&(alert("Услуга успешно удалена"),this.utility_indicator_loadProducts())}catch(i){alert("Ошибка при удалении услуги"),console.error("Ошибка удаления:",i)}}async utility_indicator_addCard(){if(this.utility_indicator_filteredProducts.length===0){alert("Нет услуг для копирования");return}const t=this.utility_indicator_filteredProducts[0],i={title:t.title+" (копия)",src:t.src,tariff:t.tariff,description:t.description||"Описание услуги"};try{const{status:r}=await s.utility_indicator_post(l.utility_indicator_createService(),i);r===201&&(alert("Услуга успешно добавлена"),this.utility_indicator_loadProducts())}catch(r){alert("Ошибка при добавлении услуги"),console.error("Ошибка создания:",r)}}utility_indicator_updateProductCards(){const t=document.getElementById("utility_indicator_product-card-container");t&&(t.innerHTML="",this.utility_indicator_filteredProducts.length>0&&new g(t).utility_indicator_render(this.utility_indicator_filteredProducts,this.utility_indicator_clickCard.bind(this),this.utility_indicator_deleteCard.bind(this),this.utility_indicator_editCard.bind(this)))}utility_indicator_goHome(){this.utility_indicator_render()}utility_indicator_getHTML(){return`
            <div id="utility_indicator_main-page">
                <div id="utility_indicator_header-container" class="header" style="background-color: white; border-bottom: 1px solid #e0e0e0; padding: 1rem 0; margin-bottom: 2rem;">
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div id="utility_indicator_home-button-container"></div>
                            <div style="width: 100px;"></div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 250px;">
                            <input 
                                type="text" 
                                id="utility_indicator_search-input" 
                                placeholder="Поиск по названию услуги..." 
                                style="width: 100%; padding: 10px 15px; border: 2px solid #91bbe6; border-radius: 5px; font-size: 1rem; outline: none;"
                            />
                        </div>
                        <button id="utility_indicator_add-button" style="background-color: #ff8f00; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: 500;">
                            + Добавить услугу
                        </button>
                    </div>
                    <div id="utility_indicator_product-card-container"></div>
                    <div id="utility_indicator_no-results" style="display: none; text-align: center; padding: 50px; color: #666; font-size: 1.2rem;">
                        Ничего не найдено. Попробуйте изменить запрос.
                    </div>
                </div>
            </div>
        `}utility_indicator_addListeners(){const t=document.getElementById("utility_indicator_add-button");t&&t.addEventListener("click",this.utility_indicator_addCard.bind(this));const i=document.getElementById("utility_indicator_search-input");i&&i.addEventListener("input",r=>{this.utility_indicator_filterProducts(r.target.value)})}utility_indicator_render(){this.utility_indicator_parent.innerHTML="";const t=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",t);const i=document.getElementById("utility_indicator_home-button-container");new _(i).utility_indicator_render(this.utility_indicator_goHome.bind(this)),this.utility_indicator_addListeners(),this.utility_indicator_loadProducts()}}const v=document.getElementById("utility_indicator_root"),x=new y(v);x.utility_indicator_render();
