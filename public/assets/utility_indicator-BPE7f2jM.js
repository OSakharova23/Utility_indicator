(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();class m{constructor(t){this.utility_indicator_parent=t}utility_indicator_getHTML(t){return`
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
            `}utility_indicator_render(t){const i=this.utility_indicator_getHTML(t);this.utility_indicator_parent.insertAdjacentHTML("beforeend",i)}}class y{constructor(t){this.utility_indicator_parent=t}utility_indicator_addListeners(t){const i=document.getElementById("utility_indicator_home-button");i&&i.addEventListener("click",t)}utility_indicator_getHTML(){return`
                <button id="utility_indicator_home-button" style="background: none; color: black; border: none; padding: 0; cursor: pointer; font-size: 1.8rem; font-weight: 500;">
                    Квартплата
                </button>
            `}utility_indicator_render(t){const i=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",i),this.utility_indicator_addListeners(t)}}class f{async utility_indicator_get(t){try{const i=await fetch(t);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return{data:await i.json(),status:i.status}}catch(i){throw console.error("GET request error:",i),i}}async utility_indicator_post(t,i){try{const e=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return{data:await e.json(),status:e.status}}catch(e){throw console.error("POST request error:",e),e}}async utility_indicator_patch(t,i){try{const e=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return{data:await e.json(),status:e.status}}catch(e){throw console.error("PATCH request error:",e),e}}async utility_indicator_delete(t){try{const i=await fetch(t,{method:"DELETE",headers:{Accept:"application/json"}});if(!i.ok&&i.status!==204)throw new Error(`HTTP error! status: ${i.status}`);let e=null;return i.status!==204&&(e=await i.json()),{data:e,status:i.status}}catch(i){throw console.error("DELETE request error:",i),i}}}const s=new f;class b{constructor(){this.baseUrl="http://localhost:3000"}utility_indicator_getServices(){return`${this.baseUrl}/utility_indicator`}utility_indicator_getServiceById(t){return`${this.baseUrl}/utility_indicator/${t}`}utility_indicator_createService(){return`${this.baseUrl}/utility_indicator`}utility_indicator_removeService(t){return`${this.baseUrl}/utility_indicator/${t}`}utility_indicator_updateService(t){return`${this.baseUrl}/utility_indicator/${t}`}}const l=new b;class g{constructor(t,i){this.utility_indicator_parent=t,this.utility_indicator_id=i,this.utility_indicator_serviceData=null}async utility_indicator_loadServiceData(){try{const{data:t,status:i}=await s.utility_indicator_get(l.utility_indicator_getServiceById(this.utility_indicator_id));i===200&&t&&(this.utility_indicator_serviceData=t,this.utility_indicator_renderProduct())}catch(t){console.error("Ошибка загрузки данных услуги:",t)}}utility_indicator_renderProduct(){if(!this.utility_indicator_serviceData)return;new m(this.utility_indicator_pageRoot).utility_indicator_render(this.utility_indicator_serviceData)}get utility_indicator_pageRoot(){return document.getElementById("utility_indicator_product-page")}utility_indicator_getHTML(){return`
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
        `}utility_indicator_goHome(){new p(this.utility_indicator_parent).utility_indicator_render()}utility_indicator_render(){this.utility_indicator_parent.innerHTML="";const t=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",t);const i=document.getElementById("utility_indicator_home-button-container");new y(i).utility_indicator_render(this.utility_indicator_goHome.bind(this)),this.utility_indicator_loadServiceData()}}const _="https://avatars.mds.yandex.net/i?id=e74a5eca858c831fb3971b48dc7a6befed46c5a6-12439438-images-thumbs&n=13";class h{constructor(t,i){this.utility_indicator_parent=t,this.utility_indicator_id=i,this.utility_indicator_serviceData=null,this.utility_indicator_isNew=!i}utility_indicator_getHTML(){return`
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
                                    <h3 class="mb-0" style="color: #333;">${this.utility_indicator_isNew?"Добавление новой услуги":"Редактирование услуги"}</h3>
                                </div>
                                <div class="card-body" style="padding: 30px;">
                                    ${this.utility_indicator_isNew?"":`
                                    <div id="utility_indicator_loading" style="text-align: center; padding: 50px;">
                                        Загрузка данных...
                                    </div>
                                    `}
                                    <form id="utility_indicator_edit-form" style="${this.utility_indicator_isNew?"":"display: none;"}">
                                        <div class="mb-3">
                                            <label for="utility_indicator_title" class="form-label" style="font-weight: 500;">Название услуги</label>
                                            <input type="text" class="form-control" id="utility_indicator_title" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_src" class="form-label" style="font-weight: 500;">URL изображения</label>
                                            <input type="url" class="form-control" id="utility_indicator_src" placeholder="${_}" style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                            <small class="form-text text-muted">Оставьте пустым, чтобы использовать изображение по умолчанию</small>
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
        `}async utility_indicator_loadData(){if(this.utility_indicator_isNew)return;console.log("Загрузка данных для ID:",this.utility_indicator_id);const t=document.getElementById("utility_indicator_loading"),i=document.getElementById("utility_indicator_edit-form");try{const{data:e,status:r}=await s.utility_indicator_get(l.utility_indicator_getServiceById(this.utility_indicator_id));r===200&&e&&(this.utility_indicator_serviceData=e,t&&(t.style.display="none"),i&&(i.style.display="block"),this.utility_indicator_fillForm())}catch(e){console.error("Ошибка загрузки данных:",e),t&&(t.innerHTML='Ошибка загрузки данных. <button onclick="location.reload()">Попробовать снова</button>')}}utility_indicator_fillForm(){if(!this.utility_indicator_serviceData)return;const t=document.getElementById("utility_indicator_title"),i=document.getElementById("utility_indicator_src"),e=document.getElementById("utility_indicator_tariff"),r=document.getElementById("utility_indicator_description");t&&(t.value=this.utility_indicator_serviceData.title||""),i&&(i.value=this.utility_indicator_serviceData.src||""),e&&(e.value=this.utility_indicator_serviceData.tariff||""),r&&(r.value=this.utility_indicator_serviceData.description||"")}utility_indicator_getFormData(){let t=document.getElementById("utility_indicator_src").value;return(!t||t.trim()==="")&&(t=_),{title:document.getElementById("utility_indicator_title").value,src:t,tariff:document.getElementById("utility_indicator_tariff").value,description:document.getElementById("utility_indicator_description").value}}async utility_indicator_saveData(t){t.preventDefault();const i=this.utility_indicator_getFormData();try{let e;this.utility_indicator_isNew?e=(await s.utility_indicator_post(l.utility_indicator_createService(),i)).status:e=(await s.utility_indicator_patch(l.utility_indicator_updateService(this.utility_indicator_id),i)).status,(e===200||e===201)&&this.utility_indicator_goBack()}catch(e){console.error("Ошибка сохранения:",e)}}utility_indicator_goBack(){new p(this.utility_indicator_parent).utility_indicator_render()}utility_indicator_addListeners(){const t=document.getElementById("utility_indicator_edit-form");t&&t.addEventListener("submit",this.utility_indicator_saveData.bind(this));const i=document.getElementById("utility_indicator_cancel-btn");i&&i.addEventListener("click",this.utility_indicator_goBack.bind(this))}utility_indicator_render(){this.utility_indicator_parent.innerHTML="";const t=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",t);const i=document.getElementById("utility_indicator_home-button-container");if(new y(i).utility_indicator_render(this.utility_indicator_goBack.bind(this)),this.utility_indicator_isNew){const r=document.getElementById("utility_indicator_src");r&&(r.value=_)}else this.utility_indicator_loadData();this.utility_indicator_addListeners()}}class v{constructor(t){this.utility_indicator_parent=t}utility_indicator_getHTML(t,i,e){const r=[];for(let d=0;d<t.length;d+=3)r.push(t.slice(d,d+3));return`
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
                ${r.map(d=>`<div class="row">${d.map(n=>`
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
        `}utility_indicator_addListeners(t,i,e,r){t.forEach(c=>{const n=document.getElementById(`utility_indicator_product-card-${c.id}`);n&&n.addEventListener("click",i)}),document.querySelectorAll(".utility_indicator_delete-card-btn").forEach(c=>{c.addEventListener("click",n=>{n.stopPropagation();const u=c.getAttribute("data-id");e&&e(u)})}),document.querySelectorAll(".utility_indicator_edit-card-btn").forEach(c=>{c.addEventListener("click",n=>{n.stopPropagation();const u=c.getAttribute("data-id");r&&r(u)})})}utility_indicator_render(t,i,e,r){const o=this.utility_indicator_getHTML(t,e,r);this.utility_indicator_parent.innerHTML="",this.utility_indicator_parent.insertAdjacentHTML("beforeend",o),this.utility_indicator_addListeners(t,i,e,r)}}class p{constructor(t){this.utility_indicator_parent=t,this.utility_indicator_products=[],this.utility_indicator_filteredProducts=[]}async utility_indicator_loadProducts(t=""){try{let i=l.utility_indicator_getServices();t&&t.trim()&&(i+=`?title=${encodeURIComponent(t.trim())}`);const{data:e,status:r}=await s.utility_indicator_get(i);if(r===200&&e){this.utility_indicator_products=e,this.utility_indicator_filteredProducts=[...e],this.utility_indicator_updateProductCards();const o=document.getElementById("utility_indicator_no-results");o&&(o.style.display=this.utility_indicator_filteredProducts.length===0?"block":"none")}}catch(i){console.error("Ошибка загрузки данных:",i)}}utility_indicator_filterProducts(t){this.utility_indicator_loadProducts(t)}utility_indicator_clickCard(t){const i=t.target.dataset.id;new g(this.utility_indicator_parent,i).utility_indicator_render()}utility_indicator_editCard(t){new h(this.utility_indicator_parent,t).utility_indicator_render()}async utility_indicator_deleteCard(t){try{const{status:i}=await s.utility_indicator_delete(l.utility_indicator_removeService(t));i===204&&this.utility_indicator_loadProducts()}catch(i){console.error("Ошибка удаления:",i)}}utility_indicator_addCard(){new h(this.utility_indicator_parent,null).utility_indicator_render()}utility_indicator_updateProductCards(){const t=document.getElementById("utility_indicator_product-card-container");t&&(t.innerHTML="",this.utility_indicator_filteredProducts.length>0&&new v(t).utility_indicator_render(this.utility_indicator_filteredProducts,this.utility_indicator_clickCard.bind(this),this.utility_indicator_deleteCard.bind(this),this.utility_indicator_editCard.bind(this)))}utility_indicator_goHome(){this.utility_indicator_render()}utility_indicator_getHTML(){return`
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
        `}utility_indicator_addListeners(){const t=document.getElementById("utility_indicator_add-button");t&&t.addEventListener("click",this.utility_indicator_addCard.bind(this));const i=document.getElementById("utility_indicator_search-input");i&&i.addEventListener("input",e=>{this.utility_indicator_filterProducts(e.target.value)})}utility_indicator_render(){this.utility_indicator_parent.innerHTML="";const t=this.utility_indicator_getHTML();this.utility_indicator_parent.insertAdjacentHTML("beforeend",t);const i=document.getElementById("utility_indicator_home-button-container");new y(i).utility_indicator_render(this.utility_indicator_goHome.bind(this)),this.utility_indicator_addListeners(),this.utility_indicator_loadProducts()}}const x=document.getElementById("utility_indicator_root"),w=new p(x);w.utility_indicator_render();
