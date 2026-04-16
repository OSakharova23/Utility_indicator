export class utility_indicator_3dViewerComponent {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.animationId = null;
        this.controls = null;
    }

    // Маппинг ID услуги на файл модели
    utility_indicator_getModelFile(utility_indicator_serviceId) {
        const modelMap = {
            1: 'Cold_water.glb',      // Холодное водоснабжение
            2: 'Hot_water.glb',       // Горячее водоснабжение
            3: 'Electricity.glb',     // Электроэнергия
            4: 'Garbage.glb',         // Обращение с ТКО
            5: 'Paint.glb'            // Взнос на капитальный ремонт
        };
        return modelMap[utility_indicator_serviceId] || 'Cold_water.glb';
    }

    utility_indicator_getHTML() {
        return `
            <div id="utility_indicator_3d-viewer-container" style="width: 100%; background: linear-gradient(135deg, #f5f7fa 0%, #e8edf5 100%); border-radius: 15px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); margin-top: 30px; border: 1px solid #e0e0e0;">
                <div style="padding: 15px 20px; background: #ffffff; border-bottom: 1px solid #e0e0e0;">
                    <h4 style="margin: 0; color: #333; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
                        <span>🎨</span> 3D-модель услуги
                        <span style="font-size: 0.8rem; color: #888; font-weight: normal; margin-left: auto;">🖱️ Перетащите для вращения</span>
                    </h4>
                </div>
                <div id="utility_indicator_canvas-wrapper" style="position: relative; width: 100%; height: 400px; background: #f0f4f9;">
                    <canvas id="utility_indicator_3d-canvas" style="width: 100%; height: 100%; display: block; outline: none;"></canvas>
                    <div id="utility_indicator_loading-indicator" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #555; background: rgba(255,255,255,0.95); padding: 12px 24px; border-radius: 30px; font-size: 0.9rem; pointer-events: none; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #ddd;">
                        ⏳ Загрузка 3D-модели...
                    </div>
                </div>
                <div style="padding: 12px; background: #ffffff; border-top: 1px solid #e0e0e0; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                    <button id="utility_indicator_zoom-in" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">Приблизить</button>
                    <button id="utility_indicator_zoom-out" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">Отдалить</button>
                    <button id="utility_indicator_view-front" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">Спереди</button>
                    <button id="utility_indicator_view-back" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">Сзади</button>
                    <button id="utility_indicator_view-left" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">Слева</button>
                    <button id="utility_indicator_view-right" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">Справа</button>
                    <button id="utility_indicator_reset-view" class="utility_indicator_3d-btn" style="background-color: #ff8f00; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;">⟳ Сброс</button>
                </div>
            </div>
            <style>
                .utility_indicator_3d-btn:hover {
                    background-color: #e68100 !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255,143,0,0.3);
                }
                .utility_indicator_3d-btn:active {
                    transform: translateY(0);
                }
            </style>
        `;
    }

    utility_indicator_addControlButtons() {
        // Приблизить
        const zoomInBtn = document.getElementById('utility_indicator_zoom-in');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (this.camera) {
                    this.camera.position.z *= 0.8;
                    this.controls.update();
                }
            });
        }

        // Отдалить
        const zoomOutBtn = document.getElementById('utility_indicator_zoom-out');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (this.camera) {
                    this.camera.position.z *= 1.2;
                    this.controls.update();
                }
            });
        }

        // Вид спереди
        const frontBtn = document.getElementById('utility_indicator_view-front');
        if (frontBtn) {
            frontBtn.addEventListener('click', () => {
                if (this.camera && this.controls) {
                    this.camera.position.set(0, 1, 5);
                    this.controls.target.set(0, 0.5, 0);
                    this.controls.update();
                }
            });
        }

        // Вид сзади
        const backBtn = document.getElementById('utility_indicator_view-back');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (this.camera && this.controls) {
                    this.camera.position.set(0, 1, -5);
                    this.controls.target.set(0, 0.5, 0);
                    this.controls.update();
                }
            });
        }

        // Вид слева
        const leftBtn = document.getElementById('utility_indicator_view-left');
        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                if (this.camera && this.controls) {
                    this.camera.position.set(-5, 1, 0);
                    this.controls.target.set(0, 0.5, 0);
                    this.controls.update();
                }
            });
        }

        // Вид справа
        const rightBtn = document.getElementById('utility_indicator_view-right');
        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                if (this.camera && this.controls) {
                    this.camera.position.set(5, 1, 0);
                    this.controls.target.set(0, 0.5, 0);
                    this.controls.update();
                }
            });
        }

        // Сброс вида
        const resetBtn = document.getElementById('utility_indicator_reset-view');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (this.camera && this.controls) {
                    this.camera.position.set(3, 2, 5);
                    this.controls.target.set(0, 0.5, 0);
                    this.controls.update();
                }
            });
        }
    }

    async utility_indicator_initThreeJS(utility_indicator_serviceId) {
        const canvas = document.getElementById('utility_indicator_3d-canvas');
        if (!canvas) return;

        const container = document.getElementById('utility_indicator_canvas-wrapper');
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Создание сцены со светлым фоном
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f4f9);
        
        // Добавляем легкий градиентный фон через CSS, Three.js не поддерживает градиент напрямую
        const canvasWrapper = document.getElementById('utility_indicator_canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.background = 'linear-gradient(135deg, #f0f4f9 0%, #e2e8f0 100%)';
        }

        // Создание камеры
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(3, 2, 5);
        this.camera.lookAt(0, 0.5, 0);

        // Создание рендерера с прозрачным фоном
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xf0f4f9, 1);

        // Освещение для светлого фона
        this.utility_indicator_addLights();

        // Вспомогательные элементы
        this.utility_indicator_addHelpers();

        // Загрузка модели
        await this.utility_indicator_loadModel(utility_indicator_serviceId);

        // Добавление OrbitControls для интерактивности
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.5;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1.2;
        this.controls.enablePan = false;
        this.controls.target.set(0, 0.5, 0);

        // Добавляем кнопки управления
        this.utility_indicator_addControlButtons();

        // Анимация
        this.utility_indicator_startAnimation();

        // Обработка изменения размера окна
        window.addEventListener('resize', this.utility_indicator_handleResize.bind(this));
    }

    utility_indicator_addLights() {
        // Ambient light - более яркий для светлого фона
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Основной направленный свет
        const directionalLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
        directionalLight.position.set(3, 5, 2);
        directionalLight.castShadow = true;
        directionalLight.receiveShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight);

        // Заполняющий свет сзади
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-2, 2, -3);
        this.scene.add(backLight);

        // Теплый свет снизу
        const fillLight = new THREE.PointLight(0xffaa66, 0.4);
        fillLight.position.set(0, -1, 1);
        this.scene.add(fillLight);

        // Подсветка сбоку
        const rimLight = new THREE.PointLight(0xff8866, 0.5);
        rimLight.position.set(1, 1.5, -2);
        this.scene.add(rimLight);

        // Дополнительный свет для передней части
        const frontLight = new THREE.PointLight(0xaaccff, 0.3);
        frontLight.position.set(0, 1, 2);
        this.scene.add(frontLight);
    }

    utility_indicator_addHelpers() {
        // Пол с легкой сеткой для референса - более светлая
        const gridHelper = new THREE.GridHelper(8, 20, 0xccccdd, 0xddddff);
        gridHelper.position.y = -0.8;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.4;
        this.scene.add(gridHelper);

        // Круговая платформа
        const circleGeometry = new THREE.CircleGeometry(1.3, 32);
        const circleMaterial = new THREE.MeshStandardMaterial({ color: 0xdce5f0, roughness: 0.6, metalness: 0.1, transparent: true, opacity: 0.6 });
        const platform = new THREE.Mesh(circleGeometry, circleMaterial);
        platform.rotation.x = -Math.PI / 2;
        platform.position.y = -0.75;
        platform.receiveShadow = true;
        this.scene.add(platform);
    }

    async utility_indicator_loadModel(utility_indicator_serviceId) {
        const modelFile = this.utility_indicator_getModelFile(utility_indicator_serviceId);
        const modelPath = `/models/${modelFile}`;

        const loadingIndicator = document.getElementById('utility_indicator_loading-indicator');
        
        const loader = new THREE.GLTFLoader();
        
        try {
            const gltf = await loader.loadAsync(modelPath);
            this.model = gltf.scene;
            
            // Настройка модели
            this.model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    
                    // Настройка материалов для лучшего вида на светлом фоне
                    if (node.material) {
                        node.material.roughness = 0.3;
                        node.material.metalness = 0.6;
                        if (node.material.color) {
                            node.material.emissive = new THREE.Color(0x222222);
                            node.material.emissiveIntensity = 0.05;
                        }
                    }
                }
            });
            
            // Масштабирование и позиционирование модели
            const box = new THREE.Box3().setFromObject(this.model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 1.2 / maxDim;
            this.model.scale.set(scale, scale, scale);
            
            // Центрирование модели
            this.model.position.x = -center.x * scale;
            this.model.position.y = -center.y * scale;
            this.model.position.z = -center.z * scale;
            
            this.scene.add(this.model);
            
            // Скрыть индикатор загрузки
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        } catch (error) {
            console.error('Ошибка загрузки 3D модели:', error);
            if (loadingIndicator) {
                loadingIndicator.innerHTML = '❌ Ошибка загрузки модели';
                loadingIndicator.style.background = 'rgba(255,255,255,0.95)';
                loadingIndicator.style.color = '#d32f2f';
                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                }, 3000);
            }
            // Создаем заглушку - простую геометрию вместо модели
            this.utility_indicator_createFallbackModel();
        }
    }

    utility_indicator_createFallbackModel() {
        // Создаем красивую геометрию-заглушку, если модель не загрузилась
        const group = new THREE.Group();
        
        // Основное тело
        const geometry = new THREE.IcosahedronGeometry(0.8, 0);
        const material = new THREE.MeshStandardMaterial({ color: 0xff8f00, metalness: 0.7, roughness: 0.3, emissive: 0x442200, emissiveIntensity: 0.1 });
        const core = new THREE.Mesh(geometry, material);
        core.castShadow = true;
        group.add(core);
        
        // Вращающиеся кольца
        const ringGeometry = new THREE.TorusGeometry(1.0, 0.05, 64, 200);
        const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.8, roughness: 0.2 });
        const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring1.rotation.x = Math.PI / 2;
        group.add(ring1);
        
        const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring2.rotation.z = Math.PI / 2;
        group.add(ring2);
        
        this.model = group;
        this.scene.add(this.model);
        
        const loadingIndicator = document.getElementById('utility_indicator_loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    utility_indicator_startAnimation() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            
            if (this.controls) {
                this.controls.update();
            }
            
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };
        animate();
    }

    utility_indicator_handleResize = () => {
        const container = document.getElementById('utility_indicator_canvas-wrapper');
        if (!container || !this.camera || !this.renderer) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    utility_indicator_dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }
        
        if (this.controls) {
            this.controls.dispose();
            this.controls = null;
        }
        
        this.scene = null;
        this.camera = null;
    }

    async utility_indicator_render(utility_indicator_serviceId) {
        // Очищаем родителя
        this.utility_indicator_parent.innerHTML = '';
        
        // Добавляем HTML
        const html = this.utility_indicator_getHTML();
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        
        // Загружаем необходимые библиотеки Three.js
        await this.utility_indicator_loadThreeJSLibraries();
        
        // Инициализируем Three.js сцену
        await this.utility_indicator_initThreeJS(utility_indicator_serviceId);
    }

    utility_indicator_loadThreeJSLibraries() {
        return new Promise((resolve) => {
            // Проверяем, загружены ли уже библиотеки
            if (typeof THREE !== 'undefined' && typeof THREE.GLTFLoader !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
                resolve();
                return;
            }

            let loadedCount = 0;
            let totalToLoad = 3;

            const checkAllLoaded = () => {
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    resolve();
                }
            };

            // Загрузка Three.js core
            if (typeof THREE === 'undefined') {
                const threeScript = document.createElement('script');
                threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                threeScript.onload = checkAllLoaded;
                document.head.appendChild(threeScript);
            } else {
                checkAllLoaded();
            }

            // Загрузка GLTFLoader
            if (typeof THREE !== 'undefined' && typeof THREE.GLTFLoader === 'undefined') {
                const gltfScript = document.createElement('script');
                gltfScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
                gltfScript.onload = checkAllLoaded;
                document.head.appendChild(gltfScript);
            } else {
                checkAllLoaded();
            }

            // Загрузка OrbitControls
            if (typeof THREE !== 'undefined' && typeof THREE.OrbitControls === 'undefined') {
                const controlsScript = document.createElement('script');
                controlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
                controlsScript.onload = checkAllLoaded;
                document.head.appendChild(controlsScript);
            } else {
                checkAllLoaded();
            }
        });
    }
}